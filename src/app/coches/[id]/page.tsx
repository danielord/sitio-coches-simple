import CocheDetalleClient from './CocheDetalleClient'

// Para sitios estáticos, generamos páginas para todos los posibles IDs
export async function generateStaticParams() {
  // IDs por defecto + rango para coches publicados
  const defaultIds = ['1', '2', '3']
  const dynamicIds = []
  
  // Generar IDs para coches que podrían ser publicados
  for (let i = 0; i < 100; i++) {
    dynamicIds.push({ id: `car-${i}` })
  }
  
  return [...defaultIds.map(id => ({ id })), ...dynamicIds]
}

export default function CocheDetallePage({ params }: { params: { id: string } }) {
  return <CocheDetalleClient params={params} />
}