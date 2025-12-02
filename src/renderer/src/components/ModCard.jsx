import PropTypes from 'prop-types'
import { useState } from 'react'
import {
  RECOMMENDED_MODS,
  OPTIONAL_MODS,
  GRAPHICS_LEVEL_MODS,
  AVAILABLE_SHADERS
} from '../../../config'

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

export const ModCard = ({
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
                }
              `}
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

export default ModCard
