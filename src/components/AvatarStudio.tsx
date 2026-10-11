import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  RotateCw, 
  Download, 
  Copy, 
  Check, 
  Palette, 
  Shield, 
  Zap, 
  RefreshCw,
  Code2
} from 'lucide-react';
import { BloxAvatarConfig } from '../types';
import { sound } from '../services/soundEffects';

export const AvatarStudio: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [avatarConfig, setAvatarConfig] = useState<BloxAvatarConfig>({
    headColor: '#ffd700',
    torsoColor: '#0055ff',
    leftArmColor: '#ffd700',
    rightArmColor: '#ffd700',
    leftLegColor: '#107c41',
    rightLegColor: '#107c41',
    visorType: 'cyber-visor',
    wingsType: 'cyber-wings',
    faceType: 'chill',
    shirtPattern: 'cyber-suit',
    scale: { height: 1, width: 1, depth: 1 }
  });

  const [rotationAngle, setRotationAngle] = useState(0);
  const [animMode, setAnimMode] = useState<'idle' | 'dance' | 'wave'>('idle');
  const [aiPrompt, setAiPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [copiedScript, setCopiedScript] = useState(false);

  const colorPalettes = [
    { name: 'Classic Noob', head: '#ffd700', torso: '#0055ff', limbs: '#ffd700', legs: '#107c41' },
    { name: 'Cyber Hacker', head: '#1a1a24', torso: '#00e5ff', limbs: '#0a0a10', legs: '#00e5ff' },
    { name: 'Neon Glitch', head: '#ff007f', torso: '#9d00ff', limbs: '#00ffcc', legs: '#111116' },
    { name: 'Matrix Operator', head: '#00ff88', torso: '#0b1912', limbs: '#00ff88', legs: '#0b1912' },
    { name: 'Quantum Void', head: '#ffffff', torso: '#222634', limbs: '#3b82f6', legs: '#1e293b' },
  ];

  // 3D Blocky Avatar Canvas Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + 30;

      // Draw futuristic pedestal
      ctx.save();
      ctx.translate(cx, cy + 90);
      
      const pedGrad = ctx.createRadialGradient(0, 0, 10, 0, 0, 95);
      pedGrad.addColorStop(0, '#00e5ff33');
      pedGrad.addColorStop(0.8, '#00e5ff05');
      pedGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = pedGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, 95, 32, 0, 0, Math.PI * 2);
      ctx.fill();

      // Pedestal ring
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, 0, 75, 25, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.restore();

      // Avatar Animation logic
      let bob = Math.sin(tick * 0.05) * 4;
      let armAngleL = 0;
      let armAngleR = 0;
      let legAngleL = 0;
      let legAngleR = 0;

      if (animMode === 'dance') {
        bob = Math.sin(tick * 0.15) * 8;
        armAngleL = Math.sin(tick * 0.15) * 0.8;
        armAngleR = -Math.sin(tick * 0.15) * 0.8;
      } else if (animMode === 'wave') {
        armAngleR = -2.2 + Math.sin(tick * 0.25) * 0.4;
      }

      ctx.save();
      ctx.translate(cx, cy + bob);
      ctx.rotate((rotationAngle * Math.PI) / 180);

      // Wings (Back)
      if (avatarConfig.wingsType === 'cyber-wings') {
        ctx.fillStyle = '#00e5ff';
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 15;
        // Left Wing
        ctx.beginPath();
        ctx.moveTo(-16, -30);
        ctx.lineTo(-75, -80 + Math.sin(tick * 0.1) * 6);
        ctx.lineTo(-60, -20);
        ctx.closePath();
        ctx.fill();
        // Right Wing
        ctx.beginPath();
        ctx.moveTo(16, -30);
        ctx.lineTo(75, -80 + Math.sin(tick * 0.1) * 6);
        ctx.lineTo(60, -20);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Left Leg
      ctx.fillStyle = avatarConfig.leftLegColor;
      ctx.fillRect(-22, 10, 18, 55);

      // Right Leg
      ctx.fillStyle = avatarConfig.rightLegColor;
      ctx.fillRect(4, 10, 18, 55);

      // Torso
      ctx.fillStyle = avatarConfig.torsoColor;
      ctx.fillRect(-26, -45, 52, 55);

      // Torso AI Decal
      ctx.fillStyle = '#00e5ff';
      ctx.fillRect(-6, -25, 12, 12);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(-2, -21, 4, 4);

      // Left Arm
      ctx.save();
      ctx.translate(-26, -42);
      ctx.rotate(armAngleL);
      ctx.fillStyle = avatarConfig.leftArmColor;
      ctx.fillRect(-18, 0, 18, 50);
      ctx.restore();

      // Right Arm
      ctx.save();
      ctx.translate(26, -42);
      ctx.rotate(armAngleR);
      ctx.fillStyle = avatarConfig.rightArmColor;
      ctx.fillRect(0, 0, 18, 50);
      ctx.restore();

      // Head
      ctx.fillStyle = avatarConfig.headColor;
      ctx.fillRect(-18, -85, 36, 36);

      // Face Visor / Accessories
      if (avatarConfig.visorType === 'cyber-visor') {
        ctx.fillStyle = '#00e5ff';
        ctx.shadowColor = '#00e5ff';
        ctx.shadowBlur = 10;
        ctx.fillRect(-16, -74, 32, 10);
        ctx.shadowBlur = 0;
      } else if (avatarConfig.visorType === 'hologram-halo') {
        ctx.strokeStyle = '#ffd700';
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 12;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.ellipse(0, -96, 24, 7, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.shadowBlur = 0;
      } else if (avatarConfig.visorType === 'mecha-horns') {
        ctx.fillStyle = '#ff0055';
        ctx.beginPath();
        ctx.moveTo(-16, -85);
        ctx.lineTo(-24, -105);
        ctx.lineTo(-10, -85);
        ctx.moveTo(16, -85);
        ctx.lineTo(24, -105);
        ctx.lineTo(10, -85);
        ctx.fill();
      }

      // Classic Chill Smile
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -60, 6, 0.2, Math.PI - 0.2);
      ctx.stroke();

      ctx.restore();

      animId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animId);
  }, [avatarConfig, rotationAngle, animMode]);

  const handleAiGenerateAvatar = () => {
    if (!aiPrompt.trim()) return;
    setIsAiLoading(true);
    sound.playClick();

    setTimeout(() => {
      const p = aiPrompt.toLowerCase();
      let newConfig = { ...avatarConfig };

      if (p.includes('glitch') || p.includes('purple') || p.includes('ungu')) {
        newConfig = {
          ...newConfig,
          headColor: '#9d00ff',
          torsoColor: '#120024',
          leftArmColor: '#00ffcc',
          rightArmColor: '#00ffcc',
          leftLegColor: '#120024',
          rightLegColor: '#120024',
          visorType: 'cyber-visor',
          wingsType: 'cyber-wings'
        };
      } else if (p.includes('hacker') || p.includes('matrix') || p.includes('hijau')) {
        newConfig = {
          ...newConfig,
          headColor: '#00ff88',
          torsoColor: '#0c1a14',
          leftArmColor: '#00ff88',
          rightArmColor: '#00ff88',
          leftLegColor: '#0c1a14',
          rightLegColor: '#0c1a14',
          visorType: 'cyber-visor',
          wingsType: 'matrix-cape'
        };
      } else {
        newConfig = {
          ...newConfig,
          headColor: '#ffd700',
          torsoColor: '#00e5ff',
          leftArmColor: '#ffd700',
          rightArmColor: '#ffd700',
          leftLegColor: '#107c41',
          rightLegColor: '#107c41',
          visorType: 'cyber-visor',
          wingsType: 'cyber-wings'
        };
      }

      setAvatarConfig(newConfig);
      setIsAiLoading(false);
      sound.playSuccess();
    }, 700);
  };

  const copyLuauLoadout = () => {
    const script = `--!strict
-- ServerScriptService/AvatarLoader.server.luau
-- Author: Roblox AI Nexus Avatar Studio
local Players = game:GetService("Players")

local function applyAiAvatar(character: Model)
    local head = character:FindFirstChild("Head") :: BasePart?
    local torso = character:FindFirstChild("Torso") :: BasePart? or character:FindFirstChild("UpperTorso") :: BasePart?

    if head then head.Color = Color3.fromHex("${avatarConfig.headColor}") end
    if torso then torso.Color = Color3.fromHex("${avatarConfig.torsoColor}") end

    print("[BloxAI]: Applied custom AI Avatar loadout for " .. character.Name)
end

Players.PlayerAdded:Connect(function(player)
    player.CharacterAdded:Connect(applyAiAvatar)
end)`;

    navigator.clipboard.writeText(script);
    setCopiedScript(true);
    sound.playClick();
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* 3D Avatar Viewport */}
      <div className="lg:col-span-6 bg-[#14161c] rounded-2xl border border-[#262a35] p-5 flex flex-col justify-between shadow-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="font-fredoka text-lg font-bold text-white">Avatar 3D Preview</span>
            <span className="text-xs bg-[#00e5ff]/15 text-[#00e5ff] px-2 py-0.5 rounded font-mono-code">R6 Classic Blox</span>
          </div>

          <div className="flex items-center gap-1.5">
            {(['idle', 'wave', 'dance'] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setAnimMode(mode);
                  sound.playClick();
                }}
                className={`text-xs px-2.5 py-1 rounded-lg capitalize font-medium transition-colors ${
                  animMode === mode
                    ? 'bg-[#00e5ff] text-black font-bold'
                    : 'bg-[#20242e] text-gray-400 hover:text-white'
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Canvas Display */}
        <div className="relative w-full aspect-square bg-[#0b0c10] rounded-xl overflow-hidden border border-[#20242e] flex items-center justify-center">
          <canvas
            ref={canvasRef}
            width={440}
            height={440}
            className="w-full h-full object-contain"
          />

          {/* Rotation Slider Control */}
          <div className="absolute bottom-3 left-4 right-4 bg-[#14161c]/80 backdrop-blur-md px-3 py-2 rounded-xl border border-[#262a35] flex items-center gap-3">
            <RotateCw className="w-4 h-4 text-[#00e5ff] shrink-0" />
            <input
              type="range"
              min="-180"
              max="180"
              value={rotationAngle}
              onChange={(e) => setRotationAngle(Number(e.target.value))}
              className="w-full accent-[#00e5ff] cursor-pointer"
            />
            <span className="text-[11px] font-mono-code text-gray-400 w-10 text-right">{rotationAngle}°</span>
          </div>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={copyLuauLoadout}
            className="flex-1 py-2.5 rounded-xl bg-[#20242e] hover:bg-[#282e3c] text-white font-fredoka font-bold text-xs flex items-center justify-center gap-2 border border-[#323847] transition-colors"
          >
            {copiedScript ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Code2 className="w-3.5 h-3.5 text-[#00e5ff]" />}
            <span>{copiedScript ? 'Tersalin!' : 'Salin Luau Avatar Script'}</span>
          </button>
        </div>
      </div>

      {/* Customizer Controls Right */}
      <div className="lg:col-span-6 flex flex-col gap-4">
        {/* AI Prompt Avatar Generator */}
        <div className="bg-[#14161c] rounded-2xl border border-[#262a35] p-5 shadow-xl">
          <div className="flex items-center gap-2 mb-2 font-fredoka text-base font-bold text-white">
            <Sparkles className="w-4 h-4 text-[#00e5ff]" />
            <span>AI Avatar Stylist</span>
          </div>
          <p className="text-xs text-gray-400 mb-3">
            Ketik gaya avatar yang kamu inginkan (misal: "Cyborg hacker mecha serba neon ungu dan sayap cyber").
          </p>

          <div className="flex gap-2">
            <input
              type="text"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAiGenerateAvatar()}
              placeholder="Gaya avatar impian..."
              className="flex-1 bg-[#0e1014] border border-[#2a2e3a] focus:border-[#00e5ff] rounded-xl px-3 py-2 text-xs text-white placeholder-gray-500 focus:outline-none"
            />
            <button
              onClick={handleAiGenerateAvatar}
              disabled={isAiLoading || !aiPrompt.trim()}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#0088ff] text-black font-fredoka font-bold text-xs flex items-center gap-1.5 disabled:opacity-50"
            >
              {isAiLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Zap className="w-3.5 h-3.5" />}
              <span>Generate</span>
            </button>
          </div>
        </div>

        {/* Color Presets */}
        <div className="bg-[#14161c] rounded-2xl border border-[#262a35] p-5 shadow-xl">
          <div className="font-fredoka text-base font-bold text-white mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4 text-[#00ff88]" />
            <span>Preset Warna Blox</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {colorPalettes.map((cp, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setAvatarConfig(prev => ({
                    ...prev,
                    headColor: cp.head,
                    torsoColor: cp.torso,
                    leftArmColor: cp.limbs,
                    rightArmColor: cp.limbs,
                    leftLegColor: cp.legs,
                    rightLegColor: cp.legs,
                  }));
                  sound.playClick();
                }}
                className="p-2.5 rounded-xl bg-[#191b22] hover:bg-[#20232e] border border-[#262a35] text-left transition-colors"
              >
                <div className="text-xs font-semibold text-gray-200 mb-1.5">{cp.name}</div>
                <div className="flex items-center gap-1">
                  <span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: cp.head }} />
                  <span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: cp.torso }} />
                  <span className="w-3.5 h-3.5 rounded-sm" style={{ backgroundColor: cp.legs }} />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Cyber Accessories Selector */}
        <div className="bg-[#14161c] rounded-2xl border border-[#262a35] p-5 shadow-xl">
          <div className="font-fredoka text-base font-bold text-white mb-3 flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#ffd700]" />
            <span>Aksesoris AI &amp; Sayap</span>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-xs text-gray-400 block mb-1.5 font-medium">Headwear / Visor:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'cyber-visor', label: '⚡ Cyber Visor' },
                  { id: 'hologram-halo', label: '✨ Halo Emas' },
                  { id: 'mecha-horns', label: '😈 Tanduk Mecha' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setAvatarConfig(prev => ({ ...prev, visorType: item.id as any }));
                      sound.playClick();
                    }}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      avatarConfig.visorType === item.id
                        ? 'bg-[#00e5ff]/20 text-[#00e5ff] border-[#00e5ff]'
                        : 'bg-[#191b22] text-gray-400 border-[#262a35] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs text-gray-400 block mb-1.5 font-medium">Sayap / Back Item:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'none', label: 'None' },
                  { id: 'cyber-wings', label: '🦋 Cyber Wings' },
                  { id: 'plasma-jetpack', label: '🚀 Jetpack' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setAvatarConfig(prev => ({ ...prev, wingsType: item.id as any }));
                      sound.playClick();
                    }}
                    className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                      avatarConfig.wingsType === item.id
                        ? 'bg-[#00ff88]/20 text-[#00ff88] border-[#00ff88]'
                        : 'bg-[#191b22] text-gray-400 border-[#262a35] hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
