'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Plus, X } from 'lucide-react'

export default function ComparadorPage() {
  const [coches, setCoches] = useState<{id: string; marca: string; modelo: string; año: number; precio: number; kilometraje: number; combustible: string; imagen: string}[]>([])
  const [selectedCars, setSelectedCars] = useState<{id: string; marca: string; modelo: string; año: number; precio: number; kilometraje: number; combustible: string; imagen: string}[]>([])

  useEffect(() => {
    const defaultCoches = [
      { id: '1', marca: 'Toyota', modelo: 'Corolla', año: 2020, precio: 370000, kilometraje: 45000, combustible: 'Híbrido', imagen: 'https://picsum.photos/400/200?random=10' },
      { id: '2', marca: 'BMW', modelo: 'Serie 3', año: 2019, precio: 640000, kilometraje: 38000, combustible: 'Gasolina', imagen: 'https://picsum.photos/400/200?random=11' },
      { id: '3', marca: 'Audi', modelo: 'A4', año: 2021, precio: 700000, kilometraje: 25000, combustible: 'Diésel', imagen: 'https://picsum.photos/400/200?random=12' }
    ]
    const publishedCars = JSON.parse(localStorage.getItem('cars') || '[]')
    setCoches([...defaultCoches, ...publishedCars])
  }, [])

  const addToComparison = (car: {id: string; marca: string; modelo: string; año: number; precio: number; kilometraje: number; combustible: string; imagen: string}) => {
    if (selectedCars.length < 3 && !selectedCars.find(c => c.id === car.id)) {
      setSelectedCars([...selectedCars, car])
    }
  }

  const removeFromComparison = (carId: string) => {
    setSelectedCars(selectedCars.filter(c => c.id !== carId))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Image src="/logo.jpg" alt="V&R Autos" width={40} height={40} className="rounded-lg" />
              <span className="ml-3 text-xl font-bold text-gray-900">V&R Autos - Comparador</span>
            </Link>
            <Link href="/coches" className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Coches
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Comparador de Coches</h1>

        {selectedCars.length > 0 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Comparación ({selectedCars.length}/3)</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {selectedCars.map((car) => (
                <div key={car.id} className="border rounded-lg p-4 relative">
                  <button onClick={() => removeFromComparison(car.id)} className="absolute top-2 right-2 text-red-500 hover:text-red-700">
                    <X className="h-4 w-4" />
                  </button>
                  <Image src={car.imagen} alt={`${car.marca} ${car.modelo}`} width={300} height={128} className="w-full h-32 object-cover rounded mb-3" />
                  <h3 className="font-semibold">{car.marca} {car.modelo}</h3>
                  <div className="space-y-1 text-sm mt-2">
                    <p><strong>Año:</strong> {car.año}</p>
                    <p><strong>Precio:</strong> ${car.precio.toLocaleString()} MXN</p>
                    <p><strong>Kilometraje:</strong> {car.kilometraje.toLocaleString()} km</p>
                    <p><strong>Combustible:</strong> {car.combustible}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Seleccionar Coches para Comparar</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coches.map((coche) => (
              <div key={coche.id} className="border rounded-lg p-4">
                <Image src={coche.imagen} alt={`${coche.marca} ${coche.modelo}`} width={300} height={128} className="w-full h-32 object-cover rounded mb-3" />
                <h3 className="font-semibold mb-2">{coche.marca} {coche.modelo} {coche.año}</h3>
                <p className="text-blue-600 font-bold mb-3">${coche.precio.toLocaleString()} MXN</p>
                <button 
                  onClick={() => addToComparison(coche)}
                  disabled={selectedCars.length >= 3 || !!selectedCars.find(c => c.id === coche.id)}
                  className="btn-secondary w-full flex items-center justify-center disabled:opacity-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {selectedCars.find(c => c.id === coche.id) ? 'Agregado' : 'Comparar'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}