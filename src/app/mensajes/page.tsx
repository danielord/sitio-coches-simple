'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Send, MessageCircle } from 'lucide-react'

export default function MensajesPage() {
  const [mensajes, setMensajes] = useState<{id: string; chatId: string; texto: string; fecha: string; remitente: string; nombreRemitente: string}[]>([])
  const [nuevoMensaje, setNuevoMensaje] = useState('')
  const [chatActivo, setChatActivo] = useState<string | null>(null)
  const [chats, setChats] = useState<{id: string; nombre: string; ultimoMensaje: string; fecha: string}[]>([])

  useEffect(() => {
    const savedMensajes = JSON.parse(localStorage.getItem('mensajes') || '[]')
    setMensajes(savedMensajes)
    
    // Crear chats de ejemplo si no existen
    if (savedMensajes.length === 0) {
      const chatsPredeterminados = [
        {
          id: 'chat1',
          nombre: 'Carlos García - Toyota Corolla',
          ultimoMensaje: '¿Está disponible el coche?',
          fecha: new Date().toISOString()
        },
        {
          id: 'chat2', 
          nombre: 'Ana López - BMW Serie 3',
          ultimoMensaje: 'Me interesa verlo',
          fecha: new Date().toISOString()
        }
      ]
      setChats(chatsPredeterminados)
      
      const mensajesPredeterminados = [
        {
          id: '1',
          chatId: 'chat1',
          texto: '¿Está disponible el Toyota Corolla?',
          fecha: new Date().toISOString(),
          remitente: 'comprador',
          nombreRemitente: 'Carlos García'
        },
        {
          id: '2',
          chatId: 'chat1', 
          texto: 'Sí, está disponible. ¿Te gustaría verlo?',
          fecha: new Date().toISOString(),
          remitente: 'vendedor',
          nombreRemitente: 'Vendedor'
        }
      ]
      setMensajes(mensajesPredeterminados)
      localStorage.setItem('mensajes', JSON.stringify(mensajesPredeterminados))
    } else {
      // Generar lista de chats únicos
      const chatsUnicos = [...new Set(savedMensajes.map((m: any) => m.chatId))]
      const chatsGenerados = chatsUnicos.map(chatId => {
        const ultimoMensaje = savedMensajes.filter((m: any) => m.chatId === chatId).pop()
        return {
          id: chatId,
          nombre: `Chat ${chatId}`,
          ultimoMensaje: ultimoMensaje?.texto || '',
          fecha: ultimoMensaje?.fecha || new Date().toISOString()
        }
      })
      setChats(chatsGenerados)
    }
  }, [])

  const enviarMensaje = () => {
    if (!nuevoMensaje.trim() || !chatActivo) return

    const mensaje = {
      id: Date.now().toString(),
      chatId: chatActivo,
      texto: nuevoMensaje.trim(),
      fecha: new Date().toISOString(),
      remitente: 'usuario',
      nombreRemitente: 'Tú'
    }

    const nuevosMensajes = [...mensajes, mensaje]
    setMensajes(nuevosMensajes)
    localStorage.setItem('mensajes', JSON.stringify(nuevosMensajes))
    
    // Actualizar último mensaje del chat
    const chatsActualizados = chats.map(chat => 
      chat.id === chatActivo 
        ? { ...chat, ultimoMensaje: nuevoMensaje.trim(), fecha: new Date().toISOString() }
        : chat
    )
    setChats(chatsActualizados)
    
    setNuevoMensaje('')
  }



  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Image src="/logo.jpg" alt="V&R Autos" width={40} height={40} className="rounded-lg" />
              <span className="ml-3 text-xl font-bold text-gray-900">V&R Autos - Mensajes</span>
            </Link>
            <Link href="/coches" className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Coches
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6 h-96">
          <div className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold mb-4">Conversaciones</h2>
            {chats.length === 0 ? (
              <p className="text-gray-500">No hay conversaciones</p>
            ) : (
              chats.map(chat => (
                <div 
                  key={chat.id}
                  onClick={() => setChatActivo(chat.id)}
                  className={`p-3 rounded cursor-pointer mb-2 ${chatActivo === chat.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      <div>
                        <div className="font-medium text-sm">{chat.nombre}</div>
                        <div className="text-xs text-gray-500 truncate">{chat.ultimoMensaje}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-400">
                      {new Date(chat.fecha).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="md:col-span-2 bg-white rounded-lg shadow-md flex flex-col">
            {chatActivo ? (
              <>
                <div className="p-4 border-b">
                  <h3 className="font-semibold">Chat {chatActivo}</h3>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                  {mensajes.filter(m => m.chatId === chatActivo).map(mensaje => (
                    <div key={mensaje.id} className="mb-3">
                      <div className={`p-2 rounded max-w-xs ${mensaje.remitente === 'usuario' ? 'bg-blue-500 text-white ml-auto' : 'bg-gray-200'}`}>
                        {mensaje.texto}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {new Date(mensaje.fecha).toLocaleTimeString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t flex">
                  <input
                    type="text"
                    value={nuevoMensaje}
                    onChange={(e) => setNuevoMensaje(e.target.value)}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && enviarMensaje()}
                  />
                  <button onClick={enviarMensaje} className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">Selecciona una conversación</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}