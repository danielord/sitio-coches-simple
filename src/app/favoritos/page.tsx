'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, ArrowLeft } from 'lucide-react'

export default function FavoritosPage() {
  const [favoritos, setFavoritos] = useState<{id: string; marca: string; modelo: string; año: number; precio: number; imagen: string}[]>([])

  useEffect(() => {
    const savedFavoritos = JSON.parse(localStorage.getItem('favoritos') || '[]')
    setFavoritos(savedFavoritos)
  }, [])

  const removeFavorito = (carId: string) => {
    const newFavoritos = favoritos.filter(car => car.id !== carId)
    setFavoritos(newFavoritos)
    localStorage.setItem('favoritos', JSON.stringify(newFavoritos))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Image src="/logo.jpg" alt="V&R Autos" width={40} height={40} className="rounded-lg" />
              <span className="ml-3 text-xl font-bold text-gray-900">V&R Autos</span>
            </Link>
            <Link href="/coches" className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Coches
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Heart className="h-8 w-8 text-red-500 mr-3" />
          Mis Favoritos
        </h1>

        {favoritos.length === 0 ? (
          <div className="text-center py-12">
            <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 mb-4">No tienes coches favoritos aún</p>
            <Link href="/coches" className="btn-primary">Explorar Coches</Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritos.map((coche) => (
              <div key={coche.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <Image src={coche.imagen} alt={`${coche.marca} ${coche.modelo}`} width={400} height={192} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{coche.marca} {coche.modelo} {coche.año}</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-4">${coche.precio.toLocaleString()} MXN</p>
                  <div className="flex space-x-2">
                    <Link href={`/coches/${coche.id}`} className="btn-primary flex-1 text-center">Ver Detalles</Link>
                    <button onClick={() => removeFavorito(coche.id)} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}