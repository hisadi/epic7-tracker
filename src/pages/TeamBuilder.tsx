import { useState } from 'react'
import { HEROES, ELEMENT_DOT, CLASS_ICONS } from '../data/heroes'
import { useTeams } from '../hooks/useTeams'
import { useRoster } from '../hooks/useRoster'
import TeamSlot from '../components/team/TeamSlot'
import { GAME_MODES } from '../data/heroes'
import type { Team } from '../types'

const SLOT_LABELS = ['Front', 'Mid Left', 'Mid Right', 'Back']

function TeamCard({ team, onDelete, onEdit }: { team: Team; onDelete: () => void; onEdit: () => void }) {
  const slots = [team.slot1, team.slot2, team.slot3, team.slot4]
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold text-white">{team.name}</div>
          <div className="text-xs text-zinc-500 mt-0.5">{team.mode}</div>
        </div>
        <div className="flex gap-2">
          <button onClick={onEdit} className="text-xs text-zinc-500 hover:text-white">✏️</button>
          <button onClick={onDelete} className="text-xs text-zinc-500 hover:text-red-400">🗑️</button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {slots.map((slotId, i) => {
          const hero = HEROES.find(h => h.id === slotId)
          return (
            <div key={i} className={`rounded-lg border p-2 text-center ${hero ? 'bg-zinc-800 border-zinc-700' : 'bg-zinc-950 border-zinc-800'}`}>
              {hero ? (
                <>
                  <div className="flex justify-center mb-1">
                    <div className={`w-2 h-2 rounded-full ${ELEMENT_DOT[hero.element]}`} />
                  </div>
                  <div className="text-sm">{CLASS_ICONS[hero.heroClass]}</div>
                  <div className="text-xs text-zinc-300 mt-1 leading-tight truncate">{hero.name}</div>
                </>
              ) : (
                <div className="text-zinc-700 text-xs py-2">—</div>
              )}
            </div>
          )
        })}
      </div>
      {team.notes && <p className="text-xs text-zinc-500 italic">{team.notes}</p>}
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

  // Filter heroes to owned only
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
    <div className="max-w-6xl mx-auto px-4 md:px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Team Builder</h1>
          <p className="text-zinc-500 text-sm mt-1">{teams.length} tim tersimpan</p>
        </div>
        <button
          onClick={() => { resetForm(); setShowForm(true) }}
          className="bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium px-4 py-2 rounded-xl transition-colors"
        >
          + Buat Tim
        </button>
      </div>

      {/* Build Form */}
      {showForm && (
        <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-5 space-y-4">
          <h2 className="text-lg font-bold text-white">{editingId ? 'Edit Tim' : 'Buat Tim Baru'}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wide">Nama Tim</label>
              <input
                value={teamName} onChange={e => setTeamName(e.target.value)}
                placeholder="e.g. Wyvern One-Shot"
                className="mt-1 w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-600"
              />
            </div>
            <div>
              <label className="text-xs text-zinc-500 uppercase tracking-wide">Mode</label>
              <select
                value={mode} onChange={e => setMode(e.target.value)}
                className="mt-1 w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-300 outline-none"
              >
                {GAME_MODES.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
          </div>

          {/* 4 Slots */}
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wide mb-3 block">Posisi Hero (Front → Back)</label>
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
            <label className="text-xs text-zinc-500 uppercase tracking-wide">Notes</label>
            <textarea
              value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Tips, gear requirements, dll..."
              rows={2}
              className="mt-1 w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 outline-none focus:border-zinc-600 resize-none"
            />
          </div>

          <div className="flex gap-3 justify-end">
            <button onClick={() => { resetForm(); setShowForm(false) }} className="text-sm text-zinc-500 hover:text-white px-4 py-2 rounded-xl">Batal</button>
            <button onClick={handleSave} className="bg-white text-zinc-950 text-sm font-semibold px-5 py-2 rounded-xl hover:bg-zinc-200 transition-colors">
              {editingId ? 'Update' : 'Simpan Tim'}
            </button>
          </div>
        </div>
      )}

      {/* Teams list */}
      {loading ? (
        <div className="grid md:grid-cols-2 gap-4">
          {Array(4).fill(0).map((_, i) => <div key={i} className="h-40 bg-zinc-900 rounded-xl animate-pulse" />)}
        </div>
      ) : teams.length === 0 ? (
        <div className="text-center py-20 text-zinc-600">
          Belum ada tim. Buat tim pertama kamu!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {teams.map(team => (
            <TeamCard
              key={team.id}
              team={team}
              onDelete={() => { if (confirm('Hapus tim ini?')) deleteTeam(team.id) }}
              onEdit={() => openEdit(team)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
