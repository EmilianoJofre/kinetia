import { createContext, useContext, useState, useEffect } from 'react'
import { getMe } from '../api/auth'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('panorama_token')
    if (token) {
      getMe()
        .then(setUser)
        .catch(() => localStorage.removeItem('panorama_token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const signIn = (token, userData) => {
    localStorage.setItem('panorama_token', token)
    setUser(userData)
  }

  const signOut = () => {
    localStorage.removeItem('panorama_token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
