'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Calculator } from 'lucide-react'

export default function CalculadoraPage() {
  const [precio, setPrecio] = useState('')
  const [enganche, setEnganche] = useState('')
  const [plazo, setPlazo] = useState('12')
  const [tasa, setTasa] = useState('12')
  const [resultado, setResultado] = useState<{
    pagoMensual: string;
    totalPagar: string;
    interesTotal: string;
    montoFinanciar: string;
  } | null>(null)

  const calcular = () => {
    const precioNum = parseFloat(precio)
    const engancheNum = parseFloat(enganche) || 0
    const plazoNum = parseInt(plazo)
    const tasaNum = parseFloat(tasa) / 100 / 12

    const montoFinanciar = precioNum - engancheNum
    const pagoMensual = (montoFinanciar * tasaNum * Math.pow(1 + tasaNum, plazoNum)) / (Math.pow(1 + tasaNum, plazoNum) - 1)
    const totalPagar = pagoMensual * plazoNum + engancheNum
    const interesTotal = totalPagar - precioNum

    setResultado({
      pagoMensual: pagoMensual.toFixed(2),
      totalPagar: totalPagar.toFixed(2),
      interesTotal: interesTotal.toFixed(2),
      montoFinanciar: montoFinanciar.toFixed(2)
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Link href="/" className="flex items-center">
              <Image src="/logo.jpg" alt="V&R Autos" width={40} height={40} className="rounded-lg" />
              <span className="ml-3 text-xl font-bold text-gray-900">V&R Autos - Calculadora</span>
            </Link>
            <Link href="/coches" className="flex items-center text-gray-600 hover:text-blue-600">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a Coches
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
          <Calculator className="h-8 w-8 text-blue-600 mr-3" />
          Calculadora de Financiamiento
        </h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">Datos del Financiamiento</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Precio del Coche (MXN)</label>
                <input
                  type="number"
                  value={precio}
                  onChange={(e) => setPrecio(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="500000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Enganche (MXN)</label>
                <input
                  type="number"
                  value={enganche}
                  onChange={(e) => setEnganche(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="100000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Plazo (meses)</label>
                <select
                  value={plazo}
                  onChange={(e) => setPlazo(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="12">12 meses</option>
                  <option value="24">24 meses</option>
                  <option value="36">36 meses</option>
                  <option value="48">48 meses</option>
                  <option value="60">60 meses</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tasa de Interés Anual (%)</label>
                <input
                  type="number"
                  value={tasa}
                  onChange={(e) => setTasa(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="12"
                  step="0.1"
                />
              </div>

              <button onClick={calcular} className="btn-primary w-full">
                Calcular Financiamiento
              </button>
            </div>
          </div>

          {resultado && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Resultado del Cálculo</h2>
              
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Pago Mensual</p>
                  <p className="text-2xl font-bold text-blue-600">${parseFloat(resultado.pagoMensual).toLocaleString()} MXN</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Monto a Financiar</p>
                    <p className="text-lg font-semibold">${parseFloat(resultado.montoFinanciar).toLocaleString()}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Total a Pagar</p>
                    <p className="text-lg font-semibold">${parseFloat(resultado.totalPagar).toLocaleString()}</p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">Intereses Totales</p>
                  <p className="text-lg font-semibold text-yellow-700">${parseFloat(resultado.interesTotal).toLocaleString()}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}