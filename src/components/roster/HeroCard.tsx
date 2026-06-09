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
      className={`relic-card group relative overflow-hidden ${
        owned
          ? built
            ? 'border-gold-500/60'
            : 'border-gold-700/50'
          : 'opacity-50 hover:opacity-80'
      }`}
    >
      {/* Subtle gem tint glow when owned */}
      {owned && (
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none transition-opacity group-hover:opacity-[0.08]"
          style={{ background: `radial-gradient(circle at top right, currentColor, transparent 60%)` }}
        />
      )}

      {/* MAIN ROW */}
      <div className="flex items-center gap-3 p-3.5 relative">
        {/* Element gem */}
        <div className="relative flex-shrink-0">
          <div
            className={`w-2.5 h-2.5 rounded-full gem ${ELEMENT_DOT[hero.element]} ${owned ? 'animate-glow-pulse' : ''}`}
          />
        </div>

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-xs text-gold-700">{CLASS_ICONS[hero.heroClass]}</span>
            <span className={`font-display tracking-wide text-sm truncate ${owned ? 'text-gold-100' : 'text-gold-700'}`}>
              {hero.name}
            </span>
            {hero.hasSpecialtyChange && (
              <span className="text-[9px] font-display tracking-widest bg-gradient-to-r from-celestial-400 to-celestial-600 text-void px-1.5 py-0.5 rounded-sm uppercase font-bold">
                SC
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] text-gold-700 capitalize font-body tracking-wider">{hero.heroClass.replace('_', ' ')}</span>
            <span className="text-gold-700/50">·</span>
            <span className="text-[10px] text-celestial-400 font-mono">{'★'.repeat(hero.stars)}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {owned && (
            <button
              onClick={() => onToggleBuilt(hero.id)}
              className={`text-[10px] font-display tracking-widest uppercase px-2 py-1 rounded-sm border transition-all ${
                built
                  ? 'bg-gold-500/20 border-gold-500/60 text-gold-100 shadow-[0_0_8px_rgba(201,164,73,0.3)]'
                  : 'border-gold-700/50 text-gold-700 hover:border-gold-500/60 hover:text-gold-300'
              }`}
            >
              {built ? '⚒ Forged' : 'Forge'}
            </button>
          )}
          <button
            onClick={() => onToggleOwned(hero.id)}
            className={`text-[10px] font-display tracking-widest uppercase px-2 py-1 rounded-sm border transition-all ${
              owned
                ? 'bg-ruby-600/20 border-ruby-400/60 text-ruby-400 shadow-[0_0_8px_rgba(201,54,79,0.3)]'
                : 'border-gold-700/50 text-gold-700 hover:border-gold-500/60 hover:text-gold-300'
            }`}
          >
            {owned ? '✓ Owned' : 'Own'}
          </button>
          {owned && (
            <button
              onClick={() => setExpanded(e => !e)}
              className="text-gold-700 hover:text-gold-300 px-1 text-xs"
            >
              {expanded ? '▲' : '▼'}
            </button>
          )}
        </div>
      </div>

      {/* EXPANDED NOTES */}
      {expanded && owned && (
        <div className="px-3.5 pb-3.5 border-t border-gold-700/30 pt-3 space-y-2.5 relative">
          <div>
            <label className="text-[10px] text-gold-700 uppercase tracking-[0.2em] font-display">Artifact Set</label>
            <input
              value={gearSet}
              onChange={e => setGearSet(e.target.value)}
              placeholder="e.g. Speed / Critical"
              className="arcane-input mt-1 w-full text-sm"
            />
          </div>
          <div>
            <label className="text-[10px] text-gold-700 uppercase tracking-[0.2em] font-display">Inscription</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              placeholder="Build notes, target stats..."
              rows={2}
              className="arcane-input mt-1 w-full text-sm resize-none"
            />
          </div>
          <button
            onClick={() => { onSaveNotes(hero.id, notes, gearSet); setExpanded(false) }}
            className="gilded-btn text-xs py-1.5"
          >
            Inscribe
          </button>
        </div>
      )}
    </div>
  )
}
