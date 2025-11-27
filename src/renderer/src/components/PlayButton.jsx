import PropTypes from 'prop-types'
import { PlayCircle } from 'lucide-react'

PlayButton.propTypes = {
  isDownloading: PropTypes.bool.isRequired,
  handlePlay: PropTypes.func.isRequired
}

function PlayButton({ isDownloading, handlePlay }) {
  return (
    <div className="bg-gray-900 border-t border-gray-700 p-6">
      <button
        onClick={handlePlay}
        disabled={isDownloading}
        className="w-full py-4 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center"
      >
        <PlayCircle className="mr-2" size={24} />
        {isDownloading ? 'Procesando...' : 'JUGAR'}
      </button>
    </div>
  )
}

export default PlayButton
