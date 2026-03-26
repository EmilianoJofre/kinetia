import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, Trophy, Dumbbell, Heart, UserCog,
  BarChart2, CalendarCheck, History, CreditCard, Leaf,
  ChevronLeft, ChevronRight, ChevronDown, LogOut, LucideIcon,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'

// ─── Nav config ──────────────────────────────────────────────────────────────

type NavItem = {
  to: string
  icon: LucideIcon
  label: string
  disabled?: boolean
}

type NavSection = {
  id: string
  label: string
  collapsible: boolean
  items: NavItem[]
}

const navConfig: NavSection[] = [
  {
    id: 'inicio',
    label: 'Inicio',
    collapsible: false,
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Inicio' },
    ],
  },
  {
    id: 'info',
    label: 'Información General',
    collapsible: true,
    items: [
      { to: '/evaluaciones',   icon: BarChart2,      label: 'Reporte General' },
      { to: '/partidos',       icon: Trophy,          label: 'Historial de Encuentros' },
      { to: '/jugadores',      icon: Users,           label: 'Fichas Individuales' },
      { to: '/entrenamientos', icon: CalendarCheck,   label: 'Monitor de Asistencia' },
      { to: '/gimnasio',       icon: Dumbbell,        label: 'Gimnasio',             disabled: true },
      { to: '/lesiones',       icon: Heart,           label: 'Lesiones' },
    ],
  },
  {
    id: 'datos',
    label: 'Ingreso de Datos',
    collapsible: true,
    items: [
      { to: '/ingresos',   icon: History,       label: 'Historial de Ingresos', disabled: true },
      { to: '/asistencia', icon: CalendarCheck, label: 'Asistencia',            disabled: true },
      { to: '/partidos',   icon: Trophy,        label: 'Partidos' },
      { to: '/lesiones',   icon: Heart,         label: 'Lesiones' },
      { to: '/nutricion',  icon: Leaf,          label: 'Informe Nutricional',   disabled: true },
    ],
  },
  {
    id: 'otros',
    label: 'Otros',
    collapsible: false,
    items: [
      { to: '/pagos',    icon: CreditCard, label: 'Pagos y Matrículas',  disabled: true },
      { to: '/usuarios', icon: UserCog,    label: 'Ajustes y Usuarios' },
    ],
  },
]

// ─── Component ───────────────────────────────────────────────────────────────

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  // collapsible sections start open
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(navConfig.filter(s => s.collapsible).map(s => s.id))
  )

  const toggleSection = (id: string) => {
    setOpenSections(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div
      className={`flex flex-col bg-sidebar text-white transition-all duration-300 shrink-0
        ${collapsed ? 'w-16' : 'w-64'} min-h-screen`}
    >
      {/* ── Logo ── */}
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

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
        {navConfig.map((section) => {
          const isOpen = !section.collapsible || openSections.has(section.id)

          return (
            <div key={section.id}>
              {/* Section header */}
              {!collapsed && (
                section.collapsible ? (
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full flex items-center justify-between px-3 py-1.5 mt-3 mb-0.5
                               text-xs font-semibold uppercase tracking-wider text-white/40
                               hover:text-white/60 transition-colors rounded"
                  >
                    <span>{section.label}</span>
                    <ChevronDown
                      size={13}
                      className={`transition-transform duration-200 ${isOpen ? 'rotate-0' : '-rotate-90'}`}
                    />
                  </button>
                ) : (
                  section.id !== 'inicio' && (
                    <p className="px-3 py-1.5 mt-3 mb-0.5 text-xs font-semibold uppercase tracking-wider text-white/40">
                      {section.label}
                    </p>
                  )
                )
              )}

              {/* Items */}
              <div
                className={`overflow-hidden transition-all duration-200 ${
                  isOpen || collapsed ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {section.items.map((item) => (
                  <NavItem
                    key={`${section.id}-${item.to}-${item.label}`}
                    item={item}
                    collapsed={collapsed}
                  />
                ))}
              </div>
            </div>
          )
        })}
      </nav>

      {/* ── User + Logout ── */}
      <div className="p-3 border-t border-white/10">
        {!collapsed && user && (
          <div className="mb-2 px-2">
            <p className="text-xs font-semibold text-white truncate">{user.nombre}</p>
            <p className="text-xs text-white/50 truncate">{user.rol}</p>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-white/70
                     hover:bg-white/10 hover:text-white rounded-lg transition-colors"
          title="Cerrar sesión"
        >
          <LogOut size={16} className="shrink-0" />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </div>
  )
}

// ─── NavItem ─────────────────────────────────────────────────────────────────

function NavItem({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const { to, icon: Icon, label, disabled } = item

  const baseClass = `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
    transition-all duration-150`

  if (disabled) {
    return (
      <div
        className={`${baseClass} text-white/25 cursor-not-allowed`}
        title={collapsed ? label : undefined}
      >
        <Icon size={16} className="shrink-0" />
        {!collapsed && <span>{label}</span>}
      </div>
    )
  }

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${baseClass} ${
          isActive
            ? 'bg-primary text-white'
            : 'text-white/70 hover:bg-white/10 hover:text-white'
        }`
      }
      title={collapsed ? label : undefined}
    >
      <Icon size={16} className="shrink-0" />
      {!collapsed && <span>{label}</span>}
    </NavLink>
  )
}
