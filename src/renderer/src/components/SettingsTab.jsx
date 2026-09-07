import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import { RefreshCw, Sparkles } from 'lucide-react'
import { SHADER_TYPES } from '../../../config'
import { useState } from 'react'

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
  const [selectedShaderType, setSelectedShaderType] = useState(() => {
    if (!shaderPreset) return null
    // Find which type contains this variant
    for (const [typeKey, type] of Object.entries(SHADER_TYPES)) {
      if (Object.values(type.variants).some((v) => v.id === shaderPreset)) {
        return typeKey
      }
    }
    return null
  })

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

              {/* Shader Selector - Two Tier System */}
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
                      <div className="ml-4 pl-4 border-l-2 border-purple-700/50 space-y-4 mt-2">
                        {/* Step 1: Select Shader Type */}
                        <div>
                          <h4 className="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
                            <Sparkles size={16} />
                            Paso 1: Selecciona el tipo de shader
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {Object.entries(SHADER_TYPES).map(([typeKey, shaderType]) => (
                              <button
                                key={typeKey}
                                onClick={() => setSelectedShaderType(typeKey)}
                                className={`p-3 rounded-lg text-left transition-all ${selectedShaderType === typeKey
                                  ? 'bg-purple-900/70 border-2 border-purple-500 shadow-lg shadow-purple-500/20'
                                  : 'bg-gray-900/50 border-2 border-transparent hover:bg-gray-900 hover:border-gray-700'
                                  }`}
                              >
                                <div className="flex items-start gap-2">
                                  <span className="text-2xl">{shaderType.icon}</span>
                                  <div className="flex-1">
                                    <div className="font-semibold text-sm text-gray-200">
                                      {shaderType.name}
                                    </div>
                                    <div className="text-xs text-gray-400 mt-1">
                                      {shaderType.description}
                                    </div>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Step 2: Select Variant */}
                        <AnimatePresence>
                          {selectedShaderType && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="overflow-hidden"
                            >
                              <h4 className="text-sm font-semibold text-purple-300 mb-3 flex items-center gap-2">
                                <Sparkles size={16} />
                                Paso 2: Selecciona la variante
                              </h4>
                              <div className="space-y-2">
                                {Object.entries(SHADER_TYPES[selectedShaderType].variants).map(
                                  ([variantKey, variant]) => (
                                    <label
                                      key={variantKey}
                                      className={`flex items-start p-3 rounded-lg cursor-pointer transition-all ${shaderPreset === variant.id
                                        ? 'bg-purple-900/70 border-2 border-purple-500'
                                        : 'bg-gray-900/50 border-2 border-transparent hover:bg-gray-900 hover:border-gray-700'
                                        }`}
                                    >
                                      <input
                                        type="radio"
                                        name="shaderVariant"
                                        value={variant.id}
                                        checked={shaderPreset === variant.id}
                                        onChange={(e) => setShaderPreset(e.target.value)}
                                        className="mt-1 mr-3 accent-purple-600"
                                      />
                                      <div className="flex-1">
                                        <div className="font-semibold text-sm text-gray-200">
                                          {variant.name}
                                        </div>
                                        <div className="text-xs text-gray-400 mt-1">
                                          {variant.description}
                                        </div>
                                        {variant.recommended && (
                                          <div className="text-xs text-purple-400 mt-1">
                                            💡 Recomendado: {variant.recommended}
                                          </div>
                                        )}
                                      </div>
                                    </label>
                                  )
                                )}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
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
