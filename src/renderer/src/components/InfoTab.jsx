import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Server,
  Package,
  Users,
  Signal,
  Shield,
  Zap,
  Heart,
  MapPin,
  XCircle,
  Loader
} from 'lucide-react'
import ModsStatus from './ModsStatus'

InfoTab.propTypes = {
  modsStatus: PropTypes.object,
  modBlacklist: PropTypes.array,
  updateBlacklist: PropTypes.func,
  onRefreshMods: PropTypes.func,
  onToast: PropTypes.object
}

function InfoTab({ modsStatus, modBlacklist, updateBlacklist, onRefreshMods, onToast }) {
  console.log('[InfoTab] Props received:', {
    hasModsStatus: !!modsStatus,
    modBlacklist,
    hasUpdateBlacklist: typeof updateBlacklist === 'function',
    hasOnToast: !!onToast
  })
  const [serverStatus, setServerStatus] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const SERVER_IP = 'hub.crezty.com'
  const SERVER_PORT = 25566

  useEffect(() => {
    const fetchServerStatus = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Usar IPC handler en lugar de fetch directo para evitar CSP
        const response = await window.api.fetchServerStatus(SERVER_IP, SERVER_PORT)

        if (response.ok && response.data.online) {
          const data = response.data
          setServerStatus({
            online: true,
            players: data.players?.online || 0,
            maxPlayers: data.players?.max || 0,
            version: data.version || '1.20.1',
            motd: data.motd?.clean?.[0] || 'SoulCraft Server'
          })
        } else {
          setServerStatus({ online: false })
        }
      } catch (err) {
        console.error('Error fetching server status:', err)
        setError('No se pudo conectar al servidor')
        setServerStatus({ online: false })
      } finally {
        setIsLoading(false)
      }
    }

    fetchServerStatus()
    // Actualizar cada 30 segundos
    const interval = setInterval(fetchServerStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  const serverFeatures = [
    { icon: Shield, title: 'Protección Anti-Griefing', desc: 'Tu construcción está 100% segura' },
    { icon: Zap, title: 'Servidor 24/7', desc: 'Disponible siempre que quieras jugar' },
    { icon: Heart, title: 'Comunidad Activa', desc: 'Jugadores amigables y activos' },
    { icon: MapPin, title: 'Mundo Infinito', desc: 'Explora sin límites' }
  ]

  const serverRules = [
    'Respeta a todos los jugadores',
    'No hacer griefing ni robar',
    'No usar hacks o mods prohibidos',
    'No spam en el chat',
    'Reporta bugs al staff'
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold mb-6">Información del Servidor</h2>

      {/* Server Status Card */}
      <div className="bg-linear-to-r from-blue-900/30 to-cyan-900/30 rounded-xl p-6 border border-blue-700/50">
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader className="animate-spin text-cyan-400 mr-2" size={24} />
            <span className="text-gray-300">Consultando estado del servidor...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center py-8 text-red-400">
            <XCircle className="mr-2" size={24} />
            <span>{error}</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-3">
              <Server
                className={serverStatus?.online ? 'text-green-400' : 'text-red-400'}
                size={24}
              />
              <div>
                <p className="text-xs text-gray-400">Estado</p>
                <p
                  className={`font-bold ${serverStatus?.online ? 'text-green-400' : 'text-red-400'}`}
                >
                  {serverStatus?.online ? 'Online' : 'Offline'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Users className="text-cyan-400" size={24} />
              <div>
                <p className="text-xs text-gray-400">Jugadores</p>
                <p className="font-bold text-cyan-400">
                  {serverStatus?.online
                    ? `${serverStatus.players}/${serverStatus.maxPlayers}`
                    : 'N/A'}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Package className="text-purple-400" size={24} />
              <div>
                <p className="text-xs text-gray-400">Versión</p>
                <p className="font-bold text-purple-400">{serverStatus?.version || '1.20.1'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Signal className="text-yellow-400" size={24} />
              <div>
                <p className="text-xs text-gray-400">Latencia</p>
                <p className="font-bold text-green-400">{serverStatus?.online ? 'Buena' : 'N/A'}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Server Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-blue-400">Detalles del Servidor</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">IP del Servidor:</span>
              <span className="font-mono text-cyan-400">{SERVER_IP}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Puerto:</span>
              <span className="font-mono text-cyan-400">{SERVER_PORT}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Versión:</span>
              <span className="font-mono text-purple-400">{serverStatus?.version || '1.20.1'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">MOTD:</span>
              <span className="font-mono text-green-400 text-sm">
                {serverStatus?.motd || 'SoulCraft'}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-green-400">Cómo Conectarse</h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-300">
              Jugar en nuestro servidor es extremadamente fácil
            </p>
            <p className="text-sm text-gray-300">
              Solamente tendrás que pulsar el botón de jugar dentro del launcher
            </p>
            <div className="mt-4 p-3 bg-gray-900/50 rounded border border-gray-700">
              <p className="text-xs text-gray-400 mb-1">Comando directo:</p>
              <code className="text-cyan-400 text-sm">
                /connect {SERVER_IP}:{SERVER_PORT}
              </code>
            </div>
          </div>
        </div>
      </div>

      {/* Server Features */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4 text-cyan-400">Características del Servidor</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {serverFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-cyan-600/50 transition-colors"
            >
              <feature.icon className="text-cyan-400 mb-2" size={24} />
              <h4 className="font-bold text-white mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Server Rules */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4 text-yellow-400">Reglas del Servidor</h3>
        <ul className="space-y-2">
          {serverRules.map((rule, index) => (
            <li key={index} className="flex items-start">
              <span className="text-yellow-400 mr-2">•</span>
              <span className="text-gray-300">{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Mods Status */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <ModsStatus
          modsStatus={modsStatus}
          modBlacklist={modBlacklist}
          updateBlacklist={updateBlacklist}
          onRefreshMods={onRefreshMods}
          onToast={onToast}
        />
      </div>
    </div>
  )
}

export default InfoTab
