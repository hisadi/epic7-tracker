import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { CatalystTarget, CatalystType, CatalystPurpose } from '../types'

const today = () => new Date().toISOString().slice(0, 10)

export function useCatalyst() {
  const [targets, setTargets] = useState<CatalystTarget[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('catalyst_targets').select('*').order('created_at', { ascending: false })
    setTargets(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const getTodayTargets = () => targets.filter(t => t.date === today())

  const getUncollectedTodayCount = () =>
    targets.filter(t => t.date === today() && !t.collected).length

  const addTarget = async (heroId: string, catalystType: CatalystType, purpose: CatalystPurpose) => {
    const { data } = await supabase.from('catalyst_targets').insert({
      hero_id: heroId,
      catalyst_type: catalystType,
      purpose,
      collected: false,
      date: today(),
    }).select().single()
    if (data) setTargets(prev => [data, ...prev])
    return data
  }

  const toggleCollected = async (id: string) => {
    const existing = targets.find(t => t.id === id)
    if (!existing) return
    const { data } = await supabase.from('catalyst_targets')
      .update({ collected: !existing.collected })
      .eq('id', id)
      .select()
      .single()
    if (data) setTargets(prev => prev.map(t => t.id === id ? { ...t, ...data } : t))
  }

  const deleteTarget = async (id: string) => {
    await supabase.from('catalyst_targets').delete().eq('id', id)
    setTargets(prev => prev.filter(t => t.id !== id))
  }

  return { targets, loading, getTodayTargets, getUncollectedTodayCount, addTarget, toggleCollected, deleteTarget, refetch: fetch }
}
