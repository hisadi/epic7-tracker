import type { Element, HeroClass } from '../../types'

const ELEMENTS: { value: Element | 'all'; label: string; color: string }[] = [
  { value: 'all',   label: 'All',   color: 'bg-zinc-700 text-zinc-300' },
  { value: 'fire',  label: '🔥',   color: 'bg-red-500/20 text-red-400 border-red-500/30' },
  { value: 'ice',   label: '❄️',   color: 'bg-sky-500/20 text-sky-400 border-sky-500/30' },
  { value: 'earth', label: '🌿',   color: 'bg-green-500/20 text-green-400 border-green-500/30' },
  { value: 'light', label: '✨',   color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30' },
  { value: 'dark',  label: '🌑',   color: 'bg-purple-500/20 text-purple-400 border-purple-500/30' },
]

const CLASSES: { value: HeroClass | 'all'; label: string }[] = [
  { value: 'all',         label: 'All Classes' },
  { value: 'warrior',     label: '⚔️ Warrior' },
  { value: 'mage',        label: '🔮 Mage' },
  { value: 'knight',      label: '🛡️ Knight' },
  { value: 'soul_weaver', label: '💚 Soul Weaver' },
  { value: 'thief',       label: '🗡️ Thief' },
  { value: 'ranger',      label: '🏹 Ranger' },
]

interface Props {
  search: string
  element: Element | 'all'
  heroClass: HeroClass | 'all'
  showOwned: 'all' | 'owned' | 'unowned'
  showBuilt: 'all' | 'built' | 'unbuilt'
  onSearch: (v: string) => void
  onElement: (v: Element | 'all') => void
  onClass: (v: HeroClass | 'all') => void
  onOwned: (v: 'all' | 'owned' | 'unowned') => void
  onBuilt: (v: 'all' | 'built' | 'unbuilt') => void
}

export default function HeroFilter({ search, element, heroClass, showOwned, showBuilt, onSearch, onElement, onClass, onOwned, onBuilt }: Props) {
  return (
    <div className="space-y-3">
      {/* Search */}
      <input
        value={search}
        onChange={e => onSearch(e.target.value)}
        placeholder="Cari hero..."
        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-600"
      />

      <div className="flex flex-wrap gap-2">
        {/* Element filter */}
        {ELEMENTS.map(el => (
          <button
            key={el.value}
            onClick={() => onElement(el.value as Element | 'all')}
            className={`px-3 py-1.5 rounded-lg border text-sm font-medium transition-all ${
              element === el.value
                ? el.color + ' border-current'
                : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600'
            }`}
          >
            {el.label}
          </button>
        ))}

        {/* Class filter */}
        <select
          value={heroClass}
          onChange={e => onClass(e.target.value as HeroClass | 'all')}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-zinc-300 outline-none"
        >
          {CLASSES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>

        {/* Owned filter */}
        <select
          value={showOwned}
          onChange={e => onOwned(e.target.value as 'all' | 'owned' | 'unowned')}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-zinc-300 outline-none"
        >
          <option value="all">Semua</option>
          <option value="owned">Owned</option>
          <option value="unowned">Not Owned</option>
        </select>

        {/* Built filter */}
        <select
          value={showBuilt}
          onChange={e => onBuilt(e.target.value as 'all' | 'built' | 'unbuilt')}
          className="bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-zinc-300 outline-none"
        >
          <option value="all">All Build</option>
          <option value="built">Built ✓</option>
          <option value="unbuilt">Not Built</option>
        </select>
      </div>
    </div>
  )
}
