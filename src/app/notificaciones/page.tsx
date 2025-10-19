'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Bell, Mail, Phone } from 'lucide-react'

export default function NotificacionesPage() {
  const [email, setEmail] = useState('')
  const [telefono, setTelefono] = useState('')
  const [preferencias, setPreferencias] = useState({
    nuevosCoches: true,
    cambiosPrecios: false,
    mensajes: true
  })

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('notificaciones') || '{}')
    if (saved.email) setEmail(saved.email)
    if (saved.telefono) setTelefono(saved.telefono)
    if (saved.preferencias) setPreferencias(saved.preferencias)
  }, [])

  const guardarPreferencias = () => {
    const config = { email, telefono, preferencias }
    localStorage.setItem('notificaciones', JSON.stringify(config))
    alert('Preferencias guardadas exitosamente')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Image src="/logo.jpg" alt="V&R Autos" width={40} height={40} className="rounded-lg" />
              <span className="ml-3 text-xl font-bold text-gray-900">V&R Autos - Notificaciones</span>
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
          <Bell className="h-8 w-8 text-blue-600 mr-3" />
          Configurar Notificaciones
        </h1>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email para notificaciones
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="tu@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="h-4 w-4 inline mr-2" />
                Teléfono para SMS
              </label>
              <input
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+52 55 1234 5678"
              />
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Preferencias de Notificación</h3>
              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferencias.nuevosCoches}
                    onChange={(e) => setPreferencias({...preferencias, nuevosCoches: e.target.checked})}
                    className="mr-3"
                  />
                  Nuevos coches que coincidan con mis criterios
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferencias.cambiosPrecios}
                    onChange={(e) => setPreferencias({...preferencias, cambiosPrecios: e.target.checked})}
                    className="mr-3"
                  />
                  Cambios de precio en coches favoritos
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={preferencias.mensajes}
                    onChange={(e) => setPreferencias({...preferencias, mensajes: e.target.checked})}
                    className="mr-3"
                  />
                  Nuevos mensajes de vendedores
                </label>
              </div>
            </div>

            <button onClick={guardarPreferencias} className="btn-primary">
              Guardar Preferencias
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}