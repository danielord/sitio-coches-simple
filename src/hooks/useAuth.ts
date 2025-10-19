'use client'

import { useState, useEffect } from 'react'

export function useAuth() {
  const [user, setUser] = useState<{nombre: string; email: string} | null>(null)

  useEffect(() => {
    try {
      const userAuth = localStorage.getItem('userAuth')
      if (userAuth) {
        setUser(JSON.parse(userAuth))
      }
    } catch (error) {
      console.error('Error parsing user data:', error)
      localStorage.removeItem('userAuth')
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('userAuth')
    localStorage.removeItem('favoritos')
    setUser(null)
  }

  return { user, logout, setUser }
}