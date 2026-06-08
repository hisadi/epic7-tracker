import { useState, useEffect, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import type { Team } from '../types'

export function useTeams() {
  const [teams, setTeams] = useState<Team[]>([])
  const [loading, setLoading] = useState(true)

  const fetch = useCallback(async () => {
    setLoading(true)
    const { data } = await supabase.from('teams').select('*').order('created_at', { ascending: false })
    setTeams(data || [])
    setLoading(false)
  }, [])

  useEffect(() => { fetch() }, [fetch])

  const createTeam = async (team: Omit<Team, 'id' | 'created_at'>) => {
    const { data } = await supabase.from('teams').insert(team).select().single()
    if (data) setTeams(prev => [data, ...prev])
    return data
  }

  const updateTeam = async (id: string, fields: Partial<Team>) => {
    const { data } = await supabase.from('teams').update(fields).eq('id', id).select().single()
    if (data) setTeams(prev => prev.map(t => t.id === id ? { ...t, ...data } : t))
  }

  const deleteTeam = async (id: string) => {
    await supabase.from('teams').delete().eq('id', id)
    setTeams(prev => prev.filter(t => t.id !== id))
  }

  return { teams, loading, createTeam, updateTeam, deleteTeam, refetch: fetch }
}
