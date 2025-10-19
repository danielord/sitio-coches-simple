'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Search, Filter, Heart, GitCompare, Calculator, MessageCircle, Bell, Star, TrendingUp } from 'lucide-react'

import { useState, useEffect } from 'react'

const defaultCoches = [
  {
    id: '1',
    marca: 'Toyota',
    modelo: 'Corolla',
    año: 2020,
    precio: 370000,
    kilometraje: 45000,
    combustible: 'Híbrido',
    imagen: 'https://picsum.photos/400/200?random=10'
  },
  {
    id: '2',
    marca: 'BMW',
    modelo: 'Serie 3',
    año: 2019,
    precio: 640000,
    kilometraje: 38000,
    combustible: 'Gasolina',
    imagen: 'https://picsum.photos/400/200?random=11'
  },
  {
    id: '3',
    marca: 'Audi',
    modelo: 'A4',
    año: 2021,
    precio: 700000,
    kilometraje: 25000,
    combustible: 'Diésel',
    imagen: 'https://picsum.photos/400/200?random=12'
  }
]

export default function CochesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMarca, setSelectedMarca] = useState('')
  const [maxPrecio, setMaxPrecio] = useState('')
  const [coches, setCoches] = useState(defaultCoches)
  const [favoritos, setFavoritos] = useState<string[]>([])

  useEffect(() => {
    try {
      const publishedCars = JSON.parse(localStorage.getItem('cars') || '[]')
      const allCars = [...defaultCoches, ...publishedCars]
      setCoches(allCars)
      
      const savedFavoritos = JSON.parse(localStorage.getItem('favoritos') || '[]')
      setFavoritos(savedFavoritos.map((f: any) => f.id))
    } catch (error) {
      console.error('Error loading data:', error)
      setCoches(defaultCoches)
    }
  }, [])

  const toggleFavorito = (coche: any) => {
    const savedFavoritos = JSON.parse(localStorage.getItem('favoritos') || '[]')
    const isFavorite = savedFavoritos.find((f: any) => f.id === coche.id)
    
    if (isFavorite) {
      const newFavoritos = savedFavoritos.filter((f: any) => f.id !== coche.id)
      localStorage.setItem('favoritos', JSON.stringify(newFavoritos))
      setFavoritos(favoritos.filter(id => id !== coche.id))
    } else {
      const newFavoritos = [...savedFavoritos, coche]
      localStorage.setItem('favoritos', JSON.stringify(newFavoritos))
      setFavoritos([...favoritos, coche.id])
    }
  }

  const filteredCoches = coches.filter(coche => {
    const matchesSearch = coche.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         coche.modelo.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesMarca = !selectedMarca || coche.marca === selectedMarca
    const matchesPrecio = !maxPrecio || coche.precio <= parseInt(maxPrecio)
    return matchesSearch && matchesMarca && matchesPrecio
  })

  const marcas = [...new Set(coches.map(c => c.marca))]

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
              <Link href="/vender" className="text-gray-700 hover:text-blue-600 font-medium">Vender</Link>
              <Link href="/login" className="text-gray-700 hover:text-blue-600 font-medium">Iniciar Sesión</Link>
              <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Inicio
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Coches Disponibles</h1>
          
          {/* Search and Filters */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar marca o modelo..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <select
                value={selectedMarca}
                onChange={(e) => setSelectedMarca(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Todas las marcas</option>
                {marcas.map(marca => (
                  <option key={marca} value={marca}>{marca}</option>
                ))}
              </select>
              
              <input
                type="number"
                placeholder="Precio máximo"
                value={maxPrecio}
                onChange={(e) => setMaxPrecio(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
              
              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedMarca('')
                  setMaxPrecio('')
                }}
                className="btn-secondary flex items-center justify-center"
              >
                <Filter className="h-4 w-4 mr-2" />
                Limpiar
              </button>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300">{filteredCoches.length} coches encontrados</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/favoritos" className="btn-secondary flex items-center">
                <Heart className="h-4 w-4 mr-1" />
                Favoritos
              </Link>
              <Link href="/comparador" className="btn-secondary flex items-center">
                <GitCompare className="h-4 w-4 mr-1" />
                Comparar
              </Link>
              <Link href="/calculadora" className="btn-secondary flex items-center">
                <Calculator className="h-4 w-4 mr-1" />
                Financiar
              </Link>
              <Link href="/mensajes" className="btn-secondary flex items-center">
                <MessageCircle className="h-4 w-4 mr-1" />
                Mensajes
              </Link>
              <Link href="/notificaciones" className="btn-secondary flex items-center">
                <Bell className="h-4 w-4 mr-1" />
                Alertas
              </Link>
              <Link href="/reseñas" className="btn-secondary flex items-center">
                <Star className="h-4 w-4 mr-1" />
                Reseñas
              </Link>
              <Link href="/historial" className="btn-secondary flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                Historial
              </Link>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCoches.map((coche) => (
            <div key={coche.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <Image 
                src={coche.imagen} 
                alt={`${coche.marca} ${coche.modelo}`}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {coche.marca} {coche.modelo} {coche.año}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-2">
                  {coche.kilometraje.toLocaleString()} km • {coche.combustible}
                </p>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  ${coche.precio.toLocaleString()} MXN
                </p>
                <div className="flex space-x-2">
                  <Link href={`/coches/${coche.id}`} className="btn-primary flex-1 text-center">
                    Ver Detalles
                  </Link>
                  <button 
                    onClick={() => toggleFavorito(coche)}
                    className={`p-2 rounded ${favoritos.includes(coche.id) ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-600'} hover:bg-red-600 hover:text-white`}
                  >
                    <Heart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}