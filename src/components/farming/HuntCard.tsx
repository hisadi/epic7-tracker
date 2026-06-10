import { useState } from 'react'
import type { Hunt, HuntName } from '../../types'

interface Props {
  hunt: Hunt
  todayLog?: { runs_done: number; daily_done: boolean; target_gear: string }
  totalRuns: number
  onToggleDaily: () => void
  onAddRun: (delta: number) => void
  onSetTarget: (target: string) => void
}

const PRIORITY_THEME = {
  high:   { ring: 'ring-amber-500/40',  glow: 'shadow-[0_0_18px_-6px_rgba(245,158,11,0.45)]',  badge: 'bg-amber-500/15 text-amber-300 border-amber-500/30',  label: 'Kritis' },
  medium: { ring: 'ring-violet-500/30',  glow: 'shadow-[0_0_18px_-8px_rgba(167,139,250,0.40)]',  badge: 'bg-violet-500/15 text-violet-300 border-violet-500/30',  label: 'Penting' },
  low:    { ring: 'ring-zinc-500/30',    glow: '',                                                  badge: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/30',     label: 'Opsional' },
}

const RUN_TARGETS = [3, 5, 10]

export default function HuntCard({ hunt, todayLog, totalRuns, onToggleDaily, onAddRun, onSetTarget }: Props) {
  const [editingTarget, setEditingTarget] = useState(false)
  const [targetDraft, setTargetDraft] = useState<string>(String(todayLog?.target_gear ?? ''))

  const runs = todayLog?.runs_done ?? 0
  const target = parseInt(todayLog?.target_gear ?? '0') || 0
  const done = todayLog?.daily_done ?? false
  const theme = PRIORITY_THEME[hunt.priority]
  const isHigh = hunt.priority === 'high'
  const progressPct = target > 0 ? Math.min(100, (runs / target) * 100) : 0
  const reached = target > 0 && runs >= target

  return (
    <div
      className={`
        group relative overflow-hidden rounded-xl
        bg-gradient-to-br from-[#1a1626]/95 to-[#0d0a18]/95
        border border-amber-900/30
        ring-1 ${theme.ring}
        ${isHigh ? theme.glow : ''}
        backdrop-blur-sm
        transition-all duration-300
        ${done ? 'opacity-70' : 'hover:border-amber-500/50 hover:-translate-y-0.5'}
      `}
    >
      {/* Decorative corner flourish */}
      <div className="pointer-events-none absolute -top-6 -right-6 w-20 h-20 rounded-full bg-amber-500/5 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-4 -left-4 w-16 h-16 rounded-full bg-violet-500/5 blur-2xl" />

      {/* Top accent bar */}
      <div className={`h-0.5 w-full ${isHigh ? 'bg-gradient-to-r from-amber-500/40 via-amber-400/70 to-amber-500/40' : 'bg-gradient-to-r from-transparent via-zinc-700/40 to-transparent'}`} />

      <div className="relative p-4 space-y-3">
        {/* Header */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`
              w-10 h-10 rounded-lg flex items-center justify-center text-2xl shrink-0
              bg-[#0a0814] border border-amber-900/30
              ${isHigh ? '' : 'grayscale-[30%]'}
            `}>
              {hunt.icon}
            </div>
            <div className="min-w-0">
              <div className="font-cinzel font-semibold text-zinc-100 text-sm tracking-wide truncate">
                {hunt.name}
              </div>
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-500/70">
                {hunt.gearSets.join(' · ')}
              </div>
            </div>
          </div>
          <span className={`text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded border ${theme.badge} shrink-0`}>
            {theme.label}
          </span>
        </div>

        {/* Description */}
        <p className="text-[11px] text-zinc-500 leading-relaxed italic font-cormorant">
          {hunt.description}
        </p>

        {/* Run counter */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onAddRun(-1)}
            disabled={runs === 0}
            className="w-7 h-7 rounded-md bg-[#0a0814] border border-amber-900/30 text-amber-400 hover:border-amber-500/50 hover:text-amber-200 disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-bold"
          >
            −
          </button>
          <div className="flex-1 text-center">
            <div className={`
              font-cinzel font-bold text-xl tabular-nums leading-none
              ${reached ? 'text-amber-300' : 'text-zinc-200'}
            `}>
              {runs}
            </div>
            <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 mt-0.5">
              {target > 0 ? `/ ${target} runs` : 'runs'}
            </div>
          </div>
          <button
            onClick={() => onAddRun(1)}
            className="w-7 h-7 rounded-md bg-[#0a0814] border border-amber-900/30 text-amber-400 hover:border-amber-500/50 hover:text-amber-200 transition-colors font-bold"
          >
            +
          </button>
        </div>

        {/* Progress bar */}
        {target > 0 && (
          <div className="space-y-1">
            <div className="h-1 rounded-full bg-[#0a0814] overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  reached
                    ? 'bg-gradient-to-r from-amber-500 to-amber-300 shadow-[0_0_8px_rgba(245,158,11,0.5)]'
                    : 'bg-gradient-to-r from-amber-700 to-amber-500'
                }`}
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Quick target buttons */}
        <div className="flex items-center gap-1">
          <span className="text-[9px] font-mono uppercase tracking-widest text-zinc-600 mr-1">Target:</span>
          {RUN_TARGETS.map(t => (
            <button
              key={t}
              onClick={() => onSetTarget(String(t))}
              className={`
                text-[10px] font-mono px-1.5 py-0.5 rounded
                transition-colors
                ${target === t
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'bg-[#0a0814] text-zinc-500 border border-amber-900/20 hover:border-amber-500/30 hover:text-zinc-300'
                }
              `}
            >
              {t}
            </button>
          ))}
          {target > 0 && (
            <button
              onClick={() => onSetTarget('')}
              className="text-[10px] font-mono px-1.5 py-0.5 rounded text-zinc-600 hover:text-zinc-400 ml-auto"
            >
              ✕
            </button>
          )}
        </div>

        {/* Footer: daily done + all-time */}
        <div className="flex items-center justify-between pt-2 border-t border-amber-900/20">
          <label className="flex items-center gap-1.5 cursor-pointer group/check">
            <input
              type="checkbox"
              checked={done}
              onChange={onToggleDaily}
              className="
                w-3.5 h-3.5 rounded
                bg-[#0a0814] border border-amber-900/40
                checked:bg-amber-500 checked:border-amber-400
                focus:ring-1 focus:ring-amber-500/40
                cursor-pointer
                accent-amber-500
              "
            />
            <span className={`
              text-[10px] font-mono uppercase tracking-widest
              ${done ? 'text-amber-300' : 'text-zinc-500 group-hover/check:text-zinc-300'}
            `}>
              {done ? '✓ Selesai' : 'Done?'}
            </span>
          </label>
          <div className="text-right">
            <div className="text-[9px] font-mono uppercase tracking-widest text-zinc-600">All-time</div>
            <div className="font-cinzel font-bold text-amber-500/80 text-sm tabular-nums">{totalRuns}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export type { HuntName }
