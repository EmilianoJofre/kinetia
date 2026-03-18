import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { Activity } from 'lucide-react'

export default function Login() {
  const navigate = useNavigate()
  const { login, loginDemo } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(email, password)
      navigate('/dashboard')
    } catch {
      setError('Credenciales inválidas. Inténtalo de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  const handleDemo = async () => {
    setLoading(true)
    setError('')
    try {
      await loginDemo()
      navigate('/dashboard')
    } catch {
      setError('Error al iniciar sesión demo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-accent rounded-2xl mb-4 shadow-lg">
            <Activity size={32} className="text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-white">Kinetia</h1>
          <p className="text-white/60 mt-1 text-sm">Plataforma de Rendimiento Deportivo</p>
        </div>

        {/* Card */}
        <div className="bg-surface rounded-2xl p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Iniciar sesión</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
                placeholder="tu@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="••••••••"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 text-base disabled:opacity-50"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-surface px-2 text-gray-400">o</span>
            </div>
          </div>

          <button
            onClick={handleDemo}
            disabled={loading}
            className="w-full btn-secondary py-3 text-base disabled:opacity-50"
          >
            Explorar demo
          </button>
          <p className="text-center text-xs text-gray-400 mt-3">
            Acceso de prueba: demo@kinetia.app / demo123
          </p>
        </div>
      </div>
    </div>
  )
}
