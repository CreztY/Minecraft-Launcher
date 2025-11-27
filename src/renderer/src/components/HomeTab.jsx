import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

HomeTab.propTypes = {
  ramAllocation: PropTypes.number.isRequired,
  news: PropTypes.array.isRequired,
  istalledMods: PropTypes.number.isRequired
}

function HomeTab({ ramAllocation, news, istalledMods }) {
  const welcomeMessages = [
    '¿Estás listo para divertirte, explorar y morir?',
    '¡Bienvenido a SoulCraft!'
  ]

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const currentMessage = welcomeMessages[currentMessageIndex]

    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          // Escribiendo
          if (displayedText.length < currentMessage.length) {
            setDisplayedText(currentMessage.slice(0, displayedText.length + 1))
          } else {
            // Pausa antes de borrar
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          // Borrando
          if (displayedText.length > 0) {
            setDisplayedText(displayedText.slice(0, -1))
          } else {
            // Cambiar al siguiente mensaje
            setIsDeleting(false)
            setCurrentMessageIndex((prev) => (prev + 1) % welcomeMessages.length)
          }
        }
      },
      isDeleting ? 50 : 100
    )

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, currentMessageIndex])

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-linear-to-r from-green-900/30 to-emerald-900/30 rounded-xl p-8 border border-green-700/50">
        <h2 className="text-3xl font-bold mb-2">¡Bienvenido!</h2>
        <p className="text-gray-300 min-h-6">
          {displayedText}
          <span className="inline-block w-0.5 h-5 bg-green-400 ml-1 animate-pulse"></span>
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-green-400">{istalledMods}</div>
          <div className="text-sm text-gray-400">Mods instalados</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-blue-400">1.20.1</div>
          <div className="text-sm text-gray-400">Versión Forge</div>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="text-2xl font-bold text-purple-400">{ramAllocation}GB</div>
          <div className="text-sm text-gray-400">RAM asignada</div>
        </div>
      </div>

      {/* Últimas noticias preview */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Últimas Noticias</h3>
        {news.slice(0, 2).map((item) => (
          <div key={item.id} className="mb-4 last:mb-0">
            <div className="flex justify-between items-start mb-1">
              <h4 className="font-semibold text-green-400">{item.title}</h4>
              <span className="text-xs text-gray-500">{item.date}</span>
            </div>
            <p className="text-sm text-gray-400">{item.content}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeTab
