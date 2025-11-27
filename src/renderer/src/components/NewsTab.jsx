import PropTypes from 'prop-types'

NewsTab.propTypes = {
  news: PropTypes.array.isRequired
}

function NewsTab({ news }) {
  return (
    <div className="max-w-4xl mx-auto space-y-4">
      <h2 className="text-3xl font-bold mb-6">Noticias y Actualizaciones</h2>
      {news.map((item) => (
        <div
          key={item.id}
          className="bg-gray-800/50 rounded-lg p-6 border border-gray-700 hover:border-green-700/50 transition-colors"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-green-400">{item.title}</h3>
            <span className="text-sm text-gray-500">{item.date}</span>
          </div>
          <p className="text-gray-300">{item.content}</p>
        </div>
      ))}
    </div>
  )
}

export default NewsTab
