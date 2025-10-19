import Link from 'next/link'
import { Car, Search, Star, Users } from 'lucide-react'
import HeroSlideshow from '@/components/HeroSlideshow'
import ThemeToggle from '@/components/ThemeToggle'
import AnimatedSection from '@/components/AnimatedSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">V&R Autos</span>
            </div>
            <nav className="flex items-center space-x-4">
              <Link href="/coches" className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400">Coches</Link>
              <Link href="/admin" className="btn-primary">Admin</Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <HeroSlideshow />
          </AnimatedSection>
          <AnimatedSection delay={0.3} className="text-center mt-8">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
              Encuentra tu Coche Perfecto
            </h1>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              La plataforma más completa para comprar y vender coches de segunda mano
            </p>
            <Link href="/coches" className="btn-primary">
              Ver Coches Disponibles
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">¿Por qué elegir SitioCoches?</h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Ofrecemos la mejor experiencia para comprar y vender coches
            </p>
          </AnimatedSection>
          
          <div className="grid md:grid-cols-3 gap-8">
            <AnimatedSection delay={0.2} className="text-center">
              <Search className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Búsqueda Avanzada</h3>
              <p className="text-gray-600 dark:text-gray-300">Encuentra exactamente lo que buscas con nuestros filtros inteligentes</p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.4} className="text-center">
              <Star className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Calidad Garantizada</h3>
              <p className="text-gray-600 dark:text-gray-300">Todos los coches verificados y con garantía de calidad</p>
            </AnimatedSection>
            
            <AnimatedSection delay={0.6} className="text-center">
              <Users className="h-12 w-12 text-primary-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Vendedores Confiables</h3>
              <p className="text-gray-600 dark:text-gray-300">Red de vendedores verificados y con excelente reputación</p>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 dark:bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Car className="h-6 w-6 text-primary-400" />
            <span className="ml-2 text-lg font-semibold">V&R Autos</span>
          </div>
          <p className="text-gray-400">© 2024 V&R Autos. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}