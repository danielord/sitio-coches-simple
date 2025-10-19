import Link from 'next/link'
import Image from 'next/image'
import { Car, ArrowLeft, Phone, Mail, Calendar, Gauge, Fuel } from 'lucide-react'

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}



const defaultCochesData = {
  '1': {
    marca: 'Toyota',
    modelo: 'Corolla',
    año: 2020,
    precio: 370000,
    kilometraje: 45000,
    combustible: 'Híbrido',
    transmision: 'Automática',
    descripcion: 'Excelente Toyota Corolla híbrido en perfectas condiciones.',
    imagen: 'https://picsum.photos/600/400?random=10',
    vendedor: {
      nombre: 'Carlos García',
      telefono: '+52 55 1234 5678',
      email: 'carlos@vrautos.com'
    }
  },
  '2': {
    marca: 'BMW',
    modelo: 'Serie 3',
    año: 2019,
    precio: 640000,
    kilometraje: 38000,
    combustible: 'Gasolina',
    transmision: 'Automática',
    descripcion: 'BMW Serie 3 en excelente estado con equipamiento completo.',
    imagen: 'https://picsum.photos/600/400?random=11',
    vendedor: {
      nombre: 'Ana López',
      telefono: '+52 55 9876 5432',
      email: 'ana@vrautos.com'
    }
  },
  '3': {
    marca: 'Audi',
    modelo: 'A4',
    año: 2021,
    precio: 700000,
    kilometraje: 25000,
    combustible: 'Diésel',
    transmision: 'Automática',
    descripcion: 'Audi A4 prácticamente nuevo con garantía oficial.',
    imagen: 'https://picsum.photos/600/400?random=12',
    vendedor: {
      nombre: 'Miguel Ruiz',
      telefono: '+52 55 5555 1234',
      email: 'miguel@vrautos.com'
    }
  }
}

export default function CocheDetallePage({ params }: { params: { id: string } }) {
  // Buscar en coches por defecto
  let coche = defaultCochesData[params.id as keyof typeof defaultCochesData]
  
  // Fallback al primer coche por defecto si no se encuentra
  if (!coche) {
    coche = defaultCochesData['1']
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Image src="/logo.jpg" alt="V&R Autos" width={40} height={40} className="rounded-lg" />
              <span className="ml-3 text-xl font-bold text-gray-900 dark:text-white">V&R Autos</span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/vender" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium">Vender</Link>
              <Link href="/login" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 font-medium">Iniciar Sesión</Link>
              <Link href="/coches" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-blue-600">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Coches
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <Image
              src={coche.imagen}
              alt={`${coche.marca} ${coche.modelo}`}
              width={600}
              height={400}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {coche.marca} {coche.modelo}
            </h1>
            <p className="text-4xl font-bold text-blue-600 mb-6">
              ${coche.precio.toLocaleString()} MXN
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{coche.año}</span>
              </div>
              <div className="flex items-center">
                <Gauge className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{coche.kilometraje.toLocaleString()} km</span>
              </div>
              <div className="flex items-center">
                <Fuel className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-700 dark:text-gray-300">{coche.combustible}</span>
              </div>
              <div className="flex items-center">
                <Car className="h-5 w-5 text-gray-400 mr-2" />
                <span className="text-gray-700">{coche.transmision || 'Automática'}</span>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Descripción</h2>
              <p className="text-gray-700 dark:text-gray-300">{coche.descripcion}</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Contactar Vendedor</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium text-gray-900 dark:text-white">{coche.vendedor.nombre}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <a href={`tel:${coche.vendedor.telefono}`} className="text-blue-600 hover:text-blue-700">
                    {coche.vendedor.telefono}
                  </a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <a href={`mailto:${coche.vendedor.email}`} className="text-blue-600 hover:text-blue-700">
                    {coche.vendedor.email}
                  </a>
                </div>
              </div>
              
              <div className="mt-4 space-y-2">
                <a
                  href={`tel:${coche.vendedor.telefono}`}
                  className="btn-primary w-full text-center block"
                >
                  Llamar Ahora
                </a>
                <a
                  href={`mailto:${coche.vendedor.email}?subject=Interés en ${coche.marca} ${coche.modelo}`}
                  className="btn-secondary w-full text-center block"
                >
                  Enviar Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}