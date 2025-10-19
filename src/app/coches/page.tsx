'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Search, Filter } from 'lucide-react'
import ThemeToggle from '@/components/ThemeToggle'
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
    imagen: 'https://via.placeholder.com/400x200?text=Toyota+Corolla'
  },
  {
    id: '2',
    marca: 'BMW',
    modelo: 'Serie 3',
    año: 2019,
    precio: 640000,
    kilometraje: 38000,
    combustible: 'Gasolina',
    imagen: 'https://via.placeholder.com/400x200?text=BMW+Serie+3'
  },
  {
    id: '3',
    marca: 'Audi',
    modelo: 'A4',
    año: 2021,
    precio: 700000,
    kilometraje: 25000,
    combustible: 'Diésel',
    imagen: 'https://via.placeholder.com/400x200?text=Audi+A4'
  }
]

export default function CochesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMarca, setSelectedMarca] = useState('')
  const [maxPrecio, setMaxPrecio] = useState('')
  const [coches, setCoches] = useState(defaultCoches)

  useEffect(() => {
    // Cargar coches publicados desde localStorage
    const publishedCars = JSON.parse(localStorage.getItem('cars') || '[]')
    const allCars = [...defaultCoches, ...publishedCars]
    setCoches(allCars)
  }, [])

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
          
          <p className="text-gray-600 dark:text-gray-300">{filteredCoches.length} coches encontrados</p>
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
                <Link 
                  href={`/coches/${coche.id}`}
                  className="btn-primary w-full text-center block"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}