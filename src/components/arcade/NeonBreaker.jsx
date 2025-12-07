import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

function NeonBreaker({ onClose }) {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const scoreRef = useRef(0);
  const [gameState, setGameState] = useState("start"); // start, playing, gameover
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);

  // Game State Refs
  const gameRef = useRef({
    width: 800,
    height: 600,
    paddle: { x: 0, y: 0, w: 100, h: 15, color: "#00f3ff" },
    ball: { x: 0, y: 0, r: 8, dx: 0, dy: 0, speed: 6, active: false },
    bricks: [],
    particles: [],
    powerups: [],
    keys: { left: false, right: false },
    shake: 0,
    combo: 0,
  });

  // Constants
  const COLORS = ["#ff0055", "#00f3ff", "#bc13fe", "#f9f002", "#0aff00"];

  // --- Classes ---

  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 4 + 1;
      this.vx = Math.cos(angle) * speed;
      this.vy = Math.sin(angle) * speed;
      this.life = 1.0;
      this.decay = Math.random() * 0.03 + 0.02;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life -= this.decay;
    }

    draw(ctx) {
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // --- Game Functions ---

  const initGame = () => {
    const { width, height } = gameRef.current;
    gameRef.current.paddle = {
      x: width / 2 - 50,
      y: height - 40,
      w: 100,
      h: 15,
      color: "#00f3ff",
    };
    resetBall();
    createBricks();
    gameRef.current.score = 0;
    gameRef.current.combo = 0;
    setScore(0);
    setLevel(1);
  };

  const resetBall = () => {
    const { width, height, paddle } = gameRef.current;
    gameRef.current.ball = {
      x: paddle.x + paddle.w / 2,
      y: paddle.y - 20,
      r: 8,
      dx: 0,
      dy: 0,
      speed: 6 + (level - 1) * 0.5,
      active: false,
    };
  };

  const createBricks = () => {
    const { width } = gameRef.current;
    const rows = 5 + Math.min(level, 3);
    const cols = 8;
    const padding = 10;
    const offsetTop = 80;
    const offsetLeft = 60;
    const brickW = (width - offsetLeft * 2 - padding * (cols - 1)) / cols;
    const brickH = 25;

    gameRef.current.bricks = [];
    for (let c = 0; c < cols; c++) {
      for (let r = 0; r < rows; r++) {
        gameRef.current.bricks.push({
          x: c * (brickW + padding) + offsetLeft,
          y: r * (brickH + padding) + offsetTop,
          w: brickW,
          h: brickH,
          status: 1,
          color: COLORS[r % COLORS.length],
        });
      }
    }
  };

  const update = () => {
    const { width, height, paddle, ball, bricks, keys } = gameRef.current;

    // Paddle Movement
    if (keys.left && paddle.x > 0) paddle.x -= 8;
    if (keys.right && paddle.x < width - paddle.w) paddle.x += 8;

    // Ball Movement
    if (!ball.active) {
      ball.x = paddle.x + paddle.w / 2;
      ball.y = paddle.y - 15;
    } else {
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall Collisions
      if (ball.x + ball.r > width || ball.x - ball.r < 0) {
        ball.dx = -ball.dx;
        gameRef.current.shake = 5;
      }
      if (ball.y - ball.r < 0) {
        ball.dy = -ball.dy;
        gameRef.current.shake = 5;
      }
      if (ball.y + ball.r > height) {
        // Ball Lost
        gameOver();
      }

      // Paddle Collision
      if (
        ball.y + ball.r > paddle.y &&
        ball.y - ball.r < paddle.y + paddle.h &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.w
      ) {
        let collidePoint = ball.x - (paddle.x + paddle.w / 2);
        collidePoint = collidePoint / (paddle.w / 2);
        const angle = collidePoint * (Math.PI / 3);

        ball.dx = ball.speed * Math.sin(angle);
        ball.dy = -ball.speed * Math.cos(angle);
        gameRef.current.combo = 0; // Reset combo on paddle hit
        gameRef.current.shake = 3;
      }

      // Brick Collision
      let activeBricks = 0;
      bricks.forEach((b) => {
        if (b.status === 1) {
          activeBricks++;
          if (
            ball.x > b.x &&
            ball.x < b.x + b.w &&
            ball.y > b.y &&
            ball.y < b.y + b.h
          ) {
            ball.dy = -ball.dy;
            b.status = 0;
            gameRef.current.combo++;
            const points = 10 * gameRef.current.combo;
            gameRef.current.score += points;
            setScore(gameRef.current.score);
            createExplosion(b.x + b.w / 2, b.y + b.h / 2, b.color);
            gameRef.current.shake = 8;
          }
        }
      });

      if (activeBricks === 0) {
        // Level Complete
        setLevel((prev) => prev + 1);
        resetBall();
        createBricks();
      }
    }

    // Particles
    gameRef.current.particles.forEach((p, index) => {
      p.update();
      if (p.life <= 0) gameRef.current.particles.splice(index, 1);
    });

    // Screen Shake Decay
    if (gameRef.current.shake > 0) gameRef.current.shake *= 0.9;
    if (gameRef.current.shake < 0.5) gameRef.current.shake = 0;
  };

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
      gameRef.current.particles.push(new Particle(x, y, color));
    }
  };

  const draw = (ctx) => {
    const { width, height, paddle, ball, bricks, particles, shake } =
      gameRef.current;

    ctx.clearRect(0, 0, width, height);
    ctx.save();

    // Screen Shake
    if (shake > 0) {
      const dx = (Math.random() - 0.5) * shake;
      const dy = (Math.random() - 0.5) * shake;
      ctx.translate(dx, dy);
    }

    // Background Grid
    ctx.strokeStyle = "rgba(0, 243, 255, 0.1)";
    ctx.lineWidth = 1;
    for (let i = 0; i < width; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, height);
      ctx.stroke();
    }
    for (let i = 0; i < height; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(width, i);
      ctx.stroke();
    }

    // Paddle
    ctx.fillStyle = paddle.color;
    ctx.shadowBlur = 20;
    ctx.shadowColor = paddle.color;
    ctx.fillRect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.shadowBlur = 0;

    // Ball
    ctx.fillStyle = "#fff";
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#fff";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Bricks
    bricks.forEach((b) => {
      if (b.status === 1) {
        ctx.fillStyle = b.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = b.color;
        ctx.fillRect(b.x, b.y, b.w, b.h);
        ctx.shadowBlur = 0;
        ctx.fillStyle = "rgba(255,255,255,0.2)";
        ctx.fillRect(b.x, b.y, b.w, b.h / 2);
      }
    });

    // Particles
    particles.forEach((p) => p.draw(ctx));

    ctx.restore();
  };

  const gameLoop = () => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    update();
    draw(ctx);

    requestRef.current = requestAnimationFrame(gameLoop);
  };

  const startGame = () => {
    initGame();
    setGameState("playing");
    gameLoop();
  };

  const gameOver = () => {
    setGameState("gameover");
    cancelAnimationFrame(requestRef.current);
  };

  // --- Effects ---

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        gameRef.current.width = window.innerWidth;
        gameRef.current.height = window.innerHeight;
        // Re-center paddle if resizing mid-game
        if (gameState === "start") {
          // Optional: reset paddle pos
        }
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") gameRef.current.keys.left = true;
      if (e.key === "ArrowRight") gameRef.current.keys.right = true;
      if (
        e.key === " " &&
        !gameRef.current.ball.active &&
        gameState === "playing"
      ) {
        gameRef.current.ball.active = true;
        gameRef.current.ball.dy = -gameRef.current.ball.speed;
        gameRef.current.ball.dx = (Math.random() - 0.5) * 4;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowLeft") gameRef.current.keys.left = false;
      if (e.key === "ArrowRight") gameRef.current.keys.right = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      cancelAnimationFrame(requestRef.current);
    };
  }, [gameState]);

  useEffect(() => {
    if (gameState === "playing") {
      requestRef.current = requestAnimationFrame(gameLoop);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState]);

  return (
    <div className="fixed inset-0 z-[100] bg-[#050505] font-['Orbitron']">
      <canvas ref={canvasRef} className="block w-full h-full" />

      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
      >
        <X size={24} />
      </button>

      {/* HUD */}
      {gameState === "playing" && (
        <div className="absolute top-5 left-5 text-white pointer-events-none">
          <div className="text-2xl font-bold text-[#00f3ff] drop-shadow-[0_0_10px_#00f3ff]">
            SCORE: {score}
          </div>
          <div className="text-xl text-[#bc13fe]">LEVEL: {level}</div>
        </div>
      )}

      {/* Start Screen */}
      {gameState === "start" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 backdrop-blur-sm z-20">
          <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00f3ff] to-[#bc13fe] drop-shadow-[0_0_20px_rgba(0,243,255,0.5)] mb-4 italic tracking-tighter">
            NEON BREAKER
          </h1>
          <p className="text-white text-xl mb-8 font-['Rajdhani'] tracking-widest">
            SMASH THE BRICKS • RACK UP COMBOS
          </p>
          <button
            onClick={startGame}
            className="px-12 py-4 bg-[#00f3ff]/10 border-2 border-[#00f3ff] text-[#00f3ff] text-2xl font-bold uppercase hover:bg-[#00f3ff] hover:text-black transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_40px_#00f3ff]"
          >
            START GAME
          </button>
          <div className="mt-8 text-gray-400 font-['Rajdhani']">
            <span className="border border-gray-600 px-2 py-1 rounded mx-1">
              ←
            </span>
            <span className="border border-gray-600 px-2 py-1 rounded mx-1">
              →
            </span>{" "}
            TO MOVE •{" "}
            <span className="border border-gray-600 px-2 py-1 rounded mx-1">
              TAP
            </span>{" "}
            TO LAUNCH
          </div>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === "gameover" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md z-20">
          <h1 className="text-6xl font-black text-[#ff0055] drop-shadow-[0_0_20px_#ff0055] mb-2">
            GAME OVER
          </h1>
          <div className="text-4xl text-white mb-8 font-['Rajdhani']">
            FINAL SCORE: <span className="text-[#00f3ff]">{score}</span>
          </div>
          <button
            onClick={startGame}
            className="px-12 py-4 bg-[#ff0055]/10 border-2 border-[#ff0055] text-[#ff0055] text-2xl font-bold uppercase hover:bg-[#ff0055] hover:text-black transition-all shadow-[0_0_20px_rgba(255,0,85,0.3)] hover:shadow-[0_0_40px_#ff0055]"
          >
            TRY AGAIN
          </button>
        </div>
      )}
      {/* Mobile Controls */}
      {/* Touch Controls Layer */}
      {gameState === "playing" && (
        <>
          {/* Tap anywhere to Launch if inactive */}
          <div
            className="absolute inset-0 z-40"
            onPointerDown={() => {
              if (!gameRef.current.ball.active) {
                gameRef.current.ball.active = true;
                gameRef.current.ball.dy = -gameRef.current.ball.speed;
                gameRef.current.ball.dx = (Math.random() - 0.5) * 4;
              }
            }}
          />

          {/* Visible Buttons for Movement */}
          <div className="absolute bottom-5 left-5 flex gap-4 z-50">
            <button
              className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-[#00f3ff]/50 text-[#00f3ff] flex items-center justify-center active:bg-[#00f3ff]/20 transition-colors shadow-[0_0_10px_rgba(0,243,255,0.2)]"
              onPointerDown={() => (gameRef.current.keys.left = true)}
              onPointerUp={() => (gameRef.current.keys.left = false)}
              onPointerLeave={() => (gameRef.current.keys.left = false)}
            >
              ←
            </button>
            <button
              className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full border border-[#00f3ff]/50 text-[#00f3ff] flex items-center justify-center active:bg-[#00f3ff]/20 transition-colors shadow-[0_0_10px_rgba(0,243,255,0.2)]"
              onPointerDown={() => (gameRef.current.keys.right = true)}
              onPointerUp={() => (gameRef.current.keys.right = false)}
              onPointerLeave={() => (gameRef.current.keys.right = false)}
            >
              →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default NeonBreaker;
