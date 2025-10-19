'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Star, User } from 'lucide-react'

export default function ReseñasPage() {
  const [reseñas, setReseñas] = useState<any[]>([])
  const [nuevaReseña, setNuevaReseña] = useState({
    vendedor: '',
    calificacion: 5,
    comentario: ''
  })

  useEffect(() => {
    const savedReseñas = JSON.parse(localStorage.getItem('reseñas') || '[]')
    setReseñas(savedReseñas)
  }, [])

  const enviarReseña = () => {
    if (!nuevaReseña.vendedor || !nuevaReseña.comentario) return

    const reseña = {
      id: Date.now().toString(),
      ...nuevaReseña,
      fecha: new Date().toISOString(),
      usuario: 'Usuario Anónimo'
    }

    const nuevasReseñas = [...reseñas, reseña]
    setReseñas(nuevasReseñas)
    localStorage.setItem('reseñas', JSON.stringify(nuevasReseñas))
    setNuevaReseña({ vendedor: '', calificacion: 5, comentario: '' })
    alert('Reseña enviada exitosamente')
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Image src="/logo.jpg" alt="V&R Autos" width={40} height={40} className="rounded-lg" />
              <span className="ml-3 text-xl font-bold text-gray-900">V&R Autos - Reseñas</span>
            </Link>
            <Link href="/coches" className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Coches
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Star className="h-8 w-8 text-yellow-500 mr-3" />
          Reseñas de Vendedores
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Escribir Reseña</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Vendedor</label>
                <input
                  type="text"
                  value={nuevaReseña.vendedor}
                  onChange={(e) => setNuevaReseña({...nuevaReseña, vendedor: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Nombre del vendedor"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Calificación</label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      onClick={() => setNuevaReseña({...nuevaReseña, calificacion: star})}
                      className="focus:outline-none"
                    >
                      <Star className={`h-6 w-6 ${star <= nuevaReseña.calificacion ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Comentario</label>
                <textarea
                  value={nuevaReseña.comentario}
                  onChange={(e) => setNuevaReseña({...nuevaReseña, comentario: e.target.value})}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Comparte tu experiencia..."
                />
              </div>

              <button onClick={enviarReseña} className="btn-primary w-full">
                Enviar Reseña
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Reseñas Recientes</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {reseñas.length === 0 ? (
                <p className="text-gray-500">No hay reseñas aún</p>
              ) : (
                reseñas.map(reseña => (
                  <div key={reseña.id} className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <User className="h-4 w-4 mr-2" />
                      <span className="font-medium">{reseña.usuario}</span>
                      <div className="ml-auto flex">
                        {renderStars(reseña.calificacion)}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Vendedor: {reseña.vendedor}</p>
                    <p className="text-gray-700">{reseña.comentario}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(reseña.fecha).toLocaleDateString()}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}