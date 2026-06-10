import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { FarmPlan, FarmActivity } from '../types'

export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

export function getWeekDates(weekOffset: number): Date[] {
  const now = new Date()
  const dayOfWeek = now.getDay() === 0 ? 6 : now.getDay() - 1 // Senin = 0
  const monday = new Date(now)
  monday.setDate(now.getDate() - dayOfWeek + weekOffset * 7)
  monday.setHours(0, 0, 0, 0)
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    return d
  })
}

export function toDateStr(date: Date): string {
  return date.toISOString().slice(0, 10)
}

export function useFarmCalendar() {
  const [plans, setPlans] = useState<FarmPlan[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase
      .from('farm_plans')
      .select('*')
      .order('date', { ascending: true })
    setPlans(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const getWeekPlans = (weekOffset: number): FarmPlan[] => {
    const dates = getWeekDates(weekOffset).map(toDateStr)
    return plans.filter(p => dates.includes(p.date))
  }

  const addPlan = async (date: string, activity: FarmActivity, notes = '') => {
    const d = new Date(date)
    const week_number = getWeekNumber(d)
    const { data } = await supabase
      .from('farm_plans')
      .insert({ date, activity, notes, done: false, week_number })
      .select()
      .single()
    if (data) setPlans(prev => [...prev, data])
    return data
  }

  const toggleDone = async (id: string) => {
    const existing = plans.find(p => p.id === id)
    if (!existing) return
    const { data } = await supabase
      .from('farm_plans')
      .update({ done: !existing.done })
      .eq('id', id)
      .select()
      .single()
    if (data) setPlans(prev => prev.map(p => p.id === id ? { ...p, ...data } : p))
  }

  const deletePlan = async (id: string) => {
    await supabase.from('farm_plans').delete().eq('id', id)
    setPlans(prev => prev.filter(p => p.id !== id))
  }

  return { plans, loading, getWeekPlans, addPlan, toggleDone, deletePlan }
}