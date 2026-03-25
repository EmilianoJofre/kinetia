import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, Shield, Trophy, Dumbbell,
  Activity, Heart, UserCog, ChevronLeft, ChevronRight, LogOut
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/jugadores', icon: Users, label: 'Jugadores' },
  { to: '/equipos', icon: Shield, label: 'Equipos' },
  { to: '/partidos', icon: Trophy, label: 'Partidos' },
  { to: '/entrenamientos', icon: Dumbbell, label: 'Entrenamientos' },
  { to: '/evaluaciones', icon: Activity, label: 'Estado Físico' },
  { to: '/lesiones', icon: Heart, label: 'Lesiones' },
  { to: '/usuarios', icon: UserCog, label: 'Usuarios' },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className={`flex flex-col bg-sidebar text-white transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} min-h-screen relative shrink-0`}>
      {/* Logo */}
      <div className="flex items-center justify-between p-4 border-b border-white/10">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">K</span>
            </div>
            <span className="font-bold text-lg tracking-wide">Kinetia</span>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">K</span>
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 rounded hover:bg-white/10 transition-colors ml-auto"
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm font-medium ${
                isActive
                  ? 'bg-primary text-white'
                  : 'text-white/70 hover:bg-white/10 hover:text-white'
              }`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={18} className="shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* User + Logout */}
      <div className="p-3 border-t border-white/10">
        {!collapsed && user && (
          <div className="mb-2 px-2">
            <p className="text-xs font-semibold text-white truncate">{user.nombre}</p>
            <p className="text-xs text-white/50 truncate">{user.rol}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white rounded-lg transition-colors"
          title="Cerrar sesión"
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </div>
  )
}
