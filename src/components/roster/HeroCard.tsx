import { useState } from 'react'
import { ELEMENT_DOT, ELEMENT_COLORS, CLASS_ICONS } from '../../data/heroes'
import type { Hero, RosterEntry } from '../../types'

interface Props {
  hero: Hero
  entry?: RosterEntry
  onToggleOwned: (heroId: string) => void
  onToggleBuilt: (heroId: string) => void
  onSaveNotes: (heroId: string, notes: string, gear_set: string) => void
}

export default function HeroCard({ hero, entry, onToggleOwned, onToggleBuilt, onSaveNotes }: Props) {
  const [editing, setEditing] = useState(false)
  const [notes, setNotes] = useState(entry?.notes || '')
  const [gear, setGear] = useState(entry?.gear_set || '')

  const owned = entry?.owned || false
  const built = entry?.built || false
  const stars = entry?.stars || 0

  const elementClass = ELEMENT_COLORS[hero.element]
  const elementDot = ELEMENT_DOT[hero.element]
  const classIcon = CLASS_ICONS[hero.heroClass]

  function save() {
    onSaveNotes(hero.id, notes, gear)
    setEditing(false)
  }

  return (
    <div
      className={`relic-card p-4 transition-all duration-300 ${
        !owned ? 'opacity-50' : ''
      } ${built ? 'shadow-[0_0_20px_rgba(201,164,73,0.15)]' : ''}`}
    >
      {/* Header */}
      <div className="flex items-start gap-3">
        {/* Class icon as portrait placeholder */}
        <div className="relative w-12 h-12 flex-shrink-0 rounded-sm border border-gold-700/40 bg-tome/80 flex items-center justify-center text-2xl">
          <span>{classIcon}</span>
          {built && (
            <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gold-500 shadow-[0_0_8px_rgba(201,164,73,0.8)]" />
          )}
        </div>

        {/* Name + meta */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="font-display tracking-wide text-gold-100 text-sm truncate">
              {hero.name}
            </h3>
            {hero.hasSpecialtyChange && (
              <span className="text-[9px] font-display tracking-wider uppercase text-arcane-400 border border-arcane-500/40 rounded-sm px-1">
                SC
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <span className={`gem ${elementClass}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${elementDot}`} />
              {hero.element}
            </span>
            <span className="text-gold-700/60 text-[10px] font-mono">
              {'★'.repeat(hero.stars)}
            </span>
          </div>
        </div>
      </div>

      {/* Stars counter */}
      {owned && (
        <div className="mt-3 flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-gold-700">
            Stars
          </span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <button
                key={n}
                onClick={() => onSaveNotes(hero.id, notes, gear)}
                className={`text-xs transition-all ${
                  n <= stars ? 'text-gold-500 text-glow-sm' : 'text-gold-700/30'
                }`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="ornate-divider mt-3 mb-3" />

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggleOwned(hero.id)}
          className={`ghost-btn flex-1 text-[10px] py-1.5 ${
            owned ? 'border-gold-500/60 text-gold-300 bg-gold-700/10' : ''
          }`}
        >
          {owned ? '✓ Owned' : 'Owned'}
        </button>
        <button
          onClick={() => onToggleBuilt(hero.id)}
          disabled={!owned}
          className={`ghost-btn flex-1 text-[10px] py-1.5 ${
            built ? 'border-gold-500/60 text-gold-300 bg-gold-700/10' : ''
          }`}
        >
          {built ? '✓ Built' : 'Built'}
        </button>
        {owned && (
          <button
            onClick={() => editing ? save() : setEditing(true)}
            className={`ghost-btn text-[10px] py-1.5 px-2 ${editing ? 'border-gold-500/60 text-gold-300' : ''}`}
          >
            {editing ? '✓' : '✎'}
          </button>
        )}
      </div>

      {/* Edit panel */}
      {editing && owned && (
        <div className="mt-3 space-y-2">
          <input
            value={gear}
            onChange={e => setGear(e.target.value)}
            placeholder="Gear set (e.g. Speed, Counter)"
            className="arcane-input w-full text-xs py-1.5"
          />
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Notes..."
            rows={2}
            className="arcane-input w-full text-xs py-1.5 resize-none"
          />
        </div>
      )}

      {/* Read-only display */}
      {!editing && owned && (entry?.notes || entry?.gear_set) && (
        <div className="mt-3 space-y-1">
          {entry.gear_set && (
            <div className="text-[10px] font-mono text-gold-500/80">
              ⚔ {entry.gear_set}
            </div>
          )}
          {entry.notes && (
            <p className="text-[11px] text-gold-700/70 italic leading-snug">
              {entry.notes}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
