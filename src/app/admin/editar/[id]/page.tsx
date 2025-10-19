'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Car, ArrowLeft, Save, Sparkles } from 'lucide-react'

export default function EditarCochePage({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    año: '',
    precio: '',
    kilometraje: '',
    combustible: '',
    descripcion: '',
    imagen: '',
    enSlideshow: false
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Cargar datos del coche
    const allCars = JSON.parse(localStorage.getItem('cars') || '[]')
    const car = allCars.find((c: {id: string}) => c.id === params.id)
    
    if (car) {
      setFormData({
        marca: car.marca,
        modelo: car.modelo,
        año: car.año.toString(),
        precio: car.precio.toString(),
        kilometraje: car.kilometraje.toString(),
        combustible: car.combustible,
        descripcion: car.descripcion,
        imagen: car.imagen,
        enSlideshow: false // Verificar si está en slideshow
      })
    }
    setLoading(false)
  }, [params.id])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Actualizar coche existente
    const allCars = JSON.parse(localStorage.getItem('cars') || '[]')
    const carIndex = allCars.findIndex((c: {id: string}) => c.id === params.id)
    
    if (carIndex !== -1) {
      allCars[carIndex] = {
        ...allCars[carIndex],
        ...formData,
        año: parseInt(formData.año),
        precio: parseInt(formData.precio),
        kilometraje: parseInt(formData.kilometraje)
      }
      
      localStorage.setItem('cars', JSON.stringify(allCars))
      alert('Coche actualizado exitosamente!')
      router.push('/dashboard')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const generateDescription = async () => {
    if (!formData.marca || !formData.modelo) {
      alert('Ingresa marca y modelo primero')
      return
    }
    
    setIsGenerating(true)
    setTimeout(() => {
      const descriptions = [
        `Excelente ${formData.marca} ${formData.modelo} en perfectas condiciones. Mantenimiento al día, ideal para uso diario.`,
        `${formData.marca} ${formData.modelo} con bajo kilometraje y excelente estado. Perfecto para familias.`,
        `Impecable ${formData.marca} ${formData.modelo}, único dueño, servicios en agencia. Una gran oportunidad.`
      ]
      
      const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)]
      setFormData({...formData, descripcion: randomDesc})
      setIsGenerating(false)
    }, 2000)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">V&R Autos - Editar</span>
            </Link>
            <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Panel
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Editar Coche</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Marca</label>
                <input
                  type="text"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Modelo</label>
                <input
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Año</label>
                <input
                  type="number"
                  name="año"
                  value={formData.año}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Precio (MXN)</label>
                <input
                  type="number"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kilometraje</label>
                <input
                  type="number"
                  name="kilometraje"
                  value={formData.kilometraje}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Combustible</label>
                <select
                  name="combustible"
                  value={formData.combustible}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Seleccionar</option>
                  <option value="Gasolina">Gasolina</option>
                  <option value="Diésel">Diésel</option>
                  <option value="Híbrido">Híbrido</option>
                  <option value="Eléctrico">Eléctrico</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Imagen URL</label>
              <input
                type="url"
                name="imagen"
                value={formData.imagen}
                onChange={handleChange}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-700">Descripción</label>
                <button
                  type="button"
                  onClick={generateDescription}
                  disabled={isGenerating}
                  className="btn-secondary flex items-center text-sm"
                >
                  <Sparkles className="h-4 w-4 mr-1" />
                  {isGenerating ? 'Generando...' : 'Generar con IA'}
                </button>
              </div>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="flex justify-end space-x-4">
              <Link href="/dashboard" className="btn-secondary">Cancelar</Link>
              <button type="submit" className="btn-primary flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Actualizar Coche
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}