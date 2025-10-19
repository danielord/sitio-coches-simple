'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Car, Plus, LogOut } from 'lucide-react'

export default function DashboardPage() {
  const [user, setUser] = useState<{nombre: string, email: string} | null>(null)
  const [userCars, setUserCars] = useState<any[]>([])
  const router = useRouter()

  useEffect(() => {
    const userAuth = localStorage.getItem('userAuth')
    if (userAuth) {
      const userData = JSON.parse(userAuth)
      setUser(userData)
      
      // Cargar coches del usuario
      const allCars = JSON.parse(localStorage.getItem('cars') || '[]')
      const userPublishedCars = allCars.filter((car: any) => 
        car.vendedor?.email === userData.email || car.vendedor === userData.nombre
      )
      setUserCars(userPublishedCars)
    } else {
      router.push('/login')
    }
  }, [router])

  const deleteCar = (carId: string) => {
    if (confirm('¿Estás seguro de eliminar este coche?')) {
      const allCars = JSON.parse(localStorage.getItem('cars') || '[]')
      const updatedCars = allCars.filter((car: any) => car.id !== carId)
      localStorage.setItem('cars', JSON.stringify(updatedCars))
      setUserCars(userCars.filter(car => car.id !== carId))
    }
  }

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
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Plus className="h-8 w-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Publicar Coche</h3>
            <p className="text-gray-600 mb-4">Agrega un nuevo coche a la venta</p>
            <Link href="/admin/nuevo" className="btn-primary w-full text-center block">
              Nuevo Coche
            </Link>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <Car className="h-8 w-8 text-green-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Estadísticas</h3>
            <p className="text-gray-600 mb-4">Tienes {userCars.length} coches publicados</p>
            <div className="text-2xl font-bold text-green-600">
              ${userCars.reduce((total, car) => total + car.precio, 0).toLocaleString()} MXN
            </div>
            <p className="text-sm text-gray-500">Valor total de inventario</p>
          </div>
        </div>

        {/* Mis Coches */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900">Mis Coches Publicados</h2>
          
          {userCars.length === 0 ? (
            <div className="text-center py-8">
              <Car className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-4">No tienes coches publicados aún</p>
              <Link href="/admin/nuevo" className="btn-primary">
                Publicar mi primer coche
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userCars.map((car) => (
                <div key={car.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <img 
                    src={car.imagen} 
                    alt={`${car.marca} ${car.modelo}`}
                    className="w-full h-32 object-cover rounded mb-3"
                  />
                  <h3 className="font-semibold text-lg mb-2">
                    {car.marca} {car.modelo} {car.año}
                  </h3>
                  <p className="text-blue-600 font-bold mb-3">
                    ${car.precio.toLocaleString()} MXN
                  </p>
                  <div className="flex space-x-2">
                    <Link 
                      href={`/admin/editar/${car.id}`}
                      className="btn-secondary flex-1 text-center text-sm"
                    >
                      Editar
                    </Link>
                    <button 
                      onClick={() => deleteCar(car.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}