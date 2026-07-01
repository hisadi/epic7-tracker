import { HUNTS, HEROES } from '../data/heroes'
import { useFarming } from '../hooks/useFarming'
import { useCatalyst } from '../hooks/useCatalyst'
import { useRoster } from '../hooks/useRoster'
import HuntCard from '../components/farming/HuntCard'
import CatalystTracker from '../components/farming/CatalystTracker'
import FarmCalendar from '../components/farming/FarmCalendar'

export default function Farming() {
  const { loading, getTodayLog, toggleDaily, addRun, setTarget, totalRuns } = useFarming()
  const { roster } = useRoster()
  const { getTodayTargets, getPreviousTargets, addTarget, toggleCollected, deleteTarget } = useCatalyst()

  const ownedHeroes = HEROES.filter(h => roster.find(r => r.hero_id === h.id && r.owned))

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const doneCount = HUNTS.filter(h => getTodayLog(h.name)?.daily_done).length

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="flex items-center justify-center gap-4">
          <div className="h-px w-16 bg-gold-shine opacity-60" />
          <span className="text-gold-500 text-xs tracking-[0.4em] font-display uppercase">Daily Chronicle</span>
          <div className="h-px w-16 bg-gold-shine opacity-60" />
        </div>
        <h1 className="font-display text-4xl md:text-5xl text-gold-100 tracking-[0.15em] uppercase">
          Hunt & Gather
        </h1>
        <p className="text-gold-700 font-body italic text-sm">{today}</p>
        <div className="flex items-center justify-center gap-3 pt-2">
          <div className="flex-1 w-48 bg-tome rounded-full h-2 overflow-hidden border border-gold-700/30">
            <div
              className="bg-gradient-to-r from-gold-700 via-gold-500 to-gold-100 h-2 transition-all duration-500"
              style={{ width: `${(doneCount / HUNTS.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-gold-500 font-mono">{doneCount}/{HUNTS.length} complete</span>
        </div>
      </div>

      {/* Hunt Cards */}
      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(7).fill(0).map((_, i) => <div key={i} className="h-48 rounded-lg bg-tome/50 border border-gold-700/20 animate-pulse" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 stagger-fade">
          {HUNTS.map(hunt => (
            <HuntCard
              key={hunt.name}
              hunt={hunt}
              todayLog={getTodayLog(hunt.name)}
              totalRuns={totalRuns(hunt.name)}
              onToggleDaily={() => toggleDaily(hunt.name)}
              onAddRun={delta => addRun(hunt.name, delta)}
              onSetTarget={target => setTarget(hunt.name, target)}
            />
          ))}
        </div>
      )}

      {/* Farming Calendar */}
      <div>
        <h2 className="text-xl font-bold text-white mb-4">📅 Farming Calendar</h2>
        <FarmCalendar />
      </div>

      {/* Catalyst Tracker */}
      <div className="relic-card p-6 space-y-5">
        <CatalystTracker
          ownedHeroes={ownedHeroes}
          todayTargets={getTodayTargets()}
          previousTargets={getPreviousTargets()}
          loading={false}
          onAdd={(heroId, catalystType, purpose) => addTarget(heroId, catalystType, purpose)}
          onToggle={(id) => toggleCollected(id)}
          onDelete={(id) => deleteTarget(id)}
        />
      </div>

      {/* Summary */}
      <div className="relic-card p-5">
        <div className="font-display tracking-widest text-gold-100 text-xs uppercase mb-4">
          ◆ Total Runs — All Time ◆
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {HUNTS.map(hunt => (
            <div key={hunt.name} className="text-center">
              <div className="text-2xl mb-1">{hunt.icon}</div>
              <div className="text-gold-100 font-bold font-mono text-xl">{totalRuns(hunt.name)}</div>
              <div className="text-gold-700 text-[10px] uppercase tracking-[0.15em]">{hunt.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
