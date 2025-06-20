import { useEffect, useState } from 'react';
import AddTask from './components/AddTask';
import FilterTabs from './components/FilterTabs';
import TaskList from './components/TaskList';
import type { Task } from './types';

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  useEffect(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    if (savedTasks) {
      try {
        const parsed = JSON.parse(savedTasks) as Task[];
        setTasks(parsed.map(t => ({ ...t, createdAt: new Date(t.createdAt) })));
      } catch {
        setDefaultTasks();
      }
    } else setDefaultTasks();
  }, []);

  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
  }, [tasks]);

  const setDefaultTasks = () => {
    setTasks([
      { id: '1', text: 'Pay Bills', completed: false, createdAt: new Date() },
      { id: '2', text: 'Go Shopping', completed: false, createdAt: new Date() },
      { id: '3', text: 'See the Doctor', completed: true, createdAt: new Date() },
    ]);
  };

  const addTask = () => {
    if (!inputValue.trim()) return;
    const newTask: Task = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      createdAt: new Date(),
    };
    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const startEditing = (id: string, text: string) => {
    setEditingId(id);
    setEditValue(text);
  };

  const saveEdit = (id: string) => {
    if (!editValue.trim()) return;
    setTasks(tasks.map(t => t.id === id ? { ...t, text: editValue.trim() } : t));
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
  };

  const filtered = tasks.filter(task =>
    filter === 'active' ? !task.completed :
    filter === 'completed' ? task.completed : true
  );

  const completedCount = tasks.filter(t => t.completed).length;
  const activeCount = tasks.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8ecf8] to-[#f6e9fc] py-10 px-4">
      <div className="max-w-2xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold text-indigo-800 mb-2 drop-shadow-lg">Todo List</h1>
          <p className="text-indigo-500 text-lg drop-shadow">Stay organized and productive</p>
        </div>

        <AddTask
          inputValue={inputValue}
          setInputValue={setInputValue}
          onAdd={addTask}
        />

        <FilterTabs
          filter={filter}
          setFilter={setFilter}
          activeCount={activeCount}
          completedCount={completedCount}
        />

        <TaskList
          tasks={filtered}
          filter={filter}
          editingId={editingId}
          editValue={editValue}
          setEditValue={setEditValue}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          startEditing={startEditing}
          saveEdit={saveEdit}
          cancelEdit={cancelEdit}
        />

        <div className="mt-12 text-center text-sm text-gray-500">
          Made with <span className="text-red-500">❤️</span> by <span className="font-medium text-indigo-700">Sanya Shresta Jathanna</span>
        </div>
      </div>
    </div>
  );
};

export default App;
