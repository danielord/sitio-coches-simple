'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { CarStorage } from '@/lib/storage'

const defaultSlides = [
  {
    id: '1',
    title: 'Toyota Corolla Híbrido',
    subtitle: 'Eficiencia y confiabilidad',
    price: '$370,000 MXN',
    bg: 'bg-gradient-to-r from-blue-600 to-blue-800'
  },
  {
    id: '2',
    title: 'BMW Serie 3',
    subtitle: 'Lujo y deportividad',
    price: '$640,000 MXN',
    bg: 'bg-gradient-to-r from-gray-700 to-gray-900'
  },
  {
    id: '3',
    title: 'Audi A4',
    subtitle: 'Tecnología premium',
    price: '$700,000 MXN',
    bg: 'bg-gradient-to-r from-red-600 to-red-800'
  }
]

const gradients = [
  'bg-gradient-to-r from-blue-600 to-blue-800',
  'bg-gradient-to-r from-gray-700 to-gray-900',
  'bg-gradient-to-r from-red-600 to-red-800',
  'bg-gradient-to-r from-green-600 to-green-800',
  'bg-gradient-to-r from-purple-600 to-purple-800',
  'bg-gradient-to-r from-indigo-600 to-indigo-800'
]

export default function SimpleSlideshow() {
  const [current, setCurrent] = useState(0)
  const [slides, setSlides] = useState(defaultSlides)

  const loadSlides = () => {
    try {
      const slideshowCars = CarStorage.getSlideshowCars()
      if (slideshowCars.length > 0) {
        const dynamicSlides = slideshowCars.map((car: {id: string; title: string; subtitle: string; price: string}, index: number) => ({
          id: car.id,
          title: car.title,
          subtitle: car.subtitle,
          price: car.price,
          bg: gradients[index % gradients.length]
        }))
        setSlides([...defaultSlides, ...dynamicSlides])
      } else {
        setSlides(defaultSlides)
      }
    } catch (error) {
      console.error('Error loading slideshow cars:', error)
      setSlides(defaultSlides)
    }
  }

  useEffect(() => {
    loadSlides()
    
    // Escuchar cambios en slideshow
    const handleSlideshowUpdate = () => {
      loadSlides()
    }
    
    window.addEventListener('storage', handleSlideshowUpdate)
    window.addEventListener('slideshowUpdated', handleSlideshowUpdate)
    
    return () => {
      window.removeEventListener('storage', handleSlideshowUpdate)
      window.removeEventListener('slideshowUpdated', handleSlideshowUpdate)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [slides.length])

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <Link href={`/coche?id=${slide.id}`} key={slide.id}>
          <div
            className={`absolute inset-0 ${slide.bg} transition-opacity duration-1000 cursor-pointer ${
              index === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="flex items-center justify-center h-full text-white text-center p-8">
              <div>
                <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl md:text-2xl mb-6">{slide.subtitle}</p>
                <p className="text-3xl md:text-4xl font-bold text-yellow-300">{slide.price}</p>
                <p className="text-sm mt-4 opacity-75">Haz clic para ver detalles</p>
              </div>
            </div>
          </div>
        </Link>
      ))}
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full ${
              index === current ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}