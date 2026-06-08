import { useState } from 'react'
import type { Hero, RosterEntry } from '../../types'
import { ELEMENT_DOT, CLASS_ICONS } from '../../data/heroes'

interface Props {
  hero: Hero
  entry?: RosterEntry
  onToggleOwned: (id: string) => void
  onToggleBuilt: (id: string) => void
  onSaveNotes: (id: string, notes: string, gear_set: string) => void
}

export default function HeroCard({ hero, entry, onToggleOwned, onToggleBuilt, onSaveNotes }: Props) {
  const [expanded, setExpanded] = useState(false)
  const [notes, setNotes] = useState(entry?.notes || '')
  const [gearSet, setGearSet] = useState(entry?.gear_set || '')

  const owned = entry?.owned || false
  const built = entry?.built || false

  return (
    <div
      className={`rounded-xl border transition-all ${
        owned
          ? built
            ? 'bg-zinc-800 border-zinc-600'
            : 'bg-zinc-900 border-zinc-700'
          : 'bg-zinc-950 border-zinc-800 opacity-40 hover:opacity-60'
      }`}
    >
      {/* MAIN ROW */}
      <div className="flex items-center gap-3 p-3">
        {/* Element dot */}
        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${ELEMENT_DOT[hero.element]}`} />

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs">{CLASS_ICONS[hero.heroClass]}</span>
            <span className={`text-sm font-semibold truncate ${owned ? 'text-white' : 'text-zinc-500'}`}>
              {hero.name}
            </span>
            {hero.hasSpecialtyChange && (
              <span className="text-xs bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded px-1">SC</span>
            )}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <span className="text-xs text-zinc-500 capitalize">{hero.heroClass.replace('_', ' ')}</span>
            <span className="text-zinc-700">·</span>
            <span className="text-xs text-zinc-500">{'★'.repeat(hero.stars)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {owned && (
            <button
              onClick={() => onToggleBuilt(hero.id)}
              className={`text-xs px-2 py-1 rounded-md border transition-colors ${
                built
                  ? 'bg-green-500/20 border-green-500/40 text-green-400'
                  : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
              }`}
            >
              {built ? '⚙️ Built' : 'Build'}
            </button>
          )}
          <button
            onClick={() => onToggleOwned(hero.id)}
            className={`text-xs px-2 py-1 rounded-md border transition-colors ${
              owned
                ? 'bg-blue-500/20 border-blue-500/40 text-blue-400'
                : 'border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-zinc-300'
            }`}
          >
            {owned ? '✓ Owned' : 'Own'}
          </button>
          {owned && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="text-xs text-zinc-500 hover:text-zinc-300 px-1"
            >
              {expanded ? '▲' : '▼'}
            </button>
          )}
        </div>
      </div>

      {/* EXPANDED NOTES */}
      {expanded && owned && (
        <div className="px-3 pb-3 border-t border-zinc-800 pt-3 space-y-2">
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wide">Gear Set</label>
            <input
              value={gearSet}
              onChange={e => setGearSet(e.target.value)}
              placeholder="e.g. Speed / Crit"
              className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-500"
            />
          </div>
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wide">Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Target stats, artifacts, tips..."
              rows={2}
              className="mt-1 w-full bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-500 resize-none"
            />
          </div>
          <button
            onClick={() => { onSaveNotes(hero.id, notes, gearSet); setExpanded(false) }}
            className="text-xs bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1.5 rounded-lg transition-colors"
          >
            Simpan
          </button>
        </div>
      )}
    </div>
  )
}
