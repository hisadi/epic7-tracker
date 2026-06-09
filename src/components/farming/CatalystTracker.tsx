import { useState } from 'react'
import { HEROES, CLASS_ICONS, ELEMENT_DOT, CATALYSTS } from '../../data/heroes'
import type { Hero, CatalystTarget, CatalystType, CatalystPurpose } from '../../types'

interface Props {
  ownedHeroes: Hero[]
  todayTargets: CatalystTarget[]
  loading: boolean
  onAdd: (heroId: string, catalystType: CatalystType, purpose: CatalystPurpose) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function CatalystTracker({ ownedHeroes, todayTargets, loading, onAdd, onToggle, onDelete }: Props) {
  const [selectedHero, setSelectedHero] = useState('')
  const [selectedCatalyst, setSelectedCatalyst] = useState<CatalystType>(CATALYSTS[0].type)
  const [selectedPurpose, setSelectedPurpose] = useState<CatalystPurpose>('Awaken')

  const collected = todayTargets.filter(t => t.collected).length
  const total = todayTargets.length

  function handleAdd() {
    if (!selectedHero) return
    onAdd(selectedHero, selectedCatalyst, selectedPurpose)
    setSelectedHero('')
  }

  const heroMap = new Map(HEROES.map(h => [h.id, h]))

  return (
    <div className="space-y-4">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-bold text-white">Catalyst Target</h2>
        <p className="text-zinc-500 text-sm mt-1">
          Pilih hero + catalyst untuk ditargetkan hari ini
        </p>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-zinc-900 rounded-full h-2 overflow-hidden">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${(collected / total) * 100}%` }}
            />
          </div>
          <span className="text-xs text-zinc-500 font-mono">{collected}/{total} collected</span>
        </div>
      )}

      {/* Add form */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {/* Hero select */}
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wide">Hero</label>
            <select
              value={selectedHero}
              onChange={e => setSelectedHero(e.target.value)}
              className="mt-1 w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-zinc-600"
            >
              <option value="">-- Pilih Hero --</option>
              {ownedHeroes.map(h => (
                <option key={h.id} value={h.id}>{h.name}</option>
              ))}
            </select>
          </div>

          {/* Catalyst type */}
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wide">Catalyst</label>
            <select
              value={selectedCatalyst}
              onChange={e => setSelectedCatalyst(e.target.value as CatalystType)}
              className="mt-1 w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-zinc-600"
            >
              {CATALYSTS.map(c => (
                <option key={c.type} value={c.type}>{c.icon} {c.type}</option>
              ))}
            </select>
          </div>

          {/* Purpose */}
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wide">Purpose</label>
            <select
              value={selectedPurpose}
              onChange={e => setSelectedPurpose(e.target.value as CatalystPurpose)}
              className="mt-1 w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-zinc-600"
            >
              <option value="Awaken">Awaken</option>
              <option value="Skill Up">Skill Up</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleAdd}
            disabled={!selectedHero}
            className="bg-white text-zinc-950 text-sm font-semibold px-5 py-2 rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            + Tambah Target
          </button>
        </div>
      </div>

      {/* Target cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-20 rounded-xl bg-zinc-900 animate-pulse" />
          ))}
        </div>
      ) : todayTargets.length === 0 ? (
        <div className="text-center py-12 text-zinc-600 text-sm">
          Belum ada target catalyst hari ini. Tambah di atas!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {todayTargets.map(target => {
            const hero = heroMap.get(target.hero_id)
            if (!hero) return null

            const catalyst = CATALYSTS.find(c => c.type === target.catalyst_type)

            return (
              <div
                key={target.id}
                className={`rounded-xl border p-3 space-y-2 transition-all ${
                  target.collected
                    ? 'bg-zinc-800/50 border-green-500/30'
                    : 'bg-zinc-900 border-zinc-800'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${ELEMENT_DOT[hero.element]}`} />
                    <span className="text-sm text-xs">{CLASS_ICONS[hero.heroClass]}</span>
                    <span className={`text-sm font-semibold truncate ${target.collected ? 'text-zinc-400 line-through' : 'text-white'}`}>
                      {hero.name}
                    </span>
                  </div>
                  <button
                    onClick={() => onDelete(target.id)}
                    className="text-zinc-700 hover:text-red-400 text-xs flex-shrink-0"
                  >✕</button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm">{catalyst?.icon}</span>
                  <span className="text-xs text-zinc-300 font-medium">{target.catalyst_type}</span>
                  <span className="text-xs text-zinc-600">—</span>
                  <span className={`text-xs px-2 py-0.5 rounded-md ${
                    target.purpose === 'Awaken'
                      ? 'bg-yellow-500/20 text-yellow-400'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {target.purpose}
                  </span>
                </div>

                <button
                  onClick={() => onToggle(target.id)}
                  className={`w-full text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
                    target.collected
                      ? 'bg-green-500/20 border-green-500/40 text-green-400'
                      : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
                  }`}
                >
                  {target.collected ? '✓ Collected' : 'Toggle Collected'}
                </button>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
