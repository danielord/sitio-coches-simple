'use client'

import { useState } from 'react'

import Link from 'next/link'
import { Car, ArrowLeft, Save, Sparkles, Upload } from 'lucide-react'
import { generateCarImageUrl } from '@/lib/carImages'
import { CarStorage, SafeStorage } from '@/lib/storage'
import ThemeToggle from '@/components/ThemeToggle'

export default function NuevoCochePage() {
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    año: '',
    precio: '',
    kilometraje: '',
    combustible: '',
    descripcion: '',
    imagen: ''
  })
  const [isGenerating, setIsGenerating] = useState(false)
  const [, setErrors] = useState<{[key: string]: string}>({})

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}
    const currentYear = new Date().getFullYear()
    
    // Validar campos requeridos
    if (!formData.marca.trim()) {
      newErrors.marca = 'Marca es requerida'
    }
    if (!formData.modelo.trim()) {
      newErrors.modelo = 'Modelo es requerido'
    }
    if (!formData.año) {
      newErrors.año = 'Año es requerido'
    } else if (parseInt(formData.año) < 1900 || parseInt(formData.año) > currentYear + 1) {
      newErrors.año = 'Año debe estar entre 1900 y ' + (currentYear + 1)
    }
    if (!formData.precio) {
      newErrors.precio = 'Precio es requerido'
    } else if (parseInt(formData.precio) < 1000) {
      newErrors.precio = 'Precio debe ser mayor a $1,000 MXN'
    }
    if (!formData.kilometraje) {
      newErrors.kilometraje = 'Kilometraje es requerido'
    } else if (parseInt(formData.kilometraje) < 0) {
      newErrors.kilometraje = 'Kilometraje no puede ser negativo'
    }
    if (!formData.combustible) {
      newErrors.combustible = 'Combustible es requerido'
    }
    if (!formData.descripcion.trim()) {
      newErrors.descripcion = 'Descripción es requerida'
    }
    
    setErrors(newErrors)
    
    // Mostrar errores al usuario
    if (Object.keys(newErrors).length > 0) {
      const errorMessages = Object.values(newErrors).join('\n')
      alert('Por favor corrige los siguientes errores:\n\n' + errorMessages)
    }
    
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    try {
      // Crear nuevo coche
      const userAuth = SafeStorage.get('userAuth', {})
      const newCar = {
        id: Date.now().toString(),
        ...formData,
        año: parseInt(formData.año),
        precio: parseInt(formData.precio),
        kilometraje: parseInt(formData.kilometraje),
        imagen: formData.imagen || generateCarImageUrl(formData.marca, formData.modelo),
        vendedor: {
          nombre: userAuth.nombre || 'Vendedor V&R',
          telefono: '+52 55 1234 5678',
          email: userAuth.email || 'info@vrautos.com'
        },
        fechaCreacion: new Date().toISOString()
      }
      
      // Guardar coche
      const carSaved = CarStorage.saveCar(newCar)
      
      if (!carSaved) {
        throw new Error('No se pudo guardar el coche')
      }
    

      
      // Limpiar formulario
      setFormData({
        marca: '',
        modelo: '',
        año: '',
        precio: '',
        kilometraje: '',
        combustible: '',
        descripcion: '',
        imagen: ''
      })
      
      alert('¡Coche publicado exitosamente!')
      
      // Redirigir después de un breve delay
      setTimeout(() => {
        window.location.href = `/coche?id=${newCar.id}`
      }, 500)
      
    } catch (error) {
      console.error('Error al guardar el coche:', error)
      alert('Error al publicar el coche. Inténtalo de nuevo.')
    }
  }

  const generateDescription = async () => {
    if (!formData.marca || !formData.modelo) {
      alert('Ingresa marca y modelo primero')
      return
    }
    
    setIsGenerating(true)
    
    // Sanitizar entrada para prevenir XSS
    const sanitizedMarca = formData.marca.replace(/[<>"'&\\]/g, '').trim()
    const sanitizedModelo = formData.modelo.replace(/[<>"'&\\]/g, '').trim()
    
    if (!sanitizedMarca || !sanitizedModelo) {
      alert('Marca y modelo no pueden estar vacíos')
      setIsGenerating(false)
      return
    }
    
    // Simulación de AI (en producción usarías OpenAI API)
    setTimeout(() => {
      const descriptions = [
        `Excelente ${sanitizedMarca} ${sanitizedModelo} en perfectas condiciones. Mantenimiento al día, ideal para uso diario.`,
        `${sanitizedMarca} ${sanitizedModelo} con bajo kilometraje y excelente estado. Perfecto para familias.`,
        `Impecable ${sanitizedMarca} ${sanitizedModelo}, único dueño, servicios en agencia. Una gran oportunidad.`
      ]
      
      const randomDesc = descriptions[Math.floor(Math.random() * descriptions.length)]
      setFormData({...formData, descripcion: randomDesc})
      setIsGenerating(false)
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    // Sanitize input to prevent XSS
    const sanitizedValue = value.replace(/[<>"'&\\]/g, '')
    setFormData({
      ...formData,
      [name]: sanitizedValue
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">V&R Autos - Nuevo</span>
            </Link>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link href="/admin" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver al Admin
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Añadir Nuevo Coche</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Marca</label>
                <input
                  type="text"
                  name="marca"
                  value={formData.marca}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Modelo</label>
                <input
                  type="text"
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
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
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Combustible</label>
                <select
                  name="combustible"
                  value={formData.combustible}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
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
              <div className="flex space-x-2">
                <input
                  type="url"
                  name="imagen"
                  value={formData.imagen}
                  onChange={handleChange}
                  placeholder="https://ejemplo.com/imagen.jpg"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) {
                      if (file.size > 5 * 1024 * 1024) {
                        alert('La imagen debe ser menor a 5MB')
                        return
                      }
                      if (!file.type.startsWith('image/')) {
                        alert('Solo se permiten archivos de imagen')
                        return
                      }
                      const reader = new FileReader()
                      reader.onload = (event) => {
                        setFormData({...formData, imagen: event.target?.result as string})
                      }
                      reader.onerror = () => alert('Error al cargar la imagen')
                      reader.readAsDataURL(file)
                    }
                  }}
                  className="hidden"
                  id="imageUpload"
                />
                <label
                  htmlFor="imageUpload"
                  className="btn-secondary flex items-center cursor-pointer"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Subir
                </label>
              </div>
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
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900"
                required
              />
            </div>
            

            
            <div className="flex justify-end space-x-4">
              <Link href="/admin" className="btn-secondary">Cancelar</Link>
              <button type="submit" className="btn-primary flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Guardar Coche
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}