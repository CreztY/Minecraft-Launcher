import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'
import PropTypes from 'prop-types'
import {
  RECOMMENDED_MODS,
  OPTIONAL_MODS,
  GRAPHICS_LEVEL_MODS,
  AVAILABLE_SHADERS
} from '../../../config'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

const getModTypeLabel = (modId) => {
  // 1. Check Recommended
  if (RECOMMENDED_MODS.some((m) => m.id === modId)) {
    return { text: 'Obligatorio', color: 'bg-red-900/50 text-red-200 border-red-700/50' }
  }

  // 2. Check Shaders
  if (AVAILABLE_SHADERS[modId]) {
    return { text: 'Shader', color: 'bg-purple-900/50 text-purple-200 border-purple-700/50' }
  }

  // 3. Check Graphics
  const isGraphics = Object.values(GRAPHICS_LEVEL_MODS).some((list) =>
    list.some((m) => m.id === modId)
  )
  if (isGraphics) {
    return { text: 'Gráfico', color: 'bg-blue-900/50 text-blue-200 border-blue-700/50' }
  }

  // 4. Check Optional (excluding shaders key)
  const isOptional = Object.entries(OPTIONAL_MODS).some(([key, list]) => {
    if (key === 'shaders') return false
    return list.some((m) => m.id === modId)
  })
  if (isOptional) {
    return { text: 'Opcional', color: 'bg-green-900/50 text-green-200 border-green-700/50' }
  }

  return { text: 'Extra', color: 'bg-gray-700/50 text-gray-300 border-gray-600/50' }
}

// Helper to check if a mod can be blacklisted (only optional/shader/graphics, NOT required)
const isModBlacklistable = (modId) => {
  // Check if it's in RECOMMENDED_MODS (required mods cannot be blacklisted)
  const isRequired = RECOMMENDED_MODS.some((m) => m.id === modId)
  if (isRequired) return false

  // Check if it's in optional, shaders, or graphics
  const isOptional = Object.values(OPTIONAL_MODS).some(
    (list) => Array.isArray(list) && list.some((m) => m.id === modId)
  )
  const isShader = AVAILABLE_SHADERS[modId] !== undefined
  const isGraphics = Object.values(GRAPHICS_LEVEL_MODS).some((list) =>
    list.some((m) => m.id === modId)
  )

  return isOptional || isShader || isGraphics
}

const ModCard = ({
  mod,
  statusColor,
  Icon,
  onDelete,
  showDeleteButton,
  onRestore,
  showRestoreButton
}) => {
  const [hovered, setHovered] = useState(false)
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0, position: 'top' })
  const typeLabel = getModTypeLabel(mod.id)

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const spaceAbove = rect.top
    const position = spaceAbove < 150 ? 'bottom' : 'top'

    setTooltipPos({
      x: rect.left + rect.width / 2,
      y: position === 'top' ? rect.top - 10 : rect.bottom + 10,
      position
    })
    setHovered(true)
  }

  return (
    <>
      <div
        className={`bg-gray-900/50 rounded-lg p-3 border ${statusColor} transition-colors relative group cursor-help`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="flex items-start justify-between mb-2">
          <h5 className="font-bold text-sm truncate pr-2 flex-1">{mod.name}</h5>
          <Icon className="shrink-0" size={16} />
        </div>
        <div className="flex justify-between items-end">
          <p className="text-xs text-gray-400">
            {mod.installType === 'shaderpack' && 'Shader'}
            {mod.installType === 'resourcepack' && 'Resource Pack'}
            {mod.installType === 'mods' && 'Mod'}
          </p>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full border ${typeLabel.color} font-medium`}
          >
            {typeLabel.text}
          </span>
        </div>
        {showDeleteButton && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(mod)
            }}
            className="mt-2 w-full text-xs bg-red-900/30 hover:bg-red-900/50 text-red-300 border border-red-700/50 rounded px-2 py-1 transition-colors"
          >
            Eliminar y Omitir
          </button>
        )}
        {showRestoreButton && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onRestore(mod)
            }}
            className="mt-2 w-full text-xs bg-blue-900/30 hover:bg-blue-900/50 text-blue-300 border border-blue-700/50 rounded px-2 py-1 transition-colors"
          >
            Restaurar
          </button>
        )}
      </div>

      {/* Tooltip Portal/Overlay */}
      {hovered && (
        <div
          className="fixed z-50 pointer-events-none"
          style={{
            left: tooltipPos.x,
            top: tooltipPos.y,
            transform: `translate(-50%, ${tooltipPos.position === 'top' ? '-100%' : '0'})`
          }}
        >
          <div className="bg-gray-900 border border-gray-600 rounded-lg shadow-xl p-3 w-64 text-center relative">
            {/* Arrow */}
            <div
              className={`absolute left-1/2 -translate-x-1/2 w-3 h-3 bg-gray-900 border-r border-b border-gray-600 transform rotate-45 ${tooltipPos.position === 'top'
                  ? '-bottom-1.5 border-t-0 border-l-0'
                  : '-top-1.5 border-b-0 border-r-0 bg-gray-900 border-t border-l'
                }`}
            ></div>

            <h5 className="font-bold text-green-400 mb-1">{mod.name}</h5>
            <p className="text-xs text-gray-300">
              {mod.description || 'Sin descripción disponible.'}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

ModCard.propTypes = {
  mod: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    installType: PropTypes.string,
    description: PropTypes.string,
    path: PropTypes.string
  }).isRequired,
  statusColor: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  onDelete: PropTypes.func,
  showDeleteButton: PropTypes.bool,
  onRestore: PropTypes.func,
  showRestoreButton: PropTypes.bool
}

function ModsStatus({ modsStatus, modBlacklist, updateBlacklist, onRefreshMods, onToast }) {
  // Obtener mods instalados y totales
  const installedMods = modsStatus?.installed || []
  const totalExpected = modsStatus?.totalExpected || 0
  const totalInstalled = modsStatus?.totalInstalled || 0
  const totalMissing = modsStatus?.totalMissing || 0
  const totalModified = modsStatus?.totalModified || 0
  const totalCorrupted = modsStatus?.totalCorrupted || 0
  const totalOmitted = modsStatus?.totalOmitted || 0
  const omittedMods = modsStatus?.omitted || []

  const handleDeleteAndBlacklist = async (mod) => {
    try {
      // Delete file if it exists
      if (mod.path) {
        const result = await window.api.deleteMod(mod.path)

        if (!result.ok) {
          console.error('Failed to delete mod:', result.error)
          if (onToast) {
            onToast.error(`Error al eliminar ${mod.name}`)
          }
          return
        }
      }

      // Add to blacklist (ensure modBlacklist is an array)
      const currentBlacklist = modBlacklist || []
      const newBlacklist = [...currentBlacklist, mod.id]

      if (typeof updateBlacklist === 'function') {
        updateBlacklist(newBlacklist)
      } else {
        console.error('updateBlacklist is not a function!', updateBlacklist)
        if (onToast) onToast.error('Error interno: No se pudo guardar la configuración')
        return
      }

      // Show success message
      if (onToast) {
        onToast.success(`${mod.name} eliminado y añadido a la lista de omitidos`)
      }
    } catch (error) {
      console.error('Error deleting mod:', error)
      if (onToast) {
        onToast.error('Error al procesar la solicitud')
      }
    }
  }

  const handleRestoreFromBlacklist = (mod) => {
    try {
      const currentBlacklist = modBlacklist || []
      const newBlacklist = currentBlacklist.filter((id) => id !== mod.id)

      if (typeof updateBlacklist === 'function') {
        updateBlacklist(newBlacklist)
      } else {
        console.error('updateBlacklist is not a function!', updateBlacklist)
        if (onToast) onToast.error('Error interno: No se pudo guardar la configuración')
        return
      }

      if (onToast) {
        onToast.success(`${mod.name} restaurado de la lista de omitidos`)
      }
    } catch (error) {
      console.error('Error restoring mod:', error)
      if (onToast) {
        onToast.error('Error al procesar la solicitud')
      }
    }
  }

  return (
    <>
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <Info className="mr-2 text-green-400" size={24} />
        Información avanzada
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Total Esperados</p>
          <p className="text-2xl font-bold text-blue-400">{totalExpected}</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Instalados</p>
          <p className="text-2xl font-bold text-green-400">{totalInstalled}</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Faltantes</p>
          <p className="text-2xl font-bold text-orange-400">{modsStatus?.totalMissing || 0}</p>
        </div>
        <div className="bg-gray-900/50 rounded-lg p-4 border border-gray-700">
          <p className="text-xs text-gray-400 mb-1">Estado</p>
          <div className="flex items-center mt-1">
            {totalInstalled === totalExpected ? (
              <>
                <CheckCircle className="text-green-400 mr-1" size={20} />
                <span className="text-green-400 font-bold">Completo</span>
              </>
            ) : (
              <>
                <XCircle className="text-orange-400 mr-1" size={20} />
                <span className="text-orange-400 font-bold">Incompleto</span>
              </>
            )}
          </div>
        </div>
      </div>

      {installedMods.length > 0 && (
        <>
          <h4 className="text-lg font-bold mb-3 text-gray-300">
            Mods Instalados ({installedMods.length})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {installedMods.map((mod) => (
              <ModCard
                key={mod.id}
                mod={mod}
                statusColor="border-gray-700 hover:border-green-600/50"
                Icon={(props) => <CheckCircle {...props} className="text-green-400" />}
                showDeleteButton={isModBlacklistable(mod.id)}
                onDelete={handleDeleteAndBlacklist}
              />
            ))}
          </div>
        </>
      )}

      {totalMissing > 0 && (
        <>
          <h4 className="text-lg font-bold mb-3 text-gray-300 mt-3">
            Mods Faltantes ({totalMissing})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {modsStatus?.missing?.map((mod) => (
              <ModCard
                key={mod.id}
                mod={mod}
                statusColor="border-gray-700 hover:border-orange-600/50"
                Icon={(props) => <XCircle {...props} className="text-orange-400" />}
                showDeleteButton={isModBlacklistable(mod.id)}
                onDelete={handleDeleteAndBlacklist}
              />
            ))}
          </div>
        </>
      )}

      {totalModified > 0 && (
        <>
          <h4 className="text-lg font-bold mb-3 text-gray-300 mt-3">
            Mods Modificados ({totalModified})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {modsStatus?.modified?.map((mod) => (
              <ModCard
                key={mod.id}
                mod={mod}
                statusColor="border-gray-700 hover:border-yellow-600/50"
                Icon={(props) => <AlertTriangle {...props} className="text-yellow-400" />}
                showDeleteButton={isModBlacklistable(mod.id)}
                onDelete={handleDeleteAndBlacklist}
              />
            ))}
          </div>
        </>
      )}

      {totalCorrupted > 0 && (
        <>
          <h4 className="text-lg font-bold mb-3 text-gray-300 mt-3">
            Mods Corruptos ({totalCorrupted})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {modsStatus?.corrupted?.map((mod) => (
              <ModCard
                key={mod.id}
                mod={mod}
                statusColor="border-gray-700 hover:border-red-600/50"
                Icon={(props) => <AlertCircle {...props} className="text-red-400" />}
                showDeleteButton={isModBlacklistable(mod.id)}
                onDelete={handleDeleteAndBlacklist}
              />
            ))}
          </div>
        </>
      )}

      {totalOmitted > 0 && (
        <>
          <h4 className="text-lg font-bold mb-3 text-gray-300 mt-3">
            Mods Omitidos ({totalOmitted})
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-96 overflow-y-auto">
            {omittedMods.map((mod) => (
              <ModCard
                key={mod.id}
                mod={mod}
                statusColor="border-gray-700 hover:border-gray-500/50"
                Icon={(props) => <Info {...props} className="text-gray-400" />}
                showRestoreButton={true}
                onRestore={handleRestoreFromBlacklist}
              />
            ))}
          </div>
        </>
      )}
    </>
  )
}

ModsStatus.propTypes = {
  modsStatus: PropTypes.object,
  modBlacklist: PropTypes.array,
  updateBlacklist: PropTypes.func,
  onRefreshMods: PropTypes.func,
  onToast: PropTypes.object,
  showDeleteButton: PropTypes.bool
}

export default ModsStatus
