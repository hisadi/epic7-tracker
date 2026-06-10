export type Element = 'fire' | 'ice' | 'earth' | 'light' | 'dark'
export type HeroClass = 'warrior' | 'mage' | 'knight' | 'soul_weaver' | 'thief' | 'ranger'
export type HeroRole = 'tank' | 'dps' | 'healer' | 'support' | 'debuffer' | 'cleanser' | 'opener'
export type Stars = 3 | 4 | 5

export interface Hero {
  id: string
  name: string
  element: Element
  heroClass: HeroClass
  stars: Stars
  roles: HeroRole[]
  hasSpecialtyChange?: boolean
}

export interface RosterEntry {
  id: string
  hero_id: string
  owned: boolean
  built: boolean
  stars: number
  gear_set: string
  notes: string
}

export interface Team {
  id: string
  name: string
  mode: string
  slot1: string | null
  slot2: string | null
  slot3: string | null
  slot4: string | null
  notes: string
  created_at: string
}

export type HuntName =
  | 'Wyvern'
  | 'Golem'
  | 'Banshee'
  | 'Azimanak'
  | 'Caides'
  | 'Spirit Altar'
  | 'Abyss'

export interface Hunt {
  name: HuntName
  icon: string
  gearSets: string[]
  description: string
  priority: 'high' | 'medium' | 'low'
}

export interface FarmingLog {
  id: string
  hunt: HuntName
  date: string
  runs_done: number
  daily_done: boolean
  target_gear: string
}

export type CatalystType = HeroClass  // warrior, mage, knight, dll

export type CatalystPurpose = 'Awaken' | 'Skill Up'

export interface CatalystTarget {
  id: string
  hero_id: string
  catalyst_type: CatalystType
  purpose: CatalystPurpose
  collected: boolean
  date: string
  created_at: string
}

export type FarmActivity =
  | 'Wyvern Hunt'
  | 'Golem Hunt'
  | 'Banshee Hunt'
  | 'Azimanak Hunt'
  | 'Caides Hunt'
  | 'Spirit Altar'
  | 'Abyss'
  | 'Catalyst Warrior'
  | 'Catalyst Mage'
  | 'Catalyst Knight'
  | 'Catalyst Soul Weaver'
  | 'Catalyst Thief'
  | 'Catalyst Ranger'
  | 'Gold Farming'
  | 'EXP Farming'
  | 'Rest'

export interface FarmPlan {
  id: string
  date: string        // 'YYYY-MM-DD'
  activity: FarmActivity
  notes: string
  done: boolean
  week_number: number // bisa pakai getWeek() helper
  created_at: string
}