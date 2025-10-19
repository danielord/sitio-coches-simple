'use client'

import { useState, useEffect } from 'react'

const slides = [
  {
    id: 1,
    title: 'Toyota Corolla Híbrido',
    subtitle: 'Eficiencia y confiabilidad',
    price: '$370,000 MXN',
    bg: 'bg-gradient-to-r from-blue-600 to-blue-800'
  },
  {
    id: 2,
    title: 'BMW Serie 3',
    subtitle: 'Lujo y deportividad',
    price: '$640,000 MXN',
    bg: 'bg-gradient-to-r from-gray-700 to-gray-900'
  },
  {
    id: 3,
    title: 'Audi A4',
    subtitle: 'Tecnología premium',
    price: '$700,000 MXN',
    bg: 'bg-gradient-to-r from-red-600 to-red-800'
  }
]

export default function SimpleSlideshow() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 ${slide.bg} transition-opacity duration-1000 ${
            index === current ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="flex items-center justify-center h-full text-white text-center p-8">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-4">{slide.title}</h2>
              <p className="text-xl md:text-2xl mb-6">{slide.subtitle}</p>
              <p className="text-3xl md:text-4xl font-bold text-yellow-300">{slide.price}</p>
            </div>
          </div>
        </div>
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