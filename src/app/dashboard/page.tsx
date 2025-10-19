'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Car, Plus, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<{nombre: string} | null>(null)
  const router = useRouter()

  useEffect(() => {
    const userAuth = localStorage.getItem('userAuth')
    if (userAuth) {
      setUser(JSON.parse(userAuth))
    } else {
      router.push('/login')
    }
  }, [router])

  const logout = () => {
    localStorage.removeItem('userAuth')
    router.push('/')
  }

  if (!user) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-gray-600 dark:text-gray-400">Cargando...</div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Image src="/logo.jpg" alt="V&R Autos" width={40} height={40} className="rounded-lg" />
              <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">V&R Autos</span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 dark:text-gray-300">Hola, {user.nombre}</span>
              <button onClick={logout} className="btn-secondary flex items-center">
                <LogOut className="h-4 w-4 mr-2" />
                Salir
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Panel de Vendedor</h1>
        
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <Plus className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Publicar Coche</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Agrega un nuevo coche a la venta</p>
            <Link href="/admin/nuevo" className="btn-primary w-full text-center block">
              Nuevo Coche
            </Link>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <Car className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Mis Coches</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Ver y gestionar mis publicaciones</p>
            <button className="btn-secondary w-full">Ver Mis Coches</button>
          </div>
        </div>
      </div>
    </div>
  )
}