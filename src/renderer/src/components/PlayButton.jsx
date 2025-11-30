import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { PlayCircle } from 'lucide-react'

PlayButton.propTypes = {
  isDownloading: PropTypes.bool.isRequired,
  handlePlay: PropTypes.func.isRequired
}

function PlayButton({ isDownloading, handlePlay }) {
  return (
    <div className="bg-gray-900 border-t border-gray-700 p-6">
      <motion.button
        onClick={handlePlay}
        disabled={isDownloading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        animate={
          !isDownloading
            ? {
                boxShadow: [
                  '0 0 0 0 rgba(22, 163, 74, 0)',
                  '0 0 0 10px rgba(22, 163, 74, 0.1)',
                  '0 0 0 20px rgba(22, 163, 74, 0)'
                ]
              }
            : {}
        }
        transition={
          !isDownloading
            ? {
                duration: 2,
                repeat: Infinity,
                repeatType: 'loop'
              }
            : {}
        }
        className="w-full py-4 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-600 disabled:to-gray-700 rounded-lg font-bold text-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center relative overflow-hidden"
      >
        <PlayCircle className="mr-2 relative z-10" size={24} />
        <span className="relative z-10">{isDownloading ? 'Procesando...' : 'JUGAR'}</span>

        {/* Shine effect on hover */}
        <motion.div
          className="absolute top-0 -left-full w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12"
          initial={{ left: '-100%' }}
          whileHover={{ left: '200%', transition: { duration: 1, ease: 'easeInOut' } }}
        />
      </motion.button>
    </div>
  )
}

export default PlayButton
