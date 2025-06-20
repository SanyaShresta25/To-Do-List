import TaskItem from './TaskItem';
import { Circle } from 'lucide-react';
import type { Task } from '../types';

interface Props {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
  editingId: string | null;
  editValue: string;
  setEditValue: (v: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  startEditing: (id: string, text: string) => void;
  saveEdit: (id: string) => void;
  cancelEdit: () => void;
}

const TaskList = ({
  tasks,
  filter,
  editingId,
  editValue,
  setEditValue,
  toggleTask,
  deleteTask,
  startEditing,
  saveEdit,
  cancelEdit,
}: Props) => {
  const hasTasks = tasks.length > 0;
  const completed = tasks.filter(t => t.completed);
  const active = tasks.filter(t => !t.completed);

  if (!hasTasks) {
    return (
      <div className="text-center py-12 text-gray-400 bg-white/60 rounded-2xl shadow-2xl p-6 border border-white/30">
        <Circle size={48} className="mx-auto opacity-50" />
        <p className="text-lg mt-3">
          {filter === 'active' ? 'No active tasks' :
           filter === 'completed' ? 'No completed tasks' : 'No tasks yet'}
        </p>
        {filter === 'all' && <p className="text-sm mt-1">Add a task above to get started!</p>}
      </div>
    );
  }

  return (
    <div className="bg-white/60 backdrop-blur-xl rounded-2xl shadow-2xl p-6 border border-white/30">
      {['all', 'active'].includes(filter) && active.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4">TODO ({active.length})</h2>
          <div className="space-y-3">
            {active.map(task => (
              <TaskItem key={task.id} task={task} {...{ editingId, editValue, setEditValue, toggleTask, deleteTask, startEditing, saveEdit, cancelEdit }} />
            ))}
          </div>
        </>
      )}
      {['all', 'completed'].includes(filter) && completed.length > 0 && (
        <>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 mt-6">COMPLETED ({completed.length})</h2>
          <div className="space-y-3">
            {completed.map(task => (
              <TaskItem key={task.id} task={task} {...{ editingId, editValue, setEditValue, toggleTask, deleteTask, startEditing, saveEdit, cancelEdit }} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskList;
