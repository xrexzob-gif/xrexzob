import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { DiscoverExperiences } from './components/DiscoverExperiences';
import { PlayableObbyCanvas } from './components/PlayableObbyCanvas';
import { LuauStudioCopilot } from './components/LuauStudioCopilot';
import { GitHubRojoHub } from './components/GitHubRojoHub';
import { AvatarStudio } from './components/AvatarStudio';
import { NpcDialogueArchitect } from './components/NpcDialogueArchitect';
import { GameGeneratorModal } from './components/GameGeneratorModal';
import { sound } from './services/soundEffects';
import { RobloxGame } from './types';
import { GitBranch, Heart, Sparkles, Terminal, Shield, Award } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'discover' | 'playtest' | 'studio' | 'github' | 'avatar' | 'npc'>('discover');
  const [robuxBalance, setRobuxBalance] = useState(15400);
  const [neuronBalance, setNeuronBalance] = useState(8920);
  const [isMuted, setIsMuted] = useState(sound.isMuted);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);
  const [exportedFileForGit, setExportedFileForGit] = useState<{ path: string; content: string } | null>(null);

  const handleAddRobux = () => {
    sound.playCoin();
    setRobuxBalance((r) => r + 1000);
  };

  const handleToggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  const handlePlayGame = (game: RobloxGame) => {
    sound.playClick();
    setActiveTab('playtest');
  };

  const handleExportToGitHub = (code: string, fileName: string) => {
    setExportedFileForGit({ path: fileName, content: code });
    sound.playSuccess();
    setActiveTab('github');
  };

  const handleScoreUpdate = (points: number) => {
    setNeuronBalance((n) => n + 50);
  };

  return (
    <div className="min-h-screen bg-[#0d0f14] text-[#e6e8eb] flex flex-col roblox-studs-pattern selection:bg-[#00e5ff] selection:text-black">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        robuxBalance={robuxBalance}
        neuronBalance={neuronBalance}
        onAddRobux={handleAddRobux}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 lg:px-8 py-6">
        {activeTab === 'discover' && (
          <DiscoverExperiences
            onPlayGame={handlePlayGame}
            onOpenGameGenerator={() => setIsGameModalOpen(true)}
          />
        )}

        {activeTab === 'playtest' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-fredoka text-2xl font-bold text-white flex items-center gap-2">
                  Roblox Play Test Sandbox
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#00ff88]/20 text-[#00ff88] border border-[#00ff88]/30 font-mono-code font-normal">
                    Interactive 3D Engine
                  </span>
                </h1>
                <p className="text-xs text-gray-400">
                  Uji coba mekanik obby, lompatan, physics voxel, dan kumpulkan AI Data Cubes langsung di browser!
                </p>
              </div>

              <button
                onClick={() => setActiveTab('studio')}
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#191b22] hover:bg-[#20242e] border border-[#2a2e3a] text-xs font-semibold text-gray-200 transition-colors"
              >
                <Terminal className="w-4 h-4 text-[#00e5ff]" />
                <span>Buka Luau Code di Studio</span>
              </button>
            </div>

            <PlayableObbyCanvas onScoreUpdate={handleScoreUpdate} />
          </div>
        )}

        {activeTab === 'studio' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-fredoka text-2xl font-bold text-white flex items-center gap-2">
                  Roblox Studio AI &amp; Luau Copilot
                </h1>
                <p className="text-xs text-gray-400">
                  Tulis, generate dengan Gemini AI, dan uji script Roblox Luau modern dengan strict typing.
                </p>
              </div>
            </div>

            <LuauStudioCopilot onExportToGitHub={handleExportToGitHub} />
          </div>
        )}

        {activeTab === 'github' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-fredoka text-2xl font-bold text-white flex items-center gap-2">
                  GitHub &amp; Rojo Developer Hub
                </h1>
                <p className="text-xs text-gray-400">
                  Kelola repository GitHub untuk proyek Roblox, Rojo 7.x, Aftman, Wally, dan GitHub Actions CI/CD.
                </p>
              </div>
            </div>

            <GitHubRojoHub exportedFile={exportedFileForGit} />
          </div>
        )}

        {activeTab === 'avatar' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-fredoka text-2xl font-bold text-white flex items-center gap-2">
                  Roblox Avatar Studio AI
                </h1>
                <p className="text-xs text-gray-400">
                  Kustomisasi avatar 3D Blox, rancang kostum cyber cyberpunk, dan ekspor loadout Luau untuk Studio.
                </p>
              </div>
            </div>

            <AvatarStudio />
          </div>
        )}

        {activeTab === 'npc' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="font-fredoka text-2xl font-bold text-white flex items-center gap-2">
                  AI NPC &amp; Quest Architect
                </h1>
                <p className="text-xs text-gray-400">
                  Rancang karakter NPC cerdas dengan pohon dialog percakapan dan modul quest Roblox Luau.
                </p>
              </div>
            </div>

            <NpcDialogueArchitect />
          </div>
        )}
      </main>

      {/* Global Experience Blueprint Modal */}
      <GameGeneratorModal
        isOpen={isGameModalOpen}
        onClose={() => setIsGameModalOpen(false)}
      />

      {/* Footer */}
      <footer className="mt-12 border-t border-[#1e222d] bg-[#0c0d12] py-8 px-4 lg:px-8 text-xs text-gray-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-[#00e5ff] rotate-12 flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-xs" />
            </div>
            <div>
              <span className="font-fredoka font-bold text-white text-sm">Roblox AI Nexus</span>
              <span className="text-gray-500 ml-2">© 2026 Developer Edition • Didukung GitHub &amp; Rojo</span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-gray-400 font-mono-code">
            <button onClick={() => setActiveTab('studio')} className="hover:text-[#00e5ff] transition-colors">
              Luau Studio
            </button>
            <button onClick={() => setActiveTab('github')} className="hover:text-[#00e5ff] transition-colors">
              GitHub Rojo Sync
            </button>
            <button onClick={() => setActiveTab('playtest')} className="hover:text-[#00e5ff] transition-colors">
              3D Obby Sandbox
            </button>
            <button onClick={() => setActiveTab('avatar')} className="hover:text-[#00e5ff] transition-colors">
              Avatar Studio
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
