import { NavLink, Link } from 'react-router-dom'
import { HEROES } from '../../data/heroes'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 bg-void/85 backdrop-blur-md border-b border-gold-700/30">
      <div className="max-w-6xl mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-2xl text-arcane-400 group-hover:animate-glow-pulse">🔮</span>
          <div>
            <div className="font-display text-base text-gold-300 text-glow leading-none">E7 Tracker</div>
            <div className="font-mono text-[9px] text-gold-700 tracking-widest uppercase mt-0.5">
              {HEROES.length} heroes indexed
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-1 font-display text-sm">
          {[
            { to: '/',         label: 'Roster',    icon: '⚔' },
            { to: '/teams',    label: 'Teams',     icon: '✦' },
            { to: '/farming',  label: 'Farming',   icon: '⚜' },
          ].map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `relative px-3 md:px-4 py-2 rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-gold-100 bg-arcane-600/20 shadow-arcane'
                    : 'text-gold-700 hover:text-gold-300 hover:bg-tome/60'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className="mr-1.5 text-arcane-400">{icon}</span>
                  {label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gold-500 shadow-gold-glow" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}
