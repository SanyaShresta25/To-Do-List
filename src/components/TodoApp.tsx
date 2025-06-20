// useState: Hook to add and manage local state in a functional component
// Syntax: const [state, setState] = useState(initialValue);

// useEffect: Hook to handle side effects (e.g., data fetching, subscriptions, timers)
// Syntax: useEffect(() => { /* effect code */ return () => { /* cleanup */ } }, [dependencies]);

import { useState, useEffect, type JSX } from 'react';
import { Trash2, Plus, CheckCircle2, Circle, Edit3, Save, X } from 'lucide-react';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

const TodoApp = (): JSX.Element => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Load tasks from localStorage when the component first mounts
  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      try {
        // Parse and restore Date objects
        const parsedTasks = (JSON.parse(savedTasks) as Task[]).map((task) => ({
          ...task,
          createdAt: new Date(task.createdAt),
        }));
        setTasks(parsedTasks);
      } catch (error) {
        console.error('Error parsing saved tasks:', error);
        setDefaultTasks(); // Fallback to defaults
      }
    } else {
      setDefaultTasks(); // If no tasks found
    }
  }, []);

  // Save current tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('todoTasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  const setDefaultTasks = () => {
    setTasks([
      { id: '1', text: 'Pay Bills', completed: false, createdAt: new Date() },
      { id: '2', text: 'Go Shopping', completed: false, createdAt: new Date() },
      { id: '3', text: 'See the Doctor', completed: true, createdAt: new Date() },
    ]);
  };

  const addTask = () => {
    if (inputValue.trim() === '') return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTasks((prev) => [...prev, newTask]);
    setInputValue('');
  };

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const startEditing = (id: string, currentText: string) => {
    setEditingId(id);
    setEditValue(currentText);
  };

  const saveEdit = (id: string) => {
    if (editValue.trim() === '') return;
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, text: editValue.trim() } : task
      )
    );
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const handleEditKeyDown = (e: React.KeyboardEvent, id: string) => {
    if (e.key === 'Enter') {
      saveEdit(id);
    } else if (e.key === 'Escape') {
      cancelEdit();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const completedCount = tasks.filter((task) => task.completed).length;
  const activeCount = tasks.filter((task) => !task.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8ecf8] to-[#f6e9fc] py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-indigo-800 mb-2 drop-shadow-lg">Todo List</h1>
          <p className="text-indigo-500 text-lg drop-shadow">Stay organized and productive</p>
        </div>

        {/* Add Task */}
        <div className="backdrop-blur-xl bg-white/60 rounded-2xl shadow-2xl p-6 mb-6 border border-white/30">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <Plus className="mr-2 text-indigo-500" size={24} />
            ADD ITEM
          </h2>
          <div className="flex gap-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="What needs to be done?"
              className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white/80"
            />
            <button
              onClick={addTask}
              className="px-6 py-3 bg-gradient-to-r from-indigo-300 to-purple-200 hover:from-indigo-400 hover:to-purple-300 text-indigo-900 font-medium rounded-lg flex items-center gap-2 shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="backdrop-blur-xl bg-white/60 rounded-2xl shadow-2xl mb-6 p-2 border border-white/30">
          <div className="flex gap-1">
            {(['all', 'active', 'completed'] as const).map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                  filter === filterType
                    ? 'bg-gradient-to-r from-indigo-300 to-purple-200 text-indigo-900 shadow-md scale-105'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
                {filterType === 'active' && activeCount > 0 && (
                  <span className="ml-2 bg-white text-indigo-500 px-2 py-1 rounded-full text-xs">
                    {activeCount}
                  </span>
                )}
                {filterType === 'completed' && completedCount > 0 && (
                  <span className="ml-2 bg-white text-indigo-500 px-2 py-1 rounded-full text-xs">
                    {completedCount}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Task List */}
        <div className="backdrop-blur-xl bg-white/60 rounded-2xl shadow-2xl p-6 border border-white/30">
          {filteredTasks.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <Circle size={48} className="mx-auto opacity-50" />
              <p className="text-lg mt-3">
                {filter === 'active'
                  ? 'No active tasks'
                  : filter === 'completed'
                  ? 'No completed tasks'
                  : 'No tasks yet'}
              </p>
              {filter === 'all' && (
                <p className="text-sm mt-1">Add a task above to get started!</p>
              )}
            </div>
          ) : (
            <>
              {['all', 'active'].includes(filter) && activeCount > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">TODO ({activeCount})</h2>
                  <div className="space-y-3">
                    {filteredTasks
                      .filter((task) => !task.completed)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <button
                            onClick={() => toggleTask(task.id)}
                            className="text-gray-400 hover:text-blue-500"
                            aria-label="Mark complete"
                          >
                            <Circle size={24} />
                          </button>
                          {editingId === task.id ? (
                            <input
                              type="text"
                              value={editValue}
                              onChange={(e) => setEditValue(e.target.value)}
                              onKeyDown={(e) => handleEditKeyDown(e, task.id)}
                              className="flex-1 px-2 py-1 border border-indigo-300 rounded"
                              autoFocus
                            />
                          ) : (
                            <span className="flex-1 text-gray-800">{task.text}</span>
                          )}
                          <div className="flex gap-1">
                            {editingId === task.id ? (
                              <>
                                <button onClick={() => saveEdit(task.id)} aria-label="Save edit" className="text-green-500 p-1 rounded">
                                  <Save size={18} />
                                </button>
                                <button onClick={cancelEdit} aria-label="Cancel edit" className="text-gray-400 p-1 rounded">
                                  <X size={18} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button onClick={() => startEditing(task.id, task.text)} aria-label="Edit task" className="text-gray-400 p-1 rounded">
                                  <Edit3 size={18} />
                                </button>
                                <button onClick={() => deleteTask(task.id)} aria-label="Delete task" className="text-gray-400 p-1 rounded">
                                  <Trash2 size={18} />
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              {['all', 'completed'].includes(filter) && completedCount > 0 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">COMPLETED ({completedCount})</h2>
                  <div className="space-y-3">
                    {filteredTasks
                      .filter((task) => task.completed)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center gap-3 p-3 border border-gray-100 rounded-lg hover:bg-gray-50 opacity-75"
                        >
                          <button
                            onClick={() => toggleTask(task.id)}
                            className="text-green-500 hover:text-gray-400"
                            aria-label="Mark as incomplete"
                          >
                            <CheckCircle2 size={24} />
                          </button>
                          <span className="flex-1 text-gray-600 line-through">{task.text}</span>
                          <div className="flex gap-1">
                            <button onClick={() => startEditing(task.id, task.text)} aria-label="Edit task" className="text-gray-400 p-1 rounded">
                              <Edit3 size={18} />
                            </button>
                            <button onClick={() => deleteTask(task.id)} aria-label="Delete task" className="text-gray-400 p-1 rounded">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      {/* Footer */}
  <div className="mt-12 text-center text-sm text-gray-500">
    Made with <span className="text-red-500">❤️</span> by <span className="font-medium text-indigo-700">Sanya Shresta Jathanna</span>
  </div>
    </div>
  );
};

export default TodoApp;
