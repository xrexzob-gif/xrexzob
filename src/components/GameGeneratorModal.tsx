import React, { useState } from 'react';
import { Sparkles, X, Zap, RefreshCw, Copy, Check, Gamepad2, Award, DollarSign } from 'lucide-react';
import { sound } from '../services/soundEffects';

interface GameGeneratorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GameGeneratorModal: React.FC<GameGeneratorModalProps> = ({ isOpen, onClose }) => {
  const [genre, setGenre] = useState('AI Cyberpunk RPG');
  const [mechanics, setMechanics] = useState('Pet Companion, Dynamic Laser Obby & Base Building');
  const [targetAudience, setTargetAudience] = useState('All Ages (Roblox Mainstream)');
  const [isLoading, setIsLoading] = useState(false);
  const [gameDoc, setGameDoc] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setIsLoading(true);
    sound.playClick();

    try {
      const res = await fetch('/api/ai/generate-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ genre, mechanics, targetAudience })
      });
      const data = await res.json();
      if (data && data.game) {
        setGameDoc(data.game);
        sound.playSuccess();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const copyBlueprint = () => {
    if (!gameDoc) return;
    navigator.clipboard.writeText(JSON.stringify(gameDoc, null, 2));
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#14161c] border border-[#2a2e3a] rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#262a35] bg-[#191b22]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-[#00e5ff]/20 text-[#00e5ff] border border-[#00e5ff]/30">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-fredoka text-xl font-bold text-white">Roblox AI Game Blueprint Generator</h2>
              <p className="text-xs text-gray-400">Rancang konsep game Roblox trending lengkap dengan model monetisasi &amp; Luau script</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#252935] hover:bg-[#303544] text-gray-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Inputs */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-400 block mb-1">Genre Roblox:</label>
              <input
                type="text"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="w-full bg-[#0e1014] border border-[#2a2e3a] focus:border-[#00e5ff] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs text-gray-400 block mb-1">Mekanik Utama Game:</label>
              <input
                type="text"
                value={mechanics}
                onChange={(e) => setMechanics(e.target.value)}
                className="w-full bg-[#0e1014] border border-[#2a2e3a] focus:border-[#00e5ff] rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#0088ff] text-black font-fredoka font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.3)] disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Merancang Game AI Blueprint...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Blueprint Pengalaman Game</span>
              </>
            )}
          </button>

          {/* Result View */}
          {gameDoc && (
            <div className="mt-5 p-5 rounded-2xl bg-[#0e1014] border border-[#262a35] space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#262a35]">
                <div>
                  <h3 className="font-fredoka text-lg font-bold text-[#00e5ff]">{gameDoc.title}</h3>
                  <p className="text-xs text-gray-400 italic">"{gameDoc.tagline}"</p>
                </div>
                <button
                  onClick={copyBlueprint}
                  className="px-3 py-1.5 rounded-lg bg-[#20242e] hover:bg-[#282d3a] text-xs font-mono-code text-gray-300 flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin JSON'}</span>
                </button>
              </div>

              <div>
                <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">Sinopsis &amp; Lore:</span>
                <p className="text-xs text-gray-400 leading-relaxed">{gameDoc.synopsis}</p>
              </div>

              {gameDoc.coreLoop && (
                <div>
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1.5">Core Gameplay Loop:</span>
                  <div className="space-y-1">
                    {gameDoc.coreLoop.map((step: string, i: number) => (
                      <div key={i} className="text-xs text-gray-400 flex items-center gap-2">
                        <span className="w-4 h-4 rounded-full bg-[#00e5ff]/20 text-[#00e5ff] flex items-center justify-center font-mono-code text-[10px]">
                          {i + 1}
                        </span>
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {gameDoc.monetization && (
                <div>
                  <span className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-[#00ff88]" />
                    Model Monetisasi (Gamepass &amp; DevProducts):
                  </span>
                  <div className="space-y-1">
                    {gameDoc.monetization.map((item: string, i: number) => (
                      <div key={i} className="text-xs text-gray-400 flex items-center gap-1.5">
                        <span className="text-[#00ff88]">•</span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
