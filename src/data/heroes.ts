import type { Hero, Hunt, CatalystType } from '../types'
import type { HeroClass } from '../types'


export const ELEMENT_COLORS: Record<string, string> = {
  fire:  'bg-red-500/20 text-red-400 border-red-500/30',
  ice:   'bg-sky-500/20 text-sky-400 border-sky-500/30',
  earth: 'bg-green-500/20 text-green-400 border-green-500/30',
  light: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  dark:  'bg-purple-500/20 text-purple-400 border-purple-500/30',
}

export const ELEMENT_DOT: Record<string, string> = {
  fire:  'bg-red-500',
  ice:   'bg-sky-400',
  earth: 'bg-green-500',
  light: 'bg-yellow-400',
  dark:  'bg-purple-500',
}

export const CLASS_ICONS: Record<string, string> = {
  warrior:     '⚔️',
  mage:        '🔮',
  knight:      '🛡️',
  soul_weaver: '💚',
  thief:       '🗡️',
  ranger:      '🏹',
}

export const HUNTS: Hunt[] = [
  {
    name: 'Wyvern',
    icon: '🐉',
    gearSets: ['Speed', 'Critical'],
    description: 'Paling penting. Speed set untuk semua hero.',
    priority: 'high',
  },
  {
    name: 'Golem',
    icon: '🪨',
    gearSets: ['Defense', 'Health'],
    description: 'Untuk hero tank dan bruiser.',
    priority: 'high',
  },
  {
    name: 'Banshee',
    icon: '👻',
    gearSets: ['Immunity', 'Resist'],
    description: 'Immunity set untuk counter debuff.',
    priority: 'medium',
  },
  {
    name: 'Azimanak',
    icon: '🌿',
    gearSets: ['Attack', 'Counter'],
    description: 'Attack set untuk DPS.',
    priority: 'medium',
  },
  {
    name: 'Caides',
    icon: '🕷️',
    gearSets: ['Penetration', 'Destruction'],
    description: 'Penetration untuk damage tinggi.',
    priority: 'medium',
  },
  {
    name: 'Spirit Altar',
    icon: '✨',
    gearSets: ['Catalysts'],
    description: 'Catalyst untuk awaken hero.',
    priority: 'low',
  },
  {
    name: 'Abyss',
    icon: '🕳️',
    gearSets: ['Gold', 'Stigma'],
    description: 'Gold dan Stigma farming.',
    priority: 'low',
  },
]

export const GAME_MODES = [
  'Wyvern Hunt',
  'Golem Hunt',
  'Banshee Hunt',
  'Azimanak Hunt',
  'Caides Hunt',
  'PvP / RTA',
  'Abyss',
  'Guild War',
  'Expedition',
  'Story',
]

// Daftar hero E7 (sebagian besar yang populer & relevant)
export const HEROES: Hero[] = [
  // ── 5★ FIRE ──
  { id: 'ras', name: 'Ras', element: 'fire', heroClass: 'knight', stars: 5, roles: ['tank'] },
  { id: 'adventurer-ras', name: 'Adventurer Ras', element: 'fire', heroClass: 'warrior', stars: 5, roles: ['tank', 'dps'], hasSpecialtyChange: true },
  { id: 'bellona', name: 'Bellona', element: 'fire', heroClass: 'ranger', stars: 5, roles: ['dps', 'debuffer'] },
  { id: 'charlotte', name: 'Charlotte', element: 'fire', heroClass: 'knight', stars: 5, roles: ['tank', 'dps'] },
  { id: 'cermia', name: 'Cermia', element: 'fire', heroClass: 'warrior', stars: 5, roles: ['dps'] },
  { id: 'benimaru', name: 'Benimaru', element: 'fire', heroClass: 'warrior', stars: 5, roles: ['dps'] },
  { id: 'seaside-bellona', name: 'Seaside Bellona', element: 'fire', heroClass: 'ranger', stars: 5, roles: ['dps', 'debuffer'] },
  { id: 'peira', name: 'Peira', element: 'fire', heroClass: 'thief', stars: 5, roles: ['opener', 'debuffer'] },
  { id: 'requiem-roar', name: 'Requiem Roar', element: 'dark', heroClass: 'soul_weaver', stars: 3, roles: ['healer'] },
  { id: 'arby', name: 'Arbiter Vildred', element: 'dark', heroClass: 'thief', stars: 5, roles: ['dps'] },
  { id: 'lilias', name: 'Lilias', element: 'fire', heroClass: 'knight', stars: 5, roles: ['support', 'tank'] },
  { id: 'mui', name: 'Mui', element: 'fire', heroClass: 'warrior', stars: 5, roles: ['dps'] },
  { id: 'ruele', name: 'Ruele of Light', element: 'light', heroClass: 'soul_weaver', stars: 5, roles: ['healer', 'support'] },
  // ── 5★ ICE ──
  { id: 'sigret', name: 'Sigret', element: 'ice', heroClass: 'warrior', stars: 5, roles: ['dps', 'debuffer'] },
  { id: 'luluca', name: 'Luluca', element: 'ice', heroClass: 'mage', stars: 5, roles: ['dps', 'debuffer'] },
  { id: 'seaside-mercedes', name: 'Seaside Mercedes', element: 'ice', heroClass: 'mage', stars: 5, roles: ['dps'] },
  { id: 'roana', name: 'Roana', element: 'ice', heroClass: 'soul_weaver', stars: 5, roles: ['healer', 'support'] },
  { id: 'baiken', name: 'Baiken', element: 'ice', heroClass: 'thief', stars: 5, roles: ['dps', 'tank'] },
  { id: 'celine', name: 'Celine', element: 'ice', heroClass: 'thief', stars: 5, roles: ['dps', 'opener'] },
  { id: 'judge-kise', name: 'Judge Kise', element: 'ice', heroClass: 'warrior', stars: 5, roles: ['dps'] },
  { id: 'briar-witch-iseria', name: 'Briar Witch Iseria', element: 'ice', heroClass: 'thief', stars: 5, roles: ['dps', 'debuffer'] },
  { id: 'snow-queen-azaleas', name: 'Snow Queen Azaleas', element: 'ice', heroClass: 'mage', stars: 5, roles: ['dps'] },
  // ── 5★ EARTH ──
  { id: 'iseria', name: 'Iseria', element: 'earth', heroClass: 'ranger', stars: 5, roles: ['support', 'opener'] },
  { id: 'tamarinne', name: 'Tamarinne', element: 'fire', heroClass: 'soul_weaver', stars: 5, roles: ['healer', 'support'], hasSpecialtyChange: true },
  { id: 'violet', name: 'Violet', element: 'earth', heroClass: 'thief', stars: 5, roles: ['dps', 'tank'] },
  { id: 'straze', name: 'Straze', element: 'dark', heroClass: 'warrior', stars: 5, roles: ['dps'] },
  { id: 'riolet', name: 'Riolet', element: 'earth', heroClass: 'thief', stars: 5, roles: ['dps', 'debuffer'] },
  { id: 'vildred', name: 'Vildred', element: 'earth', heroClass: 'thief', stars: 5, roles: ['dps'] },
  { id: 'krau', name: 'Krau', element: 'ice', heroClass: 'knight', stars: 5, roles: ['tank', 'support'] },
  { id: 'destina', name: 'Destina', element: 'earth', heroClass: 'soul_weaver', stars: 5, roles: ['healer', 'support'] },
  { id: 'ml-ken', name: 'ML Ken', element: 'dark', heroClass: 'warrior', stars: 5, roles: ['dps', 'tank'] },
  { id: 'challenger-dominiel', name: 'Challenger Dominiel', element: 'dark', heroClass: 'mage', stars: 5, roles: ['dps', 'debuffer'] },
  // ── 5★ LIGHT ──
  { id: 'church-of-ilryos-axe', name: 'Celestial Mercedes', element: 'light', heroClass: 'mage', stars: 5, roles: ['dps', 'support'] },
  { id: 'lilibet', name: 'Lilibet', element: 'earth', heroClass: 'warrior', stars: 5, roles: ['dps', 'debuffer'] },
  { id: 'ml-angelica', name: 'Angel of Light Angelica', element: 'light', heroClass: 'soul_weaver', stars: 5, roles: ['healer', 'support'] },
  { id: 'sol', name: 'Sol', element: 'fire', heroClass: 'warrior', stars: 5, roles: ['dps'] },
  { id: 'fallen-cecilia', name: 'Fallen Cecilia', element: 'dark', heroClass: 'knight', stars: 5, roles: ['tank', 'support'] },
  { id: 'op-sigret', name: 'Operator Sigret', element: 'dark', heroClass: 'ranger', stars: 5, roles: ['dps', 'debuffer'] },
  // ── 5★ DARK ──
  { id: 'tenebria', name: 'Tenebria', element: 'dark', heroClass: 'mage', stars: 5, roles: ['dps', 'debuffer'] },
  { id: 'specter-tenebria', name: 'Specter Tenebria', element: 'dark', heroClass: 'mage', stars: 5, roles: ['dps', 'debuffer'] },
  { id: 'maid-chloe', name: 'Maid Chloe', element: 'light', heroClass: 'soul_weaver', stars: 5, roles: ['healer', 'support'] },
  { id: 'seline', name: 'Seline', element: 'dark', heroClass: 'thief', stars: 5, roles: ['dps'] },
  { id: 'setsuka', name: 'Setsuka', element: 'ice', heroClass: 'thief', stars: 5, roles: ['dps', 'opener'] },
  { id: 'rinak', name: 'Rinak', element: 'earth', heroClass: 'warrior', stars: 5, roles: ['tank', 'support'] },
  { id: 'salome', name: 'Salome', element: 'dark', heroClass: 'soul_weaver', stars: 5, roles: ['healer', 'support'] },
  // ── 4★ popular ──
  { id: 'angelica', name: 'Angelica', element: 'ice', heroClass: 'soul_weaver', stars: 4, roles: ['healer'] },
  { id: 'muwi', name: 'Muwi', element: 'ice', heroClass: 'thief', stars: 4, roles: ['debuffer', 'support'] },
  { id: 'clarissa', name: 'Clarissa', element: 'ice', heroClass: 'warrior', stars: 4, roles: ['dps', 'debuffer'] },
  { id: 'kitty-clarissa', name: 'Kitty Clarissa', element: 'fire', heroClass: 'warrior', stars: 4, roles: ['dps', 'debuffer'] },
  { id: 'cidd', name: 'Cidd', element: 'earth', heroClass: 'thief', stars: 4, roles: ['dps', 'opener'] },
  { id: 'carrot', name: 'Carrot', element: 'fire', heroClass: 'mage', stars: 4, roles: ['dps', 'debuffer'] },
  { id: 'silk', name: 'Silk', element: 'earth', heroClass: 'ranger', stars: 4, roles: ['opener', 'support'] },
  { id: 'rin', name: 'Rin', element: 'earth', heroClass: 'soul_weaver', stars: 4, roles: ['support', 'opener'] },
  { id: 'romann', name: 'Romann', element: 'ice', heroClass: 'mage', stars: 4, roles: ['dps', 'debuffer'] },
  { id: 'furious', name: 'Furious', element: 'ice', heroClass: 'ranger', stars: 4, roles: ['debuffer', 'support'] },
  { id: 'achates', name: 'Achates', element: 'fire', heroClass: 'soul_weaver', stars: 4, roles: ['healer', 'cleanser'] },
  { id: 'montmorancy', name: 'Montmorancy', element: 'ice', heroClass: 'soul_weaver', stars: 3, roles: ['healer', 'cleanser'] },
  { id: 'diene', name: 'Diene', element: 'ice', heroClass: 'soul_weaver', stars: 5, roles: ['healer', 'support'] },
  { id: 'commander-lorina', name: 'Commander Lorina', element: 'dark', heroClass: 'warrior', stars: 4, roles: ['dps'], hasSpecialtyChange: true },
  { id: 'elena', name: 'Elena', element: 'ice', heroClass: 'soul_weaver', stars: 5, roles: ['healer', 'support'] },
  { id: 'ml-chloe', name: 'Champion Zerato', element: 'dark', heroClass: 'mage', stars: 5, roles: ['dps', 'debuffer'] },
  { id: 'tywin', name: 'Tywin', element: 'ice', heroClass: 'knight', stars: 5, roles: ['tank', 'support'] },
  { id: 'politis', name: 'Politis', element: 'fire', heroClass: 'mage', stars: 5, roles: ['dps', 'debuffer'] },
  { id: 'mort', name: 'Mort', element: 'earth', heroClass: 'knight', stars: 5, roles: ['tank'] },
  { id: 'alencia', name: 'Alencia', element: 'earth', heroClass: 'warrior', stars: 5, roles: ['dps', 'debuffer'] },
  { id: 'dizzy', name: 'Dizzy', element: 'ice', heroClass: 'mage', stars: 5, roles: ['debuffer'] },
  { id: 'ml-kawazu', name: 'Infinity Challenger Ras', element: 'dark', heroClass: 'knight', stars: 5, roles: ['tank', 'support'] },
  { id: 'kise', name: 'Kise', element: 'ice', heroClass: 'thief', stars: 5, roles: ['dps'] },
  { id: 'yufine', name: 'Yufine', element: 'earth', heroClass: 'warrior', stars: 5, roles: ['dps'] },
  { id: 'cerise', name: 'Cerise', element: 'ice', heroClass: 'ranger', stars: 5, roles: ['debuffer', 'support'] },
  { id: 'doris', name: 'Doris', element: 'light', heroClass: 'soul_weaver', stars: 3, roles: ['healer'] },
  { id: 'mercedes', name: 'Mercedes', element: 'fire', heroClass: 'mage', stars: 4, roles: ['dps'] },
  { id: 'wanda', name: 'Wanda', element: 'dark', heroClass: 'ranger', stars: 3, roles: ['debuffer'] },
]

export const CLASS_CATALYSTS: Record<HeroClass, { name: string; icon: string }> = {
  warrior:     { name: 'Warrior Catalyst',     icon: '⚔️' },
  mage:        { name: 'Mage Catalyst',         icon: '🔮' },
  knight:      { name: 'Knight Catalyst',       icon: '🛡️' },
  soul_weaver: { name: 'Soul Weaver Catalyst',  icon: '💚' },
  thief:       { name: 'Thief Catalyst',        icon: '🗡️' },
  ranger:      { name: 'Ranger Catalyst',       icon: '🏹' },
}
