import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const SuperRajAdventure = ({ onClose }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const scoreRef = useRef(0);
  const [gameState, setGameState] = useState("start"); // start, playing, gameover
  const [score, setScore] = useState(0);

  // Game Constants & State Refs (Mutable to avoid re-renders)
  const gameRef = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
    cameraX: 0,
    frameCount: 0,
    keys: { right: false, left: false, up: false },
    player: null,
    platforms: [],
    coins: [],
    enemies: [],
    decorations: [],
    traffic: [],
    particles: [],
  });

  const COLORS = {
    skyTop: "#ff9a9e",
    skyBot: "#fecfef",
    rupee: "#FFD700",
    playerSkin: "#F5D0A9",
    playerShirt: "#FF4500",
    playerPants: "#000080",
    legoRed: "#E74C3C",
    legoYellow: "#F1C40F",
    legoBlue: "#3498DB",
    legoGreen: "#2ECC71",
  };

  const LEGO_COLORS = [
    COLORS.legoRed,
    COLORS.legoYellow,
    COLORS.legoBlue,
    COLORS.legoGreen,
  ];

  // --- Game Logic Classes ---

  class Player {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.w = 40;
      this.h = 60;
      this.vx = 0;
      this.vy = 0;
      this.speed = 6;
      this.jumpPower = -14;
      this.grounded = false;
      this.facingRight = true;
      this.animFrame = 0;
    }

    update(keys, platforms, gameHeight, gameOverCallback, createDust) {
      // Auto-Run Logic
      this.vx = this.speed;
      this.facingRight = true;
      this.animFrame++;

      // Jumping (Space, ArrowUp, or Touch/Click)
      if (keys.up && this.grounded) {
        this.vy = this.jumpPower;
        this.grounded = false;
        createDust(this.x + this.w / 2, this.y + this.h);
      }

      // Gravity
      this.vy += 0.6; // GRAVITY
      if (this.vy > 15) this.vy = 15; // TERMINAL_VELOCITY

      // Apply
      this.x += this.vx;
      this.y += this.vy;

      // Ground Collision
      this.grounded = false;

      for (let p of platforms) {
        if (
          this.x < p.x + p.w &&
          this.x + this.w > p.x &&
          this.y + this.h > p.y &&
          this.y + this.h < p.y + p.h + 20 &&
          this.vy >= 0
        ) {
          this.grounded = true;
          this.vy = 0;
          this.y = p.y - this.h;
        }
      }

      if (this.y > gameHeight + 200) {
        gameOverCallback();
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
      if (!this.facingRight) ctx.scale(-1, 1);

      // Body (Kurta)
      ctx.fillStyle = COLORS.playerShirt;
      ctx.fillRect(-12, -10, 24, 25);
      ctx.fillStyle = "#FFD700";
      ctx.fillRect(-5, -10, 10, 25);

      // Legs
      let legOffset = Math.sin(this.animFrame * 0.2) * 5;
      if (!this.grounded) legOffset = -5;

      ctx.fillStyle = COLORS.playerPants;
      ctx.fillRect(-12, 15, 10, 15 + legOffset);
      ctx.fillRect(2, 15, 10, 15 - legOffset);

      // Head
      ctx.fillStyle = COLORS.playerSkin;
      ctx.beginPath();
      ctx.arc(0, -18, 14, 0, Math.PI * 2);
      ctx.fill();

      // Turban
      ctx.fillStyle = "#D35400";
      ctx.beginPath();
      ctx.arc(0, -22, 14, Math.PI, 0);
      ctx.lineTo(14, -18);
      ctx.lineTo(-14, -18);
      ctx.fill();

      // Mustache
      ctx.lineWidth = 2;
      ctx.strokeStyle = "black";
      ctx.beginPath();
      ctx.moveTo(-6, -12);
      ctx.quadraticCurveTo(0, -14, 6, -12);
      ctx.stroke();

      ctx.restore();
    }
  }

  class Traffic {
    constructor(x, y, gameWidth, cameraX) {
      this.x = x;
      this.y = y;
      this.speed = (Math.random() * 2 + 2) * (Math.random() > 0.5 ? 1 : -1);
      this.type =
        Math.random() > 0.4 ? "auto" : Math.random() > 0.5 ? "truck" : "car";
      this.color = ["#F1C40F", "#E74C3C", "#9B59B6", "#3498DB", "#2ECC71"][
        Math.floor(Math.random() * 5)
      ];
      this.w = this.type === "truck" ? 100 : this.type === "auto" ? 40 : 60;
      this.h = this.type === "truck" ? 60 : this.type === "auto" ? 35 : 30;
      this.facingRight = this.speed > 0;
    }

    update(cameraX, gameWidth) {
      this.x += this.speed;
      if (this.x - cameraX > gameWidth + 200) this.x = cameraX - 200;
      if (this.x - cameraX < -200) this.x = cameraX + gameWidth + 200;
    }

    draw(ctx, frameCount) {
      ctx.save();
      ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
      if (!this.facingRight) ctx.scale(-1, 1);

      const bob = Math.sin(frameCount * 0.2) * 1;
      ctx.translate(0, bob);

      if (this.type === "auto") {
        ctx.fillStyle = "#111";
        ctx.fillRect(-20, 0, 40, 15);
        ctx.fillStyle = "#F1C40F";
        ctx.beginPath();
        ctx.arc(-5, 0, 15, Math.PI, 0);
        ctx.lineTo(15, 0);
        ctx.lineTo(15, 10);
        ctx.lineTo(-20, 10);
        ctx.fill();
        ctx.fillStyle = "#333";
        ctx.beginPath();
        ctx.arc(0, 15, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(-15, 15, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(15, 15, 5, 0, Math.PI * 2);
        ctx.fill();
      } else if (this.type === "truck") {
        ctx.fillStyle = this.color;
        ctx.fillRect(-50, -20, 70, 40);
        ctx.fillStyle = "#D35400";
        ctx.fillRect(20, -10, 30, 30);
        ctx.fillStyle = "#FFF";
        ctx.font = "10px Arial";
        ctx.fillText("HORN", -40, 0);
        ctx.fillStyle = "#111";
        ctx.beginPath();
        ctx.arc(-30, 20, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(35, 20, 8, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = "#FFF";
        ctx.beginPath();
        ctx.moveTo(-30, 10);
        ctx.quadraticCurveTo(-20, -15, 0, -15);
        ctx.quadraticCurveTo(20, -15, 30, 10);
        ctx.fill();
        ctx.fillRect(-30, 10, 60, 10);
        ctx.fillStyle = "#111";
        ctx.beginPath();
        ctx.arc(-20, 20, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(20, 20, 6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  class Enemy {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.w = 30;
      this.h = 30;
      this.patrolStart = x;
      this.dir = 1;
      this.speed = 2;
      this.range = 150;
      this.dead = false;
    }

    update(player, createExplosion, gameOverCallback, updateScore) {
      if (this.dead) return;
      this.x += this.speed * this.dir;
      if (this.x > this.patrolStart + this.range) this.dir = -1;
      if (this.x < this.patrolStart) this.dir = 1;

      if (
        rectIntersect(
          this.x,
          this.y,
          this.w,
          this.h,
          player.x,
          player.y,
          player.w,
          player.h
        )
      ) {
        if (player.vy > 0 && player.y + player.h < this.y + this.h / 2 + 10) {
          player.vy = -8;
          this.dead = true;
          updateScore(50);
          createExplosion(this.x + this.w / 2, this.y + this.h / 2, "#E52B50");
        } else {
          gameOverCallback();
        }
      }
    }

    draw(ctx, frameCount) {
      if (this.dead) return;
      ctx.save();
      ctx.translate(this.x + this.w / 2, this.y + this.h / 2);
      if (this.dir < 0) ctx.scale(-1, 1);

      const bob = Math.sin(frameCount * 0.1) * 3;
      ctx.translate(0, bob);

      ctx.fillStyle = "#E52B50";
      ctx.beginPath();
      ctx.moveTo(-10, -10);
      ctx.quadraticCurveTo(10, -5, 15, 15);
      ctx.quadraticCurveTo(-5, 10, -10, -10);
      ctx.fill();
      ctx.strokeStyle = "#922B21";
      ctx.lineWidth = 1;
      ctx.stroke();

      ctx.strokeStyle = "#2ECC71";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-10, -10);
      ctx.lineTo(-15, -15);
      ctx.stroke();

      ctx.fillStyle = "white";
      ctx.beginPath();
      ctx.arc(-2, -5, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(6, -3, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "black";
      ctx.beginPath();
      ctx.arc(-1, -5, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(7, -3, 1, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class Coin {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.w = 30;
      this.h = 30;
      this.collected = false;
      this.floatOffset = Math.random() * Math.PI;
    }

    update(player, updateScore, createExplosion) {
      if (this.collected) return;
      if (
        rectIntersect(
          this.x,
          this.y,
          this.w,
          this.h,
          player.x,
          player.y,
          player.w,
          player.h
        )
      ) {
        this.collected = true;
        updateScore(10);
        createExplosion(this.x + 15, this.y + 15, "#FFD700");
      }
    }

    draw(ctx, frameCount) {
      if (this.collected) return;
      const bob = Math.sin(frameCount / 20 + this.floatOffset) * 5;
      ctx.fillStyle = COLORS.rupee;
      ctx.beginPath();
      ctx.arc(this.x + 15, this.y + 15 + bob, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#FFF";
      ctx.beginPath();
      ctx.arc(this.x + 10, this.y + 10 + bob, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#B8860B";
      ctx.font = "bold 16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("₹", this.x + 15, this.y + 20 + bob);
    }
  }

  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.size = Math.random() * 5 + 2;
      this.vx = (Math.random() - 0.5) * 8;
      this.vy = (Math.random() - 0.5) * 8;
      this.life = 1.0;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.2;
      this.life -= 0.03;
    }
    draw(ctx) {
      ctx.globalAlpha = this.life;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.size, this.size);
      ctx.globalAlpha = 1;
    }
  }

  // --- Helpers ---

  const rectIntersect = (x1, y1, w1, h1, x2, y2, w2, h2) => {
    return x2 < x1 + w1 && x2 + w2 > x1 && y2 < y1 + h1 && y2 + h2 > y1;
  };

  const createExplosion = (x, y, color) => {
    for (let i = 0; i < 15; i++) {
      gameRef.current.particles.push(new Particle(x, y, color));
    }
  };

  const createDust = (x, y) => {
    for (let i = 0; i < 5; i++) {
      gameRef.current.particles.push(new Particle(x, y, "#FFF"));
    }
  };

  const updateScore = (points) => {
    scoreRef.current += points;
    setScore(scoreRef.current);
  };

  const gameOver = () => {
    setGameState("gameover");
  };

  const initGame = () => {
    const { width, height } = gameRef.current;
    gameRef.current.player = new Player(100, 300);
    gameRef.current.cameraX = 0;
    gameRef.current.frameCount = 0;
    scoreRef.current = 0;
    setScore(0);

    // Generate Level
    gameRef.current.platforms = [];
    gameRef.current.coins = [];
    gameRef.current.enemies = [];
    gameRef.current.decorations = [];
    gameRef.current.traffic = [];
    gameRef.current.particles = [];

    const floorY = height - 100;
    let curX = 0;
    const endX = 10000;

    // Start Platform
    gameRef.current.platforms.push({
      x: 0,
      y: floorY,
      w: 800,
      h: 200,
      color: LEGO_COLORS[0],
    });
    curX = 800;
    let colorIdx = 1;

    while (curX < endX) {
      const gap = Math.random() > 0.7 ? 120 + Math.random() * 100 : 0;
      curX += gap;
      const w = Math.floor((400 + Math.random() * 600) / 40) * 40;
      const h = 200;
      const lift =
        Math.random() > 0.8 ? Math.floor((Math.random() * 100) / 40) * 40 : 0;
      const y = floorY - lift;

      gameRef.current.platforms.push({
        x: curX,
        y,
        w,
        h,
        color: LEGO_COLORS[colorIdx],
      });
      colorIdx = (colorIdx + 1) % LEGO_COLORS.length;

      if (w > 300) {
        if (Math.random() > 0.4) {
          gameRef.current.enemies.push(
            new Enemy(curX + 200 + Math.random() * (w - 300), y - 30)
          );
        }
        if (Math.random() > 0.5) {
          for (let i = 0; i < 5; i++) {
            gameRef.current.coins.push(
              new Coin(curX + 100 + i * 40, y - 100 - lift)
            );
          }
        }
      }

      if (Math.random() > 0.6) {
        const bridgeW = 160;
        const bridgeY = y - 160;
        gameRef.current.platforms.push({
          x: curX + 100,
          y: bridgeY,
          w: bridgeW,
          h: 40,
          color: LEGO_COLORS[(colorIdx + 2) % 4],
        });
        gameRef.current.coins.push(new Coin(curX + 160, bridgeY - 40));
      }

      curX += w;
    }

    // Scenery
    for (let i = 0; i < endX; i += 350) {
      gameRef.current.decorations.push({
        type: Math.random() > 0.3 ? "house" : "tree",
        x: i,
        y: height - 80,
        color: Math.random() > 0.5 ? "#FFCCBC" : "#D1C4E9",
        scale: 0.8 + Math.random() * 0.4,
      });
    }

    // Traffic
    for (let i = 0; i < 30; i++) {
      gameRef.current.traffic.push(
        new Traffic(Math.random() * endX, height - 60, width, 0)
      );
    }
  };

  // --- Main Loop ---

  const animate = () => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = gameRef.current;

    ctx.clearRect(0, 0, width, height);
    gameRef.current.frameCount++;

    const {
      player,
      enemies,
      coins,
      particles,
      traffic,
      decorations,
      platforms,
    } = gameRef.current;

    // Update
    player.update(
      gameRef.current.keys,
      platforms,
      height,
      gameOver,
      createDust
    );
    enemies.forEach((e) =>
      e.update(player, createExplosion, gameOver, updateScore)
    );
    coins.forEach((c) => c.update(player, updateScore, createExplosion));
    particles.forEach((p, idx) => {
      p.update();
      if (p.life <= 0) particles.splice(idx, 1);
    });

    // Camera
    let targetCamX = player.x - width / 3;
    if (targetCamX < 0) targetCamX = 0;
    gameRef.current.cameraX += (targetCamX - gameRef.current.cameraX) * 0.1;
    const cameraX = gameRef.current.cameraX;

    // Draw Background
    let grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, COLORS.skyTop);
    grad.addColorStop(1, COLORS.skyBot);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Sun
    ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
    ctx.beginPath();
    ctx.arc(width - 150, 150, 80, 0, Math.PI * 2);
    ctx.fill();

    // Parallax Layer
    ctx.save();
    const parallaxSpeed = 0.5;
    ctx.translate(-cameraX * parallaxSpeed, 0);

    // Road
    ctx.fillStyle = "#555";
    ctx.fillRect(cameraX * parallaxSpeed - 100, height - 80, width + 200, 80);
    ctx.strokeStyle = "#FFF";
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.moveTo(cameraX * parallaxSpeed - 100, height - 40);
    ctx.lineTo(cameraX * parallaxSpeed + width + 200, height - 40);
    ctx.stroke();
    ctx.setLineDash([]);

    // Decorations
    decorations.forEach((d) => {
      if (
        d.x > cameraX * parallaxSpeed - 200 &&
        d.x < cameraX * parallaxSpeed + width + 200
      ) {
        ctx.save();
        ctx.translate(d.x, d.y);
        ctx.scale(d.scale, d.scale);
        if (d.type === "house") {
          ctx.fillStyle = d.color;
          ctx.fillRect(0, -100, 80, 100);
          ctx.fillStyle = "#C0392B";
          ctx.beginPath();
          ctx.moveTo(-10, -100);
          ctx.lineTo(40, -140);
          ctx.lineTo(90, -100);
          ctx.fill();
          ctx.fillStyle = "#5D4037";
          ctx.fillRect(25, -40, 30, 40);
          ctx.fillStyle = "#81D4FA";
          ctx.fillRect(10, -80, 20, 20);
          ctx.fillRect(50, -80, 20, 20);
        } else {
          ctx.fillStyle = "#795548";
          ctx.fillRect(0, -40, 10, 40);
          ctx.fillStyle = "#228B22";
          ctx.beginPath();
          ctx.arc(5, -50, 25, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }
    });

    traffic.forEach((t) => {
      t.update(cameraX * parallaxSpeed, width);
      t.draw(ctx, gameRef.current.frameCount);
    });

    ctx.restore();

    // Game Layer
    ctx.save();
    ctx.translate(-cameraX, 0);

    // Platforms
    platforms.forEach((p) => {
      if (p.x - cameraX > width || p.x + p.w - cameraX < 0) return;
      const brickSize = 40;
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x, p.y, p.w, p.h);
      for (let i = 0; i < p.w; i += brickSize) {
        ctx.fillRect(p.x + i + 5, p.y - 8, 30, 8);
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.fillRect(p.x + i + 5, p.y - 8, 30, 2);
        ctx.fillStyle = p.color;
      }
      ctx.strokeStyle = "rgba(0,0,0,0.1)";
      ctx.lineWidth = 2;
      for (let j = 0; j < p.h; j += brickSize) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y + j);
        ctx.lineTo(p.x + p.w, p.y + j);
        ctx.stroke();
      }
      for (let j = 0; j < p.h; j += brickSize) {
        const offset = (j / brickSize) % 2 === 0 ? 0 : brickSize / 2;
        for (let i = offset; i < p.w; i += brickSize) {
          ctx.beginPath();
          ctx.moveTo(p.x + i, p.y + j);
          ctx.lineTo(p.x + i, p.y + j + brickSize);
          ctx.stroke();
        }
      }
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(p.x, p.y + p.h - 5, p.w, 5);
    });

    coins.forEach((c) => c.draw(ctx, gameRef.current.frameCount));
    enemies.forEach((e) => e.draw(ctx, gameRef.current.frameCount));
    player.draw(ctx);
    particles.forEach((p) => p.draw(ctx));

    ctx.restore();

    requestRef.current = requestAnimationFrame(animate);
  };

  // --- Effects ---

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        gameRef.current.width = window.innerWidth;
        gameRef.current.height = window.innerHeight;
      }
    };

    const handleKeyDown = (e) => {
      if (e.code === "ArrowRight") gameRef.current.keys.right = true;
      if (e.code === "ArrowLeft") gameRef.current.keys.left = true;
      if (e.code === "ArrowUp" || e.code === "Space")
        gameRef.current.keys.up = true;
    };

    const handleKeyUp = (e) => {
      if (e.code === "ArrowRight") gameRef.current.keys.right = false;
      if (e.code === "ArrowLeft") gameRef.current.keys.left = false;
      if (e.code === "ArrowUp" || e.code === "Space")
        gameRef.current.keys.up = false;
    };

    const handleTouchStart = (e) => {
      // Prevent default to avoid scrolling/zooming while playing
      // e.preventDefault(); // Optional: might block scrolling on other parts if not careful
      gameRef.current.keys.up = true;
    };

    const handleTouchEnd = () => {
      gameRef.current.keys.up = false;
    };

    const handleMouseDown = () => {
      gameRef.current.keys.up = true;
    };

    const handleMouseUp = () => {
      gameRef.current.keys.up = false;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    // Touch / Mouse listeners for Jump
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(requestRef.current);
    };
  }, []);

  useEffect(() => {
    if (gameState === "playing") {
      if (!gameRef.current.player) initGame();
      requestRef.current = requestAnimationFrame(animate);
    } else {
      cancelAnimationFrame(requestRef.current);
    }
  }, [gameState]);

  const startGame = () => {
    initGame();
    setGameState("playing");
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black font-['Bangers']">
      <canvas ref={canvasRef} className="block w-full h-full" />

      {/* UI Layer */}
      <div className="absolute top-5 left-5 text-[#FFD700] text-4xl pointer-events-none z-10 font-['Rye'] bg-black/60 px-5 py-2 rounded-2xl border-2 border-[#FFD700] shadow-[0_4px_0_#D35400]">
        ₹ {score}
      </div>

      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
      >
        <X size={24} />
      </button>

      <div className="absolute bottom-5 w-full text-center text-white text-xl pointer-events-none drop-shadow-md tracking-wider">
        Tap to Jump • Avoid Obstacles
      </div>

      {/* Start Screen */}
      {gameState === "start" && (
        <div
          className="absolute inset-0 bg-[#F4D03F] flex flex-col items-center justify-center z-20 border-[25px] border-transparent"
          style={{
            borderImage:
              "repeating-linear-gradient(45deg, #FF0055, #FF0055 20px, #FFD700 20px, #FFD700 40px) 30",
          }}
        >
          <div className="bg-[#1a1a1a] border-[6px] border-[#FFD700] p-10 text-center rounded-[30px] shadow-[0_10px_0_#D35400] relative max-w-[90%] min-w-[320px]">
            <div className="text-4xl my-2 filter drop-shadow-md">
              🍋🌶️🍋🌶️🍋
            </div>
            <h1 className="font-['Rye'] text-6xl text-[#FFD700] m-0 drop-shadow-[4px_4px_0_#FF0055] leading-tight uppercase">
              SUPER RAJ
              <br />
              ADVENTURE
            </h1>
            <div className="font-['Bangers'] text-white bg-[#FF0055] inline-block px-5 py-1 -skew-x-12 text-3xl my-5 tracking-wider shadow-[5px_5px_0_#000]">
              HORN OK PLEASE
            </div>
            <p className="text-[#FFD700] font-['Bangers'] text-xl tracking-wide mt-1">
              AVOID THE CHILLI • COLLECT RUPEES
            </p>
            <button
              onClick={startGame}
              className="mt-6 px-12 py-4 text-3xl bg-[#2ECC71] text-[#111] border-4 border-white rounded-full cursor-pointer font-['Rye'] uppercase shadow-[0_6px_0_#145A32] active:translate-y-1 active:shadow-[0_2px_0_#145A32] transition-transform"
            >
              BLOW HORN & START
            </button>
            <div className="absolute -bottom-12 w-full text-center font-['Bangers'] text-[#111] text-2xl bg-[#F4D03F] border-t-4 border-[#111] left-0 py-1">
              USE DIPPER AT NIGHT
            </div>
          </div>
        </div>
      )}

      {/* Mobile Controls */}
      {gameState === "playing" && (
        <>
          <div className="absolute bottom-5 left-5 flex gap-4 z-50">
            <button
              className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/50 text-white flex items-center justify-center active:bg-white/40 transition-colors"
              onPointerDown={() => (gameRef.current.keys.left = true)}
              onPointerUp={() => (gameRef.current.keys.left = false)}
              onPointerLeave={() => (gameRef.current.keys.left = false)}
            >
              ←
            </button>
            <button
              className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/50 text-white flex items-center justify-center active:bg-white/40 transition-colors"
              onPointerDown={() => (gameRef.current.keys.right = true)}
              onPointerUp={() => (gameRef.current.keys.right = false)}
              onPointerLeave={() => (gameRef.current.keys.right = false)}
            >
              →
            </button>
          </div>
          <div className="absolute bottom-5 right-5 z-50">
            <button
              className="w-20 h-20 bg-[#FFD700]/20 backdrop-blur-md rounded-full border-2 border-[#FFD700]/50 text-[#FFD700] font-bold text-xl flex items-center justify-center active:bg-[#FFD700]/40 transition-colors"
              onPointerDown={() => (gameRef.current.keys.up = true)}
              onPointerUp={() => (gameRef.current.keys.up = false)}
              onPointerLeave={() => (gameRef.current.keys.up = false)}
            >
              JUMP
            </button>
          </div>
        </>
      )}

      {/* Game Over Screen */}
      {gameState === "gameover" && (
        <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-20">
          <div className="bg-[#1a1a1a] border-[6px] border-[#FFD700] p-10 text-center rounded-[30px] shadow-[0_10px_0_#D35400]">
            <h1 className="font-['Rye'] text-6xl text-[#FFD700] m-0 drop-shadow-[4px_4px_0_#FF0055] leading-tight uppercase">
              GAME OVER
            </h1>
            <p className="text-white font-['Bangers'] text-4xl my-4">
              Score: ₹ {score}
            </p>
            <button
              onClick={startGame}
              className="mt-4 px-12 py-4 text-3xl bg-[#2ECC71] text-[#111] border-4 border-white rounded-full cursor-pointer font-['Rye'] uppercase shadow-[0_6px_0_#145A32] active:translate-y-1 active:shadow-[0_2px_0_#145A32] transition-transform"
            >
              TRY AGAIN
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperRajAdventure;
