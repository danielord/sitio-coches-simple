import Link from 'next/link'
import { Car, Search, Star, Users } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SitioCoches</span>
            </div>
            <nav className="flex space-x-8">
              <Link href="/coches" className="text-gray-700 hover:text-blue-600">Coches</Link>
              <Link href="/admin" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Encuentra tu Coche Perfecto
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            La plataforma más completa para comprar y vender coches de segunda mano
          </p>
          <Link 
            href="/coches"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Ver Coches Disponibles
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">¿Por qué elegir SitioCoches?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia para comprar y vender coches
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <Search className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Búsqueda Avanzada</h3>
              <p className="text-gray-600">Encuentra exactamente lo que buscas con nuestros filtros inteligentes</p>
            </div>
            
            <div className="text-center">
              <Star className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Calidad Garantizada</h3>
              <p className="text-gray-600">Todos los coches verificados y con garantía de calidad</p>
            </div>
            
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Vendedores Confiables</h3>
              <p className="text-gray-600">Red de vendedores verificados y con excelente reputación</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Car className="h-6 w-6 text-blue-400" />
            <span className="ml-2 text-lg font-semibold">SitioCoches</span>
          </div>
          <p className="text-gray-400">© 2024 SitioCoches. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}