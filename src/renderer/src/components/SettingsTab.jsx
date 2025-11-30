import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import { RefreshCw } from 'lucide-react'
import { SHADER_PRESETS } from '../../../config'

SettingsTab.propTypes = {
  maxRAM: PropTypes.number.isRequired,
  ramAllocation: PropTypes.number.isRequired,
  setRamAllocation: PropTypes.func.isRequired,
  graphicsLevel: PropTypes.string.isRequired,
  setGraphicsLevel: PropTypes.func.isRequired,
  shaderPreset: PropTypes.string.isRequired,
  setShaderPreset: PropTypes.func.isRequired,
  optionalMods: PropTypes.object.isRequired,
  setOptionalMods: PropTypes.func.isRequired,
  setShowRepairPopup: PropTypes.func.isRequired
}

function SettingsTab({
  maxRAM,
  ramAllocation,
  setRamAllocation,
  graphicsLevel,
  setGraphicsLevel,
  shaderPreset,
  setShaderPreset,
  optionalMods,
  setOptionalMods,
  setShowRepairPopup
}) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold mb-6">Configuración</h2>

      {/* RAM Allocation */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Memoria RAM</h3>
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span className="text-gray-300">RAM asignada: {ramAllocation}GB</span>
            <span className="text-sm text-gray-500">
              Recomendado: 12GB | Disponible: {maxRAM}GB
            </span>
          </div>
          <input
            type="range"
            min="2"
            max={maxRAM}
            step="1"
            value={ramAllocation}
            onChange={(e) => setRamAllocation(Number(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>4GB</span>
            <span>{maxRAM}GB</span>
          </div>
        </div>
      </div>

      {/* Graphics Level */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Mods graficos (opcionales)</h3>
        <div className="space-y-3">
          <label className="flex items-center p-3 bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-900 transition-colors">
            <input
              type="radio"
              name="graphics"
              value="normal"
              checked={graphicsLevel === 'normal'}
              onChange={(e) => setGraphicsLevel(e.target.value)}
              className="mr-3 accent-green-600"
            />
            <div>
              <div className="font-semibold">Sin mods grafico</div>
              <div className="text-sm text-gray-400">Calidad normal del juego</div>
            </div>
          </label>
          <label className="flex items-center p-3 bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-900 transition-colors">
            <input
              type="radio"
              name="graphics"
              value="basic"
              checked={graphicsLevel === 'basic'}
              onChange={(e) => setGraphicsLevel(e.target.value)}
              className="mr-3 accent-green-600"
            />
            <div>
              <div className="font-semibold">Mods visuales basicos (recomendado)</div>
              <div className="text-sm text-gray-400">Buena calidad visual</div>
            </div>
          </label>
          <label className="flex items-center p-3 bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-900 transition-colors">
            <input
              type="radio"
              name="graphics"
              value="high"
              checked={graphicsLevel === 'high'}
              onChange={(e) => setGraphicsLevel(e.target.value)}
              className="mr-3 accent-green-600"
            />
            <div>
              <div className="font-semibold">Mods visuales ultra</div>
              <div className="text-sm text-gray-400">
                Máxima calidad visual (requiere GPU potente)
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Optional Mods */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Mods Opcionales (Visuales)</h3>
        <div className="space-y-3">
          {Object.entries(optionalMods).map(([key, value]) => (
            <div key={key} className="space-y-3">
              <label className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg cursor-pointer hover:bg-gray-900 transition-colors">
                <span className="capitalize font-medium">{key}</span>
                <input
                  type="checkbox"
                  checked={value}
                  onChange={(e) => setOptionalMods({ ...optionalMods, [key]: e.target.checked })}
                  className="w-5 h-5 accent-green-600"
                />
              </label>

              {/* Shader Selector nested */}
              {key === 'shaders' && (
                <AnimatePresence>
                  {value && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 pl-4 border-l-2 border-gray-700 grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        {Object.entries(SHADER_PRESETS).map(([presetKey, preset]) => (
                          <label
                            key={presetKey}
                            className={`flex items-center p-2 rounded-lg cursor-pointer transition-colors ${
                              shaderPreset === presetKey
                                ? 'bg-purple-900/50 border border-purple-500/50'
                                : 'bg-gray-900/50 hover:bg-gray-900'
                            }`}
                          >
                            <input
                              type="radio"
                              name="shaderPreset"
                              value={presetKey}
                              checked={shaderPreset === presetKey}
                              onChange={(e) => setShaderPreset(e.target.value)}
                              className="mr-2 text-purple-500 focus:ring-purple-500 bg-gray-700 border-gray-600"
                            />
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-gray-200">
                                {preset.name.split('(')[0].trim()}
                              </span>
                              <span className="text-xs text-gray-400">
                                {preset.name.match(/\(([^)]+)\)/)?.[1] || ''}
                              </span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Repair Installation */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold mb-4">Mantenimiento</h3>
        <button
          onClick={() => setShowRepairPopup(true)}
          className="flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors"
        >
          <RefreshCw className="mr-2" size={18} />
          Reparar Instalación
        </button>
        <p className="text-sm text-gray-400 mt-2">
          Revertir y volver a descargar todos los archivos del modpack
        </p>
      </div>
    </div>
  )
}

export default SettingsTab
