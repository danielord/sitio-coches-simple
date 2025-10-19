'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const slides = [
  {
    id: 1,
    image: 'https://picsum.photos/1200/600?random=1',
    title: 'Toyota Corolla Híbrido',
    subtitle: 'Eficiencia y confiabilidad',
    price: '$370,000 MXN'
  },
  {
    id: 2,
    image: 'https://picsum.photos/1200/600?random=2',
    title: 'BMW Serie 3',
    subtitle: 'Lujo y deportividad',
    price: '$640,000 MXN'
  },
  {
    id: 3,
    image: 'https://picsum.photos/1200/600?random=3',
    title: 'Audi A4',
    subtitle: 'Tecnología premium',
    price: '$700,000 MXN'
  }
]

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
      <div className="absolute inset-0 transition-opacity duration-500">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].title}
          className="w-full h-full object-cover"
          onLoad={() => setIsLoaded(true)}
          onError={(e) => {
            console.log('Image failed to load:', slides[currentSlide].image)
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwMCIgaGVpZ2h0PSI2MDAiIHZpZXdCb3g9IjAgMCAxMjAwIDYwMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjEyMDAiIGhlaWdodD0iNjAwIiBmaWxsPSIjNEY0NjRGIi8+Cjx0ZXh0IHg9IjYwMCIgeT0iMzAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSIyNCI+Q29jaGU8L3RleHQ+Cjwvc3ZnPgo='
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
        <div className="absolute inset-0 flex items-center justify-center text-white text-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold mb-2">
              {slides[currentSlide].title}
            </h2>
            <p className="text-lg md:text-xl mb-4">
              {slides[currentSlide].subtitle}
            </p>
            <p className="text-2xl md:text-3xl font-bold">
              {slides[currentSlide].price}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}