import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Task } from '../../types/Task';
import ConfirmationModal from '../ConfirmationModal';
import { useState } from 'react';

interface DraggableTaskProps {
  task: Task;
  editingTaskId: string | null;
  editTaskTitle: string;
  onEditTask: (task: Task) => void;
  onSaveTask: (taskId: string) => Promise<void>;
  onDeleteTask: (taskId: string) => Promise<void>;
  setEditingTaskId: (id: string | null) => void;
  setEditTaskTitle: (title: string) => void;
}

const DraggableTask = ({
  task,
  editingTaskId,
  editTaskTitle,
  onEditTask,
  onSaveTask,
  onDeleteTask,
  setEditingTaskId,
  setEditTaskTitle,
}: DraggableTaskProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: `task-${task.id}`,
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleDeleteTask = async () => {
    setIsDeleting(true);
    try {
      await onDeleteTask(task.id);
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`bg-white p-2 rounded mt-2 shadow group hover:shadow-md transition-all cursor-pointer relative ${
          isDragging ? 'opacity-50' : ''
        }`}
      >
        <div className='flex justify-between items-center'>
          {editingTaskId === task.id ? (
            // Mode édition
            <input
              value={editTaskTitle}
              onChange={(e) => setEditTaskTitle(e.target.value)}
              className='flex-1 mr-2 px-1 py-1 border rounded text-sm'
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') onSaveTask(task.id);
                if (e.key === 'Escape') setEditingTaskId(null);
              }}
            />
          ) : (
            // Mode normal avec drag
            <span {...attributes} {...listeners} className='flex-1'>
              {task.title}
            </span>
          )}

          {/* Boutons */}
          <div className='opacity-0 group-hover:opacity-100 transition-opacity flex gap-1 ml-2'>
            {editingTaskId === task.id ? (
              <>
                <button
                  onClick={() => onSaveTask(task.id)}
                  className='text-green-500 text-sm'
                >
                  ✅
                </button>
                <button
                  onClick={() => setEditingTaskId(null)}
                  className='text-gray-500 text-sm'
                >
                  ❌
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => onEditTask(task)}
                  className='text-blue-500 hover:text-blue-700 text-sm'
                >
                  ✏️
                </button>
                <button
                  onClick={() => setShowDeleteModal(true)}
                  className='text-red-500 hover:text-red-700 text-sm'
                >
                  🗑️
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <ConfirmationModal
        isOpen={showDeleteModal}
        type='task'
        itemName={task.title}
        onConfirm={handleDeleteTask}
        onCancel={() => setShowDeleteModal(false)}
        loading={isDeleting}
      />
    </>
  );
};

export default DraggableTask;
