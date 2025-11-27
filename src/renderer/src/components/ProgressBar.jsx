import PropTypes from 'prop-types'

ProgressBar.propTypes = {
  isDownloading: PropTypes.bool.isRequired,
  downloadingItem: PropTypes.string.isRequired,
  progress: PropTypes.number.isRequired
}

function ProgressBar({ isDownloading, downloadingItem, progress }) {
  if (!isDownloading) return null

  return (
    <div className="bg-gray-900 border-b border-gray-700 p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-gray-300">{downloadingItem}</span>
        <span className="text-sm text-green-400">{Math.round(progress)}%</span>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
        <div
          className="bg-linear-to-r from-green-500 to-emerald-500 h-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

export default ProgressBar
