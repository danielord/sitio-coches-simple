import Link from 'next/link'
import { Car, ArrowLeft } from 'lucide-react'

const coches = [
  {
    id: 1,
    marca: 'Toyota',
    modelo: 'Corolla',
    año: 2020,
    precio: 18500,
    kilometraje: 45000,
    combustible: 'Híbrido',
    imagen: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400'
  },
  {
    id: 2,
    marca: 'BMW',
    modelo: 'Serie 3',
    año: 2019,
    precio: 32000,
    kilometraje: 38000,
    combustible: 'Gasolina',
    imagen: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400'
  },
  {
    id: 3,
    marca: 'Audi',
    modelo: 'A4',
    año: 2021,
    precio: 35000,
    kilometraje: 25000,
    combustible: 'Diésel',
    imagen: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400'
  }
]

export default function CochesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">SitioCoches</span>
            </Link>
            <Link href="/" className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver al Inicio
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Coches Disponibles</h1>
          <p className="text-gray-600">{coches.length} coches encontrados</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coches.map((coche) => (
            <div key={coche.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img 
                src={coche.imagen} 
                alt={`${coche.marca} ${coche.modelo}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {coche.marca} {coche.modelo} {coche.año}
                </h3>
                <p className="text-gray-600 mb-2">
                  {coche.kilometraje.toLocaleString()} km • {coche.combustible}
                </p>
                <p className="text-2xl font-bold text-blue-600 mb-4">
                  €{coche.precio.toLocaleString()}
                </p>
                <Link 
                  href={`/coches/${coche.id}`}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors text-center block"
                >
                  Ver Detalles
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}