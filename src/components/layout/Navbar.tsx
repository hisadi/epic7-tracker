import { NavLink } from 'react-router-dom'

const links = [
  { to: '/',        label: 'Roster',   icon: '👥' },
  { to: '/teams',   label: 'Teams',    icon: '⚔️' },
  { to: '/farming', label: 'Farming',  icon: '🌾' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-zinc-950 border-b border-zinc-800 px-4 md:px-6">
      <div className="max-w-6xl mx-auto flex items-center justify-between h-14">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌌</span>
          <span className="font-bold text-white text-sm tracking-wide">E7 Tracker</span>
        </div>
        <div className="flex items-center gap-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-zinc-800 text-white'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'}`
              }
            >
              <span>{l.icon}</span>
              <span className="hidden sm:block">{l.label}</span>
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
