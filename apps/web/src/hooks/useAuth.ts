import { useState, useCallback } from 'react'
import { login as apiLogin, loginDemo as apiLoginDemo } from '../api/auth'
import type { AuthUser } from '../types'

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem('kinetia_user')
    return stored ? JSON.parse(stored) : null
  })

  const isAuthenticated = !!user && !!localStorage.getItem('kinetia_token')

  const login = useCallback(async (email: string, password: string) => {
    const data = await apiLogin(email, password)
    localStorage.setItem('kinetia_token', data.token)
    localStorage.setItem('kinetia_user', JSON.stringify(data.usuario))
    setUser(data.usuario)
    return data
  }, [])

  const loginDemo = useCallback(async () => {
    const data = await apiLoginDemo()
    localStorage.setItem('kinetia_token', data.token)
    localStorage.setItem('kinetia_user', JSON.stringify(data.usuario))
    setUser(data.usuario)
    return data
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('kinetia_token')
    localStorage.removeItem('kinetia_user')
    setUser(null)
  }, [])

  return { user, isAuthenticated, login, loginDemo, logout }
}
