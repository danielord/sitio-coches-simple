'use client'

// Sistema de almacenamiento robusto para Cloudflare Pages
export class SafeStorage {
  private static isClient = typeof window !== 'undefined'

  static get(key: string, defaultValue: unknown = null) {
    if (!this.isClient) return defaultValue
    
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error)
      return defaultValue
    }
  }

  static set(key: string, value: unknown) {
    if (!this.isClient) return false
    
    try {
      localStorage.setItem(key, JSON.stringify(value))
      return true
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error)
      return false
    }
  }

  static remove(key: string) {
    if (!this.isClient) return false
    
    try {
      localStorage.removeItem(key)
      return true
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error)
      return false
    }
  }

  static clear() {
    if (!this.isClient) return false
    
    try {
      localStorage.clear()
      return true
    } catch (error) {
      console.error('Error clearing localStorage:', error)
      return false
    }
  }
}

// Funciones específicas para el manejo de coches
export const CarStorage = {
  getCars: () => SafeStorage.get('cars', []),
  
  saveCar: (car: Record<string, unknown>) => {
    const cars = CarStorage.getCars()
    cars.push(car)
    const success = SafeStorage.set('cars', cars)
    
    if (success) {
      // Disparar evento para notificar cambios
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('carsUpdated', { detail: cars }))
      }
    }
    
    return success
  },
  
  getSlideshowCars: () => SafeStorage.get('slideshowCars', []),
  
  addToSlideshow: (slideData: Record<string, unknown>) => {
    const slideshowCars = CarStorage.getSlideshowCars()
    slideshowCars.push(slideData)
    const success = SafeStorage.set('slideshowCars', slideshowCars)
    
    if (success) {
      // Disparar evento para actualizar slideshow
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('slideshowUpdated', { detail: slideshowCars }))
      }
    }
    
    return success
  }
}