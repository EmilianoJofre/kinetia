import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { login, register } from '../api/auth'
import { useAuth } from '../contexts/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { signIn } = useAuth()
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    role: 'traveler',
  })

  const set = (field) => (e) => setForm(f => ({ ...f, [field]: e.target.value }))

  const handleDemoLogin = async () => {
    setError('')
    setLoading(true)
    try {
      const data = await login('viajero@gmail.com', 'password123')
      signIn(data.token, data.user)
      navigate('/')
    } catch {
      setError('Error al entrar con demo')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = isRegister
        ? await register(form)
        : await login(form.email, form.password)
      signIn(data.token, data.user)
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.errors?.join(', ') || 'Error al ingresar')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: '30%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(163,230,53,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        width: '100%',
        maxWidth: '420px',
        padding: '40px',
        borderRadius: '24px',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        position: 'relative',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <Link to="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            <Compass size={24} style={{ color: 'var(--accent-green)' }} />
            <span style={{ fontFamily: 'Syne, sans-serif', fontWeight: 800, fontSize: '20px', color: 'var(--text)' }}>
              PANORAMA
            </span>
          </Link>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text)', marginBottom: '8px' }}>
            {isRegister ? 'Crear cuenta' : 'Bienvenido de vuelta'}
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '14px' }}>
            {isRegister ? 'Únete a la comunidad de viajeros' : 'Ingresa a tu cuenta'}
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {isRegister && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px', fontWeight: 500 }}>
                Nombre
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={set('name')}
                placeholder="Tu nombre completo"
                style={inputStyle}
              />
            </div>
          )}

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px', fontWeight: 500 }}>
              Email
            </label>
            <input
              type="email"
              required
              value={form.email}
              onChange={set('email')}
              placeholder="tu@email.com"
              style={inputStyle}
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px', fontWeight: 500 }}>
              Contraseña
            </label>
            <input
              type="password"
              required
              value={form.password}
              onChange={set('password')}
              placeholder="••••••••"
              style={inputStyle}
            />
          </div>

          {isRegister && (
            <div>
              <label style={{ display: 'block', fontSize: '13px', color: 'var(--muted)', marginBottom: '8px', fontWeight: 500 }}>
                Soy...
              </label>
              <div style={{ display: 'flex', gap: '8px' }}>
                {[
                  { value: 'traveler', label: 'Viajero' },
                  { value: 'operator', label: 'Operador' },
                  { value: 'business', label: 'Negocio' },
                ].map(({ value, label }) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setForm(f => ({ ...f, role: value }))}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '10px',
                      border: `1px solid ${form.role === value ? 'var(--accent-green)' : 'var(--border)'}`,
                      background: form.role === value ? 'rgba(163,230,53,0.1)' : 'transparent',
                      color: form.role === value ? 'var(--accent-green)' : 'var(--muted)',
                      fontSize: '13px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div style={{
              padding: '12px',
              borderRadius: '10px',
              background: 'rgba(239,68,68,0.1)',
              border: '1px solid rgba(239,68,68,0.3)',
              color: '#f87171',
              fontSize: '14px',
            }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px',
              borderRadius: '12px',
              background: 'var(--accent-green)',
              color: '#080a06',
              fontWeight: 700,
              fontSize: '16px',
              border: 'none',
              cursor: loading ? 'wait' : 'pointer',
              opacity: loading ? 0.7 : 1,
              fontFamily: 'Syne, sans-serif',
              marginTop: '4px',
            }}
          >
            {loading ? 'Cargando...' : (isRegister ? 'Crear cuenta' : 'Ingresar')}
          </button>

          {!isRegister && (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0' }}>
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
                <span style={{ fontSize: '12px', color: 'var(--muted)' }}>o</span>
                <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
              </div>
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={loading}
                style={{
                  padding: '14px',
                  borderRadius: '12px',
                  background: 'transparent',
                  color: 'var(--text)',
                  fontWeight: 600,
                  fontSize: '15px',
                  border: '1px solid var(--border)',
                  cursor: loading ? 'wait' : 'pointer',
                  opacity: loading ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <span style={{ fontSize: '18px' }}>🧭</span>
                Entrar como demo
              </button>
            </>
          )}
        </form>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--muted)' }}>
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <button
            onClick={() => { setIsRegister(r => !r); setError('') }}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--accent-green)',
              cursor: 'pointer',
              fontWeight: 600,
              fontSize: '14px',
            }}
          >
            {isRegister ? 'Ingresa aquí' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: '10px',
  border: '1px solid var(--border)',
  background: 'rgba(255,255,255,0.03)',
  color: 'var(--text)',
  fontSize: '14px',
  outline: 'none',
  transition: 'border-color 0.2s',
}
