import { Bell, Search } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import ThemeToggle from '../shared/ThemeToggle'

export default function Header() {
  const { user } = useAuth()

  return (
    <header className="bg-surface border-b border-border px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 bg-background rounded-lg px-3 py-2 w-72 border border-border">
        <Search size={16} className="text-text-secondary shrink-0" />
        <input
          type="text"
          placeholder="Buscar jugadores, equipos..."
          className="bg-transparent text-sm outline-none w-full text-text-primary placeholder:text-text-secondary"
        />
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />

        {/* Notifications */}
        <button className="relative p-2 text-text-secondary hover:text-primary rounded-lg hover:bg-background transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </button>

        {/* User */}
        <div className="flex items-center gap-2 pl-2 border-l border-border">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{user?.nombre?.charAt(0)?.toUpperCase()}</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-text-primary leading-tight">{user?.nombre}</p>
            <p className="text-xs text-text-secondary capitalize leading-tight">{user?.rol}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
