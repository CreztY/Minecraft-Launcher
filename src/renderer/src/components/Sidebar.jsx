import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { Settings, PlayCircle, Info, AlertTriangle, X, AlertCircle, Check } from 'lucide-react'
import logobg from '../assets/logobg.png'

Sidebar.propTypes = {
  activeTab: PropTypes.string.isRequired,
  setActiveTab: PropTypes.func.isRequired,
  javaInstalled: PropTypes.bool,
  javaVersion: PropTypes.string,
  forgeStatus: PropTypes.oneOf(['exact', 'acceptable', 'notInstalled']),
  forgeVersion: PropTypes.string,
  modsStatus: PropTypes.object
}

function Sidebar({
  activeTab,
  setActiveTab,
  javaInstalled,
  javaVersion,
  forgeStatus,
  forgeVersion,
  modsStatus
}) {
  const navItems = [
    { id: 'home', label: 'Inicio', icon: PlayCircle },
    { id: 'news', label: 'Noticias', icon: () => <span className="mr-2">📰</span> },
    { id: 'info', label: 'Información', icon: Info },
    { id: 'settings', label: 'Configuración', icon: Settings }
  ]

  return (
    <div className="w-64 bg-gray-900/50 backdrop-blur border-r border-gray-700 flex flex-col">
      <div className="p-6 border-b border-gray-700">
        <img src={logobg} alt="soulcraft" />
        <p className="text-sm text-center text-gray-400 mt-3">v{__APP_VERSION__}</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <motion.button
              key={item.id}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveTab(item.id)}
              className={`w-full px-4 py-3 rounded-lg text-left transition-colors relative ${activeTab === item.id ? 'text-white' : 'hover:bg-gray-800 text-gray-300'
                }`}
            >
              {activeTab === item.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-green-600 rounded-lg shadow-lg -z-10"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="inline mr-2 relative z-10" size={18} />
              <span className="relative z-10">{item.label}</span>
            </motion.button>
          )
        })}
      </nav>

      {/* System Status */}
      <div className="p-4 border-t border-gray-700 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Java</span>
          {javaInstalled === null ? (
            <span className="text-yellow-400">Verificando...</span>
          ) : javaInstalled ? (
            <div className="flex items-center gap-1">
              <Check className="text-green-400" size={16} />
              <span className="text-green-400 text-xs">{javaVersion}</span>
            </div>
          ) : (
            <AlertCircle className="text-red-400" size={16} />
          )}
        </div>
        <div className="flex items-center justify-between text-sm group">
          <span className="text-gray-400">Forge</span>
          {forgeStatus === null ? (
            <span className="text-yellow-400">Verificando...</span>
          ) : forgeStatus === 'exact' ? (
            <div className="flex items-center gap-1" title="Esta es la versión recomendada">
              <Check className="text-green-400" size={16} />
              <span className="text-green-400 text-xs">{forgeVersion}</span>
            </div>
          ) : forgeStatus === 'acceptable' ? (
            <div
              className="flex items-center gap-1 cursor-help"
              title="Esta versión parece aceptable, pero no es la recomendada"
            >
              <AlertTriangle className="text-yellow-400" size={16} />
              <span className="text-yellow-400 text-xs">{forgeVersion}</span>
              <div className="hidden group-hover:block absolute bottom-full mb-2 bg-gray-700 text-gray-100 text-xs rounded px-2 py-1 whitespace-nowrap">
                Aceptable pero no recomendada
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1" title="Forge no instalado">
              <X className="text-red-400" size={16} />
              <span className="text-red-400 text-xs">No instalado</span>
            </div>
          )}
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">Mods</span>
          {modsStatus === null ? (
            <span className="text-yellow-400">Verificando...</span>
          ) : modsStatus.totalInstalled === undefined ? (
            <span className="text-yellow-400">No instalados</span>
          ) : (
            <span
              className={
                modsStatus.totalInstalled === modsStatus.totalExpected
                  ? 'text-green-400'
                  : 'text-yellow-400'
              }
            >
              {modsStatus.totalInstalled}/{modsStatus.totalExpected}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sidebar
