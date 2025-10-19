import Link from 'next/link'
import { Car, ArrowLeft, Plus, BarChart3, Users } from 'lucide-react'

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Panel Admin</span>
            </Link>
            <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Inicio
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Panel de Administración</h1>
          <p className="text-gray-600">Gestiona tu inventario de coches</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Añadir Coche */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Plus className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-semibold ml-3">Añadir Coche</h3>
            </div>
            <p className="text-gray-600 mb-4">Publica un nuevo coche en el inventario</p>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
              Nuevo Coche
            </button>
          </div>

          {/* Estadísticas */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <h3 className="text-xl font-semibold ml-3">Estadísticas</h3>
            </div>
            <p className="text-gray-600 mb-4">Ver rendimiento y métricas</p>
            <button className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors">
              Ver Estadísticas
            </button>
          </div>

          {/* Gestión */}
          <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-purple-600" />
              <h3 className="text-xl font-semibold ml-3">Gestión</h3>
            </div>
            <p className="text-gray-600 mb-4">Administrar coches y vendedores</p>
            <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
              Gestionar
            </button>
          </div>
        </div>

        {/* Resumen rápido */}
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Resumen</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">3</div>
              <div className="text-gray-600">Coches Activos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">€85,500</div>
              <div className="text-gray-600">Valor Total</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">12</div>
              <div className="text-gray-600">Visitas Hoy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">5</div>
              <div className="text-gray-600">Consultas</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}