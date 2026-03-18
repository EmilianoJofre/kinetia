import { Bell, Search } from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'

export default function Header() {
  const { user } = useAuth()
  return (
    <header className="bg-surface border-b border-border px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2 bg-background rounded-lg px-3 py-2 w-72">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Buscar jugadores, equipos..."
          className="bg-transparent text-sm outline-none w-full text-text-primary placeholder-gray-400"
        />
      </div>
      <div className="flex items-center gap-4">
        <button className="relative p-2 text-gray-500 hover:text-primary rounded-lg hover:bg-background transition-colors">
          <Bell size={18} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">{user?.nombre?.charAt(0)?.toUpperCase()}</span>
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-text-primary">{user?.nombre}</p>
            <p className="text-xs text-gray-500 capitalize">{user?.rol}</p>
          </div>
        </div>
      </div>
    </header>
  )
}
