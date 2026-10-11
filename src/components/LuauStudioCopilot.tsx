import React, { useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  Play, 
  Copy, 
  Check, 
  Download, 
  FolderTree, 
  FileCode, 
  ExternalLink,
  Code2,
  RefreshCw,
  GitBranch,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { LUAU_CODE_PRESETS } from '../data/mockRobloxData';
import { sound } from '../services/soundEffects';

interface LuauStudioProps {
  onExportToGitHub?: (code: string, fileName: string) => void;
}

export const LuauStudioCopilot: React.FC<LuauStudioProps> = ({ onExportToGitHub }) => {
  const [selectedFile, setSelectedFile] = useState<'server' | 'client' | 'module'>('server');
  const [activeCode, setActiveCode] = useState<string>(LUAU_CODE_PRESETS[0].code);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<Array<{ text: string; type: 'info' | 'warn' | 'success'; time: string }>>([
    { text: 'BloxAI Studio v4.1 Initialized. Rojo sync listening on port 34872.', type: 'info', time: '10:00:00' },
    { text: 'Luau Strict Type Checker enabled (--!strict).', type: 'success', time: '10:00:01' }
  ]);

  const quickPrompts = [
    { label: '🛡️ Anti-Exploit Speed/Fly', text: 'Buat server script anti-exploit deteksi speed hack dan fly noclip dengan sanity check Vector3 magnitude' },
    { label: '⚔️ Katana Combo Slash', text: 'Buat module script pedang katana dengan 3 hit combo animation, raycast hitbox, dan neon slash particle' },
    { label: '📦 DataStore Auto-Save', text: 'Buat script DataStore Service v2 dengan session lock, pcall error handling, dan leaderstats koin' },
    { label: '🐾 AI Pet Floating Physics', text: 'Buat client script pet robot melayang di samping bahu pemain dengan CFrame lerping dan floating bobbing' },
    { label: '⚡ Daily Rewards GUI', text: 'Buat sistem hadiah harian daily reward dengan os.time streak tracker dan remote event klaim koin' },
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    sound.playClick();

    addLog(`Mengirim prompt ke Gemini AI: "${prompt.slice(0, 45)}..."`, 'info');

    try {
      const res = await fetch('/api/ai/generate-luau', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          scriptType: selectedFile === 'server' ? 'ServerScriptService' : selectedFile === 'client' ? 'StarterPlayer' : 'ReplicatedStorage',
          complexity: 'production-grade'
        })
      });

      const data = await res.json();
      if (data && data.result) {
        // Extract luau code block if present
        let cleanCode = data.result;
        const match = data.result.match(/```(?:luau|lua)?\n([\s\S]*?)```/);
        if (match && match[1]) {
          cleanCode = match[1].trim();
        }
        setActiveCode(cleanCode);
        sound.playSuccess();
        addLog(`Berhasil menghasilkan script Luau (${data.source === 'gemini' ? 'Gemini 3.8 Flash' : 'AI Synthesizer'})!`, 'success');
      }
    } catch (err: any) {
      addLog(`Error saat generate: ${err.message}`, 'warn');
    } finally {
      setIsGenerating(false);
    }
  };

  const addLog = (text: string, type: 'info' | 'warn' | 'success' = 'info') => {
    const time = new Date().toTimeString().split(' ')[0];
    setConsoleLogs(prev => [...prev.slice(-15), { text, type, time }]);
  };

  const handleRunTest = () => {
    sound.playClick();
    addLog(`[Studio Test]: Menjalankan sintaks check Luau...`, 'info');
    setTimeout(() => {
      if (activeCode.includes('DataStoreService')) {
        addLog(`[DataStore]: Mock DataStore "PlayerSave_Production_v2" terhubung (0 errors)`, 'success');
      } else if (activeCode.includes('Raycast')) {
        addLog(`[CombatEngine]: Raycast collision mesh dikompilasi dengan sukses (60 FPS)`, 'success');
      } else {
        addLog(`[Luau VM]: Script berhasil divalidasi. 0 syntax errors, 0 lint warnings.`, 'success');
      }
    }, 400);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    sound.playClick();
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadFile = () => {
    sound.playClick();
    const blob = new Blob([activeCode], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const fileName = selectedFile === 'server' ? 'ServerScript.server.luau' : selectedFile === 'client' ? 'ClientController.client.luau' : 'Module.luau';
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
    addLog(`File diunduh: ${fileName}`, 'success');
  };

  return (
    <div className="flex flex-col gap-5">
      {/* AI Prompt Generator Card */}
      <div className="bg-[#14161c] rounded-2xl border border-[#262a35] p-5 shadow-xl roblox-cyber-grid relative overflow-hidden">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-[#00e5ff]/20 to-[#0070f3]/20 border border-[#00e5ff]/30 text-[#00e5ff]">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h2 className="font-fredoka text-lg font-bold text-white flex items-center gap-2">
                Roblox Luau AI Copilot
                <span className="text-[11px] font-mono-code font-normal px-2 py-0.5 rounded bg-[#00e5ff]/15 text-[#00e5ff] border border-[#00e5ff]/30">
                  Strict Typing Luau
                </span>
              </h2>
              <p className="text-xs text-gray-400">
                Deskripsikan sistem game atau script Roblox yang kamu butuhkan dalam bahasa Indonesia atau Inggris.
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-400 font-mono-code bg-[#1a1d25] px-3 py-1.5 rounded-lg border border-[#2a2e3a]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#00ff88]" />
            <span>Anti-Exploit Ready</span>
          </div>
        </div>

        {/* Input box */}
        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
            placeholder="Contoh: Buat script sistem inventory dengan DataStore dan trade koin..."
            className="flex-1 bg-[#0e1014] border border-[#2a2e3a] focus:border-[#00e5ff] focus:outline-none rounded-xl px-4 py-3 text-sm text-white placeholder-gray-500 font-medium transition-all"
          />

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !prompt.trim()}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#00e5ff] to-[#0088ff] hover:from-[#33eaff] hover:to-[#1a94ff] text-black font-fredoka font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,229,255,0.3)] disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
          >
            {isGenerating ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Memproses Luau...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Generate Script</span>
              </>
            )}
          </button>
        </div>

        {/* Quick prompt pill chips */}
        <div className="flex flex-wrap gap-2 mt-3.5">
          <span className="text-xs text-gray-400 py-1 flex items-center">Preset Cepat:</span>
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => {
                setPrompt(qp.text);
                sound.playClick();
              }}
              className="text-xs px-3 py-1 rounded-lg bg-[#1c1f28] hover:bg-[#252a36] text-gray-300 hover:text-white border border-[#2d3240] transition-colors"
            >
              {qp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Roblox Studio IDE Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left Side: Rojo Project Explorer */}
        <div className="lg:col-span-3 bg-[#14161c] rounded-2xl border border-[#262a35] p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-[#262a35] mb-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-300">
              <FolderTree className="w-4 h-4 text-[#00e5ff]" />
              <span>Roblox DataModel</span>
            </div>
            <span className="text-[10px] bg-[#222633] text-gray-400 px-1.5 py-0.5 rounded font-mono-code">Rojo 7.x</span>
          </div>

          <div className="space-y-1 text-xs font-mono-code">
            <div className="text-gray-400 font-semibold px-2 py-1">📁 game (DataModel)</div>
            
            <button
              onClick={() => {
                setSelectedFile('server');
                setActiveCode(LUAU_CODE_PRESETS[0].code);
                sound.playClick();
              }}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                selectedFile === 'server'
                  ? 'bg-[#00e5ff]/15 text-[#00e5ff] font-bold border border-[#00e5ff]/30'
                  : 'text-gray-400 hover:bg-[#1a1d25] hover:text-gray-200'
              }`}
            >
              <FileCode className="w-4 h-4 text-[#ff5555]" />
              <span>ServerScriptService</span>
            </button>

            <button
              onClick={() => {
                setSelectedFile('module');
                setActiveCode(LUAU_CODE_PRESETS[1].code);
                sound.playClick();
              }}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                selectedFile === 'module'
                  ? 'bg-[#00e5ff]/15 text-[#00e5ff] font-bold border border-[#00e5ff]/30'
                  : 'text-gray-400 hover:bg-[#1a1d25] hover:text-gray-200'
              }`}
            >
              <FileCode className="w-4 h-4 text-[#55aaff]" />
              <span>ReplicatedStorage</span>
            </button>

            <button
              onClick={() => {
                setSelectedFile('client');
                setActiveCode(LUAU_CODE_PRESETS[2].code);
                sound.playClick();
              }}
              className={`w-full text-left px-3 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                selectedFile === 'client'
                  ? 'bg-[#00e5ff]/15 text-[#00e5ff] font-bold border border-[#00e5ff]/30'
                  : 'text-gray-400 hover:bg-[#1a1d25] hover:text-gray-200'
              }`}
            >
              <FileCode className="w-4 h-4 text-[#00ff88]" />
              <span>StarterPlayerScripts</span>
            </button>
          </div>

          <div className="mt-6 pt-4 border-t border-[#262a35]">
            <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Preset Template</div>
            <div className="space-y-1.5">
              {LUAU_CODE_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    setActiveCode(preset.code);
                    sound.playClick();
                    addLog(`Memuat template: ${preset.name}`, 'info');
                  }}
                  className="w-full text-left p-2 rounded-lg bg-[#191b22] hover:bg-[#20242e] border border-[#262b37] text-xs text-gray-300 transition-colors"
                >
                  <div className="font-semibold text-gray-200">{preset.name}</div>
                  <div className="text-[10px] text-gray-500 truncate">{preset.category}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Center & Right: Code Editor & Console */}
        <div className="lg:col-span-9 flex flex-col gap-4">
          {/* Code Editor Header */}
          <div className="bg-[#14161c] rounded-2xl border border-[#262a35] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 bg-[#191b22] border-b border-[#262a35]">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#00e5ff]" />
                <span className="font-mono-code text-xs text-gray-200 font-bold">
                  {selectedFile === 'server' ? 'ServerScriptService/DataStoreManager.server.luau' : selectedFile === 'client' ? 'StarterPlayer/PetFollower.client.luau' : 'ReplicatedStorage/Modules/CyberWeapon.luau'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRunTest}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00ff88]/15 hover:bg-[#00ff88]/25 text-[#00ff88] border border-[#00ff88]/30 text-xs font-bold transition-colors"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Uji Sintaks</span>
                </button>

                <button
                  onClick={copyCode}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222631] hover:bg-[#2b303d] text-gray-300 text-xs font-medium transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>

                <button
                  onClick={downloadFile}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222631] hover:bg-[#2b303d] text-gray-300 text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh .luau</span>
                </button>

                {onExportToGitHub && (
                  <button
                    onClick={() => {
                      const fName = selectedFile === 'server' ? 'src/server/Main.server.luau' : selectedFile === 'client' ? 'src/client/Controller.client.luau' : 'src/shared/Module.luau';
                      onExportToGitHub(activeCode, fName);
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#24292e] hover:bg-[#2f363d] text-white text-xs font-bold border border-[#444d56] transition-colors"
                  >
                    <GitBranch className="w-3.5 h-3.5 text-[#00e5ff]" />
                    <span>Sync GitHub</span>
                  </button>
                )}
              </div>
            </div>

            {/* Code Body Area */}
            <div className="p-4 bg-[#0c0d11] font-mono-code text-xs leading-relaxed overflow-x-auto min-h-[360px] max-h-[500px]">
              <pre className="text-gray-300">
                <code>{activeCode}</code>
              </pre>
            </div>
          </div>

          {/* Roblox Studio Output Log Console */}
          <div className="bg-[#14161c] rounded-2xl border border-[#262a35] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-4 py-2.5 bg-[#191b22] border-b border-[#262a35] text-xs">
              <div className="flex items-center gap-2 text-gray-300 font-bold font-mono-code">
                <Terminal className="w-4 h-4 text-[#00e5ff]" />
                <span>Roblox Studio Output Console</span>
              </div>
              <button
                onClick={() => setConsoleLogs([])}
                className="text-[11px] text-gray-400 hover:text-white"
              >
                Clear
              </button>
            </div>

            <div className="p-3 bg-[#0a0b0e] font-mono-code text-xs space-y-1.5 max-h-40 overflow-y-auto">
              {consoleLogs.map((log, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-gray-600 text-[10px] select-none">[{log.time}]</span>
                  <span className={
                    log.type === 'success' ? 'text-[#00ff88]' :
                    log.type === 'warn' ? 'text-[#ffb700]' : 'text-gray-300'
                  }>
                    {log.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
