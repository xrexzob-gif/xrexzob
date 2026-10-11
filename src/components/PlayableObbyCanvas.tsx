import React, { useEffect, useRef, useState } from 'react';
import { Play, RotateCcw, Volume2, VolumeX, Eye, Sparkles, Award } from 'lucide-react';
import { sound } from '../services/soundEffects';

interface PlayerState {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  isGrounded: boolean;
  facingAngle: number;
  walkCycle: number;
  isDead: boolean;
  deathTimer: number;
}

interface Platform {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
  color: string;
  isCheckpoint?: boolean;
  isPassed?: boolean;
  isMoving?: boolean;
  moveRange?: number;
  moveSpeed?: number;
  origX?: number;
}

interface Collectible {
  x: number;
  y: number;
  z: number;
  collected: boolean;
  spin: number;
}

interface Hazard {
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
  speed: number;
}

export const PlayableObbyCanvas: React.FC<{ onScoreUpdate?: (points: number) => void }> = ({ onScoreUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [score, setScore] = useState(0);
  const [stage, setStage] = useState(1);
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [cameraMode, setCameraMode] = useState<'isometric' | 'front'>('isometric');

  const keysPressed = useRef<{ [key: string]: boolean }>({});
  const lastCheckpoint = useRef<{ x: number; y: number; z: number }>({ x: 0, y: 0, z: 0 });

  // Game state references
  const player = useRef<PlayerState>({
    x: 0,
    y: 10,
    z: 0,
    vx: 0,
    vy: 0,
    vz: 0,
    isGrounded: false,
    facingAngle: 0,
    walkCycle: 0,
    isDead: false,
    deathTimer: 0,
  });

  const platforms = useRef<Platform[]>([
    // Spawn Island
    { x: -50, y: 0, z: -50, w: 100, h: 16, d: 100, color: '#1f242d', isCheckpoint: true, isPassed: true },
    // Step 1
    { x: -30, y: 0, z: 120, w: 60, h: 16, d: 70, color: '#00e5ff' },
    // Moving Platform
    { x: 0, y: 15, z: 250, w: 70, h: 16, d: 70, color: '#9d00ff', isMoving: true, moveRange: 120, moveSpeed: 1.5, origX: 0 },
    // Step 2
    { x: -40, y: 30, z: 380, w: 80, h: 16, d: 80, color: '#00ff88', isCheckpoint: true },
    // Narrow bridge
    { x: -20, y: 45, z: 520, w: 40, h: 16, d: 140, color: '#ff0055' },
    // Moving Platform 2
    { x: 0, y: 60, z: 720, w: 75, h: 16, d: 75, color: '#00e5ff', isMoving: true, moveRange: 140, moveSpeed: -2, origX: 0 },
    // Goal Platform
    { x: -80, y: 75, z: 880, w: 160, h: 20, d: 160, color: '#ffd700', isCheckpoint: true }
  ]);

  const collectibles = useRef<Collectible[]>([
    { x: 0, y: 25, z: 120, collected: false, spin: 0 },
    { x: 0, y: 40, z: 250, collected: false, spin: 0 },
    { x: 0, y: 55, z: 380, collected: false, spin: 0 },
    { x: 0, y: 70, z: 520, collected: false, spin: 0 },
    { x: 0, y: 70, z: 580, collected: false, spin: 0 },
    { x: 0, y: 85, z: 720, collected: false, spin: 0 },
    { x: 0, y: 110, z: 880, collected: false, spin: 0 }
  ]);

  const hazards = useRef<Hazard[]>([
    { x: -100, y: 46, z: 580, w: 200, h: 8, d: 8, speed: 2 }
  ]);

  // Key listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = true;
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const jump = () => {
    if (player.current.isGrounded && !player.current.isDead) {
      player.current.vy = 8.5;
      player.current.isGrounded = false;
      sound.playJump();
    }
  };

  const respawn = () => {
    player.current.x = lastCheckpoint.current.x;
    player.current.y = lastCheckpoint.current.y + 25;
    player.current.z = lastCheckpoint.current.z;
    player.current.vx = 0;
    player.current.vy = 0;
    player.current.vz = 0;
    player.current.isDead = false;
    player.current.deathTimer = 0;
  };

  // Main Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      const p = player.current;

      // Handle Death
      if (p.isDead) {
        p.deathTimer++;
        if (p.deathTimer > 45) {
          respawn();
        }
      } else {
        // Player input physics
        const moveSpeed = 3.6;
        let dx = 0;
        let dz = 0;

        if (keysPressed.current['w'] || keysPressed.current['arrowup']) dz += 1;
        if (keysPressed.current['s'] || keysPressed.current['arrowdown']) dz -= 1;
        if (keysPressed.current['a'] || keysPressed.current['arrowleft']) dx -= 1;
        if (keysPressed.current['d'] || keysPressed.current['arrowright']) dx += 1;

        if (dx !== 0 || dz !== 0) {
          const len = Math.hypot(dx, dz);
          p.vx = (dx / len) * moveSpeed;
          p.vz = (dz / len) * moveSpeed;
          p.facingAngle = Math.atan2(dx, dz);
          p.walkCycle += 0.2;
        } else {
          p.vx *= 0.7;
          p.vz *= 0.7;
        }

        // Gravity
        p.vy -= 0.38;

        // Apply movement
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        // Platform collisions
        p.isGrounded = false;
        const playerRadius = 10;
        const playerHeight = 26;

        // Update moving platforms
        platforms.current.forEach((plat) => {
          if (plat.isMoving && plat.origX !== undefined) {
            plat.x = plat.origX + Math.sin(tick * 0.03 * (plat.moveSpeed || 1)) * (plat.moveRange || 100);
          }

          // AABB check
          const px = p.x;
          const py = p.y;
          const pz = p.z;

          if (
            px + playerRadius > plat.x &&
            px - playerRadius < plat.x + plat.w &&
            pz + playerRadius > plat.z &&
            pz - playerRadius < plat.z + plat.d
          ) {
            // Landing on top
            if (py >= plat.y + plat.h - 8 && py + p.vy <= plat.y + plat.h + 6 && p.vy <= 0) {
              p.y = plat.y + plat.h;
              p.vy = 0;
              p.isGrounded = true;

              // Checkpoint passed
              if (plat.isCheckpoint && !plat.isPassed) {
                plat.isPassed = true;
                lastCheckpoint.current = { x: plat.x + plat.w / 2, y: plat.y + plat.h, z: plat.z + plat.d / 2 };
                sound.playSuccess();
                setStage((s) => s + 1);
              }
            }
          }
        });

        // Collectibles check
        collectibles.current.forEach((item) => {
          if (!item.collected) {
            item.spin += 0.05;
            const dist = Math.hypot(p.x - item.x, p.y - item.y, p.z - item.z);
            if (dist < 26) {
              item.collected = true;
              sound.playCoin();
              setScore((s) => {
                const newScore = s + 50;
                if (onScoreUpdate) onScoreUpdate(newScore);
                return newScore;
              });
            }
          }
        });

        // Void fall death
        if (p.y < -120 && !p.isDead) {
          p.isDead = true;
          sound.playOof();
        }
      }

      // Render 3D Canvas Scene
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background Cyber Sky with Stars & Neon Horizon
      const skyGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      skyGrad.addColorStop(0, '#0a0b10');
      skyGrad.addColorStop(0.65, '#121420');
      skyGrad.addColorStop(1, '#1b1730');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw cyber grid background lines
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.08)';
      ctx.lineWidth = 1;
      const horizonY = canvas.height * 0.7;
      for (let x = 0; x < canvas.width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      // Camera 3D projection
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 + 60;
      const camTargetX = p.x;
      const camTargetY = p.y;
      const camTargetZ = p.z;

      // Project 3D (X, Y, Z) to 2D Screen
      const project = (x: number, y: number, z: number) => {
        const relX = x - camTargetX;
        const relY = y - camTargetY;
        const relZ = z - camTargetZ;

        if (cameraMode === 'isometric') {
          // Isometric projection
          const isoAngle = Math.PI / 6; // 30 deg
          const screenX = centerX + (relX - relZ) * Math.cos(isoAngle) * 0.95;
          const screenY = centerY - relY * 0.95 + (relX + relZ) * Math.sin(isoAngle) * 0.48;
          return { x: screenX, y: screenY, depth: relX + relZ };
        } else {
          // Perspective projection
          const fov = 420;
          const depth = relZ + 450;
          const scale = depth > 10 ? fov / depth : 1;
          const screenX = centerX + relX * scale;
          const screenY = centerY - relY * scale;
          return { x: screenX, y: screenY, depth };
        }
      };

      // Draw all platforms
      platforms.current.forEach((plat) => {
        const p1 = project(plat.x, plat.y + plat.h, plat.z);
        const p2 = project(plat.x + plat.w, plat.y + plat.h, plat.z);
        const p3 = project(plat.x + plat.w, plat.y + plat.h, plat.z + plat.d);
        const p4 = project(plat.x, plat.y + plat.h, plat.z + plat.d);

        const b1 = project(plat.x, plat.y, plat.z + plat.d);
        const b2 = project(plat.x + plat.w, plat.y, plat.z + plat.d);

        // Top Face
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(p4.x, p4.y);
        ctx.closePath();
        ctx.fillStyle = plat.isPassed ? '#00ff88' : plat.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff33';
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Authentic Roblox Studs on Top Face
        const studCenter = project(plat.x + plat.w / 2, plat.y + plat.h, plat.z + plat.d / 2);
        ctx.beginPath();
        ctx.arc(studCenter.x, studCenter.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fill();

        // Front Face (thickness)
        ctx.beginPath();
        ctx.moveTo(p4.x, p4.y);
        ctx.lineTo(p3.x, p3.y);
        ctx.lineTo(b2.x, b2.y);
        ctx.lineTo(b1.x, b1.y);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0,0,0,0.45)';
        ctx.fill();
      });

      // Draw Collectible AI Cubes
      collectibles.current.forEach((item) => {
        if (!item.collected) {
          const pt = project(item.x, item.y + Math.sin(tick * 0.08) * 5, item.z);
          ctx.save();
          ctx.translate(pt.x, pt.y);
          ctx.rotate(item.spin);

          // Glowing diamond / cube
          ctx.fillStyle = '#00e5ff';
          ctx.shadowColor = '#00e5ff';
          ctx.shadowBlur = 12;
          ctx.fillRect(-8, -8, 16, 16);

          ctx.fillStyle = '#ffffff';
          ctx.fillRect(-3, -3, 6, 6);
          ctx.restore();
        }
      });

      // Draw Blocky Roblox Character
      if (!p.isDead) {
        const charBase = project(p.x, p.y, p.z);
        const swing = Math.sin(p.walkCycle) * 6;

        ctx.save();
        ctx.translate(charBase.x, charBase.y);

        // Shadow on ground
        ctx.beginPath();
        ctx.ellipse(0, 0, 14, 6, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 0, 0, 0.35)';
        ctx.fill();

        // Legs (Green Classic Blox Legs)
        ctx.fillStyle = '#107c41';
        ctx.fillRect(-8, -12 + swing, 7, 12); // Left leg
        ctx.fillRect(1, -12 - swing, 7, 12);  // Right leg

        // Torso (Classic Blue / AI Cyan Block)
        ctx.fillStyle = '#0055ff';
        ctx.fillRect(-10, -28, 20, 16);
        // AI Chest Core Logo
        ctx.fillStyle = '#00e5ff';
        ctx.fillRect(-3, -22, 6, 6);

        // Arms (Yellow Blocky Arms)
        ctx.fillStyle = '#ffc000';
        ctx.fillRect(-16, -28 - swing, 6, 14); // Left arm
        ctx.fillRect(10, -28 + swing, 6, 14);  // Right arm

        // Head (Yellow Classic Roblox Head)
        ctx.fillStyle = '#ffc000';
        ctx.fillRect(-7, -42, 14, 13);

        // Smiling Face & AI Visor
        // Visor
        ctx.fillStyle = '#00e5ff';
        ctx.fillRect(-6, -39, 12, 4);

        // Classic Smile
        ctx.strokeStyle = '#222222';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(0, -33, 3, 0, Math.PI);
        ctx.stroke();

        ctx.restore();
      } else {
        // Blox break-apart Oof effect!
        const charBase = project(p.x, p.y, p.z);
        ctx.save();
        ctx.translate(charBase.x, charBase.y);
        ctx.fillStyle = '#ff0055';
        ctx.font = 'bold 16px Fredoka';
        ctx.fillText('OOF!', -16, -20);
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [cameraMode]);

  return (
    <div className="relative w-full rounded-2xl bg-[#14161c] border border-[#262a35] overflow-hidden shadow-2xl flex flex-col">
      {/* Top Header / HUD */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-[#191b22] border-b border-[#262a35] text-sm">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-sm bg-[#00e5ff] rotate-45 animate-pulse shadow-[0_0_8px_#00e5ff]" />
          <span className="font-fredoka font-bold text-white text-base tracking-wide flex items-center gap-2">
            AI Cyber Obby 3D Sandbox
            <span className="text-xs bg-[#00e5ff]/20 text-[#00e5ff] px-2 py-0.5 rounded border border-[#00e5ff]/30 font-mono-code font-normal">
              STAGE {stage}/5
            </span>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#0e1014] px-3 py-1.5 rounded-lg border border-[#2a2e3a]">
            <Sparkles className="w-4 h-4 text-[#ffd700]" />
            <span className="text-xs text-gray-300">Data Cubes:</span>
            <span className="font-bold text-[#ffd700] font-mono-code">{score} ⚡</span>
          </div>

          <button
            onClick={() => {
              const muted = sound.toggleMute();
              setIsMuted(muted);
            }}
            className="p-1.5 rounded-lg bg-[#222631] hover:bg-[#2b303d] text-gray-300 transition-colors"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00e5ff]" />}
          </button>

          <button
            onClick={() => setCameraMode(c => c === 'isometric' ? 'front' : 'isometric')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222631] hover:bg-[#2b303d] text-xs font-medium text-gray-200 transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span>Kamera: {cameraMode === 'isometric' ? '3D Iso' : 'Perspektif'}</span>
          </button>

          <button
            onClick={respawn}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#e2231a] hover:bg-[#ff3b30] text-xs font-bold text-white transition-colors shadow-sm"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Respawn</span>
          </button>
        </div>
      </div>

      {/* Canvas Area */}
      <div className="relative w-full aspect-[16/9] min-h-[420px] max-h-[580px] bg-black">
        <canvas
          ref={canvasRef}
          width={960}
          height={540}
          className="w-full h-full object-cover block cursor-crosshair"
        />

        {/* Keyboard instructions badge */}
        <div className="absolute bottom-4 left-4 bg-[#0e1015]/85 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-[#262b36] text-xs text-gray-300 flex items-center gap-3">
          <div className="flex items-center gap-1 font-mono-code">
            <kbd className="px-1.5 py-0.5 bg-[#202530] border border-[#373e4d] rounded text-[11px] text-white">W</kbd>
            <kbd className="px-1.5 py-0.5 bg-[#202530] border border-[#373e4d] rounded text-[11px] text-white">A</kbd>
            <kbd className="px-1.5 py-0.5 bg-[#202530] border border-[#373e4d] rounded text-[11px] text-white">S</kbd>
            <kbd className="px-1.5 py-0.5 bg-[#202530] border border-[#373e4d] rounded text-[11px] text-white">D</kbd>
            <span className="text-gray-400 ml-1">Gerak</span>
          </div>
          <span className="text-gray-600">|</span>
          <div className="flex items-center gap-1 font-mono-code">
            <kbd className="px-2 py-0.5 bg-[#202530] border border-[#373e4d] rounded text-[11px] text-white">SPACE</kbd>
            <span className="text-gray-400 ml-1">Lompat (Jump)</span>
          </div>
        </div>

        {/* Mobile / Click Jump Control */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <button
            onPointerDown={jump}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#00a2ff] text-black font-fredoka font-bold text-base active:scale-95 transition-transform shadow-[0_0_15px_rgba(0,229,255,0.4)]"
          >
            LOMPAT (JUMP)
          </button>
        </div>
      </div>

      {/* Bottom Info Bar */}
      <div className="px-5 py-3 bg-[#111318] border-t border-[#222632] flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-[#00ff88]" />
          <span>Fisika Luau &amp; Voxel Engine simulasi nyata di browser. Sentuh checkpoint neon untuk menyimpan progress.</span>
        </div>
        <div className="text-gray-500 font-mono-code">
          Tick Rate: 60 FPS • Audio: WebAudio Synth
        </div>
      </div>
    </div>
  );
};
