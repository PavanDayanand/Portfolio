import React, { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

const ApexSwitcher = ({ onClose }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const scoreRef = useRef(0);
  const [gameState, setGameState] = useState("start"); // start, playing, gameover
  const [score, setScore] = useState(0);
  const [speedDisplay, setSpeedDisplay] = useState(0);
  const [biomeName, setBiomeName] = useState("");
  const [showBiomeNotify, setShowBiomeNotify] = useState(false);

  // Game State Refs
  const gameRef = useRef({
    width: 600,
    height: 800,
    frameId: 0,
    score: 0,
    speed: 0,
    globalTime: 0,
    gameActive: false,
    currentBiomeIndex: 0,
    biomeTimer: 0,
    roadOffsetY: 0,
    player: null,
    obstacles: [],
    props: [],
    particles: null,
    keys: { left: false, right: false, swap: false, swapPressed: false },
  });

  const BASE_SPEED = 10;
  const MAX_SPEED = 28;

  const BIOMES = [
    {
      name: "SUNSET COAST",
      roadColor: "#37474f",
      roadLine: "#fff",
      grassColor: "#ff9966",
      grassColor2: "#ff5e62",
      skyColor: "#2c3e50",
      propType: "palm",
      weather: "clear",
    },
    {
      name: "NEON CITY",
      roadColor: "#111",
      roadLine: "#00f3ff",
      grassColor: "#0f0c29",
      grassColor2: "#24243e",
      skyColor: "#000",
      propType: "lamp",
      weather: "rain",
    },
    {
      name: "DESERT CANYON",
      roadColor: "#5d4037",
      roadLine: "#ffecb3",
      grassColor: "#e65100",
      grassColor2: "#bf360c",
      skyColor: "#87CEEB",
      propType: "rock",
      weather: "clear",
    },
    {
      name: "ARCTIC TUNDRA",
      roadColor: "#546e7a",
      roadLine: "#81d4fa",
      grassColor: "#cfd8dc",
      grassColor2: "#b0bec5",
      skyColor: "#fff",
      propType: "pine",
      weather: "snow",
    },
  ];

  // --- Classes ---

  class ParticleSystem {
    constructor() {
      this.particles = [];
    }

    add(x, y, vx, vy, life, color) {
      this.particles.push({ x, y, vx, vy, life, maxLife: life, color });
    }

    createExplosion(x, y, count, color) {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 8;
        this.add(
          x,
          y,
          Math.cos(angle) * speed,
          Math.sin(angle) * speed,
          40,
          color
        );
      }
    }

    update() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
        if (p.life <= 0) this.particles.splice(i, 1);
      }
    }

    draw(ctx) {
      for (const p of this.particles) {
        ctx.globalAlpha = p.life / p.maxLife;
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, 4, 4);
      }
      ctx.globalAlpha = 1;
    }
  }

  class Player {
    constructor(gameWidth, gameHeight) {
      this.x = gameWidth / 2;
      this.y = gameHeight - 160;
      this.width = 60;
      this.height = 100;
      this.type = "car"; // 'car' or 'bike'
      this.velX = 0;
      this.maxVelX = 9;
      this.tilt = 0;
      this.flash = 0;
    }

    switchMode(particles) {
      particles.createExplosion(this.x, this.y, 20, "#fff");
      this.flash = 12;

      if (this.type === "car") {
        this.type = "bike";
        this.width = 30;
        this.maxVelX = 13;
      } else {
        this.type = "car";
        this.width = 60;
        this.maxVelX = 9;
      }
    }

    update(input, gameWidth, particles, globalTime) {
      if (input.swap) {
        this.switchMode(particles);
        input.swap = false;
      }

      if (input.left) this.velX -= 1.2;
      else if (input.right) this.velX += 1.2;
      else this.velX *= 0.88;

      if (this.velX > this.maxVelX) this.velX = this.maxVelX;
      if (this.velX < -this.maxVelX) this.velX = -this.maxVelX;

      this.x += this.velX;
      this.tilt = this.velX * 3;

      if (this.x < 110) {
        this.x = 110;
        this.velX = 0;
      }
      if (this.x > gameWidth - 110) {
        this.x = gameWidth - 110;
        this.velX = 0;
      }

      if (this.flash > 0) this.flash--;

      if (globalTime % 4 === 0) {
        const color =
          this.type === "bike" ? "rgba(0,243,255,0.6)" : "rgba(255,50,50,0.6)";
        const w = this.type === "bike" ? 10 : 30;
        particles.add(
          this.x - w / 2 + Math.random() * w,
          this.y + this.height / 2,
          0,
          8,
          15,
          color
        );
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.tilt * Math.PI) / 180);

      if (this.flash > 0) {
        ctx.globalCompositeOperation = "overlay";
        ctx.fillStyle = `rgba(255,255,255,${this.flash / 10})`;
        ctx.beginPath();
        ctx.arc(0, 0, 120, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }

      if (this.type === "car") this.drawCar(ctx);
      else this.drawBike(ctx);

      ctx.restore();
    }

    drawCar(ctx) {
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(-32, 5, 64, 100);

      ctx.fillStyle = "#1a1a1a";
      ctx.beginPath();
      ctx.roundRect(-30, -50, 60, 100, 5);
      ctx.fill();

      ctx.fillStyle = "var(--neon-blue)";
      ctx.fillRect(-28, -50, 4, 100);
      ctx.fillRect(24, -50, 4, 100);

      ctx.fillStyle = "#333";
      ctx.fillRect(-15, 20, 30, 25);

      ctx.fillStyle = "#0d0d0d";
      ctx.beginPath();
      ctx.moveTo(-25, -20);
      ctx.lineTo(25, -20);
      ctx.lineTo(22, 10);
      ctx.lineTo(-22, 10);
      ctx.fill();

      ctx.strokeStyle = "rgba(255,255,255,0.2)";
      ctx.beginPath();
      ctx.moveTo(-15, -15);
      ctx.lineTo(15, 5);
      ctx.stroke();

      ctx.fillStyle = "#fff";
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#fff";
      ctx.fillRect(-26, -52, 12, 6);
      ctx.fillRect(14, -52, 12, 6);

      ctx.fillStyle = "#ff0044";
      ctx.shadowColor = "#ff0044";
      ctx.shadowBlur = 10;
      ctx.fillRect(-26, 45, 18, 5);
      ctx.fillRect(8, 45, 18, 5);
      ctx.shadowBlur = 0;
    }

    drawBike(ctx) {
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(-12, 5, 24, 60);

      ctx.fillStyle = "#222";
      ctx.beginPath();
      ctx.roundRect(-12, -35, 24, 70, 10);
      ctx.fill();

      ctx.strokeStyle = "var(--neon-pink)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, -30);
      ctx.lineTo(0, 30);
      ctx.stroke();

      ctx.fillStyle = "#111";
      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "var(--neon-green)";
      ctx.fillRect(-6, -5, 12, 6);

      ctx.fillStyle = "#fff";
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#fff";
      ctx.beginPath();
      ctx.arc(0, -35, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      ctx.fillStyle = "var(--neon-pink)";
      ctx.shadowBlur = 10;
      ctx.shadowColor = "var(--neon-pink)";
      ctx.fillRect(-5, 30, 10, 5);
      ctx.shadowBlur = 0;
    }
  }

  class Obstacle {
    constructor(y, currentBiomeIndex) {
      this.y = y;
      const lanes = [165, 260, 340, 435];
      this.x = lanes[Math.floor(Math.random() * lanes.length)];

      const rand = Math.random();
      if (rand < 0.25) this.type = "crate";
      else if (rand < 0.4 && currentBiomeIndex === 2) this.type = "barrier";
      else this.type = "traffic";

      this.width = this.type === "crate" ? 50 : 50;
      this.height = this.type === "crate" ? 50 : 90;
      this.speedOffset = Math.random() * 3 + 2;

      const hues = [0, 180, 280, 320, 60];
      const hue = hues[Math.floor(Math.random() * hues.length)];
      this.color = `hsl(${hue}, 80%, 60%)`;
      this.smashed = false;
    }

    update(scrollSpeed) {
      this.y += scrollSpeed - this.speedOffset;
    }

    draw(ctx) {
      if (this.smashed) return;

      if (this.type === "traffic") {
        ctx.fillStyle = this.color;
        ctx.fillRect(
          this.x - this.width / 2,
          this.y - this.height / 2,
          this.width,
          this.height
        );
        ctx.fillStyle = "rgba(0,0,0,0.5)";
        ctx.fillRect(
          this.x - this.width / 2 + 5,
          this.y - this.height / 2 + 10,
          this.width - 10,
          this.height - 25
        );
        ctx.fillStyle = "#ff0000";
        ctx.shadowBlur = 10;
        ctx.shadowColor = "red";
        ctx.fillRect(this.x - 20, this.y + 40, 12, 5);
        ctx.fillRect(this.x + 8, this.y + 40, 12, 5);
        ctx.shadowBlur = 0;
      } else if (this.type === "crate") {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.fillStyle = "rgba(255, 165, 0, 0.2)";
        ctx.strokeStyle = "#ffa500";
        ctx.lineWidth = 3;
        ctx.fillRect(-25, -25, 50, 50);
        ctx.strokeRect(-25, -25, 50, 50);
        ctx.beginPath();
        ctx.moveTo(-25, -25);
        ctx.lineTo(25, 25);
        ctx.moveTo(25, -25);
        ctx.lineTo(-25, 25);
        ctx.stroke();
        ctx.fillStyle = "#ffa500";
        ctx.font = "20px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("CRUSH", 0, 0);
        ctx.restore();
      } else {
        ctx.fillStyle = "#555";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 30, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#333";
        ctx.beginPath();
        ctx.moveTo(this.x - 10, this.y - 10);
        ctx.lineTo(this.x + 10, this.y + 10);
        ctx.stroke();
      }
    }
  }

  class SceneryProp {
    constructor(y, gameWidth, currentBiomeIndex) {
      this.y = y;
      this.side = Math.random() > 0.5 ? "left" : "right";
      this.x =
        this.side === "left"
          ? Math.random() * 80
          : gameWidth - Math.random() * 80;
      this.type = BIOMES[currentBiomeIndex].propType;
    }

    update(speed) {
      this.y += speed;
    }

    draw(ctx) {
      ctx.fillStyle = "#000";
      if (this.type === "palm") {
        ctx.fillStyle = "#1b5e20";
        ctx.fillRect(this.x - 3, this.y, 6, 40);
        ctx.beginPath();
        ctx.arc(this.x, this.y, 20, Math.PI, 0);
        ctx.fill();
      } else if (this.type === "lamp") {
        ctx.fillStyle = "#333";
        ctx.fillRect(this.x - 2, this.y, 4, 50);
        ctx.fillStyle = "#fff";
        ctx.shadowBlur = 25;
        ctx.shadowColor = "cyan";
        ctx.beginPath();
        ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      } else if (this.type === "rock") {
        ctx.fillStyle = "#4e342e";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 15);
        ctx.lineTo(this.x + 20, this.y + 15);
        ctx.lineTo(this.x - 20, this.y + 15);
        ctx.fill();
      } else if (this.type === "pine") {
        ctx.fillStyle = "#263238";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 25);
        ctx.lineTo(this.x + 12, this.y);
        ctx.lineTo(this.x - 12, this.y);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(this.x, this.y - 15);
        ctx.lineTo(this.x + 18, this.y + 20);
        ctx.lineTo(this.x - 18, this.y + 20);
        ctx.fill();
      }
    }
  }

  // --- Game Functions ---

  const initGame = () => {
    const { width, height } = gameRef.current;
    gameRef.current.player = new Player(width, height);
    gameRef.current.particles = new ParticleSystem();
    gameRef.current.obstacles = [];
    gameRef.current.props = [];
    gameRef.current.score = 0;
    gameRef.current.speed = BASE_SPEED;
    gameRef.current.currentBiomeIndex = 0;
    gameRef.current.biomeTimer = 0;
    gameRef.current.globalTime = 0;

    for (let i = 0; i < 12; i++) {
      gameRef.current.props.push(
        new SceneryProp(
          Math.random() * height,
          width,
          gameRef.current.currentBiomeIndex
        )
      );
    }

    setScore(0);
    setSpeedDisplay(BASE_SPEED);
  };

  const checkCollisions = (ctx) => {
    const { player, obstacles, particles } = gameRef.current;
    const margin = 10;
    const pRect = {
      l: player.x - player.width / 2 + margin,
      r: player.x + player.width / 2 - margin,
      t: player.y - player.height / 2 + margin,
      b: player.y + player.height / 2 - margin,
    };

    for (let i = 0; i < obstacles.length; i++) {
      let obs = obstacles[i];
      if (obs.smashed) continue;

      const oRect = {
        l: obs.x - obs.width / 2 + 5,
        r: obs.x + obs.width / 2 - 5,
        t: obs.y - obs.height / 2 + 5,
        b: obs.y + obs.height / 2 - 5,
      };

      if (
        pRect.l < oRect.r &&
        pRect.r > oRect.l &&
        pRect.t < oRect.b &&
        pRect.b > oRect.t
      ) {
        if (player.type === "car" && obs.type === "crate") {
          obs.smashed = true;
          gameRef.current.score += 100;
          particles.createExplosion(obs.x, obs.y, 15, "#ffa500");
          ctx.translate(Math.random() * 10 - 5, Math.random() * 10 - 5);
        } else {
          gameOver();
        }
      }
    }
  };

  const updateEnvironment = () => {
    gameRef.current.biomeTimer++;
    if (gameRef.current.biomeTimer > 1200) {
      gameRef.current.currentBiomeIndex =
        (gameRef.current.currentBiomeIndex + 1) % BIOMES.length;
      gameRef.current.biomeTimer = 0;
      setBiomeName(BIOMES[gameRef.current.currentBiomeIndex].name);
      setShowBiomeNotify(true);
      setTimeout(() => setShowBiomeNotify(false), 3000);
    }
  };

  const drawRoad = (ctx, width, height) => {
    const biome = BIOMES[gameRef.current.currentBiomeIndex];
    const { roadOffsetY } = gameRef.current;

    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, biome.grassColor);
    gradient.addColorStop(0.15, biome.grassColor);
    gradient.addColorStop(0.15, biome.grassColor2);
    gradient.addColorStop(0.85, biome.grassColor2);
    gradient.addColorStop(0.85, biome.grassColor);
    gradient.addColorStop(1, biome.grassColor);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = biome.roadColor;
    ctx.fillRect(100, 0, width - 200, height);

    ctx.fillStyle = biome.roadLine;
    ctx.globalAlpha = 0.6;
    const numLanes = 3;
    const laneWidth = (width - 200) / (numLanes + 1);

    for (let i = 1; i <= numLanes; i++) {
      const lx = 100 + laneWidth * i;
      for (let ly = -100; ly < height; ly += 80) {
        ctx.fillRect(lx - 2, ly + (roadOffsetY % 80), 4, 30);
      }
    }
    ctx.globalAlpha = 1;

    const stripSize = 40;
    for (let y = -stripSize; y < height; y += stripSize) {
      const offset = roadOffsetY % (stripSize * 2);
      const actualY = y + offset;
      const isRed = Math.floor((actualY + roadOffsetY) / stripSize) % 2 === 0;

      ctx.fillStyle = isRed ? "#fff" : "#f00";
      ctx.fillRect(90, actualY, 10, stripSize);
      ctx.fillRect(width - 100, actualY, 10, stripSize);
    }
  };

  const drawWeather = (ctx, width, height) => {
    const w = BIOMES[gameRef.current.currentBiomeIndex].weather;
    if (w === "clear") return;

    ctx.fillStyle = w === "snow" ? "white" : "rgba(150, 150, 255, 0.4)";
    const count = w === "snow" ? 50 : 120;
    const { globalTime } = gameRef.current;

    for (let i = 0; i < count; i++) {
      const x =
        (Math.sin(i * 1321 + globalTime * 0.01) * width + width) % width;
      const y = (i * 543 + globalTime * (w === "snow" ? 6 : 25)) % height;

      if (w === "snow") {
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(x, y, 1, 15);
      }
    }
  };

  const gameLoop = () => {
    if (!gameRef.current.gameActive) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { width, height } = gameRef.current;

    gameRef.current.globalTime++;
    if (gameRef.current.speed < MAX_SPEED) gameRef.current.speed += 0.005;
    gameRef.current.roadOffsetY += gameRef.current.speed;
    gameRef.current.score += Math.floor(gameRef.current.speed / 4);

    const { player, particles, obstacles, props, speed } = gameRef.current;

    player.update(
      gameRef.current.keys,
      width,
      particles,
      gameRef.current.globalTime
    );
    updateEnvironment();
    particles.update();
    checkCollisions(ctx);

    if (Math.random() < 0.02) {
      gameRef.current.obstacles.push(
        new Obstacle(-100, gameRef.current.currentBiomeIndex)
      );
    }

    if (Math.random() < 0.06) {
      gameRef.current.props.push(
        new SceneryProp(-50, width, gameRef.current.currentBiomeIndex)
      );
    }

    gameRef.current.obstacles.forEach((o) => o.update(speed));
    gameRef.current.obstacles = gameRef.current.obstacles.filter(
      (o) => o.y < height + 150
    );

    gameRef.current.props.forEach((p) => p.update(speed));
    gameRef.current.props = gameRef.current.props.filter(
      (p) => p.y < height + 150
    );

    ctx.clearRect(0, 0, width, height);
    drawRoad(ctx, width, height);

    const allObjects = [
      ...gameRef.current.props.map((p) => ({
        ...p,
        draw: p.draw.bind(p),
        y: p.y,
      })),
      ...gameRef.current.obstacles.map((o) => ({
        ...o,
        draw: o.draw.bind(o),
        y: o.y,
      })),
      { y: player.y, draw: player.draw.bind(player) },
    ];

    allObjects.sort((a, b) => a.y - b.y);
    allObjects.forEach((obj) => obj.draw(ctx));

    particles.draw(ctx);
    drawWeather(ctx, width, height);

    setScore(gameRef.current.score);
    setSpeedDisplay(Math.floor(speed * 10));

    requestRef.current = requestAnimationFrame(gameLoop);
  };

  const startGame = () => {
    initGame();
    gameRef.current.gameActive = true;
    setGameState("playing");
    gameLoop();
  };

  const gameOver = () => {
    gameRef.current.gameActive = false;
    cancelAnimationFrame(requestRef.current);
    scoreRef.current = gameRef.current.score;
    setGameState("gameover");
  };

  // --- Effects ---

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const aspect = 3 / 4;
        let w = window.innerWidth;
        let h = window.innerHeight;
        if (w / h > aspect) w = h * aspect;
        else h = w / aspect;

        canvasRef.current.width = 600;
        canvasRef.current.height = 800;
        canvasRef.current.style.width = `${w}px`;
        canvasRef.current.style.height = `${h}px`;
        gameRef.current.width = 600;
        gameRef.current.height = 800;
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") gameRef.current.keys.left = true;
      if (e.key === "ArrowRight") gameRef.current.keys.right = true;
      if (e.key === " " && !gameRef.current.keys.swapPressed) {
        gameRef.current.keys.swap = true;
        gameRef.current.keys.swapPressed = true;
      }
    };

    const handleKeyUp = (e) => {
      if (e.key === "ArrowLeft") gameRef.current.keys.left = false;
      if (e.key === "ArrowRight") gameRef.current.keys.right = false;
      if (e.key === " ") gameRef.current.keys.swapPressed = false;
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
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black font-['Rajdhani'] flex justify-center items-center">
      <canvas
        ref={canvasRef}
        className="shadow-[0_0_50px_rgba(0,243,255,0.2)] max-w-full max-h-full z-10"
      />

      {/* Touch Controls Layer */}
      {gameState === "playing" && (
        <div className="absolute inset-0 z-50 flex">
          {/* Left Zone - Move Left */}
          <div
            className="h-full w-[35%]"
            onPointerDown={() => (gameRef.current.keys.left = true)}
            onPointerUp={() => (gameRef.current.keys.left = false)}
            onPointerLeave={() => (gameRef.current.keys.left = false)}
          />
          {/* Center Zone - Swap Mode */}
          <div
            className="h-full w-[30%]"
            onPointerDown={() => {
              if (!gameRef.current.keys.swapPressed) {
                gameRef.current.keys.swap = true;
                gameRef.current.keys.swapPressed = true;
              }
            }}
            onPointerUp={() => (gameRef.current.keys.swapPressed = false)}
            onPointerLeave={() => (gameRef.current.keys.swapPressed = false)}
          />
          {/* Right Zone - Move Right */}
          <div
            className="h-full w-[35%]"
            onPointerDown={() => (gameRef.current.keys.right = true)}
            onPointerUp={() => (gameRef.current.keys.right = false)}
            onPointerLeave={() => (gameRef.current.keys.right = false)}
          />
        </div>
      )}

      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white backdrop-blur-md transition-colors"
      >
        <X size={24} />
      </button>

      {/* HUD */}
      {gameState === "playing" && (
        <div className="absolute top-5 left-5 right-5 flex justify-between pointer-events-none z-20 text-white max-w-[600px] mx-auto w-full">
          <div className="flex flex-col bg-black/50 px-4 py-1 border-l-4 border-[#00f3ff] -skew-x-12">
            <div className="skew-x-12">
              <span className="text-[#00f3ff] text-sm font-bold tracking-wider block">
                SCORE
              </span>
              <span className="font-['Orbitron'] text-2xl font-bold drop-shadow-[0_0_5px_#00f3ff]">
                {score}
              </span>
            </div>
          </div>
          <div className="flex flex-col bg-black/50 px-4 py-1 border-l-4 border-[#00f3ff] -skew-x-12 items-end">
            <div className="skew-x-12 text-right">
              <span className="text-[#00f3ff] text-sm font-bold tracking-wider block">
                SPEED
              </span>
              <span className="font-['Orbitron'] text-2xl font-bold drop-shadow-[0_0_5px_#00f3ff]">
                {speedDisplay} KM/H
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Biome Notification */}
      <div
        className={`absolute top-24 left-1/2 -translate-x-1/2 bg-black/70 border border-[#bc13fe] px-6 py-2 text-white font-['Orbitron'] text-lg tracking-widest shadow-[0_0_15px_rgba(188,19,254,0.4)] transition-opacity duration-1000 z-20 ${
          showBiomeNotify ? "opacity-100" : "opacity-0"
        }`}
      >
        ENTERING {biomeName}
      </div>

      {/* Start Screen */}
      {gameState === "start" && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-[#05050a]/90 backdrop-blur-sm z-30">
          <h1 className="font-['Orbitron'] text-6xl md:text-7xl uppercase text-center italic leading-none tracking-tighter bg-clip-text text-transparent bg-gradient-to-b from-white via-[#00f3ff] to-[#bc13fe] drop-shadow-[0_0_10px_rgba(0,243,255,0.5)] mb-2">
            APEX
            <br />
            SWITCHER
            <span className="font-['Rajdhani'] font-bold text-white block text-2xl tracking-[8px] mt-4 text-shadow-[0_0_10px_#bc13fe] not-italic">
              HORIZON RUN
            </span>
          </h1>

          <div className="bg-black/60 border border-[#00f3ff] p-6 rounded text-center max-w-md mx-4 shadow-[0_0_20px_rgba(0,243,255,0.1)] relative overflow-hidden mt-8">
            <div className="text-gray-300 text-lg leading-relaxed">
              <div className="mb-4">
                <strong className="text-[#00f3ff] font-['Orbitron'] block">
                  CAR MODE
                </strong>
                <span className="text-sm">Wide • Stable • Crushes Crates</span>
              </div>
              <div className="mb-6">
                <strong className="text-[#bc13fe] font-['Orbitron'] block">
                  BIKE MODE
                </strong>
                <span className="text-sm">Narrow • Fast • Weaves Traffic</span>
              </div>
              <div>
                PRESS{" "}
                <span className="bg-[#222] border border-[#555] rounded px-2 py-0.5 font-mono text-white font-bold shadow-[0_2px_0_#000]">
                  SPACE
                </span>{" "}
                TO TRANSFORM
              </div>
            </div>
          </div>

          <button
            onClick={startGame}
            className="mt-8 bg-[#00f3ff]/10 border-2 border-[#00f3ff] text-white px-12 py-4 text-2xl font-['Orbitron'] font-bold uppercase cursor-pointer transition-all hover:bg-[#00f3ff] hover:text-black hover:scale-105 hover:shadow-[0_0_40px_#00f3ff] shadow-[0_0_15px_#00f3ff]"
          >
            INITIATE RUN
          </button>
        </div>
      )}

      {/* Game Over Screen */}
      {gameState === "gameover" && (
        <div className="absolute inset-0 flex flex-col justify-center items-center bg-[#05050a]/90 backdrop-blur-sm z-30">
          <h1 className="font-['Orbitron'] text-6xl uppercase text-center italic text-[#ff3333] drop-shadow-[0_0_20px_red] mb-8">
            WIPEOUT
          </h1>

          <div className="bg-black/60 border border-[#ff3333] p-8 rounded text-center min-w-[300px] shadow-[0_0_20px_rgba(255,50,50,0.2)]">
            <div className="text-[#ff3333] font-bold tracking-wider mb-2">
              FINAL SCORE
            </div>
            <div className="font-['Orbitron'] text-6xl font-bold text-white">
              {scoreRef.current}
            </div>
          </div>

          <button
            onClick={startGame}
            className="mt-8 bg-[#ff3333]/10 border-2 border-[#ff3333] text-[#ff3333] px-12 py-4 text-2xl font-['Orbitron'] font-bold uppercase cursor-pointer transition-all hover:bg-[#ff3333] hover:text-black hover:scale-105 hover:shadow-[0_0_40px_#ff3333] shadow-[0_0_15px_#ff3333]"
          >
            RETRY
          </button>
        </div>
      )}

      {/* Mobile Controls */}
      {gameState === "playing" && (
        <>
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
          <div className="absolute bottom-5 right-5 z-50">
            <button
              className="w-20 h-20 bg-[#bc13fe]/20 backdrop-blur-md rounded-full border border-[#bc13fe]/50 text-[#bc13fe] font-bold text-sm flex items-center justify-center active:bg-[#bc13fe]/40 transition-colors shadow-[0_0_15px_rgba(188,19,254,0.3)]"
              onPointerDown={() => {
                if (!gameRef.current.keys.swapPressed) {
                  gameRef.current.keys.swap = true;
                  gameRef.current.keys.swapPressed = true;
                }
              }}
              onPointerUp={() => (gameRef.current.keys.swapPressed = false)}
              onPointerLeave={() => (gameRef.current.keys.swapPressed = false)}
            >
              SWITCH
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ApexSwitcher;
