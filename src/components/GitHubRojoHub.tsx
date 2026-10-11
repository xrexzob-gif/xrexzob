import React, { useState } from 'react';
import { 
  GitBranch, 
  GitCommit, 
  Folder, 
  FileText, 
  Check, 
  Copy, 
  Download, 
  Terminal, 
  Sparkles, 
  ShieldCheck, 
  UploadCloud, 
  RefreshCw,
  ExternalLink,
  Code,
  Github
} from 'lucide-react';
import { GITHUB_ROJO_STARTER_FILES } from '../data/mockRobloxData';
import { sound } from '../services/soundEffects';

export const GitHubRojoHub: React.FC<{ exportedFile?: { path: string; content: string } | null }> = ({ exportedFile }) => {
  const [repoName, setRepoName] = useState('xrexzob/roblox-ai-universe');
  const [branch, setBranch] = useState('main');
  const [files, setFiles] = useState(GITHUB_ROJO_STARTER_FILES);
  const [activeFilePath, setActiveFilePath] = useState('default.project.json');
  const [commitMessage, setCommitMessage] = useState('feat(rojo): synchronize AI Luau game logic to Roblox DataModel');
  const [isCommitting, setIsCommitting] = useState(false);
  const [commitHistory, setCommitHistory] = useState([
    { hash: '7c8f2a1', message: 'chore: configure Aftman toolchain and Wally package manager', author: 'xrexzob', time: '10 menit yang lalu' },
    { hash: '4b1e9d3', message: 'feat: add DataStore auto-save v2 server module', author: 'xrexzob', time: '1 jam yang lalu' },
    { hash: '1a90c54', message: 'Initial commit from Roblox AI Nexus Hub', author: 'xrexzob', time: 'Kemarin' },
  ]);
  const [copied, setCopied] = useState(false);

  // If a file was sent from Studio Copilot, update files list
  React.useEffect(() => {
    if (exportedFile) {
      setFiles(prev => {
        const existingIdx = prev.findIndex(f => f.path === exportedFile.path);
        if (existingIdx >= 0) {
          const next = [...prev];
          next[existingIdx] = {
            ...next[existingIdx],
            content: exportedFile.content,
            size: `${(exportedFile.content.length / 1024).toFixed(1)} KB`
          };
          return next;
        } else {
          return [
            ...prev,
            {
              path: exportedFile.path,
              type: 'file',
              size: `${(exportedFile.content.length / 1024).toFixed(1)} KB`,
              content: exportedFile.content
            }
          ];
        }
      });
      setActiveFilePath(exportedFile.path);
    }
  }, [exportedFile]);

  const activeFile = files.find(f => f.path === activeFilePath) || files[0];

  const handleCommit = () => {
    if (!commitMessage.trim()) return;
    setIsCommitting(true);
    sound.playClick();

    setTimeout(() => {
      const newHash = Math.random().toString(16).substring(2, 9);
      setCommitHistory(prev => [
        { hash: newHash, message: commitMessage, author: repoName.split('/')[0] || 'xrexzob', time: 'Baru saja' },
        ...prev
      ]);
      setIsCommitting(false);
      sound.playSuccess();
      setCommitMessage('');
    }, 600);
  };

  const copyFileContent = () => {
    if (activeFile?.content) {
      navigator.clipboard.writeText(activeFile.content);
      setCopied(true);
      sound.playClick();
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const downloadAllZip = () => {
    sound.playClick();
    // Download primary project file
    const blob = new Blob([activeFile?.content || ''], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.path.split('/').pop() || 'project.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* GitHub Repo Header Card */}
      <div className="bg-[#14161c] rounded-2xl border border-[#262a35] p-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-[#24292e] border border-[#3e4451] text-white">
              <Github className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-fredoka text-lg font-bold text-white">
                  GitHub Rojo Developer Hub
                </h2>
                <span className="text-xs px-2 py-0.5 rounded bg-[#00ff88]/15 text-[#00ff88] border border-[#00ff88]/30 font-mono-code">
                  Connected
                </span>
              </div>
              <p className="text-xs text-gray-400">
                Sinkronisasi otomatis kode Luau dengan Git repository dan pipeline Roblox Studio Rojo.
              </p>
            </div>
          </div>

          {/* Repo Input Box */}
          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#0d0f14] border border-[#262a35] rounded-xl px-3 py-2 text-xs font-mono-code text-gray-300">
              <span className="text-gray-500 mr-1">github.com/</span>
              <input
                type="text"
                value={repoName}
                onChange={(e) => setRepoName(e.target.value)}
                className="bg-transparent border-none text-white focus:outline-none w-48 font-bold"
              />
            </div>

            <div className="flex items-center bg-[#0d0f14] border border-[#262a35] rounded-xl px-3 py-2 text-xs font-mono-code text-gray-300">
              <GitBranch className="w-3.5 h-3.5 text-[#00e5ff] mr-1.5" />
              <span>{branch}</span>
            </div>
          </div>
        </div>

        {/* Quick CLI Setup box */}
        <div className="mt-4 p-3 rounded-xl bg-[#0b0d11] border border-[#1f232d] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono-code">
          <div className="flex items-center gap-2 text-gray-400">
            <Terminal className="w-4 h-4 text-[#00e5ff]" />
            <span className="text-[#00e5ff]">rojo serve</span>
            <span className="text-gray-600">|</span>
            <span>rojo build default.project.json --output place.rbxl</span>
          </div>

          <button
            onClick={() => {
              navigator.clipboard.writeText(`git clone https://github.com/${repoName}.git\naftman install\nrojo serve`);
              sound.playClick();
              alert('Perintah Git & Rojo tersalin ke clipboard!');
            }}
            className="text-xs text-[#00e5ff] hover:underline flex items-center gap-1 font-sans"
          >
            <Copy className="w-3 h-3" />
            <span>Salin Setup Terminal</span>
          </button>
        </div>
      </div>

      {/* Main Grid: File Tree + Code Inspector + Commit Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* File Tree Left */}
        <div className="lg:col-span-4 bg-[#14161c] rounded-2xl border border-[#262a35] p-4 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b border-[#262a35] mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
              <Folder className="w-4 h-4 text-[#00e5ff]" />
              Struktur Repository
            </span>
            <span className="text-xs text-gray-500 font-mono-code">{files.length} Files</span>
          </div>

          <div className="space-y-1 font-mono-code text-xs">
            {files.map((file) => (
              <button
                key={file.path}
                onClick={() => {
                  setActiveFilePath(file.path);
                  sound.playClick();
                }}
                className={`w-full text-left px-3 py-2 rounded-lg flex items-center justify-between transition-colors ${
                  activeFilePath === file.path
                    ? 'bg-[#00e5ff]/15 text-[#00e5ff] font-bold border border-[#00e5ff]/30'
                    : 'text-gray-400 hover:bg-[#1a1d25] hover:text-gray-200'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate">{file.path}</span>
                </div>
                <span className="text-[10px] text-gray-500 ml-2">{file.size}</span>
              </button>
            ))}
          </div>

          {/* New Commit Section */}
          <div className="mt-6 pt-4 border-t border-[#262a35]">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2 mb-2">
              <GitCommit className="w-4 h-4 text-[#00ff88]" />
              Simulasi Commit Git
            </span>

            <textarea
              value={commitMessage}
              onChange={(e) => setCommitMessage(e.target.value)}
              placeholder="Commit message (e.g. feat: update Luau DataStore system)..."
              rows={2}
              className="w-full bg-[#0e1014] border border-[#2a2e3a] focus:border-[#00ff88] focus:outline-none rounded-xl p-2.5 text-xs text-white placeholder-gray-500 font-mono-code mb-2"
            />

            <button
              onClick={handleCommit}
              disabled={isCommitting || !commitMessage.trim()}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#00ff88] to-[#00b359] text-black font-fredoka font-bold text-xs flex items-center justify-center gap-2 disabled:opacity-50 transition-all active:scale-95 shadow-[0_0_12px_rgba(0,255,136,0.3)]"
            >
              {isCommitting ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Committing &amp; Pushing...</span>
                </>
              ) : (
                <>
                  <UploadCloud className="w-3.5 h-3.5" />
                  <span>Commit &amp; Push ke Main</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* File Inspector Center */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-[#14161c] rounded-2xl border border-[#262a35] overflow-hidden flex flex-col">
            {/* File Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#191b22] border-b border-[#262a35]">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#00e5ff]" />
                <span className="font-mono-code text-xs text-white font-bold">{activeFile.path}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={copyFileContent}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222631] hover:bg-[#2b303d] text-gray-300 text-xs font-medium transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Tersalin' : 'Salin'}</span>
                </button>

                <button
                  onClick={downloadAllZip}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#222631] hover:bg-[#2b303d] text-gray-300 text-xs font-medium transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh File</span>
                </button>
              </div>
            </div>

            {/* File Content Preview */}
            <div className="p-4 bg-[#0a0b0e] font-mono-code text-xs leading-relaxed min-h-[340px] max-h-[480px] overflow-auto">
              <pre className="text-gray-300 whitespace-pre">
                <code>{activeFile.content || '// Tidak ada isi'}</code>
              </pre>
            </div>
          </div>

          {/* Git Commits Log */}
          <div className="bg-[#14161c] rounded-2xl border border-[#262a35] p-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#262a35] mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-2">
                <GitCommit className="w-4 h-4 text-[#00e5ff]" />
                Riwayat Commit Terbaru
              </span>
              <span className="text-xs text-gray-500 font-mono-code">{branch}</span>
            </div>

            <div className="space-y-2 font-mono-code text-xs">
              {commitHistory.map((c) => (
                <div key={c.hash} className="flex items-center justify-between p-2.5 rounded-lg bg-[#191b22] border border-[#252934]">
                  <div className="flex items-center gap-2.5 truncate">
                    <span className="text-[#00e5ff] font-bold">{c.hash}</span>
                    <span className="text-gray-300 truncate">{c.message}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-gray-500 text-[11px]">
                    <span>{c.author}</span>
                    <span>•</span>
                    <span>{c.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
