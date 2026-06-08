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
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Hero Roster</h1>
          <p className="text-zinc-500 text-sm mt-1">
            {ownedCount} owned · {builtCount} built · {HEROES.length} total
          </p>
        </div>
      </div>

      {/* Filters */}
      <HeroFilter
        search={search} element={element} heroClass={heroClass}
        showOwned={showOwned} showBuilt={showBuilt}
        onSearch={setSearch} onElement={setElement} onClass={setHeroClass}
        onOwned={setShowOwned} onBuilt={setShowBuilt}
      />

      {/* Count */}
      <div className="text-xs text-zinc-600 font-mono">{filtered.length} hero ditampilkan</div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {Array(12).fill(0).map((_, i) => (
            <div key={i} className="h-16 rounded-xl bg-zinc-900 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
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
            <div className="col-span-full text-center py-16 text-zinc-600">
              Tidak ada hero yang cocok dengan filter ini.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
