'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const defaultSlides = [
  {
    id: 1,
    title: 'Toyota Corolla Híbrido',
    subtitle: 'Eficiencia y confiabilidad',
    price: '$370,000 MXN',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=1200&h=600&fit=crop&auto=format'
  },
  {
    id: 2,
    title: 'BMW Serie 3',
    subtitle: 'Lujo y deportividad',
    price: '$640,000 MXN',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200&h=600&fit=crop&auto=format'
  },
  {
    id: 3,
    title: 'Audi A4',
    subtitle: 'Tecnología premium',
    price: '$700,000 MXN',
    image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200&h=600&fit=crop&auto=format'
  }
]

export default function HeroSlideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [slides, setSlides] = useState(defaultSlides)

  useEffect(() => {
    try {
      const slideshowCars = JSON.parse(localStorage.getItem('slideshowCars') || '[]')
      if (slideshowCars.length > 0) {
        setSlides([...defaultSlides, ...slideshowCars])
      }
    } catch (error) {
      console.error('Error loading slideshow cars:', error)
    }
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <div className="relative w-full h-96 md:h-[500px] overflow-hidden rounded-lg bg-gray-900">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${slide.image})`
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center text-white px-4 max-w-4xl">
                  <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                    {slide.title}
                  </h2>
                  <p className="text-lg md:text-xl mb-6 drop-shadow-md">
                    {slide.subtitle}
                  </p>
                  <p className="text-2xl md:text-3xl font-bold text-yellow-400 drop-shadow-lg">
                    {slide.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-200 z-10"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-200 z-10"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide 
                ? 'bg-white scale-110' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}