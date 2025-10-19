import EditarCocheClient from './EditarCocheClient'

export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }
  ]
}

export default function EditarCochePage({ params }: { params: { id: string } }) {
  return <EditarCocheClient params={params} />
}