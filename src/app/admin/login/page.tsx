'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function AdminLoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (credentials.email === 'admin@vrautos.com' && credentials.password === 'admin123') {
        localStorage.setItem('adminAuth', 'true')
        router.push('/admin')
      } else {
        alert('Credenciales incorrectas. Usa: admin@vrautos.com / admin123')
      }
    } catch (error) {
      console.error('Error durante el login:', error)
      alert('Error inesperado. Por favor intenta de nuevo.')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <Link href="/" className="flex items-center justify-center mb-6">
            <Image src="/logo.jpg" alt="V&R Autos" width={60} height={60} className="rounded-lg" />
            <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">V&R Autos</span>
          </Link>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Login</h2>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Usuario de prueba:</strong><br/>
              Email: admin@vrautos.com<br/>
              Contraseña: admin123
            </p>
          </div>
        </div>
        
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <input
            type="email"
            required
            value={credentials.email}
            onChange={(e) => setCredentials({...credentials, email: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="admin@vrautos.com"
          />
          
          <input
            type="password"
            required
            value={credentials.password}
            onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            placeholder="admin123"
          />
          
          <button type="submit" className="btn-primary w-full">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  )
}