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
    <div className="flex flex-col gap-2">
      <div className="text-xs text-zinc-500 uppercase tracking-wide text-center">{label}</div>
      <div className={`relative rounded-xl border-2 border-dashed transition-all min-h-[100px] flex flex-col items-center justify-center gap-2 p-3
        ${hero ? 'border-zinc-600 bg-zinc-800' : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-700'}`}
      >
        {hero ? (
          <>
            <div className={`w-3 h-3 rounded-full ${ELEMENT_DOT[hero.element]}`} />
            <div className="text-lg">{CLASS_ICONS[hero.heroClass]}</div>
            <div className="text-xs text-white font-semibold text-center leading-tight">{hero.name}</div>
            <button
              onClick={() => onSelect(null)}
              className="absolute top-1.5 right-1.5 text-zinc-500 hover:text-red-400 text-xs"
            >✕</button>
          </>
        ) : (
          <div className="text-zinc-700 text-xs text-center">Slot {slotIndex + 1}<br/>kosong</div>
        )}
      </div>
      <select
        value={heroId || ''}
        onChange={e => onSelect(e.target.value || null)}
        className="bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1.5 text-xs text-zinc-300 outline-none w-full"
      >
        <option value="">-- Pilih hero --</option>
        {heroes.map(h => (
          <option key={h.id} value={h.id}>{h.name}</option>
        ))}
      </select>
    </div>
  )
}
