import Link from 'next/link'
import Image from 'next/image'
import { Plus, Users, TrendingUp } from 'lucide-react'

export default function VenderPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Image src="/logo.jpg" alt="V&R Autos" width={40} height={40} className="rounded-lg" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">V&R Autos</span>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Vende tu Coche con V&R Autos
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            La plataforma líder para vendedores de automóviles en México
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center">
            <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Miles de Compradores</h3>
            <p className="text-gray-600 dark:text-gray-400">Acceso a nuestra amplia base de compradores activos</p>
          </div>
          
          <div className="text-center">
            <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Ventas Rápidas</h3>
            <p className="text-gray-600 dark:text-gray-400">Herramientas optimizadas para vender más rápido</p>
          </div>
          
          <div className="text-center">
            <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Fácil de Usar</h3>
            <p className="text-gray-600 dark:text-gray-400">Publica tus coches en minutos</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            ¿Listo para empezar a vender?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Únete a cientos de vendedores exitosos en nuestra plataforma
          </p>
          
          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link href="/registro" className="btn-primary block sm:inline-block">
              Crear Cuenta de Vendedor
            </Link>
            <Link href="/login" className="btn-secondary block sm:inline-block">
              Ya tengo cuenta
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}