interface Props {
  filter: 'all' | 'active' | 'completed';
  setFilter: (f: 'all' | 'active' | 'completed') => void;
  activeCount: number;
  completedCount: number;
}

const FilterTabs = ({ filter, setFilter, activeCount, completedCount }: Props) => (
  <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl mb-6 p-2 border border-white/30">
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-1">
      {(['all', 'active', 'completed'] as const).map((type) => (
        <button
          key={type}
          onClick={() => setFilter(type)}
          className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
            filter === type
              ? 'bg-gradient-to-r from-indigo-300 to-purple-200 text-indigo-900 shadow-md scale-105'
              : 'text-gray-600 hover:bg-white/50'
          }`}
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
          {type === 'active' && activeCount > 0 && (
            <span className="ml-2 bg-white text-indigo-500 px-2 py-1 rounded-full text-xs">
              {activeCount}
            </span>
          )}
          {type === 'completed' && completedCount > 0 && (
            <span className="ml-2 bg-white text-indigo-500 px-2 py-1 rounded-full text-xs">
              {completedCount}
            </span>
          )}
        </button>
      ))}
    </div>
  </div>
);

export default FilterTabs;
