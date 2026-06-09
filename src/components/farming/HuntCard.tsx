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

const PRIORITY_STYLE: Record<string, { bg: string; badge?: string }> = {
  high:   { bg: 'from-ruby-600/[0.08] to-void border-ruby-400/30' },
  medium: { bg: 'from-gold-700/[0.06] to-void border-gold-700/40' },
  low:    { bg: 'from-tome/60 to-void border-gold-700/20' },
}

export default function HuntCard({ hunt, todayLog, totalRuns, onToggleDaily, onAddRun, onSetTarget }: Props) {
  const [editTarget, setEditTarget] = useState(false)
  const [targetInput, setTargetInput] = useState(todayLog?.target_gear || '')

  const runsToday = todayLog?.runs_done || 0
  const dailyDone = todayLog?.daily_done || false

  const priority = PRIORITY_STYLE[hunt.priority]

  return (
    <div className={`relic-card bg-gradient-to-br ${priority.bg} p-4 space-y-3 relative overflow-hidden`}>
      {/* Priority glow */}
      {hunt.priority === 'high' && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-ruby-400/5 rounded-full blur-2xl pointer-events-none" />
      )}

      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-xl filter drop-shadow-[0_0_6px_rgba(232,200,118,0.4)]">{hunt.icon}</span>
            <span className="font-display tracking-wider text-gold-100 text-sm uppercase">{hunt.name}</span>
            {hunt.priority === 'high' && (
              <span className="text-[9px] font-display tracking-[0.15em] uppercase bg-gradient-to-r from-ruby-600/40 to-ruby-600/20 text-ruby-400 border border-ruby-400/30 px-2 py-0.5 rounded-sm flex-shrink-0">
                Priority
              </span>
            )}
          </div>
          <p className="text-[10px] text-gold-700 mt-0.5 italic font-body">{hunt.description}</p>
        </div>

        {/* Daily done toggle */}
        <button
          onClick={onToggleDaily}
          className={`flex-shrink-0 text-[10px] font-display tracking-widest uppercase px-3 py-1.5 rounded-sm border transition-all ${
            dailyDone
              ? 'bg-verdant-400/15 border-verdant-400/60 text-verdant-400 shadow-[0_0_8px_rgba(95,161,95,0.3)]'
              : 'border-gold-700/50 text-gold-700 hover:border-gold-500/60 hover:text-gold-300'
          }`}
        >
          {dailyDone ? '✓ Satisfied' : 'Satisfy'}
        </button>
      </div>

      {/* Gear sets */}
      <div className="flex flex-wrap gap-1.5">
        {hunt.gearSets.map(g => (
          <span key={g} className="text-[10px] bg-tome/80 border border-gold-700/40 text-gold-300 rounded-sm px-2 py-0.5 font-display tracking-wider">
            {g}
          </span>
        ))}
      </div>

      {/* Run counter */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-tome/80 border border-gold-700/40 rounded-sm px-3 py-2.5">
          <button onClick={() => onAddRun(-1)} className="text-gold-700 hover:text-gold-300 transition-colors font-mono text-sm">−</button>
          <div className="text-center min-w-[44px]">
            <div className="text-gold-100 font-bold font-mono text-lg leading-none">{runsToday}</div>
            <div className="text-gold-700 text-[9px] uppercase tracking-[0.1em]">today</div>
          </div>
          <button onClick={() => onAddRun(1)} className="text-gold-700 hover:text-gold-300 transition-colors font-mono text-sm">+</button>
        </div>
        <div className="text-center px-2">
          <div className="text-gold-300 font-mono text-sm font-bold">{totalRuns}</div>
          <div className="text-gold-700 text-[9px] uppercase tracking-[0.1em]">total</div>
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
              className="arcane-input flex-1 text-xs py-1.5"
              onKeyDown={e => {
                if (e.key === 'Enter') { onSetTarget(targetInput); setEditTarget(false) }
                if (e.key === 'Escape') setEditTarget(false)
              }}
            />
            <button
              onClick={() => { onSetTarget(targetInput); setEditTarget(false) }}
              className="ghost-btn text-xs py-1.5"
            >
              ✎
            </button>
          </div>
        ) : (
          <button
            onClick={() => { setTargetInput(todayLog?.target_gear || ''); setEditTarget(true) }}
            className="text-[10px] text-gold-700 hover:text-gold-300 transition-colors font-display tracking-wider flex items-center gap-1.5"
          >
            <span>✦</span>
            {todayLog?.target_gear
              ? <span className="text-gold-300">{todayLog.target_gear}</span>
              : 'Set artifact target...'}
          </button>
        )}
      </div>
    </div>
  )
}
