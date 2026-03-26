import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard, Users, Trophy, Dumbbell, Heart, UserCog,
  BarChart2, CalendarCheck, History, CreditCard, Leaf,
  ChevronLeft, ChevronRight, ChevronDown, LogOut, LucideIcon,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useState } from 'react'

// ─── Types ────────────────────────────────────────────────────────────────────

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

// ─── Nav config ───────────────────────────────────────────────────────────────

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
      { to: '/evaluaciones',   icon: BarChart2,    label: 'Reporte General' },
      { to: '/partidos',       icon: Trophy,        label: 'Historial de Encuentros' },
      { to: '/jugadores',      icon: Users,         label: 'Fichas Individuales' },
      { to: '/entrenamientos', icon: CalendarCheck, label: 'Monitor de Asistencia' },
      { to: '/gimnasio',       icon: Dumbbell,      label: 'Gimnasio',              disabled: true },
      { to: '/lesiones',       icon: Heart,         label: 'Lesiones' },
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

// ─── Sidebar ──────────────────────────────────────────────────────────────────

export default function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [openSections, setOpenSections] = useState<Set<string>>(
    new Set(navConfig.filter(s => s.collapsible).map(s => s.id))
  )

  const toggleSection = (id: string) =>
    setOpenSections(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside
      className={`
        relative flex flex-col bg-sidebar text-white shrink-0 min-h-screen
        border-r border-white/[0.07]
        transition-[width] duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${collapsed ? 'w-[60px]' : 'w-60'}
      `}
    >
      {/* ── Logo ── */}
      <div className={`
        flex items-center h-14 px-3 border-b border-white/[0.07] shrink-0
        ${collapsed ? 'justify-center' : 'justify-between'}
      `}>
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center shrink-0 shadow-sm">
            <span className="text-white font-bold text-xs leading-none">K</span>
          </div>
          {!collapsed && (
            <span className="font-semibold text-[15px] tracking-tight text-white truncate">
              Kinetia
            </span>
          )}
        </div>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="p-1 rounded-md text-white/30 hover:text-white/60 hover:bg-white/[0.06]
                       transition-all duration-150 shrink-0"
          >
            <ChevronLeft size={15} />
          </button>
        )}
      </div>

      {/* Expand button — only when collapsed */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="absolute -right-3 top-[46px] z-10
                     w-6 h-6 bg-sidebar border border-white/[0.12] rounded-full shadow-md
                     flex items-center justify-center
                     text-white/40 hover:text-white/80
                     transition-all duration-150"
        >
          <ChevronRight size={11} />
        </button>
      )}

      {/* ── Nav ── */}
      <nav className="flex-1 overflow-y-auto py-2 px-2 [&::-webkit-scrollbar]:hidden">
        {navConfig.map(section => {
          const isOpen = !section.collapsible || openSections.has(section.id)
          const showLabel = !collapsed && section.id !== 'inicio'

          return (
            <div key={section.id} className="mb-1">

              {/* Section header */}
              {showLabel && (
                section.collapsible ? (
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="
                      group w-full flex items-center justify-between
                      px-2 pt-3 pb-1 rounded-md
                      hover:bg-white/[0.04] transition-colors duration-150
                    "
                  >
                    <span className="
                      text-[10px] font-semibold uppercase tracking-[0.08em]
                      text-white/30 group-hover:text-white/50 transition-colors duration-150
                    ">
                      {section.label}
                    </span>
                    <ChevronDown
                      size={11}
                      className={`
                        text-white/25 group-hover:text-white/50
                        transition-all duration-200
                        ${isOpen ? 'rotate-0' : '-rotate-90'}
                      `}
                    />
                  </button>
                ) : (
                  <p className="px-2 pt-3 pb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white/30">
                    {section.label}
                  </p>
                )
              )}

              {/* Items — animated with CSS grid height trick */}
              <div
                className={`
                  grid transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)]
                  ${isOpen || collapsed ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}
                `}
              >
                <div className="overflow-hidden min-h-0">
                  <div className="space-y-px py-px">
                    {section.items.map(item => (
                      <SidebarNavItem
                        key={`${section.id}·${item.label}`}
                        item={item}
                        collapsed={collapsed}
                      />
                    ))}
                  </div>
                </div>
              </div>

            </div>
          )
        })}
      </nav>

      {/* ── Footer ── */}
      <div className="p-2 border-t border-white/[0.07] shrink-0">
        {/* User info */}
        {!collapsed && user && (
          <div className="flex items-center gap-2.5 px-2 py-2 mb-1">
            <div className="
              w-6 h-6 bg-primary/70 rounded-full
              flex items-center justify-center shrink-0
            ">
              <span className="text-white text-[10px] font-bold leading-none">
                {user.nombre?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-medium text-white/75 truncate leading-tight">{user.nombre}</p>
              <p className="text-[10px] text-white/35 truncate capitalize leading-tight">{user.rol}</p>
            </div>
          </div>
        )}

        {/* Logout */}
        <button
          onClick={handleLogout}
          title={collapsed ? 'Cerrar sesión' : undefined}
          className="
            flex items-center gap-2.5 w-full px-2 py-2 rounded-lg text-xs
            text-white/35 hover:text-white/65 hover:bg-white/[0.06]
            transition-all duration-150
            ${collapsed ? 'justify-center' : ''}
          "
        >
          <LogOut size={15} className="shrink-0" />
          {!collapsed && <span>Cerrar sesión</span>}
        </button>
      </div>
    </aside>
  )
}

// ─── SidebarNavItem ───────────────────────────────────────────────────────────

function SidebarNavItem({ item, collapsed }: { item: NavItem; collapsed: boolean }) {
  const { to, icon: Icon, label, disabled } = item

  // Shared layout classes
  const base = `
    relative flex items-center gap-2.5 w-full
    px-2 py-[7px] rounded-lg text-[13px] font-medium
    transition-all duration-150 ease-in-out
    ${collapsed ? 'justify-center' : ''}
  `

  if (disabled) {
    return (
      <div
        title={collapsed ? label : undefined}
        className={`${base} text-white/20 cursor-not-allowed select-none`}
      >
        <Icon size={16} className="shrink-0" />
        {!collapsed && <span>{label}</span>}
      </div>
    )
  }

  return (
    <NavLink
      to={to}
      title={collapsed ? label : undefined}
      className={({ isActive }) => `
        ${base}
        ${isActive
          ? 'bg-white/[0.10] text-white'
          : 'text-white/55 hover:bg-white/[0.06] hover:text-white/85'
        }
      `}
    >
      {({ isActive }) => (
        <>
          {/* Active left-edge indicator */}
          {isActive && (
            <span className="absolute left-0 inset-y-[6px] w-[3px] bg-primary rounded-r-full" />
          )}

          <Icon
            size={16}
            className={`shrink-0 transition-colors duration-150 ${isActive ? 'text-primary' : ''}`}
          />
          {!collapsed && <span className="truncate">{label}</span>}
        </>
      )}
    </NavLink>
  )
}
