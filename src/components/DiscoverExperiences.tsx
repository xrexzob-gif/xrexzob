import React, { useState } from 'react';
import { 
  Flame, 
  Users, 
  ThumbsUp, 
  Play, 
  Sparkles, 
  Award, 
  ShoppingBag, 
  Compass, 
  Filter,
  X,
  ExternalLink,
  Zap,
  Globe
} from 'lucide-react';
import { POPULAR_GAMES } from '../data/mockRobloxData';
import { RobloxGame } from '../types';
import { sound } from '../services/soundEffects';

interface DiscoverProps {
  onPlayGame: (game: RobloxGame) => void;
  onOpenGameGenerator: () => void;
}

export const DiscoverExperiences: React.FC<DiscoverProps> = ({ onPlayGame, onOpenGameGenerator }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedGame, setSelectedGame] = useState<RobloxGame | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'AI Sci-Fi', 'Neural Obby', 'Cyber RPG', 'Simulation', 'Combat Arena'];

  const filteredGames = POPULAR_GAMES.filter(game => {
    const matchesCategory = activeCategory === 'All' || game.genre === activeCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          game.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          game.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Hero Banner / Highlight */}
      <div className="relative rounded-3xl overflow-hidden border border-[#2a2e3a] bg-gradient-to-r from-[#12141c] via-[#1a1c26] to-[#0e1017] p-7 shadow-2xl roblox-cyber-grid">
        <div className="relative z-10 max-w-2xl">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-2.5 py-1 rounded-md bg-[#00e5ff]/20 text-[#00e5ff] text-xs font-mono-code font-bold border border-[#00e5ff]/30 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              FEATURED AI ROBLOX UNIVERSE
            </span>
            <span className="text-xs text-gray-400 font-mono-code">v4.8 HD Studio</span>
          </div>

          <h1 className="font-fredoka text-3xl sm:text-4xl font-extrabold text-white tracking-wide leading-tight mb-3">
            CyberBlox 2099: Inti AI Neural
          </h1>

          <p className="text-sm text-gray-300 leading-relaxed mb-6 font-normal">
            Jelajahi megacity voxel tanpa batas yang digerakkan oleh AI otonom. Bertarung dengan cyber-katana neon, selesaikan 500 stage neural obby, dan kembangkan modul Luau kamu sendiri!
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                sound.playClick();
                onPlayGame(POPULAR_GAMES[0]);
              }}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00b359] text-black font-fredoka font-bold text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,255,136,0.35)] hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>MAIN SEKARANG (PLAY TEST)</span>
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onOpenGameGenerator();
              }}
              className="px-5 py-3 rounded-xl bg-[#20242e] hover:bg-[#282d3a] text-white font-fredoka font-bold text-sm border border-[#343a49] flex items-center gap-2 transition-all active:scale-95"
            >
              <Zap className="w-4 h-4 text-[#00e5ff]" />
              <span>AI Game Blueprint Generator</span>
            </button>
          </div>
        </div>

        {/* Ambient neon decorative background */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-25 pointer-events-none bg-gradient-to-l from-[#00e5ff] via-transparent to-transparent" />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                sound.playClick();
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-[#00e5ff] text-black shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                  : 'bg-[#181a22] text-gray-400 hover:text-white hover:bg-[#20232e] border border-[#252833]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search input */}
        <div className="w-full md:w-64">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari pengalaman AI..."
            className="w-full bg-[#14161c] border border-[#262a35] focus:border-[#00e5ff] rounded-xl px-3.5 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Games Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredGames.map((game) => (
          <div
            key={game.id}
            onClick={() => {
              setSelectedGame(game);
              sound.playClick();
            }}
            className="group bg-[#14161c] hover:bg-[#1a1d25] rounded-2xl border border-[#262a35] hover:border-[#00e5ff]/50 overflow-hidden cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-lg hover:shadow-[0_8px_30px_rgba(0,229,255,0.15)] flex flex-col"
          >
            {/* Visual Thumbnail */}
            <div className="relative aspect-[16/9] w-full bg-[#0d0e13] overflow-hidden flex items-center justify-center">
              {/* Dynamic decorative backdrop according to game */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#121622] via-[#1c2233] to-[#0c0d12]" />
              
              {/* Blox game title art inside thumbnail */}
              <div className="relative z-10 text-center px-4">
                <div className="w-12 h-12 mx-auto mb-2 rounded-xl bg-gradient-to-tr from-[#00e5ff] to-[#00ff88] flex items-center justify-center shadow-lg">
                  {game.genre === 'Neural Obby' ? (
                    <span className="text-2xl">🏃</span>
                  ) : game.genre === 'Simulation' ? (
                    <span className="text-2xl">🐾</span>
                  ) : game.genre === 'Combat Arena' ? (
                    <span className="text-2xl">⚔️</span>
                  ) : (
                    <span className="text-2xl">⚡</span>
                  )}
                </div>
                <div className="font-fredoka text-base font-bold text-white group-hover:text-[#00e5ff] transition-colors line-clamp-1">
                  {game.title}
                </div>
                <div className="text-[11px] text-gray-400 font-mono-code">{game.developer}</div>
              </div>

              {/* Live Active Players Chip */}
              <div className="absolute top-3 left-3 bg-[#0a0c10]/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-[#252a36] text-[11px] font-mono-code text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#00ff88] animate-ping" />
                <span>{game.activePlayers.toLocaleString()} Aktif</span>
              </div>

              {/* Upvote score */}
              <div className="absolute top-3 right-3 bg-[#0a0c10]/80 backdrop-blur-md px-2 py-1 rounded-lg border border-[#252a36] text-[11px] font-mono-code text-[#00e5ff] flex items-center gap-1">
                <ThumbsUp className="w-3 h-3" />
                <span>{game.upvotePercentage}%</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-3">
                  {game.tagline}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {game.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#1f232d] text-gray-300 font-mono-code"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#222632] text-xs">
                <span className="text-gray-500 font-mono-code">{game.totalVisits} Kunjungan</span>
                <span className="font-fredoka font-bold text-[#00e5ff] group-hover:underline flex items-center gap-1">
                  Detail &amp; Main →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Game Detail Modal */}
      {selectedGame && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14161c] border border-[#2a2e3a] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="relative p-6 border-b border-[#262a35] bg-[#191b22]">
              <button
                onClick={() => setSelectedGame(null)}
                className="absolute top-5 right-5 p-2 rounded-xl bg-[#252935] hover:bg-[#303544] text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <span className="px-2 py-0.5 rounded text-[11px] font-mono-code bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30">
                  {selectedGame.genre}
                </span>
                <span className="text-xs text-gray-400 font-mono-code flex items-center gap-1">
                  <Globe className="w-3 h-3 text-[#00ff88]" />
                  {selectedGame.serverRegion}
                </span>
              </div>

              <h2 className="font-fredoka text-2xl font-bold text-white mb-1">
                {selectedGame.title}
              </h2>
              <div className="text-xs text-gray-400 font-mono-code">
                Dibuat oleh <span className="text-[#00e5ff] font-bold">{selectedGame.developer}</span>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5 text-sm">
              <p className="text-gray-300 leading-relaxed">
                {selectedGame.description}
              </p>

              {/* Stats overview */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-[#0e1014] border border-[#262a35] text-center">
                  <div className="text-xs text-gray-400">Pemain Aktif</div>
                  <div className="font-bold text-[#00ff88] font-mono-code mt-0.5">
                    {selectedGame.activePlayers.toLocaleString()}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#0e1014] border border-[#262a35] text-center">
                  <div className="text-xs text-gray-400">Total Kunjungan</div>
                  <div className="font-bold text-white font-mono-code mt-0.5">
                    {selectedGame.totalVisits}
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-[#0e1014] border border-[#262a35] text-center">
                  <div className="text-xs text-gray-400">Rating</div>
                  <div className="font-bold text-[#ffd700] font-mono-code mt-0.5">
                    {selectedGame.upvotePercentage}% Suka
                  </div>
                </div>
              </div>

              {/* Badges showcase */}
              <div>
                <h3 className="font-fredoka text-base font-bold text-white mb-2.5 flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#ffd700]" />
                  Badge Roblox ({selectedGame.badges.length})
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedGame.badges.map((b) => (
                    <div key={b.id} className="p-2.5 rounded-xl bg-[#0e1014] border border-[#262a35] flex items-center gap-2.5">
                      <span className="text-xl">{b.icon}</span>
                      <div className="truncate">
                        <div className="font-semibold text-xs text-white truncate">{b.name}</div>
                        <div className="text-[10px] text-gray-400 truncate">{b.description}</div>
                        <div className="text-[9px] text-[#00e5ff] font-mono-code">{b.rarity}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Gamepasses Shop */}
              <div>
                <h3 className="font-fredoka text-base font-bold text-white mb-2.5 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#00ff88]" />
                  Gamepass Toko
                </h3>
                <div className="space-y-2">
                  {selectedGame.gamepasses.map((gp) => (
                    <div key={gp.id} className="p-2.5 rounded-xl bg-[#0e1014] border border-[#262a35] flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">{gp.icon}</span>
                        <div>
                          <div className="font-semibold text-xs text-white">{gp.name}</div>
                          <div className="text-[10px] text-gray-400">{gp.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 font-mono-code font-bold text-xs text-[#00ff88] bg-[#00ff88]/10 px-2.5 py-1 rounded-lg border border-[#00ff88]/20">
                        <span>R$</span>
                        <span>{gp.price}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer / Play Action */}
            <div className="p-5 border-t border-[#262a35] bg-[#191b22] flex items-center justify-end gap-3">
              <button
                onClick={() => setSelectedGame(null)}
                className="px-4 py-2.5 rounded-xl bg-[#252935] hover:bg-[#303544] text-xs font-semibold text-gray-300"
              >
                Tutup
              </button>

              <button
                onClick={() => {
                  const g = selectedGame;
                  setSelectedGame(null);
                  sound.playClick();
                  onPlayGame(g);
                }}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00b359] text-black font-fredoka font-bold text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(0,255,136,0.3)] hover:scale-105 active:scale-95 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>MULAI PETUALANGAN (PLAY)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
