'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react'

export default function HistorialPage() {
  const [historial, setHistorial] = useState<any[]>([])
  const [cocheSeleccionado, setCocheSeleccionado] = useState('')

  useEffect(() => {
    // Simular historial de precios
    const historialSimulado = [
      {
        id: '1',
        coche: 'Toyota Corolla 2020',
        cambios: [
          { fecha: '2024-01-15', precio: 380000, evento: 'Precio inicial' },
          { fecha: '2024-01-20', precio: 375000, evento: 'Reducción de precio' },
          { fecha: '2024-01-25', precio: 370000, evento: 'Precio actual' }
        ],
        reportes: [
          { tipo: 'Mantenimiento', descripcion: 'Servicio completo en agencia', fecha: '2023-12-01' },
          { tipo: 'Accidente', descripcion: 'Golpe menor en parachoques', fecha: '2023-08-15' }
        ]
      },
      {
        id: '2',
        coche: 'BMW Serie 3 2019',
        cambios: [
          { fecha: '2024-01-10', precio: 650000, evento: 'Precio inicial' },
          { fecha: '2024-01-18', precio: 640000, evento: 'Precio actual' }
        ],
        reportes: [
          { tipo: 'Mantenimiento', descripcion: 'Cambio de aceite y filtros', fecha: '2023-11-20' }
        ]
      }
    ]
    setHistorial(historialSimulado)
  }, [])

  const cocheActual = historial.find(h => h.id === cocheSeleccionado)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Image src="/logo.jpg" alt="V&R Autos" width={40} height={40} className="rounded-lg" />
              <span className="ml-3 text-xl font-bold text-gray-900">V&R Autos - Historial</span>
            </Link>
            <Link href="/coches" className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Coches
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
          Historial de Precios y Reportes
        </h1>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Seleccionar Coche</h2>
            <div className="space-y-2">
              {historial.map(item => (
                <button
                  key={item.id}
                  onClick={() => setCocheSeleccionado(item.id)}
                  className={`w-full text-left p-3 rounded border ${cocheSeleccionado === item.id ? 'bg-blue-100 border-blue-500' : 'hover:bg-gray-100'}`}
                >
                  {item.coche}
                </button>
              ))}
            </div>
          </div>

          {cocheActual && (
            <div className="md:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Historial de Precios - {cocheActual.coche}
                </h3>
                <div className="space-y-3">
                  {cocheActual.cambios.map((cambio: any, index: number) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium">${cambio.precio.toLocaleString()} MXN</p>
                        <p className="text-sm text-gray-600">{cambio.evento}</p>
                      </div>
                      <p className="text-sm text-gray-500">{new Date(cambio.fecha).toLocaleDateString()}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Reportes de Historial</h3>
                <div className="space-y-3">
                  {cocheActual.reportes.map((reporte: any, index: number) => (
                    <div key={index} className="flex items-start p-3 bg-gray-50 rounded">
                      {reporte.tipo === 'Accidente' ? (
                        <AlertTriangle className="h-5 w-5 text-red-500 mr-3 mt-0.5" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="font-medium">{reporte.tipo}</p>
                        <p className="text-sm text-gray-600">{reporte.descripcion}</p>
                        <p className="text-xs text-gray-500 mt-1">{new Date(reporte.fecha).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}