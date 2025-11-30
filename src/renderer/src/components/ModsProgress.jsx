import PropTypes from 'prop-types'
import { Check, AlertCircle, Download, AlertTriangle, Package, Trash2 } from 'lucide-react'
import ModsStatus from './ModsStatus'

export function ModsProgress({
  isDownloading,
  modsStatus,
  modBlacklist,
  updateBlacklist,
  onRefreshMods,
  onToast
}) {
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
    unused = [],
    totalExpected = 0,
    totalInstalled = 0
  } = modsStatus

  return (
    <div className="space-y-4">
      <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
        <div className="flex justify-between items-center mb-3">
          <h3 className="flex items-center text-lg font-bold text-white">
            <Package className="mr-2 text-green-400" size={24} />
            Estado de Mods
          </h3>
          <span className="text-xs text-gray-400">
            {totalInstalled}/{totalExpected}
          </span>
        </div>

        <div className="w-full bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
          <div
            className="bg-green-500 h-full rounded-full transition-all duration-300 shadow-lg shadow-green-500/50"
            style={{ width: `${totalExpected ? (totalInstalled / totalExpected) * 100 : 0}%` }}
          />
        </div>

        <div className="grid grid-cols-3 gap-3 text-sm mb-3">
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

          {unused.length > 0 && (
            <div className="bg-gray-800/50 rounded-lg px-3 py-2 flex items-center space-x-2 border border-gray-700">
              <Trash2 className="w-4 h-4 text-red-400" />
              <span className="text-gray-200">{unused.length} A eliminar</span>
            </div>
          )}
        </div>

        {(missing.length > 0 || modified.length > 0 || corrupted.length > 0 || unused.length > 0) &&
          !isDownloading && (
            <div className="bg-linear-to-r from-yellow-900/40 to-orange-900/40 border border-yellow-600/50 rounded-lg p-4 flex items-center space-x-3 mb-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-1" />
              <div className="flex flex-col flex-1">
                <ul className="list-disc pl-5 text-sm text-yellow-200 space-y-1">
                  {missing.length > 0 && <li>{missing.length} mod(s) faltante(s).</li>}
                  {modified.length > 0 && <li>{modified.length} mod(s) modificado(s).</li>}
                  {corrupted.length > 0 && <li>{corrupted.length} mod(s) corrupto(s).</li>}
                  {unused.length > 0 && <li>{unused.length} mod(s) innecesario(s).</li>}
                </ul>

                <strong className="text-sm text-yellow-50 mt-3 block">
                  ¡Descárgalos para continuar!
                </strong>
              </div>
            </div>
          )}

        <ModsStatus
          modsStatus={modsStatus}
          modBlacklist={modBlacklist}
          updateBlacklist={updateBlacklist}
          onRefreshMods={onRefreshMods}
          onToast={onToast}
        />
      </div>

      {!isDownloading &&
        missing.length === 0 &&
        modified.length === 0 &&
        corrupted.length === 0 &&
        unused.length === 0 && (
          <div className="bg-linear-to-r from-green-900/40 to-emerald-900/40 border border-green-600/50 rounded-lg p-4 flex items-center space-x-3">
            <Check className="w-5 h-5 text-green-400 shrink-0" />
            <span className="text-sm text-green-200 font-semibold">
              Todos los mods están correctamente instalados ✅
            </span>
          </div>
        )}
    </div>
  )
}

ModsProgress.propTypes = {
  isDownloading: PropTypes.bool.isRequired,
  modsStatus: PropTypes.object.isRequired,
  progress: PropTypes.number, // ← no se usaba, lo dejé opcional
  downloadingMod: PropTypes.object, // ← tampoco se usaba, opcional
  modBlacklist: PropTypes.array,
  updateBlacklist: PropTypes.func,
  onRefreshMods: PropTypes.func,
  onToast: PropTypes.object
}

export default ModsProgress
