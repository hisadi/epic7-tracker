import { HUNTS } from '../data/heroes'
import { useFarming } from '../hooks/useFarming'
import HuntCard from '../components/farming/HuntCard'

export default function Farming() {
  const { loading, getTodayLog, toggleDaily, addRun, setTarget, totalRuns } = useFarming()

  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
  const doneCount = HUNTS.filter(h => getTodayLog(h.name)?.daily_done).length

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Farming Route</h1>
        <p className="text-zinc-500 text-sm mt-1">{today}</p>
        <div className="mt-3 flex items-center gap-3">
          <div className="flex-1 bg-zinc-900 rounded-full h-2 overflow-hidden">
            <div
              className="bg-green-500 h-2 rounded-full transition-all"
              style={{ width: `${(doneCount / HUNTS.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-zinc-500 font-mono">{doneCount}/{HUNTS.length} done</span>
        </div>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(7).fill(0).map((_, i) => <div key={i} className="h-48 bg-zinc-900 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* Summary */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="text-sm font-semibold text-white mb-3">Total Runs All Time</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {HUNTS.map(hunt => (
            <div key={hunt.name} className="text-center">
              <div className="text-lg">{hunt.icon}</div>
              <div className="text-white font-bold font-mono text-lg">{totalRuns(hunt.name)}</div>
              <div className="text-zinc-600 text-xs">{hunt.name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
