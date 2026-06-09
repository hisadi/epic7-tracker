import { useState } from 'react'
import { HEROES, ELEMENT_DOT, CLASS_ICONS } from '../data/heroes'
import { useTeams } from '../hooks/useTeams'
import { useRoster } from '../hooks/useRoster'
import TeamSlot from '../components/team/TeamSlot'
import { GAME_MODES } from '../data/heroes'
import type { Team } from '../types'

const SLOT_LABELS = ['Vanguard', 'Wing L.', 'Wing R.', 'Guardian']

function TeamCard({ team, onDelete, onEdit }: { team: Team; onDelete: () => void; onEdit: () => void }) {
  const slots = [team.slot1, team.slot2, team.slot3, team.slot4]
  return (
    <div className="relic-card p-4 space-y-3">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-0.5">
          <div className="font-display tracking-wider text-gold-100 text-sm uppercase">
            {team.name}
          </div>
          <div className="text-[10px] text-gold-700 uppercase tracking-[0.2em] font-body">
            {team.mode}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={onEdit} className="ghost-btn text-[10px]">✎</button>
          <button onClick={onDelete} className="ghost-btn text-[10px]">✕</button>
        </div>
      </div>

      {/* Slots */}
      <div className="grid grid-cols-4 gap-2">
        {slots.map((slotId, i) => {
          const hero = HEROES.find(h => h.id === slotId)
          return (
            <div key={i} className={`relative rounded-sm border p-2 text-center overflow-hidden ${
              hero
                ? 'bg-gradient-to-b from-tome to-void border-gold-700/50'
                : 'bg-tome/40 border-gold-700/20'
            }`}>
              <div className="text-[9px] text-gold-700 uppercase tracking-widest font-display mb-1">
                {SLOT_LABELS[i]}
              </div>
              {hero ? (
                <>
                  <div className="flex justify-center mb-1">
                    <div className={`w-2 h-2 rounded-full gem ${ELEMENT_DOT[hero.element]}`} />
                  </div>
                  <div className="text-sm">{CLASS_ICONS[hero.heroClass]}</div>
                  <div className="text-[10px] text-gold-100/80 mt-1 leading-tight truncate font-display tracking-wide">
                    {hero.name}
                  </div>
                </>
              ) : (
                <div className="text-gold-700/40 text-[9px] py-2 font-display tracking-wider">
                  Vacant
                </div>
              )}
            </div>
          )
        })}
      </div>

      {team.notes && (
        <p className="text-[10px] text-gold-700 italic font-body leading-relaxed pt-1 border-t border-gold-700/20">
          {team.notes}
        </p>
      )}
    </div>
  )
}

export default function TeamBuilder() {
  const { teams, loading, createTeam, updateTeam, deleteTeam } = useTeams()
  const { roster } = useRoster()

  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [teamName, setTeamName] = useState('')
  const [mode, setMode] = useState(GAME_MODES[0])
  const [notes, setNotes] = useState('')
  const [slots, setSlots] = useState<(string | null)[]>([null, null, null, null])

  const ownedHeroes = HEROES.filter(h => roster.find(r => r.hero_id === h.id && r.owned))

  function resetForm() {
    setTeamName(''); setMode(GAME_MODES[0]); setNotes(''); setSlots([null, null, null, null]); setEditingId(null)
  }

  function openEdit(team: Team) {
    setTeamName(team.name); setMode(team.mode); setNotes(team.notes)
    setSlots([team.slot1, team.slot2, team.slot3, team.slot4])
    setEditingId(team.id); setShowForm(true)
  }

  async function handleSave() {
    if (!teamName.trim()) return
    const payload = { name: teamName, mode, notes, slot1: slots[0], slot2: slots[1], slot3: slots[2], slot4: slots[3] }
    if (editingId) {
      await updateTeam(editingId, payload)
    } else {
      await createTeam(payload as Omit<Team, 'id' | 'created_at'>)
    }
    resetForm(); setShowForm(false)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="text-center md:text-left">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="h-px w-10 bg-gold-shine opacity-40 hidden md:block" />
            <h1 className="font-display text-3xl md:text-4xl tracking-[0.15em] uppercase text-gold-100">
              Convene
            </h1>
            <div className="h-px w-10 bg-gold-shine opacity-40 hidden md:block" />
          </div>
          <p className="text-xs text-gold-700 mt-1 font-mono tracking-widest">
            {teams.length} {teams.length === 1 ? 'convention' : 'conventions'} recorded
          </p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="gilded-btn text-xs py-2 px-5"
        >
          ✦ New Convention
        </button>
      </div>

      {/* Build Form */}
      {showForm && (
        <div className="relic-card p-6 space-y-5 border-gold-500/50 shadow-[0_0_40px_rgba(201,164,73,0.08)]">
          <div className="flex items-center justify-between">
            <h2 className="font-display tracking-widest text-gold-100 text-sm uppercase">
              {editingId ? '✎ Modify Convention' : '✦ Forge New Convention'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-gold-700 uppercase tracking-[0.2em] font-display">Convention Name</label>
              <input
                value={teamName} onChange={e => setTeamName(e.target.value)}
                placeholder="e.g. Wyvern Vanguard"
                className="arcane-input mt-1 w-full text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] text-gold-700 uppercase tracking-[0.2em] font-display">Domain</label>
              <select
                value={mode} onChange={e => setMode(e.target.value)}
                className="arcane-input mt-1 w-full text-sm"
              >
                {GAME_MODES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          {/* 4 Slots */}
          <div>
            <label className="text-[10px] text-gold-700 uppercase tracking-[0.2em] font-display mb-3 block">
              Vanguard Formation — Vanguard → Guardian
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {slots.map((slotId, i) => (
                <TeamSlot
                  key={i}
                  slotIndex={i}
                  heroId={slotId}
                  heroes={ownedHeroes}
                  label={SLOT_LABELS[i]}
                  onSelect={id => { const s = [...slots]; s[i] = id; setSlots(s) }}
                />
              ))}
            </div>
          </div>

          <div>
            <label className="text-[10px] text-gold-700 uppercase tracking-[0.2em] font-display">Tactics</label>
            <textarea
              value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Build requirements, rotation notes..."
              rows={2}
              className="arcane-input mt-1 w-full text-sm resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end pt-2">
            <button onClick={() => { resetForm(); setShowForm(false) }} className="ghost-btn text-xs">
              Abandon
            </button>
            <button onClick={handleSave} className="gilded-btn text-xs">
              {editingId ? '✎ Update' : '✦ Seal Convention'}
            </button>
          </div>
        </div>
      )}

      {/* Teams list */}
      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {Array(4).fill(0).map((_, i) => <div key={i} className="h-40 rounded-lg bg-tome/50 border border-gold-700/20 animate-pulse" />)}
        </div>
      ) : teams.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-gold-700/60 font-display italic text-lg">
            No conventions have been sworn...
          </div>
          <div className="text-gold-700/40 font-mono text-xs mt-2">
            Forge your first team to begin
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4 stagger-fade">
          {teams.map(team => (
            <TeamCard
              key={team.id}
              team={team}
              onDelete={() => { if (confirm('Dissolve this convention?')) deleteTeam(team.id) }}
              onEdit={() => openEdit(team)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
