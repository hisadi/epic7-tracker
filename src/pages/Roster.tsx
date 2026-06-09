import { useState, useMemo } from 'react'
import { HEROES } from '../data/heroes'
import { useRoster } from '../hooks/useRoster'
import HeroCard from '../components/roster/HeroCard'
import HeroFilter from '../components/roster/HeroFilter'
import type { Element, HeroClass } from '../types'

export default function Roster() {
  const { roster, loading, toggleOwned, toggleBuilt, updateNotes, getEntry } = useRoster()
  const [search, setSearch] = useState('')
  const [element, setElement] = useState<Element | 'all'>('all')
  const [heroClass, setHeroClass] = useState<HeroClass | 'all'>('all')
  const [showOwned, setShowOwned] = useState<'all' | 'owned' | 'unowned'>('all')
  const [showBuilt, setShowBuilt] = useState<'all' | 'built' | 'unbuilt'>('all')

  const filtered = useMemo(() => HEROES.filter(h => {
    if (search && !h.name.toLowerCase().includes(search.toLowerCase())) return false
    if (element !== 'all' && h.element !== element) return false
    if (heroClass !== 'all' && h.heroClass !== heroClass) return false
    const entry = getEntry(h.id)
    if (showOwned === 'owned' && !entry?.owned) return false
    if (showOwned === 'unowned' && entry?.owned) return false
    if (showBuilt === 'built' && !entry?.built) return false
    if (showBuilt === 'unbuilt' && entry?.built) return false
    return true
  }), [search, element, heroClass, showOwned, showBuilt, roster])

  const ownedCount = HEROES.filter(h => getEntry(h.id)?.owned).length
  const builtCount = HEROES.filter(h => getEntry(h.id)?.built).length

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gold-shine opacity-60" />
          <span className="text-gold-500 text-xs tracking-[0.4em] font-display uppercase">Volume I</span>
          <div className="h-px w-16 bg-gold-shine opacity-60" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-gold-100 tracking-[0.15em] uppercase">
          Heroes of Érzé
        </h1>
        <p className="text-gold-700 font-body italic text-sm">
          “In the realm of Orbis, destiny calls those who dare to answer.”
        </p>
        <div className="flex items-center justify-center gap-6 pt-2 font-mono text-xs">
          <div className="text-center">
            <div className="text-gold-300 text-lg font-bold">{ownedCount}</div>
            <div className="text-gold-700 uppercase tracking-widest text-[10px]">Owned</div>
          </div>
          <div className="w-px h-8 bg-gold-700/40" />
          <div className="text-center">
            <div className="text-gold-300 text-lg font-bold">{builtCount}</div>
            <div className="text-gold-700 uppercase tracking-widest text-[10px]">Forged</div>
          </div>
          <div className="w-px h-8 bg-gold-700/40" />
          <div className="text-center">
            <div className="text-gold-300 text-lg font-bold">{HEROES.length}</div>
            <div className="text-gold-700 uppercase tracking-widest text-[10px]">Chronicled</div>
          </div>
        </div>
      </div>

      <div className="ornate-divider" />

      {/* Filters */}
      <HeroFilter
        search={search} element={element} heroClass={heroClass}
        showOwned={showOwned} showBuilt={showBuilt}
        onSearch={setSearch} onElement={setElement} onClass={setHeroClass}
        onOwned={setShowOwned} onBuilt={setShowBuilt}
      />

      {/* Count */}
      <div className="flex items-center justify-between">
        <div className="text-xs text-gold-700 font-mono uppercase tracking-widest">
          {filtered.length} {filtered.length === 1 ? 'soul' : 'souls'} summoned
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array(12).fill(0).map((_, i) => (
            <div key={i} className="h-16 rounded-lg bg-tome/50 border border-gold-700/20 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger-fade">
          {filtered.map(hero => (
            <HeroCard
              key={hero.id}
              hero={hero}
              entry={getEntry(hero.id)}
              onToggleOwned={toggleOwned}
              onToggleBuilt={toggleBuilt}
              onSaveNotes={updateNotes}
            />
          ))}
          {filtered.length === 0 && (
            <div className="col-span-full text-center py-20">
              <div className="text-gold-700 font-display italic text-lg">
                No echoes from the abyss...
              </div>
              <div className="text-gold-700/50 font-mono text-xs mt-2">
                Adjust your incantation
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
