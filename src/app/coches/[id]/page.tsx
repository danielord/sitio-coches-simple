import CocheDetalleClient from './CocheDetalleClient'

export async function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }]
}

export default function CocheDetallePage({ params }: { params: { id: string } }) {
  return <CocheDetalleClient params={params} />
}