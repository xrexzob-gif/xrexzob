import { RobloxGame, LuauScriptPreset } from '../types';

export const POPULAR_GAMES: RobloxGame[] = [
  {
    id: 'cyberblox-2099',
    title: 'CyberBlox 2099 [AI Core]',
    tagline: 'Jelajahi megacity neon voxel, hack node AI, dan bangun armada drone Luau!',
    description: 'Masuki dunia CyberBlox 2099 di mana kecerdasan buatan super mengatur distrik Neo-Blox. Temukan rahasia inti neural, balapan dengan Hover-Cycles berkecepatan tinggi, dan lawan glitch bot boss.',
    developer: 'BloxAI Studios Inc.',
    activePlayers: 48920,
    totalVisits: '142.8M+',
    upvotePercentage: 96,
    thumbnail: 'cyberblox',
    genre: 'AI Sci-Fi',
    tags: ['Sci-Fi', 'AI', 'Cyberpunk', 'Open World', 'R15'],
    serverRegion: 'Singapore (Asia)',
    features: ['Ray-traced Neon Lighting', 'Autonomous AI NPCs', 'Custom Hover-Bikes', 'Global Cross-Server Leaderboards'],
    badges: [
      { id: 'b1', name: 'Master Hacker', description: 'Bobol mainframe level 10 tanpa tertangkap', rarity: '3.4% (Impossible)', icon: '⚡' },
      { id: 'b2', name: 'Neural Overlord', description: 'Miliki 100,000 AI Neurons di dompet blox', rarity: '8.2% (Insane)', icon: '🧠' },
      { id: 'b3', name: 'First Cyber-Flight', description: 'Terbang menyeberangi Neo-Blox City dengan jetpack', rarity: '42.1% (Easy)', icon: '🚀' }
    ],
    gamepasses: [
      { id: 'gp1', name: 'VIP Cyber Aura & Neon Wings', price: 499, icon: '✨', description: '2x Pengganda neuron + sayap hologram bercahaya' },
      { id: 'gp2', name: 'Quantum Luau Hook (Grapple)', price: 299, icon: '🪝', description: 'Zipline instan ke atap gedung pencakar langit' },
      { id: 'gp3', name: 'Infinite Cyber-Dash', price: 199, icon: '⚡', description: 'Dash tanpa cooldown di medan pertempuran' }
    ]
  },
  {
    id: 'neural-obby-matrix',
    title: 'Neural Obby: 500 AI Stages [NEW]',
    tagline: 'Obby paling menantang dengan platform pintar yang beradaptasi dengan lompatanmu!',
    description: 'Uji keterampilan parkour Blox kamu di 500 tingkatan rintangan neural! Setiap checkpoint menyimpan AI Data Cubes yang dapat ditukar dengan efek lompat jejak partikel neon.',
    developer: 'Neural Builders & Co.',
    activePlayers: 34100,
    totalVisits: '89.4M+',
    upvotePercentage: 93,
    thumbnail: 'neural-obby',
    genre: 'Neural Obby',
    tags: ['Obby', 'Parkour', 'Hardcore', 'AI Generated', 'Speedrun'],
    serverRegion: 'Tokyo (Asia-East)',
    features: ['Adaptive Moving Platforms', 'Zero Latency Checkpoints', 'Speedrun Ghost Replays', 'Custom Trail Shop'],
    badges: [
      { id: 'b4', name: 'Obby Prodigy', description: 'Selesaikan Stage 100 tanpa mati', rarity: '12.5% (Hard)', icon: '🏆' },
      { id: 'b5', name: 'Speed Demon', description: 'Selesaikan Stage 1-50 di bawah 4 menit', rarity: '5.1% (Extreme)', icon: '⏱️' }
    ],
    gamepasses: [
      { id: 'gp4', name: 'Coil Bundle (Speed + Gravity)', price: 350, icon: '🌀', description: 'Lompat 2.5x lebih tinggi dan lari 2x lebih cepat' },
      { id: 'gp5', name: 'Instant Stage Skip (10x)', price: 150, icon: '⏩', description: 'Lewati rintangan yang terlalu sulit seketika' }
    ]
  },
  {
    id: 'quantum-pet-sim',
    title: 'Quantum Blox: Pet Simulator AI',
    tagline: 'Hatch telur kuantum, dapatkan AI Mecha Dragon, dan jadilah yang terkaya!',
    description: 'Koleksi lebih dari 200 peliharaan AI dengan algoritma kepribadian unik. Kirim pet kamu menambang server bitcoin blox, buka dimensi kuantum baru, dan lakukan Rebirth untuk multiplier gila!',
    developer: 'QuantumBlox Games',
    activePlayers: 72450,
    totalVisits: '310.2M+',
    upvotePercentage: 97,
    thumbnail: 'pet-sim',
    genre: 'Simulation',
    tags: ['Pets', 'Simulator', 'Trading', 'AI Companion', 'Collecting'],
    serverRegion: 'Singapore (Asia)',
    features: ['AI Pet Behavior Trees', 'Huge Pet Fusion Machine', 'Huge Trading Plaza', 'Auto-Farm & Auto-Hatch'],
    badges: [
      { id: 'b6', name: 'Huge Cyber Cat!', description: 'Hatch peliharaan Huge Mecha dengan peluang 0.001%', rarity: '0.08% (Mythical)', icon: '🐱' },
      { id: 'b7', name: 'Trillionaire Blox', description: 'Kumpulkan 1 Triliun Koin Kuantum', rarity: '2.1% (Legendary)', icon: '💰' }
    ],
    gamepasses: [
      { id: 'gp6', name: 'Auto-Hatch + Fast Open', price: 325, icon: '🥚', description: 'Buka 8 telur sekaligus dengan kecepatan 3x' },
      { id: 'gp7', name: 'Equip +5 Pets', price: 500, icon: '🐾', description: 'Bawa 5 peliharaan tambahan secara bersamaan' }
    ]
  },
  {
    id: 'roboblade-ai-arena',
    title: 'RoboBlade: Cyber Ball AI [Season 4]',
    tagline: 'Tangkis bola energi pelacak AI dengan timing pedang katana presisi tinggi!',
    description: 'Game defleksi bola futuristik paling intens di Roblox. Tingkatkan reflekmu, buka pedang energi hologram, dan gunakan kemampuan telekinesis untuk membelokkan bola ke lawan.',
    developer: 'Blade Protocol Studio',
    activePlayers: 56800,
    totalVisits: '204.5M+',
    upvotePercentage: 91,
    thumbnail: 'blade-ball',
    genre: 'Combat Arena',
    tags: ['Action', 'PvP', 'Sword', 'Reflex', 'Esports'],
    serverRegion: 'Jakarta (ID Edge)',
    features: ['Custom Slash Particles', 'Ranked 1v1 Arena', 'Soundtrack Cyber Synthwave', '60 FPS Physics'],
    badges: [
      { id: 'b8', name: 'Deflection Master', description: 'Tangkis bola dengan kecepatan di atas 300 SPS', rarity: '4.8% (Master)', icon: '⚔️' },
      { id: 'b9', name: 'Champion of the Grid', description: 'Menangkan turnamen 16 pemain tanpa gugur', rarity: '1.2% (Grandmaster)', icon: '👑' }
    ],
    gamepasses: [
      { id: 'gp8', name: 'Neon Katana: Raijin Core', price: 650, icon: '⚡', description: 'Pedang legendaris dengan animasi sambaran petir' },
      { id: 'gp9', name: 'Quantum Shield Ability', price: 400, icon: '🛡️', description: 'Perisai darurat otomatis jika terlambat memblokir' }
    ]
  },
  {
    id: 'blox-gpt-city',
    title: 'BloxGPT: Autonomous AI City RPG',
    tagline: 'Setiap warga kota adalah bot AI yang mengingat namamu dan cerita hidupmu!',
    description: 'RPG masa depan revolusioner. Bekerja sebagai polisi cyber, programmer Luau di tech giant, atau hacker bawah tanah. Berbicaralah dengan NPC apapun menggunakan bahasa bebas dan jalankan bisnismu!',
    developer: 'Generative Blox Labs',
    activePlayers: 29840,
    totalVisits: '65.3M+',
    upvotePercentage: 95,
    thumbnail: 'ai-city',
    genre: 'Cyber RPG',
    tags: ['RPG', 'Roleplay', 'Smart NPCs', 'Life Sim', 'Vehicles'],
    serverRegion: 'Singapore (Asia)',
    features: ['Real-time LLM Dialogue', 'Living Economy System', 'Customizable Smart Apartments', 'Police & Heist Mechanics'],
    badges: [
      { id: 'b10', name: 'Mayor of Neo-Blox', description: 'Dapatkan reputasi 10,000 dari seluruh NPC kota', rarity: '0.9% (Legendary)', icon: '🏛️' },
      { id: 'b11', name: 'Tech Tycoon', description: 'Dirikan startup teknologi dan raih valuasi 100M', rarity: '3.1% (Extreme)', icon: '💻' }
    ],
    gamepasses: [
      { id: 'gp10', name: 'Penthouse Key & Supercar', price: 900, icon: '🏎️', description: 'Rumah mewah di puncak tower dan mobil cyber tercepat' },
      { id: 'gp11', name: 'CEO Developer Pass', price: 450, icon: '💳', description: 'Gaji 3x lipat di semua profesi kota' }
    ]
  }
];

export const LUAU_CODE_PRESETS: LuauScriptPreset[] = [
  {
    id: 'roblox-datastore',
    name: 'Auto-Save DataStore v2',
    category: 'ServerScript',
    description: 'Sistem penyimpanan data pemain anti-rollback dengan pcall, auto-save interval, dan leaderstats.',
    code: `--!strict
-- ServerScriptService/DataStoreManager.server.luau
-- Author: Roblox AI Nexus
local DataStoreService = game:GetService("DataStoreService")
local Players = game:GetService("Players")

local PlayerStore = DataStoreService:GetDataStore("PlayerSave_Production_v2")

type PlayerSaveData = {
    Coins: number,
    Gems: number,
    Level: number,
    EquippedItems: { string },
}

local DEFAULT_DATA: PlayerSaveData = {
    Coins = 500,
    Gems = 25,
    Level = 1,
    EquippedItems = { "Starter_Sword" }
}

local sessionCache: { [number]: PlayerSaveData } = {}

local function initializeLeaderstats(player: Player, data: PlayerSaveData)
    local leaderstats = Instance.new("Folder")
    leaderstats.Name = "leaderstats"
    leaderstats.Parent = player

    local coins = Instance.new("IntValue")
    coins.Name = "Coins"
    coins.Value = data.Coins
    coins.Parent = leaderstats

    local level = Instance.new("IntValue")
    level.Name = "Level"
    level.Value = data.Level
    level.Parent = leaderstats
end

Players.PlayerAdded:Connect(function(player)
    local key = "User_" .. player.UserId
    local success, result = pcall(function()
        return PlayerStore:GetAsync(key)
    end)

    local data: PlayerSaveData
    if success and result then
        data = result
    else
        data = table.clone(DEFAULT_DATA)
    end

    sessionCache[player.UserId] = data
    initializeLeaderstats(player, data)
end)

Players.PlayerRemoving:Connect(function(player)
    local data = sessionCache[player.UserId]
    if data then
        local leaderstats = player:FindFirstChild("leaderstats")
        if leaderstats then
            local coins = leaderstats:FindFirstChild("Coins") :: IntValue?
            if coins then data.Coins = coins.Value end
        end

        pcall(function()
            PlayerStore:SetAsync("User_" .. player.UserId, data)
        end)
        sessionCache[player.UserId] = nil
    end
end)`
  },
  {
    id: 'cyber-raycast-weapon',
    name: 'Cyber Raycast Weapon Engine',
    category: 'ModuleScript',
    description: 'Sistem tembakan laser neon dengan raycast filtering, damage humanoid, dan visual tracer.',
    code: `--!strict
-- ReplicatedStorage/Modules/CyberWeapon.luau
local Workspace = game:GetService("Workspace")
local TweenService = game:GetService("TweenService")

local CyberWeapon = {}
CyberWeapon.__index = CyberWeapon

function CyberWeapon.Fire(origin: Vector3, targetPos: Vector3, shooter: Model, damage: number)
    local direction = (targetPos - origin).Unit
    local maxRange = 300

    local rayParams = RaycastParams.new()
    rayParams.FilterType = RaycastFilterType.Exclude
    rayParams.FilterDescendantsInstances = { shooter }

    local result = Workspace:Raycast(origin, direction * maxRange, rayParams)
    local hitPos = result and result.Position or (origin + direction * maxRange)

    -- Buat Laser Tracer Neon
    local distance = (hitPos - origin).Magnitude
    local beam = Instance.new("Part")
    beam.Size = Vector3.new(0.2, 0.2, distance)
    beam.CFrame = CFrame.lookAt(origin, hitPos) * CFrame.new(0, 0, -distance / 2)
    beam.Anchored = true
    beam.CanCollide = false
    beam.Material = Enum.Material.Neon
    beam.Color = Color3.fromRGB(0, 229, 255)
    beam.Parent = Workspace

    local tween = TweenService:Create(beam, TweenInfo.new(0.15), {
        Transparency = 1,
        Size = Vector3.new(0.01, 0.01, distance)
    })
    tween:Play()
    tween.Completed:Connect(function() beam:Destroy() end)

    if result and result.Instance then
        local targetModel = result.Instance:FindFirstAncestorOfClass("Model")
        local humanoid = targetModel and targetModel:FindFirstChildOfClass("Humanoid")
        if humanoid then
            humanoid:TakeDamage(damage)
        end
    end
end

return CyberWeapon`
  },
  {
    id: 'ai-pet-follower',
    name: 'Smooth Spring AI Pet Follower',
    category: 'ClientScript',
    description: 'Algoritma fisika pet melayang halus di samping karakter dengan CFrame lerping dan efek pernapasan.',
    code: `--!strict
-- StarterPlayer/StarterPlayerScripts/PetFollower.client.luau
local RunService = game:GetService("RunService")
local Players = game:GetService("Players")
local player = Players.LocalPlayer

local function attachPet(petModel: Model)
    local primaryPart = petModel.PrimaryPart
    if not primaryPart then return end

    local currentOffset = Vector3.new(3.5, 2.2, 2.5)

    RunService.RenderStepped:Connect(function(dt: number)
        local character = player.Character
        if not character then return end

        local root = character:FindFirstChild("HumanoidRootPart") :: BasePart?
        if not root then return end

        local floatWave = math.sin(os.clock() * 3) * 0.4
        local targetCFrame = root.CFrame * CFrame.new(currentOffset.X, currentOffset.Y + floatWave, currentOffset.Z)
        
        -- Smooth damping
        primaryPart.CFrame = primaryPart.CFrame:Lerp(targetCFrame, math.clamp(dt * 7, 0, 1))
    end)
end`
  },
  {
    id: 'rojo-project-json',
    name: 'Rojo default.project.json',
    category: 'RojoConfig',
    description: 'Konfigurasi standar Rojo 7.x untuk menyinkronkan repository GitHub ke Roblox Studio DataModel.',
    code: `{
  "name": "Roblox-AI-Experience",
  "tree": {
    "$className": "DataModel",
    "ServerScriptService": {
      "$className": "ServerScriptService",
      "$path": "src/server"
    },
    "ReplicatedStorage": {
      "$className": "ReplicatedStorage",
      "$path": "src/shared"
    },
    "StarterPlayer": {
      "$className": "StarterPlayer",
      "StarterPlayerScripts": {
        "$className": "StarterPlayerScripts",
        "$path": "src/client"
      }
    }
  }
}`
  }
];

export const GITHUB_ROJO_STARTER_FILES = [
  {
    path: 'default.project.json',
    type: 'file',
    size: '420 B',
    content: `{
  "name": "Roblox-AI-Nexus-Project",
  "tree": {
    "$className": "DataModel",
    "ServerScriptService": {
      "$path": "src/server"
    },
    "ReplicatedStorage": {
      "$path": "src/shared"
    },
    "StarterPlayer": {
      "StarterPlayerScripts": {
        "$path": "src/client"
      }
    }
  }
}`
  },
  {
    path: 'aftman.toml',
    type: 'file',
    size: '310 B',
    content: `[tools]
rojo = "rojo-rbx/rojo@7.4.4"
selene = "Kampfkarren/selene@0.27.1"
stylua = "JohnnyMorganz/StyLua@0.20.0"
wally = "UpliftGames/wally@0.3.2"
remodel = "rojo-rbx/remodel@0.11.0"`
  },
  {
    path: 'wally.toml',
    type: 'file',
    size: '280 B',
    content: `[package]
name = "xrexzob/roblox-ai-engine"
version = "1.0.0"
registry = "https://github.com/UpliftGames/wally-index"
realm = "shared"

[dependencies]
Promise = "evaera/promise@4.0.0"
Signal = "sleitnick/signal@2.0.1"
Component = "sleitnick/component@2.4.7"`
  },
  {
    path: '.github/workflows/roblox-ci.yml',
    type: 'file',
    size: '950 B',
    content: `name: Roblox CI/CD Pipeline

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint-and-build:
    name: Luau Lint & Rojo Build
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Setup Aftman Toolchain
        uses: ok-nick/setup-aftman@v0.4.2

      - name: Run StyLua Style Check
        run: stylua --check src/

      - name: Run Selene Static Analysis
        run: selene src/

      - name: Build Roblox Place File (.rbxl)
        run: rojo build default.project.json --output build/RobloxGame.rbxl

      - name: Upload Build Artifact
        uses: actions/upload-artifact@v4
        with:
          name: RobloxPlace
          path: build/RobloxGame.rbxl`
  },
  {
    path: 'src/server/Main.server.luau',
    type: 'file',
    size: '620 B',
    content: `--!strict
-- Server Entry Point
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

print("[BloxAI Server]: Initializing Cyber Server Services...")

Players.PlayerAdded:Connect(function(player: Player)
    print(string.format("[BloxAI]: Player %s (%d) joined the AI Grid", player.Name, player.UserId))
end)`
  },
  {
    path: 'src/client/Controller.client.luau',
    type: 'file',
    size: '480 B',
    content: `--!strict
-- Client Controller
local Players = game:GetService("Players")
local player = Players.LocalPlayer

print("[BloxAI Client]: Initialized UI and HUD systems for " .. player.Name)`
  },
  {
    path: 'README.md',
    type: 'file',
    size: '1.2 KB',
    content: `# 🚀 Roblox AI Nexus Experience

Proyek game Roblox modern yang dibangun dengan Rojo 7.x, Luau, dan GitHub Actions CI/CD.

## 🛠️ Cara Menjalankan secara Lokal

1. Install **Aftman**:
   \`\`\`bash
   cargo install aftman
   aftman install
   \`\`\`
2. Jalankan **Rojo Server**:
   \`\`\`bash
   rojo serve
   \`\`\`
3. Buka **Roblox Studio**, pasang plugin Rojo, dan klik **Connect** (Port 34872).

## 📦 Build Place File
\`\`\`bash
rojo build default.project.json --output Game.rbxl
\`\`\`
`
  }
];
