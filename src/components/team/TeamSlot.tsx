import type { Hero } from '../../types'
import { ELEMENT_DOT, CLASS_ICONS } from '../../data/heroes'

interface Props {
  slotIndex: number
  heroId: string | null
  heroes: Hero[]
  onSelect: (heroId: string | null) => void
  label: string
}

export default function TeamSlot({ slotIndex, heroId, heroes, onSelect, label }: Props) {
  const hero = heroes.find(h => h.id === heroId)

  return (
    <div className="space-y-2">
      <div className="text-[9px] text-gold-700 uppercase tracking-[0.2em] font-display text-center">
        {label}
      </div>
      <div
        className={`relative rounded-sm border-2 border-dashed transition-all min-h-[110px] flex flex-col items-center justify-center gap-2 p-3 ${
          hero
            ? 'border-gold-700/60 bg-gradient-to-b from-tome to-void'
            : 'border-gold-700/20 bg-tome/30 hover:border-gold-700/40'
        }`}
      >
        {hero ? (
          <>
            <div className={`w-2.5 h-2.5 rounded-full gem ${ELEMENT_DOT[hero.element]}`} />
            <div className="text-lg">{CLASS_ICONS[hero.heroClass]}</div>
            <div className="text-[10px] text-gold-100 font-display tracking-wide text-center leading-tight">{hero.name}</div>
            <button
              onClick={() => onSelect(null)}
              className="absolute top-1.5 right-1.5 text-gold-700 hover:text-crimson-500 text-xs transition-colors"
            >✕</button>
          </>
        ) : (
          <div className="text-gold-700/40 text-[9px] text-center font-display tracking-widest">
            Slot {slotIndex + 1}<br/>Vacant
          </div>
        )}
      </div>
      <select
        value={heroId || ''}
        onChange={e => onSelect(e.target.value || null)}
        className="arcane-input text-xs py-1.5 w-full"
      >
        <option value="">-- Summon Hero --</option>
        {heroes.map(h => (
          <option key={h.id} value={h.id}>{h.name}</option>
        ))}
      </select>
    </div>
  )
}
