export interface RobloxGame {
  id: string;
  title: string;
  tagline: string;
  description: string;
  developer: string;
  activePlayers: number;
  totalVisits: string;
  upvotePercentage: number;
  thumbnail: string;
  genre: 'AI Sci-Fi' | 'Neural Obby' | 'Cyber RPG' | 'Simulation' | 'Combat Arena';
  tags: string[];
  serverRegion: string;
  features: string[];
  badges: {
    id: string;
    name: string;
    description: string;
    rarity: string;
    icon: string;
  }[];
  gamepasses: {
    id: string;
    name: string;
    price: number;
    icon: string;
    description: string;
  }[];
}

export interface LuauScriptPreset {
  id: string;
  name: string;
  category: 'ServerScript' | 'ClientScript' | 'ModuleScript' | 'RojoConfig';
  description: string;
  code: string;
}

export interface GitHubRojoFile {
  path: string;
  type: 'file' | 'directory';
  content?: string;
  size?: string;
}

export interface BloxAvatarConfig {
  headColor: string;
  torsoColor: string;
  leftArmColor: string;
  rightArmColor: string;
  leftLegColor: string;
  rightLegColor: string;
  visorType: 'none' | 'cyber-visor' | 'hologram-halo' | 'hacker-matrix' | 'mecha-horns' | 'neon-cat';
  wingsType: 'none' | 'cyber-wings' | 'plasma-jetpack' | 'matrix-cape';
  faceType: 'classic-smile' | 'cyborg-glow' | 'chill' | 'ninja-mask';
  shirtPattern: 'cyber-suit' | 'roblox-classic' | 'hacker-hoodie' | 'synthwave';
  scale: {
    height: number;
    width: number;
    depth: number;
  };
}

export interface NpcDialogueNode {
  id: string;
  speaker: string;
  text: string;
  responses: {
    text: string;
    nextNodeId: string;
    action?: string;
  }[];
}
