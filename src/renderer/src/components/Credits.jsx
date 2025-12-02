import PropTypes from 'prop-types'
import { ExternalLink, Code, Palette } from 'lucide-react'

const Credits = ({ credits }) => {
  if (!credits || credits.length === 0) return null

  return (
    <div className="bg-gray-800/50 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-bold mb-6 text-purple-400 flex items-center">
        <Code size={24} className="mr-2" />
        Créditos
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {credits.map((person, index) => (
          <a
            key={index}
            href={person.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group block bg-gray-900/50 rounded-xl p-4 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:-translate-y-1"
            onClick={(e) => {
              e.preventDefault()
              window.api.openExternal(person.url)
            }}
          >
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-600 group-hover:border-purple-500 transition-colors">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-gray-800 rounded-full p-1 border border-gray-600">
                  {person.role.toLowerCase().includes('diseñ') ? (
                    <Palette size={12} className="text-pink-400" />
                  ) : (
                    <Code size={12} className="text-blue-400" />
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-purple-400 font-medium uppercase tracking-wider mb-0.5">
                  {person.role}
                </p>
                <h4 className="text-lg font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                  {person.name}
                </h4>
                <p className="text-xs text-gray-400 truncate">{person.description}</p>
              </div>
              <ExternalLink
                size={16}
                className="text-gray-500 group-hover:text-white transition-colors opacity-0 group-hover:opacity-100"
              />
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}

Credits.propTypes = {
  credits: PropTypes.arrayOf(
    PropTypes.shape({
      role: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      description: PropTypes.string
    })
  ).isRequired
}

export default Credits
