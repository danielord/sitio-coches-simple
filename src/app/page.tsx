'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Car, Search, Star, Users, LogOut } from 'lucide-react'
import AnimatedSection from '@/components/AnimatedSection'
import { CarStorage } from '@/lib/storage'

export default function Home() {
  const [user, setUser] = useState<{nombre: string} | null>(null)
  const [recentCars, setRecentCars] = useState<{
    id: string;
    marca: string;
    modelo: string;
    año: number;
    precio: number;
    kilometraje: number;
    combustible: string;
    imagen: string;
  }[]>([])

  useEffect(() => {
    try {
      const userAuth = localStorage.getItem('userAuth')
      if (userAuth) {
        setUser(JSON.parse(userAuth))
      }
      
      // Cargar coches recientes
      const publishedCars = CarStorage.getCars()
      const defaultCoches = [
        {
          id: '1',
          marca: 'Toyota',
          modelo: 'Corolla',
          año: 2020,
          precio: 370000,
          kilometraje: 45000,
          combustible: 'Híbrido',
          imagen: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=600&h=400&fit=crop'
        },
        {
          id: '2',
          marca: 'BMW',
          modelo: 'Serie 3',
          año: 2019,
          precio: 640000,
          kilometraje: 38000,
          combustible: 'Gasolina',
          imagen: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&h=400&fit=crop'
        },
        {
          id: '3',
          marca: 'Audi',
          modelo: 'A4',
          año: 2021,
          precio: 700000,
          kilometraje: 25000,
          combustible: 'Diésel',
          imagen: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=600&h=400&fit=crop'
        }
      ]
      
      const allCars = [...defaultCoches, ...publishedCars]
      setRecentCars(allCars.slice(-6)) // Últimos 6 coches
    } catch (error) {
      console.error('Error parsing user data:', error)
      localStorage.removeItem('userAuth')
    }
  }, [])

  const logout = () => {
    localStorage.removeItem('userAuth')
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Image src="/logo.jpg" alt="V&R Autos" width={40} height={40} className="rounded-lg" />
              <span className="ml-3 text-xl font-bold text-gray-900">V&R Autos</span>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/vender" className="text-gray-700 hover:text-blue-600 font-medium">Vender</Link>
              {user ? (
                <>
                  <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">Panel</Link>
                  <span className="text-gray-700">Hola, {user.nombre}</span>
                  <button onClick={logout} className="text-gray-700 hover:text-blue-600 font-medium flex items-center">
                    <LogOut className="h-4 w-4 mr-1" />
                    Salir
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">Iniciar Sesión</Link>
              )}
              <Link href="/coches" className="btn-primary">Ver Coches</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Encuentra tu Coche Perfecto
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              La plataforma más completa para comprar y vender coches de segunda mano
            </p>
            <Link href="/coches" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Ver Coches Disponibles
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Coches Recientes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Coches Recientes</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Descubre los últimos coches añadidos a nuestra plataforma
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentCars.map((coche, index) => (
              <AnimatedSection key={coche.id} delay={index * 0.1} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <Image 
                  src={coche.imagen} 
                  alt={`${coche.marca} ${coche.modelo}`}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-gray-900">
                    {coche.marca} {coche.modelo} {coche.año}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {coche.kilometraje?.toLocaleString()} km • {coche.combustible}
                  </p>
                  <p className="text-2xl font-bold text-blue-600 mb-4">
                    ${coche.precio?.toLocaleString()} MXN
                  </p>
                  <Link href={`/coche?id=${coche.id}`} className="btn-primary w-full text-center block">
                    Ver Detalles
                  </Link>
                </div>
              </AnimatedSection>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/coches" className="btn-secondary">
              Ver Todos los Coches
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir V&R Autos?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia para comprar y vender coches
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.2} className="text-center">
              <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Búsqueda Avanzada</h3>
              <p className="text-gray-600">Encuentra exactamente lo que buscas con nuestros filtros inteligentes</p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.4} className="text-center">
              <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Calidad Garantizada</h3>
              <p className="text-gray-600">Todos los coches verificados y con garantía de calidad</p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.6} className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900">Vendedores Confiables</h3>
              <p className="text-gray-600">Red de vendedores verificados y con excelente reputación</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Car className="h-6 w-6 text-blue-400" />
            <span className="ml-2 text-lg font-semibold">V&R Autos</span>
          </div>
          <p className="text-gray-400">© 2024 V&R Autos. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}