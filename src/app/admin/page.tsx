'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Car, ArrowLeft, Plus, BarChart3, Users } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem('adminAuth')
    if (auth === 'true') {
      setIsAuthenticated(true)
    } else {
      router.push('/admin/login')
    }
  }, [router])

  if (!isAuthenticated) {
    return <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="text-gray-600 dark:text-gray-400">Redirigiendo...</div>
    </div>
  }
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">V&R Autos - Admin</span>
            </Link>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => {
                  localStorage.removeItem('adminAuth')
                  router.push('/')
                }}
                className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium"
              >
                Cerrar Sesión
              </button>
              <Link href="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Inicio
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Panel de Administración</h1>
          <p className="text-gray-600 dark:text-gray-300">Gestiona tu inventario de coches</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Añadir Coche */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Plus className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-semibold ml-3 text-gray-900 dark:text-white">Añadir Coche</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Publica un nuevo coche en el inventario</p>
            <Link href="/admin/nuevo" className="btn-primary w-full text-center block">
              Nuevo Coche
            </Link>
          </div>

          {/* Estadísticas */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <h3 className="text-xl font-semibold ml-3 text-gray-900 dark:text-white">Estadísticas</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Ver rendimiento y métricas</p>
            <button className="btn-secondary w-full">
              Ver Estadísticas
            </button>
          </div>

          {/* Gestión */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-purple-600" />
              <h3 className="text-xl font-semibold ml-3 text-gray-900 dark:text-white">Gestión</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4">Administrar coches y vendedores</p>
            <button className="btn-secondary w-full">
              Gestionar
            </button>
          </div>
        </div>

        {/* Resumen rápido */}
        <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">Resumen</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">3</div>
              <div className="text-gray-600 dark:text-gray-300">Coches Activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">$1,710,000 MXN</div>
              <div className="text-gray-600 dark:text-gray-300">Valor Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">12</div>
              <div className="text-gray-600 dark:text-gray-300">Visitas Hoy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">5</div>
              <div className="text-gray-600 dark:text-gray-300">Consultas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}