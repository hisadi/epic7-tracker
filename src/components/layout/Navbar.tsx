import { NavLink } from 'react-router-dom'

const links = [
  { to: '/',        label: 'Roster',   icon: '⚔' },
  { to: '/teams',   label: 'Convene',  icon: '✦' },
  { to: '/farming', label: 'Hunt',     icon: '☽' },
]

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-void/90 backdrop-blur-md border-b border-gold-700/40 shadow-[0_2px_20px_rgba(0,0,0,0.6)]">
      {/* Gilded top accent line */}
      <div className="h-px bg-gold-shine opacity-60" />

      <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4 md:px-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <span className="text-2xl text-gold-300 drop-shadow-[0_0_8px_rgba(232,200,118,0.5)]">✦</span>
          </div>
          <div>
            <div className="font-display text-gold-100 text-base tracking-[0.2em] uppercase leading-none">
              Epic Seven
            </div>
            <div className="font-display text-gold-500 text-[10px] tracking-[0.3em] uppercase">
              Tracker
            </div>
          </div>
        </div>

        {/* Nav links */}
        <div className="flex items-center gap-1">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `group relative flex items-center gap-2 px-4 py-2 rounded-md font-display tracking-widest text-xs uppercase transition-all duration-200 ${
                  isActive
                    ? 'text-gold-100 bg-gradient-to-b from-gold-700/30 to-tome border border-gold-500/60'
                    : 'text-gold-700 hover:text-gold-300 border border-transparent hover:border-gold-700/40'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? 'text-gold-300' : 'text-gold-700 group-hover:text-gold-500'}>
                    {l.icon}
                  </span>
                  <span className="hidden sm:inline">{l.label}</span>
                  {isActive && (
                    <span className="absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-px bg-gold-shine" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
