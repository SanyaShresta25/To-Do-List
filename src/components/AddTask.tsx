import { Plus } from 'lucide-react';

interface Props {
  inputValue: string;
  setInputValue: (val: string) => void;
  onAdd: () => void;
}

const AddTask = ({ inputValue, setInputValue, onAdd }: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') onAdd();
  };

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 mb-6 border border-white/30">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <Plus className="mr-2 text-indigo-500" size={24} /> ADD ITEM
      </h2>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What needs to be done?"
          className="w-full sm:flex-1 px-4 py-3 border border-gray-200 rounded-lg bg-white/80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />
        <button
          onClick={onAdd}
          className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-300 to-purple-200 hover:from-indigo-400 hover:to-purple-300 text-indigo-900 font-medium rounded-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <Plus size={20} /> Add
        </button>
      </div>
    </div>
  );
};

export default AddTask;
