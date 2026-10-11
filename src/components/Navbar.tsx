import React from 'react';
import { 
  Compass, 
  Gamepad2, 
  Code2, 
  Github, 
  User, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Plus,
  Coins,
  Bot
} from 'lucide-react';
import { sound } from '../services/soundEffects';

interface NavbarProps {
  activeTab: 'discover' | 'playtest' | 'studio' | 'github' | 'avatar' | 'npc';
  setActiveTab: (tab: 'discover' | 'playtest' | 'studio' | 'github' | 'avatar' | 'npc') => void;
  robuxBalance: number;
  neuronBalance: number;
  onAddRobux: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

interface NavTabItem {
  id: 'discover' | 'playtest' | 'studio' | 'github' | 'avatar' | 'npc';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
  badge?: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  robuxBalance,
  neuronBalance,
  onAddRobux,
  isMuted,
  onToggleMute
}) => {
  const navTabs: NavTabItem[] = [
    { id: 'discover', label: 'Discover', icon: Compass },
    { id: 'playtest', label: 'Play Test (3D)', icon: Gamepad2, highlight: true },
    { id: 'studio', label: 'Studio AI', icon: Code2 },
    { id: 'github', label: 'GitHub Rojo Hub', icon: Github, badge: 'Rojo 7' },
    { id: 'avatar', label: 'Avatar Studio', icon: User },
    { id: 'npc', label: 'AI NPC Brain', icon: Bot },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#111317]/95 backdrop-blur-md border-b border-[#222632] px-4 lg:px-8 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Logo: Iconic Roblox Voxel Tilt with AI Neon */}
        <div 
          onClick={() => {
            setActiveTab('discover');
            sound.playClick();
          }}
          className="flex items-center gap-3 cursor-pointer group shrink-0"
        >
          {/* Authentic tilted Roblox cube with hollow center and neon AI border */}
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1e2330] to-[#0d0f15] border-2 border-[#00e5ff] rotate-12 group-hover:rotate-45 transition-transform duration-300 shadow-[0_0_15px_rgba(0,229,255,0.4)] flex items-center justify-center">
              {/* Hollow square center like Roblox classic logo */}
              <div className="w-3 h-3 bg-[#00e5ff] rounded-sm -rotate-12 group-hover:-rotate-45 transition-transform duration-300 shadow-[0_0_8px_#00e5ff]" />
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="font-fredoka text-xl font-extrabold tracking-wider text-white">
                ROBLOX
              </span>
              <span className="font-fredoka text-xl font-extrabold text-[#00e5ff] drop-shadow-[0_0_8px_rgba(0,229,255,0.5)]">
                AI NEXUS
              </span>
            </div>
            <span className="text-[10px] text-gray-400 font-mono-code -mt-1 tracking-tight">
              GITHUB &amp; ROJO DEV UNIVERSE
            </span>
          </div>
        </div>

        {/* Center Nav Navigation */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[#171a22] p-1 rounded-2xl border border-[#252936]">
          {navTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  sound.playClick();
                }}
                className={`relative px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-[#00e5ff] text-black shadow-[0_0_14px_rgba(0,229,255,0.35)]'
                    : 'text-gray-400 hover:text-white hover:bg-[#202430]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-black' : tab.highlight ? 'text-[#00ff88]' : ''}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[9px] px-1 py-0.2 rounded font-mono-code ${
                    isActive ? 'bg-black/20 text-black' : 'bg-[#222838] text-[#00e5ff]'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Right User Bar: Robux + Neurons + Audio + Profile */}
        <div className="flex items-center gap-3">
          {/* Robux Balance Pill */}
          <button
            onClick={onAddRobux}
            title="Klik untuk top-up Robux gratis"
            className="flex items-center gap-1.5 bg-[#181b24] hover:bg-[#202430] border border-[#2a2f3d] px-3 py-1.5 rounded-xl text-xs transition-colors group"
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-tr from-[#107c41] to-[#00ff88] flex items-center justify-center font-bold text-[10px] text-black">
              R$
            </div>
            <span className="font-mono-code font-bold text-white text-xs group-hover:text-[#00ff88] transition-colors">
              {robuxBalance.toLocaleString()}
            </span>
            <Plus className="w-3 h-3 text-gray-500 group-hover:text-white ml-0.5" />
          </button>

          {/* AI Neurons Pill */}
          <div className="hidden sm:flex items-center gap-1.5 bg-[#181b24] border border-[#2a2f3d] px-3 py-1.5 rounded-xl text-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#00e5ff]" />
            <span className="font-mono-code font-bold text-[#00e5ff] text-xs">
              {neuronBalance.toLocaleString()} ⚡
            </span>
          </div>

          {/* Audio toggle */}
          <button
            onClick={onToggleMute}
            className="p-2 rounded-xl bg-[#181b24] hover:bg-[#202430] text-gray-400 hover:text-white border border-[#2a2f3d] transition-colors"
            title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-[#00e5ff]" />}
          </button>

          {/* User GitHub Profile Avatar */}
          <div 
            onClick={() => setActiveTab('avatar')}
            className="flex items-center gap-2 cursor-pointer p-1 rounded-xl hover:bg-[#181b24] transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#0055ff] to-[#00e5ff] border border-[#3b82f6] flex items-center justify-center font-fredoka font-bold text-black text-xs shadow-md">
              AI
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Nav Tabs */}
      <div className="flex md:hidden items-center gap-1 overflow-x-auto pt-2.5 pb-0.5 border-t border-[#1e222d] mt-2">
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                sound.playClick();
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap flex items-center gap-1.5 ${
                isActive ? 'bg-[#00e5ff] text-black font-bold' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </header>
  );
};
