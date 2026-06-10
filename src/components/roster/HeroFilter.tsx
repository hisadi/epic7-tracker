import type { Element, HeroClass } from '../../types'

type OwnedFilter = 'all' | 'owned' | 'unowned'
type BuiltFilter = 'all' | 'built' | 'unbuilt'

interface Props {
  search: string
  element: Element | 'all'
  heroClass: HeroClass | 'all'
  showOwned: OwnedFilter
  showBuilt: BuiltFilter
  onSearch: (s: string) => void
  onElement: (e: Element | 'all') => void
  onClass: (c: HeroClass | 'all') => void
  onOwned: (o: OwnedFilter) => void
  onBuilt: (b: BuiltFilter) => void
}

const ELEMENT_OPTIONS: { value: Element | 'all'; label: string; color: string }[] = [
  { value: 'all',    label: 'All',    color: 'text-gold-700' },
  { value: 'fire',   label: 'Fire',   color: 'text-red-400' },
  { value: 'ice',    label: 'Ice',    color: 'text-sky-400' },
  { value: 'earth',  label: 'Earth',  color: 'text-green-400' },
  { value: 'light',  label: 'Light',  color: 'text-yellow-400' },
  { value: 'dark',   label: 'Dark',   color: 'text-purple-400' },
]

const CLASS_OPTIONS: { value: HeroClass | 'all'; label: string; icon: string }[] = [
  { value: 'all',         label: 'All',       icon: '✦' },
  { value: 'warrior',     label: 'Warrior',   icon: '⚔' },
  { value: 'mage',        label: 'Mage',      icon: '🔮' },
  { value: 'knight',      label: 'Knight',    icon: '🛡' },
  { value: 'soul_weaver', label: 'Weaver',    icon: '❤' },
  { value: 'thief',       label: 'Thief',     icon: '🗡' },
  { value: 'ranger',      label: 'Ranger',    icon: '🏹' },
]

const OWNED_OPTIONS: { value: OwnedFilter; label: string }[] = [
  { value: 'all',      label: 'All' },
  { value: 'owned',    label: 'Owned' },
  { value: 'unowned',  label: 'Missing' },
]

const BUILT_OPTIONS: { value: BuiltFilter; label: string }[] = [
  { value: 'all',      label: 'All' },
  { value: 'built',    label: 'Built' },
  { value: 'unbuilt',  label: 'Unbuilt' },
]

export default function HeroFilter({
  search, element, heroClass, showOwned, showBuilt,
  onSearch, onElement, onClass, onOwned, onBuilt,
}: Props) {
  return (
    <div className="relic-card p-4 space-y-3">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-700/60 text-sm font-display">
          ✦
        </span>
        <input
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Cari hero..."
          className="arcane-input w-full pl-9 text-sm"
        />
      </div>

      {/* Element pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-700/60 mr-1">
          Element
        </span>
        {ELEMENT_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => onElement(opt.value)}
            className={`px-2.5 py-1 rounded-sm text-[10px] font-display tracking-wider uppercase border transition-all ${
              element === opt.value
                ? 'border-gold-500/70 bg-gold-700/15 text-gold-100 text-glow-sm'
                : `border-gold-700/30 ${opt.color} opacity-60 hover:opacity-100 hover:border-gold-700/50`
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Class pills */}
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-700/60 mr-1">
          Class
        </span>
        {CLASS_OPTIONS.map(opt => (
          <button
            key={opt.value}
            onClick={() => onClass(opt.value)}
            className={`px-2.5 py-1 rounded-sm text-[10px] font-display tracking-wider uppercase border transition-all ${
              heroClass === opt.value
                ? 'border-gold-500/70 bg-gold-700/15 text-gold-100 text-glow-sm'
                : 'border-gold-700/30 text-gold-700/70 opacity-60 hover:opacity-100 hover:border-gold-700/50'
            }`}
          >
            <span className="mr-1">{opt.icon}</span>
            {opt.label}
          </button>
        ))}
      </div>

      {/* Status pills */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <div className="flex items-center gap-1.5">
          <span className="font-display text-[10px] uppercase tracking-[0.2em] text-gold-700/60">
            Status
          </span>
          {OWNED_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => onOwned(opt.value)}
              className={`px-2.5 py-1 rounded-sm text-[10px] font-display tracking-wider uppercase border transition-all ${
                showOwned === opt.value
                  ? 'border-gold-500/70 bg-gold-700/15 text-gold-100'
                  : 'border-gold-700/30 text-gold-700/70 opacity-60 hover:opacity-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          {BUILT_OPTIONS.map(opt => (
            <button
              key={opt.value}
              onClick={() => onBuilt(opt.value)}
              className={`px-2.5 py-1 rounded-sm text-[10px] font-display tracking-wider uppercase border transition-all ${
                showBuilt === opt.value
                  ? 'border-gold-500/70 bg-gold-700/15 text-gold-100'
                  : 'border-gold-700/30 text-gold-700/70 opacity-60 hover:opacity-100'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
