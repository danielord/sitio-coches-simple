'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

export default function LoginPage() {
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const user = users.find((u: {email: string, password: string}) => u.email === credentials.email && u.password === credentials.password)
      
      if (user) {
        localStorage.setItem('userAuth', JSON.stringify(user))
        alert('Login exitoso')
        router.push('/dashboard')
      } else {
        alert('Credenciales incorrectas')
      }
    } catch (error) {
      alert('Error al procesar el login. Intenta de nuevo.')
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Iniciar Sesión</h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">Accede a tu cuenta de vendedor</p>
        </div>
        
        <form onSubmit={handleLogin} className="mt-8 space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={credentials.email}
              onChange={(e) => setCredentials({...credentials, email: e.target.value})}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="tu@email.com"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="••••••••"
            />
          </div>
          
          <button type="submit" className="btn-primary w-full">
            Iniciar Sesión
          </button>
          
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿No tienes cuenta?{' '}
              <Link href="/registro" className="text-blue-600 hover:text-blue-700 font-medium">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}