import PropTypes from 'prop-types'
import { Check, AlertCircle, Download, AlertTriangle } from 'lucide-react'

ModsProgress.propTypes = {
  isDownloading: PropTypes.bool.isRequired,
  modsStatus: PropTypes.object.isRequired,
  progress: PropTypes.number.isRequired,
  downloadingMod: PropTypes.object.isRequired
}

export function ModsProgress({ isDownloading, modsStatus, progress, downloadingMod }) {
  if (!modsStatus) {
    return (
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-gray-400">
          <div className="w-4 h-4 rounded-full border-2 border-gray-600 animate-spin"></div>
          <span className="text-sm">Verificando mods...</span>
        </div>
      </div>
    )
  }

  const {
    installed = [],
    missing = [],
    modified = [],
    corrupted = [],
    totalExpected = 0,
    totalInstalled = 0
  } = modsStatus

  return (
    <div className="space-y-4">
      {/* Resumen */}
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-white">Estado de Mods</h3>
          <span className="text-xs text-gray-400">
            {totalInstalled}/{totalExpected}
          </span>
        </div>

        {/* Barra de progreso general */}
        <div className="w-full bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
          <div
            className="bg-green-500 h-full rounded-full transition-all duration-300 shadow-lg shadow-green-500/50"
            style={{ width: `${(totalInstalled / totalExpected) * 100}%` }}
          ></div>
        </div>

        {/* Estadísticas */}
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="bg-gray-800/50 rounded-lg px-3 py-2 flex items-center space-x-2 border border-gray-700">
            <Check className="w-4 h-4 text-green-400" />
            <span className="text-gray-200">{installed.length} Instalado(s)</span>
          </div>
          <div className="bg-gray-800/50 rounded-lg px-3 py-2 flex items-center space-x-2 border border-gray-700">
            <Download className="w-4 h-4 text-blue-400" />
            <span className="text-gray-200">{missing.length} Faltante(s)</span>
          </div>
          {modified.length > 0 && (
            <div className="bg-gray-800/50 rounded-lg px-3 py-2 flex items-center space-x-2 border border-gray-700">
              <AlertTriangle className="w-4 h-4 text-yellow-400" />
              <span className="text-gray-200">{modified.length} Modificado</span>
            </div>
          )}
          {corrupted.length > 0 && (
            <div className="bg-gray-800/50 rounded-lg px-3 py-2 flex items-center space-x-2 border border-gray-700">
              <AlertCircle className="w-4 h-4 text-red-400" />
              <span className="text-gray-200">{corrupted.length} Corrupto</span>
            </div>
          )}
        </div>
      </div>

      {/* Advertencia: lista con puntos y mensaje destacado */}
      {(missing.length > 0 || modified.length > 0 || corrupted.length > 0) && !isDownloading && (
        <div className="bg-linear-to-r from-yellow-900/40 to-orange-900/40 border border-yellow-600/50 rounded-lg p-4 flex items-center space-x-3">
          <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-1" />
          <div className="flex flex-col flex-1">
            <ul className="list-disc pl-5 text-sm text-yellow-200 space-y-1">
              {missing.length > 0 && <li className="ml-1">{missing.length} mod(s) faltante(s).</li>}
              {modified.length > 0 && (
                <li className="ml-1">{modified.length} mod(s) modificado(s).</li>
              )}
              {corrupted.length > 0 && (
                <li className="ml-1">{corrupted.length} mod(s) corrupto(s).</li>
              )}
            </ul>

            <div className="mt-3">
              <strong className="text-sm text-yellow-50 block">Descárgalos para continuar.</strong>
            </div>
          </div>
        </div>
      )}

      {/* Lista de mods instalados */}
      {installed.length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-white">Instalados</h3>
          </div>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {installed.map((mod, idx) => (
              <div
                key={idx}
                className="bg-gray-800/50 rounded-lg mr-3 p-3 border border-green-700/30 flex items-center justify-between text-sm hover:border-green-600/50 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <Check className="w-4 h-4 text-green-400 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-green-300 truncate font-medium">{mod.name}</p>
                    <p className="text-gray-500 text-xs">v{mod.version}</p>
                  </div>
                </div>
                <span className="text-green-400 shrink-0 text-lg">✓</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista de mods faltantes */}
      {missing.length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-white">Faltantes</h3>
          </div>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {missing.map((mod, idx) => (
              <div
                key={idx}
                className={`bg-gray-800/50 rounded-lg p-3 border transition-all ${
                  downloadingMod?.id === mod.id
                    ? 'border-blue-500 bg-blue-900/20'
                    : 'border-blue-700/30 hover:border-blue-600/50'
                } flex items-center justify-between text-sm`}
              >
                <div className="flex items-center space-x-3 flex-1">
                  {downloadingMod?.id === mod.id ? (
                    <div className="w-4 h-4 rounded-full border-2 border-blue-400 border-t-blue-600 animate-spin shrink-0"></div>
                  ) : (
                    <Download className="w-4 h-4 text-blue-400 shrink-0" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-blue-300 truncate font-medium">{mod.name}</p>
                    <p className="text-gray-500 text-xs">v{mod.version}</p>
                  </div>
                </div>
                {downloadingMod?.id === mod.id ? (
                  <span className="text-blue-400 shrink-0 text-sm font-semibold">
                    {Math.round(progress)}%
                  </span>
                ) : (
                  <span className="text-gray-500 shrink-0">-</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista de mods modificados */}
      {modified.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-bold text-yellow-400 px-1">
            ⚠ Modificados ({modified.length})
          </h4>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {modified.map((mod, idx) => (
              <div
                key={idx}
                className="bg-yellow-900/20 rounded-lg p-3 border border-yellow-600/50 flex items-center space-x-3 text-sm hover:border-yellow-600/70 transition-colors"
              >
                <AlertTriangle className="w-4 h-4 text-yellow-400 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-yellow-300 truncate font-medium">{mod.name}</p>
                  <p className="text-gray-500 text-xs">
                    Cambio detectado (v{mod.previousVersion} → v{mod.version})
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Lista de mods corruptos */}
      {corrupted.length > 0 && (
        <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-bold text-red-400">Archivos Corruptos</h3>
          </div>
          <div className="space-y-1 max-h-40 overflow-y-auto">
            {corrupted.map((mod, idx) => (
              <div
                key={idx}
                className="bg-gray-800/50 rounded-lg mr-3 p-3 border border-red-700/30 flex items-center justify-between text-sm hover:border-red-600/50 transition-colors"
              >
                <div className="flex items-center space-x-3 flex-1">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-red-300 truncate font-medium">{mod.name}</p>
                    <p className="text-gray-500 text-xs">
                      Archivo corrupto: {mod.installedFilename || mod.filename || 'desconocido'}
                    </p>
                  </div>
                </div>
                <span className="text-red-400 shrink-0 text-lg">⚠</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Mensaje de éxito */}
      {!isDownloading &&
        installed.length > 0 &&
        missing.length === 0 &&
        modified.length === 0 &&
        corrupted.length === 0 && (
          <div className="bg-linear-to-r from-green-900/40 to-emerald-900/40 border border-green-600/50 rounded-lg p-4 flex items-center space-x-3">
            <Check className="w-5 h-5 text-green-400 shrink-0" />
            <span className="text-sm text-green-200 font-semibold">
              Todos los mods están correctamente instalados
            </span>
          </div>
        )}
    </div>
  )
}

export default ModsProgress
