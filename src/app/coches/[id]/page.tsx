'use client'

import Link from 'next/link'
import { Car, ArrowLeft, Phone, Mail, Calendar, Gauge, Fuel } from 'lucide-react'

const cochesData = {
  1: {
    marca: 'Toyota',
    modelo: 'Corolla',
    año: 2020,
    precio: 370000,
    kilometraje: 45000,
    combustible: 'Híbrido',
    transmision: 'Automática',
    descripcion: 'Excelente Toyota Corolla híbrido en perfectas condiciones.',
    imagen: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600',
    vendedor: {
      nombre: 'Carlos García',
      telefono: '+34 600 123 456',
      email: 'carlos@example.com'
    }
  }
}

export default function CocheDetallePage({ params }: { params: { id: string } }) {
  const coche = cochesData[params.id as keyof typeof cochesData] || cochesData[1]

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">V&R Autos</span>
            </Link>
            <Link href="/coches" className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Coches
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <img
              src={coche.imagen}
              alt={`${coche.marca} ${coche.modelo}`}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {coche.marca} {coche.modelo}
            </h1>
            <p className="text-4xl font-bold text-blue-600 mb-6">
              ${coche.precio.toLocaleString()} MXN
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span>{coche.año}</span>
              </div>
              <div className="flex items-center">
                <Gauge className="h-5 w-5 text-gray-400 mr-2" />
                <span>{coche.kilometraje.toLocaleString()} km</span>
              </div>
              <div className="flex items-center">
                <Fuel className="h-5 w-5 text-gray-400 mr-2" />
                <span>{coche.combustible}</span>
              </div>
              <div className="flex items-center">
                <Car className="h-5 w-5 text-gray-400 mr-2" />
                <span>{coche.transmision}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Descripción</h2>
              <p className="text-gray-700">{coche.descripcion}</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Contactar Vendedor</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium">{coche.vendedor.nombre}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <a href={`tel:${coche.vendedor.telefono}`} className="text-blue-600 hover:text-blue-700">
                    {coche.vendedor.telefono}
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <a href={`mailto:${coche.vendedor.email}`} className="text-blue-600 hover:text-blue-700">
                    {coche.vendedor.email}
                  </a>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <a
                  href={`tel:${coche.vendedor.telefono}`}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center block"
                >
                  Llamar Ahora
                </a>
                <a
                  href={`mailto:${coche.vendedor.email}?subject=Interés en ${coche.marca} ${coche.modelo}`}
                  className="w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors text-center block"
                >
                  Enviar Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}