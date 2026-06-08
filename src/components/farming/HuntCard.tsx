import { useState } from 'react'
import type { Hunt, FarmingLog } from '../../types'

interface Props {
  hunt: Hunt
  todayLog?: FarmingLog
  totalRuns: number
  onToggleDaily: () => void
  onAddRun: (delta: number) => void
  onSetTarget: (target: string) => void
}

const PRIORITY_COLOR = {
  high:   'border-red-500/30 bg-red-500/5',
  medium: 'border-yellow-500/30 bg-yellow-500/5',
  low:    'border-zinc-700 bg-zinc-900/50',
}

export default function HuntCard({ hunt, todayLog, totalRuns, onToggleDaily, onAddRun, onSetTarget }: Props) {
  const [editTarget, setEditTarget] = useState(false)
  const [targetInput, setTargetInput] = useState(todayLog?.target_gear || '')

  const runsToday = todayLog?.runs_done || 0
  const dailyDone = todayLog?.daily_done || false

  return (
    <div className={`rounded-xl border p-4 space-y-3 ${PRIORITY_COLOR[hunt.priority]}`}>
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl">{hunt.icon}</span>
            <span className="font-bold text-white">{hunt.name}</span>
            {hunt.priority === 'high' && (
              <span className="text-xs bg-red-500/20 text-red-400 border border-red-500/30 rounded px-1.5">Priority</span>
            )}
          </div>
          <p className="text-xs text-zinc-500 mt-0.5">{hunt.description}</p>
        </div>
        {/* Daily done toggle */}
        <button
          onClick={onToggleDaily}
          className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-lg border font-medium transition-all ${
            dailyDone
              ? 'bg-green-500/20 border-green-500/40 text-green-400'
              : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
          }`}
        >
          {dailyDone ? '✓ Done' : 'Daily'}
        </button>
      </div>

      {/* Gear sets */}
      <div className="flex flex-wrap gap-1.5">
        {hunt.gearSets.map(g => (
          <span key={g} className="text-xs bg-zinc-800 border border-zinc-700 text-zinc-400 rounded px-2 py-0.5">
            {g}
          </span>
        ))}
      </div>

      {/* Run counter */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2">
          <button onClick={() => onAddRun(-1)} className="text-zinc-500 hover:text-white transition-colors font-mono">−</button>
          <div className="text-center min-w-[40px]">
            <div className="text-white font-bold font-mono text-lg leading-none">{runsToday}</div>
            <div className="text-zinc-600 text-xs">hari ini</div>
          </div>
          <button onClick={() => onAddRun(1)} className="text-zinc-500 hover:text-white transition-colors font-mono">+</button>
        </div>
        <div className="text-center">
          <div className="text-zinc-400 font-mono text-sm font-bold">{totalRuns}</div>
          <div className="text-zinc-600 text-xs">total runs</div>
        </div>
      </div>

      {/* Target gear */}
      <div>
        {editTarget ? (
          <div className="flex gap-2">
            <input
              autoFocus
              value={targetInput}
              onChange={e => setTargetInput(e.target.value)}
              placeholder="e.g. Speed boots +30% CR"
              className="flex-1 bg-zinc-900 border border-zinc-700 rounded-lg px-3 py-1.5 text-xs text-white placeholder-zinc-600 outline-none focus:border-zinc-500"
              onKeyDown={e => {
                if (e.key === 'Enter') { onSetTarget(targetInput); setEditTarget(false) }
                if (e.key === 'Escape') setEditTarget(false)
              }}
            />
            <button
              onClick={() => { onSetTarget(targetInput); setEditTarget(false) }}
              className="text-xs bg-zinc-700 hover:bg-zinc-600 text-white px-3 py-1.5 rounded-lg"
            >
              OK
            </button>
          </div>
        ) : (
          <button
            onClick={() => { setTargetInput(todayLog?.target_gear || ''); setEditTarget(true) }}
            className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1.5"
          >
            🎯 {todayLog?.target_gear ? <span className="text-zinc-300">{todayLog.target_gear}</span> : 'Set target gear...'}
          </button>
        )}
      </div>
    </div>
  )
}
