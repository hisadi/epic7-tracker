import { useState } from 'react'
import { HEROES, CLASS_ICONS, ELEMENT_DOT, CLASS_CATALYSTS } from '../../data/heroes'
import type { Hero, CatalystTarget, CatalystType, CatalystPurpose, HeroClass } from '../../types'

interface Props {
  ownedHeroes: Hero[]
  todayTargets: CatalystTarget[]
  previousTargets: CatalystTarget[]
  loading: boolean
  onAdd: (heroId: string, catalystType: CatalystType, purpose: CatalystPurpose) => void
  onToggle: (id: string) => void
  onDelete: (id: string) => void
}

export default function CatalystTracker({ ownedHeroes, todayTargets, previousTargets, loading, onAdd, onToggle, onDelete }: Props) {
  const [selectedHero, setSelectedHero] = useState('')
  const [selectedPurpose, setSelectedPurpose] = useState<CatalystPurpose>('Awaken')
  const [showHistory, setShowHistory] = useState(false)

  const selectedHeroData = HEROES.find(h => h.id === selectedHero)
  const derivedCatalyst: CatalystType | null = selectedHeroData ? selectedHeroData.heroClass : null
  const derivedCatalystInfo = derivedCatalyst ? CLASS_CATALYSTS[derivedCatalyst] : null

  const collected = todayTargets.filter(t => t.collected).length
  const total = todayTargets.length

  function handleAdd() {
    if (!selectedHero || !derivedCatalyst) return
    onAdd(selectedHero, derivedCatalyst, selectedPurpose)
    setSelectedHero('')
  }

  const heroMap = new Map(HEROES.map(h => [h.id, h]))

  return (
    <div className="space-y-5">
      <div className="ornate-divider" />

      {/* Section Header */}
      <div className="text-center">
        <h2 className="font-display text-2xl md:text-3xl tracking-[0.2em] uppercase text-gold-100">
          Catalyst Chronicle
        </h2>
        <p className="text-gold-700 font-body italic text-xs mt-1">
          The catalysts of Érzé — forge your hero's ascension.
        </p>
      </div>

      {/* Progress bar */}
      {total > 0 && (
        <div className="flex items-center gap-3">
          <div className="flex-1 bg-tome rounded-full h-1.5 overflow-hidden border border-gold-700/20">
            <div
              className="bg-gradient-to-r from-gold-700 via-gold-500 to-gold-100 h-1.5 transition-all duration-500"
              style={{ width: `${(collected / total) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gold-500 font-mono">{collected}/{total} ascended</span>
        </div>
      )}

      {/* Add form */}
      <div className="relic-card p-4 space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Hero select */}
          <div>
            <label className="text-[10px] text-gold-700 uppercase tracking-[0.2em] font-display">Ascended Hero</label>
            <select
              value={selectedHero}
              onChange={e => setSelectedHero(e.target.value)}
              className="arcane-input mt-1 w-full text-sm"
            >
              <option value="">-- Choose Hero --</option>
              {ownedHeroes.map(h => {
                const cat = CLASS_CATALYSTS[h.heroClass]
                return (
                  <option key={h.id} value={h.id}>
                    {h.name} ({h.heroClass}) {cat ? `${cat.icon}` : ''}
                  </option>
                )
              })}
            </select>
          </div>

          {/* Purpose */}
          <div>
            <label className="text-[10px] text-gold-700 uppercase tracking-[0.2em] font-display">Aspiration</label>
            <select
              value={selectedPurpose}
              onChange={e => setSelectedPurpose(e.target.value as CatalystPurpose)}
              className="arcane-input mt-1 w-full text-sm"
            >
              <option value="Awaken">Awaken</option>
              <option value="Skill Up">Skill Up</option>
            </select>
          </div>
        </div>

        {/* Catalyst preview — auto-derived from hero class */}
        {derivedCatalystInfo ? (
          <div className="flex items-center gap-2 px-3 py-2 rounded-sm bg-tome/40 border border-gold-700/20">
            <span className="text-[10px] text-gold-700 uppercase tracking-[0.2em] font-display">Catalyst</span>
            <span className="text-gold-700/30">→</span>
            <span className="text-lg">{derivedCatalystInfo.icon}</span>
            <span className="text-sm text-gold-100 font-display tracking-wide">{derivedCatalystInfo.name}</span>
            <span className="text-[9px] text-gold-700/60 font-mono ml-auto">
              derived from {selectedHeroData?.heroClass}
            </span>
          </div>
        ) : (
          <div className="text-[10px] text-gold-700/40 italic px-1 font-body">
            Select a hero to reveal their required catalyst
          </div>
        )}

        <div className="flex justify-end pt-1">
          <button
            onClick={handleAdd}
            disabled={!selectedHero || !derivedCatalyst}
            className="gilded-btn text-xs py-2 px-5"
          >
            ✦ Set Target
          </button>
        </div>
      </div>

      {/* Target cards */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Array(3).fill(0).map((_, i) => (
            <div key={i} className="h-20 rounded-lg bg-tome/50 border border-gold-700/20 animate-pulse" />
          ))}
        </div>
      ) : todayTargets.length === 0 ? (
        <div className="text-center py-10">
          <div className="text-gold-700/50 font-display italic text-sm">
            No catalysts targeted today...
          </div>
          <div className="text-gold-700/30 font-mono text-[10px] mt-1">
            Choose a hero and their path to ascension
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 stagger-fade">
          {todayTargets.map(target => {
            const hero = heroMap.get(target.hero_id)
            if (!hero) return null

            const catalystInfo = CLASS_CATALYSTS[target.catalyst_type as HeroClass]

            return (
              <div
                key={target.id}
                className={`relic-card p-3 space-y-2 transition-all ${
                  target.collected
                    ? 'border-verdant-400/40 shadow-[0_0_12px_rgba(95,161,95,0.15)]'
                    : ''
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-2 h-2 rounded-full flex-shrink-0 ${
                        target.collected
                          ? 'bg-gold-700/50'
                          : ELEMENT_DOT[hero.element].replace('text-', '')
                      }`}
                    />
                    <span className="text-xs text-gold-700">{CLASS_ICONS[hero.heroClass]}</span>
                    <span className={`font-display tracking-wide text-sm truncate ${
                      target.collected ? 'text-gold-700 line-through' : 'text-gold-100'
                    }`}>
                      {hero.name}
                    </span>
                  </div>
                  <button
                    onClick={() => onDelete(target.id)}
                    className="text-gold-700/50 hover:text-crimson-500 text-xs transition-colors flex-shrink-0"
                  >✕</button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-base">{catalystInfo?.icon}</span>
                  <span className="text-[10px] text-gold-100/70 font-display tracking-wide">{catalystInfo?.name}</span>
                  <span className="text-gold-700/30">·</span>
                  <span className={`text-[9px] font-display tracking-wider px-2 py-0.5 rounded-sm ${
                    target.purpose === 'Awaken'
                      ? 'bg-celestial-400/15 text-celestial-400 border border-celestial-400/30'
                      : 'bg-arcane-400/15 text-arcane-400 border border-arcane-400/30'
                  }`}>
                    {target.purpose}
                  </span>
                </div>

                <button
                  onClick={() => onToggle(target.id)}
                  className={`w-full text-[10px] font-display tracking-widest uppercase px-3 py-1.5 rounded-sm border transition-all ${
                    target.collected
                      ? 'bg-verdant-400/15 border-verdant-400/60 text-verdant-400'
                      : 'border-gold-700/50 text-gold-700 hover:border-gold-500/60 hover:text-gold-300'
                  }`}
                >
                  {target.collected ? '✓ Ascended' : 'Mark Ascended'}
                </button>
              </div>
            )
          })}
        </div>
      )}

      {/* History section */}
      {previousTargets.length > 0 && (
        <div className="mt-6 border-t border-zinc-800 pt-4">
          <button
            type="button"
            onClick={() => setShowHistory(s => !s)}
            className="w-full flex items-center justify-between text-left group"
          >
            <div>
              <h3 className="text-sm font-semibold text-zinc-400 group-hover:text-zinc-200 transition-colors">
                History catalyst
              </h3>
              <p className="text-xs text-zinc-600 mt-0.5">
                {previousTargets.length} catalyst selesai di hari sebelumnya
              </p>
            </div>
            <span className={`text-zinc-500 text-sm transition-transform ${showHistory ? 'rotate-180' : ''}`}>
              ▾
            </span>
          </button>

          {showHistory && (
            <div className="mt-3 space-y-2">
              {previousTargets.map(target => {
                const hero = HEROES.find(h => h.id === target.hero_id)
                if (!hero) return null
                const info = CLASS_CATALYSTS[hero.heroClass]
                return (
                  <div
                    key={target.id}
                    className="bg-zinc-900/40 border border-zinc-800/60 rounded-lg p-2.5 flex items-center gap-3 opacity-70"
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${ELEMENT_DOT[hero.element]} flex-shrink-0`} />
                    <div className="text-base flex-shrink-0">{CLASS_ICONS[hero.heroClass]}</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-zinc-400 truncate">{hero.name}</div>
                      <div className="text-xs text-zinc-600">
                        {info.icon} {info.name} · {target.purpose}
                      </div>
                    </div>
                    <div className="text-xs text-zinc-500 font-mono flex-shrink-0">
                      {new Date(target.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
