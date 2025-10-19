// Función para generar URLs de imágenes de coches basadas en marca y modelo
export function generateCarImageUrl(marca: string, modelo: string): string {
  // Normalizar marca y modelo
  const normalizedMarca = marca.toLowerCase().trim()
  const normalizedModelo = modelo.toLowerCase().trim()
  
  // Mapeo de marcas y modelos a imágenes específicas de Unsplash
  const carImageMap: { [key: string]: string } = {
    // Toyota
    'toyota-corolla': 'photo-1549317661-bd32c8ce0db2',
    'toyota-camry': 'photo-1621007947382-bb3c3994e3fb',
    'toyota-prius': 'photo-1606664515524-ed2f786a0bd6',
    'toyota-rav4': 'photo-1549317661-bd32c8ce0db2',
    
    // BMW
    'bmw-serie 3': 'photo-1555215695-3004980ad54e',
    'bmw-x3': 'photo-1617788138017-80ad40651399',
    'bmw-x5': 'photo-1617788138017-80ad40651399',
    'bmw-serie 5': 'photo-1555215695-3004980ad54e',
    
    // Audi
    'audi-a4': 'photo-1606664515524-ed2f786a0bd6',
    'audi-a3': 'photo-1606664515524-ed2f786a0bd6',
    'audi-q5': 'photo-1606664515524-ed2f786a0bd6',
    'audi-a6': 'photo-1606664515524-ed2f786a0bd6',
    
    // Mercedes
    'mercedes-clase c': 'photo-1618843479313-40f8afb4b4d8',
    'mercedes-clase e': 'photo-1618843479313-40f8afb4b4d8',
    'mercedes-glc': 'photo-1618843479313-40f8afb4b4d8',
    
    // Volkswagen
    'volkswagen-golf': 'photo-1549317661-bd32c8ce0db2',
    'volkswagen-jetta': 'photo-1549317661-bd32c8ce0db2',
    'volkswagen-tiguan': 'photo-1549317661-bd32c8ce0db2',
    
    // Nissan
    'nissan-sentra': 'photo-1549317661-bd32c8ce0db2',
    'nissan-altima': 'photo-1549317661-bd32c8ce0db2',
    'nissan-x-trail': 'photo-1549317661-bd32c8ce0db2',
    
    // Honda
    'honda-civic': 'photo-1549317661-bd32c8ce0db2',
    'honda-accord': 'photo-1549317661-bd32c8ce0db2',
    'honda-cr-v': 'photo-1549317661-bd32c8ce0db2',
    
    // Ford
    'ford-focus': 'photo-1549317661-bd32c8ce0db2',
    'ford-fusion': 'photo-1549317661-bd32c8ce0db2',
    'ford-escape': 'photo-1549317661-bd32c8ce0db2',
    
    // Chevrolet
    'chevrolet-cruze': 'photo-1549317661-bd32c8ce0db2',
    'chevrolet-malibu': 'photo-1549317661-bd32c8ce0db2',
    'chevrolet-equinox': 'photo-1549317661-bd32c8ce0db2'
  }
  
  // Buscar imagen específica para marca-modelo
  const key = `${normalizedMarca}-${normalizedModelo}`
  let imageId = carImageMap[key]
  
  // Si no encuentra imagen específica, usar imagen por marca
  if (!imageId) {
    const marcaImageMap: { [key: string]: string } = {
      'toyota': 'photo-1549317661-bd32c8ce0db2',
      'bmw': 'photo-1555215695-3004980ad54e', 
      'audi': 'photo-1606664515524-ed2f786a0bd6',
      'mercedes': 'photo-1618843479313-40f8afb4b4d8',
      'volkswagen': 'photo-1549317661-bd32c8ce0db2',
      'nissan': 'photo-1549317661-bd32c8ce0db2',
      'honda': 'photo-1549317661-bd32c8ce0db2',
      'ford': 'photo-1549317661-bd32c8ce0db2',
      'chevrolet': 'photo-1549317661-bd32c8ce0db2'
    }
    imageId = marcaImageMap[normalizedMarca] || 'photo-1549317661-bd32c8ce0db2'
  }
  
  return `https://images.unsplash.com/${imageId}?w=400&h=200&fit=crop&auto=format`
}

// Función para generar imagen de slideshow
export function generateCarSlideshowImage(marca: string, modelo: string): string {
  return generateCarImageUrl(marca, modelo).replace('w=400&h=200', 'w=1200&h=600')
}

// Función para generar imagen de detalle
export function generateCarDetailImage(marca: string, modelo: string): string {
  return generateCarImageUrl(marca, modelo).replace('w=400&h=200', 'w=600&h=400')
}