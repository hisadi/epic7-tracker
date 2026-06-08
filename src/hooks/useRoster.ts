import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { RosterEntry } from '../types'

export function useRoster() {
  const [roster, setRoster] = useState<RosterEntry[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('roster').select('*')
    setRoster(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const upsert = async (heroId: string, fields: Partial<RosterEntry>) => {
    const existing = roster.find(r => r.hero_id === heroId)
    if (existing) {
      const { data } = await supabase.from('roster').update(fields).eq('hero_id', heroId).select().single()
      if (data) setRoster(prev => prev.map(r => r.hero_id === heroId ? { ...r, ...data } : r))
    } else {
      const { data } = await supabase.from('roster').insert({ hero_id: heroId, owned: false, built: false, stars: 0, gear_set: '', notes: '', ...fields }).select().single()
      if (data) setRoster(prev => [...prev, data])
    }
  }

  const toggleOwned = async (heroId: string) => {
    const existing = roster.find(r => r.hero_id === heroId)
    await upsert(heroId, { owned: !existing?.owned, built: existing?.owned ? false : existing?.built })
  }

  const toggleBuilt = async (heroId: string) => {
    const existing = roster.find(r => r.hero_id === heroId)
    if (!existing?.owned) return
    await upsert(heroId, { built: !existing?.built })
  }

  const updateNotes = async (heroId: string, notes: string, gear_set: string) => {
    await upsert(heroId, { notes, gear_set })
  }

  const getEntry = (heroId: string) => roster.find(r => r.hero_id === heroId)

  return { roster, loading, toggleOwned, toggleBuilt, updateNotes, getEntry, refetch: fetch }
}
