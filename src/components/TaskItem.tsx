import type { Task } from '../types';
import React from 'react';
import { Circle, CheckCircle2, Edit3, Trash2, Save, X } from 'lucide-react';

interface Props {
  task: Task;
  editingId: string | null;
  editValue: string;
  setEditValue: (v: string) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  startEditing: (id: string, text: string) => void;
  saveEdit: (id: string) => void;
  cancelEdit: () => void;
}

const TaskItem = ({
  task, editingId, editValue, setEditValue,
  toggleTask, deleteTask, startEditing, saveEdit, cancelEdit
}: Props) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') saveEdit(task.id);
    if (e.key === 'Escape') cancelEdit();
  };

  return (
    <div className={`flex items-center gap-3 p-3 border border-gray-100 rounded-lg transition-colors ${task.completed ? 'opacity-75 hover:bg-gray-50' : 'hover:bg-gray-50'}`}>
      <button
        onClick={() => toggleTask(task.id)}
        className={task.completed ? 'text-green-500 hover:text-gray-400' : 'text-gray-400 hover:text-blue-500'}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
      </button>

      {editingId === task.id ? (
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 px-2 py-1 border border-indigo-300 rounded"
          autoFocus
        />
      ) : (
        <span className={`flex-1 ${task.completed ? 'text-gray-600 line-through' : 'text-gray-800'}`}>
          {task.text}
        </span>
      )}

      <div className="flex gap-1">
        {editingId === task.id ? (
          <>
            <button
              onClick={() => saveEdit(task.id)}
              className="text-green-500 p-1 rounded"
              aria-label="Save edit"
              title="Save edit"
            >
              <Save size={18} />
            </button>
            <button
              onClick={cancelEdit}
              className="text-gray-400 p-1 rounded"
              aria-label="Cancel edit"
              title="Cancel edit"
            >
              <X size={18} />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => startEditing(task.id, task.text)}
              className="text-gray-400 p-1 rounded"
              aria-label="Edit task"
              title="Edit task"
            >
              <Edit3 size={18} />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-gray-400 p-1 rounded"
              aria-label="Delete task"
              title="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
