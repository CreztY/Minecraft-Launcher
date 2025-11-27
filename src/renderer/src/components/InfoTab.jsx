import { Server, Package, Users, Signal } from 'lucide-react'
import { MODS_LIST } from '../../../config'

function InfoTab() {
  const mods = MODS_LIST

  const serverInfo = {
    name: 'SoulCraft Server',
    ip: 'hub.crezty.com',
    port: 25566,
    version: '1.20.1',
    players: 12,
    maxPlayers: 50,
    uptime: '15d 4h 32m',
    tps: 19.8,
    difficulty: 'Hard'
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold mb-6">Información del Servidor</h2>

      {/* Server Status Card */}
      <div className="bg-linear-to-r from-blue-900/30 to-cyan-900/30 rounded-xl p-6 border border-blue-700/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center space-x-3">
            <Server className="text-cyan-400" size={24} />
            <div>
              <p className="text-xs text-gray-400">Servidor</p>
              <p className="font-bold text-cyan-400">{serverInfo.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Users className="text-green-400" size={24} />
            <div>
              <p className="text-xs text-gray-400">Jugadores</p>
              <p className="font-bold text-green-400">
                {serverInfo.players}/{serverInfo.maxPlayers}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Signal className="text-yellow-400" size={24} />
            <div>
              <p className="text-xs text-gray-400">TPS</p>
              <p className="font-bold text-yellow-400">{serverInfo.tps}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Package className="text-purple-400" size={24} />
            <div>
              <p className="text-xs text-gray-400">Versión</p>
              <p className="font-bold text-purple-400">{serverInfo.version}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Server Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-blue-400">Detalles del Servidor</h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">IP del Servidor:</span>
              <span className="font-mono text-cyan-400">{serverInfo.ip}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Puerto:</span>
              <span className="font-mono text-cyan-400">{serverInfo.port}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Dificultad:</span>
              <span className="font-mono text-orange-400">{serverInfo.difficulty}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tiempo activo:</span>
              <span className="font-mono text-purple-400">{serverInfo.uptime}</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-green-400">Cómo Conectarse</h3>
          <div className="space-y-3">
            <p className="text-sm text-gray-300">
              jugar en nuestro servidor es extremadamente fácil
            </p>
            <p className="text-sm text-gray-300">
              solamente tendras que pulsar el boton de jugar dentro del juego
            </p>
          </div>
        </div>
      </div>

      {/* Mods List */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="mt-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
          <p className="text-sm text-gray-300">
            💡 <span className="text-gray-400">Total de mods instalados:</span>{' '}
            <span className="text-green-400 font-bold">{mods.length}</span>
          </p>
        </div>

        <h3 className="text-xl font-bold my-4 flex items-center">
          <Package className="mr-2 text-green-400" size={24} />
          Lista de Mods Instalados ({mods.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {mods.map((mod) => (
            <div
              key={mod.id}
              className="bg-gray-900/50 rounded-lg p-4 border border-gray-700 hover:border-green-600/50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-green-400 text-sm">{mod.name}</h4>
                <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                  {mod.version}
                </span>
              </div>
              <p className="text-xs text-gray-400">
                <span className="text-purple-400 font-semibold">{mod.category}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default InfoTab
