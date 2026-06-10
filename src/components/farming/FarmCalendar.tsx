import { useState } from 'react'
import { useFarmCalendar, getWeekDates, getWeekNumber, toDateStr } from '../../hooks/useFarmCalendar'
import type { FarmActivity } from '../../types'

const DAYS = ['Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab', 'Min']

const ACTIVITIES: { value: FarmActivity; icon: string; color: string }[] = [
  { value: 'Wyvern Hunt',          icon: '🐉', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
  { value: 'Golem Hunt',           icon: '🪨', color: 'bg-stone-500/20 text-stone-300 border-stone-500/30' },
  { value: 'Banshee Hunt',         icon: '👻', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
  { value: 'Azimanak Hunt',        icon: '🌿', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
  { value: 'Caides Hunt',          icon: '🕷️', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  { value: 'Spirit Altar',         icon: '✨', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  { value: 'Abyss',                icon: '🕳️', color: 'bg-slate-500/20 text-slate-300 border-slate-500/30' },
  { value: 'Catalyst Warrior',     icon: '⚔️', color: 'bg-red-500/20 text-red-300 border-red-500/30' },
  { value: 'Catalyst Mage',        icon: '🔮', color: 'bg-violet-500/20 text-violet-300 border-violet-500/30' },
  { value: 'Catalyst Knight',      icon: '🛡️', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  { value: 'Catalyst Soul Weaver', icon: '💚', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  { value: 'Catalyst Thief',       icon: '🗡️', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
  { value: 'Catalyst Ranger',      icon: '🏹', color: 'bg-lime-500/20 text-lime-300 border-lime-500/30' },
  { value: 'Gold Farming',         icon: '💰', color: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' },
  { value: 'EXP Farming',          icon: '⚡', color: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30' },
  { value: 'Rest',                 icon: '😴', color: 'bg-zinc-500/20 text-zinc-400 border-zinc-500/30' },
]

function getActivityMeta(activity: FarmActivity) {
  return ACTIVITIES.find(a => a.value === activity) ?? { icon: '❓', color: 'bg-zinc-800 text-zinc-400 border-zinc-700' }
}

function formatWeekRange(dates: Date[]): string {
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' }
  const start = dates[0].toLocaleDateString('id-ID', opts)
  const end = dates[6].toLocaleDateString('id-ID', opts)
  return `${start} – ${end}`
}

export default function FarmCalendar() {
  const { plans, loading, getWeekPlans, addPlan, toggleDone, deletePlan } = useFarmCalendar()
  const [weekOffset, setWeekOffset] = useState(0)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState<FarmActivity>('Wyvern Hunt')
  const [notes, setNotes] = useState('')

  const weekDates = getWeekDates(weekOffset)
  const weekPlans = getWeekPlans(weekOffset)
  const weekNum = getWeekNumber(weekDates[0])
  const todayStr = toDateStr(new Date())

  const selectedDatePlans = selectedDate
    ? weekPlans.filter(p => p.date === selectedDate)
    : []

  async function handleAddPlan() {
    if (!selectedDate) return
    await addPlan(selectedDate, selectedActivity, notes)
    setNotes('')
    setShowForm(false)
  }

  return (
    <div className="space-y-4">

      {/* Header minggu */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setWeekOffset(w => w - 1)}
          className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
        >
          ←
        </button>
        <div className="text-center">
          <div className="text-white font-semibold text-sm">Minggu ke-{weekNum}</div>
          <div className="text-zinc-500 text-xs font-mono">{formatWeekRange(weekDates)}</div>
        </div>
        <button
          onClick={() => setWeekOffset(w => w + 1)}
          className="p-2 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
        >
          →
        </button>
      </div>

      {/* Kalender grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {/* Day headers */}
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs text-zinc-600 font-mono pb-1">{d}</div>
        ))}

        {/* Day cells */}
        {weekDates.map((date, i) => {
          const dateStr = toDateStr(date)
          const dayPlans = weekPlans.filter(p => p.date === dateStr)
          const isToday = dateStr === todayStr
          const isSelected = dateStr === selectedDate
          const isPast = dateStr < todayStr

          return (
            <button
              key={i}
              onClick={() => {
                setSelectedDate(dateStr === selectedDate ? null : dateStr)
                setShowForm(false)
              }}
              className={`relative rounded-xl border p-1.5 min-h-[72px] flex flex-col gap-1 transition-all text-left
                ${isSelected ? 'border-white bg-zinc-800' : isToday ? 'border-zinc-500 bg-zinc-900' : 'border-zinc-800 bg-zinc-950 hover:border-zinc-700'}
                ${isPast && !isToday ? 'opacity-60' : ''}
              `}
            >
              {/* Tanggal */}
              <span className={`text-xs font-mono ${isToday ? 'text-white font-bold' : 'text-zinc-500'}`}>
                {date.getDate()}
              </span>

              {/* Activity badges */}
              <div className="flex flex-col gap-0.5 w-full">
                {dayPlans.slice(0, 2).map(plan => {
                  const meta = getActivityMeta(plan.activity)
                  return (
                    <div
                      key={plan.id}
                      className={`text-[9px] px-1 py-0.5 rounded border truncate leading-tight ${meta.color} ${plan.done ? 'opacity-50 line-through' : ''}`}
                    >
                      {meta.icon} {plan.activity.replace('Catalyst ', '').replace(' Hunt', '')}
                    </div>
                  )
                })}
                {dayPlans.length > 2 && (
                  <div className="text-[9px] text-zinc-600 px-1">+{dayPlans.length - 2} lagi</div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Detail hari yang dipilih */}
      {selectedDate && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-white font-semibold text-sm">
                {new Date(selectedDate + 'T00:00:00').toLocaleDateString('id-ID', {
                  weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
                })}
              </div>
              <div className="text-zinc-600 text-xs mt-0.5">
                {selectedDatePlans.length === 0 ? 'Belum ada plan' : `${selectedDatePlans.length} aktivitas`}
              </div>
            </div>
            <button
              onClick={() => setShowForm(f => !f)}
              className="text-xs bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-white px-3 py-1.5 rounded-lg transition-colors"
            >
              {showForm ? 'Batal' : '+ Tambah'}
            </button>
          </div>

          {/* Form tambah */}
          {showForm && (
            <div className="space-y-3 border-t border-zinc-800 pt-3">
              <div>
                <label className="text-xs text-zinc-500 uppercase tracking-wide">Aktivitas</label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {ACTIVITIES.map(a => (
                    <button
                      key={a.value}
                      onClick={() => setSelectedActivity(a.value)}
                      className={`text-xs px-2.5 py-1.5 rounded-lg border transition-all ${
                        selectedActivity === a.value
                          ? a.color + ' border-current'
                          : 'bg-zinc-950 border-zinc-800 text-zinc-500 hover:border-zinc-600'
                      }`}
                    >
                      {a.icon} {a.value}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-zinc-500 uppercase tracking-wide">Notes (opsional)</label>
                <input
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. target 20 runs"
                  className="mt-1 w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-600"
                />
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleAddPlan}
                  className="bg-white text-zinc-950 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-zinc-200 transition-colors"
                >
                  Simpan
                </button>
              </div>
            </div>
          )}

          {/* List aktivitas hari ini */}
          {selectedDatePlans.length > 0 && (
            <div className="space-y-2 border-t border-zinc-800 pt-3">
              {selectedDatePlans.map(plan => {
                const meta = getActivityMeta(plan.activity)
                return (
                  <div
                    key={plan.id}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border transition-all ${
                      plan.done
                        ? 'bg-zinc-800/50 border-green-500/20'
                        : 'bg-zinc-950 border-zinc-800'
                    }`}
                  >
                    <span className="text-lg flex-shrink-0">{meta.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium ${plan.done ? 'text-zinc-500 line-through' : 'text-white'}`}>
                        {plan.activity}
                      </div>
                      {plan.notes && (
                        <div className="text-xs text-zinc-600 mt-0.5">{plan.notes}</div>
                      )}
                    </div>
                    <div className="flex gap-2 flex-shrink-0">
                      <button
                        onClick={() => toggleDone(plan.id)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                          plan.done
                            ? 'bg-green-500/20 border-green-500/40 text-green-400'
                            : 'border-zinc-700 text-zinc-500 hover:border-zinc-500'
                        }`}
                      >
                        {plan.done ? '✓' : 'Done'}
                      </button>
                      <button
                        onClick={() => deletePlan(plan.id)}
                        className="text-zinc-700 hover:text-red-400 text-xs px-1 transition-colors"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Weekly summary */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
        <div className="text-xs text-zinc-500 uppercase tracking-wide mb-3">Ringkasan Minggu Ini</div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="text-center">
            <div className="text-white font-bold font-mono text-lg">{weekPlans.length}</div>
            <div className="text-zinc-600 text-xs">Total Plan</div>
          </div>
          <div className="text-center">
            <div className="text-green-400 font-bold font-mono text-lg">{weekPlans.filter(p => p.done).length}</div>
            <div className="text-zinc-600 text-xs">Selesai</div>
          </div>
          <div className="text-center">
            <div className="text-yellow-400 font-bold font-mono text-lg">{weekPlans.filter(p => !p.done).length}</div>
            <div className="text-zinc-600 text-xs">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-blue-400 font-bold font-mono text-lg">
              {weekPlans.length > 0 ? Math.round((weekPlans.filter(p => p.done).length / weekPlans.length) * 100) : 0}%
            </div>
            <div className="text-zinc-600 text-xs">Completion</div>
          </div>
        </div>
      </div>
    </div>
  )
}