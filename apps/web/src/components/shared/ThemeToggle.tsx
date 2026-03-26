import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

/**
 * Animated theme toggle button.
 *
 * Both icons live in the DOM simultaneously.
 * The outgoing icon rotates 90° + scales to 0 while fading out.
 * The incoming icon rotates from -90° to 0° while scaling in.
 * This produces a smooth "spin-morph" effect between Sun and Moon.
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      onClick={toggleTheme}
      aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      title={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
      className={`
        relative w-9 h-9 flex items-center justify-center rounded-lg
        text-text-secondary hover:text-primary
        transition-colors duration-200
        hover:bg-background active:scale-90
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
      `}
    >
      {/* Sun — visible in light mode */}
      <Sun
        size={18}
        strokeWidth={2}
        className={`
          absolute
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isDark
            ? 'rotate-90 scale-0 opacity-0'
            : 'rotate-0 scale-100 opacity-100'
          }
        `}
      />

      {/* Moon — visible in dark mode */}
      <Moon
        size={18}
        strokeWidth={2}
        className={`
          absolute
          transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isDark
            ? 'rotate-0 scale-100 opacity-100'
            : '-rotate-90 scale-0 opacity-0'
          }
        `}
      />
    </button>
  )
}
