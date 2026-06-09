import type { Element, HeroClass } from '../../types'

const ELEMENTS: { value: Element | 'all'; label: string; symbol: string }[] = [
  { value: 'all',   label: 'All',   symbol: '✦' },
  { value: 'fire',  label: 'Fire',  symbol: '🔥' },
  { value: 'ice',   label: 'Ice',   symbol: '❄' },
  { value: 'earth', label: 'Earth', symbol: '🌿' },
  { value: 'light', label: 'Light', symbol: '☀' },
  { value: 'dark',  label: 'Dark',  symbol: '☾' },
]

const CLASSES: { value: HeroClass | 'all'; label: string }[] = [
  { value: 'all',         label: 'All Classes' },
  { value: 'warrior',     label: '⚔ Warrior' },
  { value: 'mage',        label: '✦ Mage' },
  { value: 'knight',      label: '◆ Knight' },
  { value: 'soul_weaver', label: '☼ Soul Weaver' },
  { value: 'thief',       label: '✧ Thief' },
  { value: 'ranger',      label: '➳ Ranger' },
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
    <div className="relic-card p-4 space-y-3">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gold-700">✦</span>
        <input
          value={search}
          onChange={e => onSearch(e.target.value)}
          placeholder="Seek a hero by name..."
          className="arcane-input w-full pl-9 text-sm"
        />
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        {/* Element filter */}
        {ELEMENTS.map(el => (
          <button
            key={el.value}
            onClick={() => onElement(el.value as Element | 'all')}
            className={`text-[10px] font-display tracking-widest uppercase px-3 py-1.5 rounded-sm border transition-all ${
              element === el.value
                ? el.value === 'all'
                  ? 'border-gold-500/70 text-gold-100 bg-gold-700/20 shadow-[0_0_8px_rgba(201,164,73,0.3)]'
                  : `${getElementStyle(el.value as Element)} shadow-[0_0_8px_rgba(201,164,73,0.2)]`
                : 'border-gold-700/40 text-gold-700 hover:border-gold-500/60 hover:text-gold-300'
            }`}
          >
            <span className="mr-1">{el.symbol}</span>
            {el.label}
          </button>
        ))}

        <div className="h-6 w-px bg-gold-700/40 mx-1" />

        {/* Class filter */}
        <select
          value={heroClass}
          onChange={e => onClass(e.target.value as HeroClass | 'all')}
          className="arcane-input text-xs py-1.5"
        >
          {CLASSES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>

        {/* Owned filter */}
        <select
          value={showOwned}
          onChange={e => onOwned(e.target.value as 'all' | 'owned' | 'unowned')}
          className="arcane-input text-xs py-1.5"
        >
          <option value="all">All Banners</option>
          <option value="owned">Owned</option>
          <option value="unowned">Unowned</option>
        </select>

        {/* Built filter */}
        <select
          value={showBuilt}
          onChange={e => onBuilt(e.target.value as 'all' | 'built' | 'unbuilt')}
          className="arcane-input text-xs py-1.5"
        >
          <option value="all">All Builds</option>
          <option value="built">Forged</option>
          <option value="unbuilt">Unforged</option>
        </select>
      </div>
    </div>
  )
}

function getElementStyle(el: Element): string {
  const map: Record<Element, string> = {
    fire:  'border-ruby-400/70 text-ruby-400 bg-ruby-600/20',
    ice:   'border-sapphire-400/70 text-sapphire-400 bg-sapphire-600/20',
    earth: 'border-verdant-400/70 text-verdant-400 bg-verdant-600/20',
    light: 'border-celestial-400/70 text-celestial-400 bg-celestial-600/20',
    dark:  'border-shadow-400/70 text-shadow-400 bg-shadow-600/20',
  }
  return map[el]
}
