import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { FarmingLog, HuntName } from '../types'

const today = () => new Date().toISOString().slice(0, 10)

export function useFarming() {
  const [logs, setLogs] = useState<FarmingLog[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('farming_log').select('*').order('hunt')
    setLogs(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const getTodayLog = (hunt: HuntName) =>
    logs.find(l => l.hunt === hunt && l.date === today())

  const upsertLog = async (hunt: HuntName, fields: Partial<FarmingLog>) => {
    const existing = getTodayLog(hunt)
    if (existing) {
      const { data } = await supabase.from('farming_log').update(fields).eq('id', existing.id).select().single()
      if (data) setLogs(prev => prev.map(l => l.id === existing.id ? { ...l, ...data } : l))
    } else {
      const { data } = await supabase.from('farming_log').insert({
        hunt, date: today(), runs_done: 0, daily_done: false, target_gear: '', ...fields,
      }).select().single()
      if (data) setLogs(prev => [...prev, data])
    }
  }

  const toggleDaily = async (hunt: HuntName) => {
    const log = getTodayLog(hunt)
    await upsertLog(hunt, { daily_done: !log?.daily_done })
  }

  const addRun = async (hunt: HuntName, delta = 1) => {
    const log = getTodayLog(hunt)
    const current = log?.runs_done ?? 0
    await upsertLog(hunt, { runs_done: Math.max(0, current + delta) })
  }

  const setTarget = async (hunt: HuntName, target_gear: string) => {
    await upsertLog(hunt, { target_gear })
  }

  // All-time total runs per hunt
  const totalRuns = (hunt: HuntName) =>
    logs.filter(l => l.hunt === hunt).reduce((s, l) => s + (l.runs_done || 0), 0)

  return { logs, loading, getTodayLog, toggleDaily, addRun, setTarget, totalRuns }
}
