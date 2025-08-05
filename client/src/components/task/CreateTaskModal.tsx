import { useState } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { X, CheckSquare, Loader2, Plus } from 'lucide-react';

interface TaskModalProps {
  onToggle: () => void;
  onTaskCreated?: (title: string) => Promise<void>;
  columnId: string;
  taskCount: number;
}

const CreateTaskModal = ({
  onToggle,
  onTaskCreated,
  columnId,
  taskCount,
}: TaskModalProps) => {
  const createOneTask = useTaskStore((s) => s.createTask);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddTask = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    setIsLoading(true);

    try {
      if (onTaskCreated) {
        await onTaskCreated(formData.title.trim());
      } else {
        await createOneTask(formData.title.trim(), taskCount, columnId);
      }
      setFormData({ title: '', description: '' });
      handleClose();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({ title: '', description: '' });
      onToggle();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isLoading) {
      handleClose();
    }
  };

  return (
    <div
      className='fixed inset-0 bg-blur bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4'
      onClick={handleClose}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className='bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto transform transition-all'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center space-x-3'>
            <div className='bg-green-100 rounded-full p-2'>
              <CheckSquare className='w-5 h-5 text-green-600' />
            </div>
            <h2 className='text-xl font-semibold text-gray-900'>
              Create New Task
            </h2>
          </div>
          <button
            onClick={handleClose}
            disabled={isLoading}
            className='text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-50'
            type='button'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleAddTask} className='space-y-4'>
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Task Title *
            </label>
            <input
              value={formData.title}
              onChange={handleChange}
              type='text'
              id='title'
              name='title'
              placeholder='e.g., Review design mockups'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all'
              autoFocus
              disabled={isLoading}
              maxLength={200}
            />
          </div>

          <div>
            <label
              htmlFor='description'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={handleChange}
              id='description'
              name='description'
              placeholder='Add more details about this task... (optional)'
              rows={3}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all resize-none'
              disabled={isLoading}
              maxLength={500}
            />
            <p className='text-xs text-gray-500 mt-1'>
              {formData.description.length}/500 characters
            </p>
          </div>

          {/* Task Preview */}
          {formData.title.trim() && (
            <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
              <p className='text-sm font-medium text-gray-700 mb-2'>Preview:</p>
              <div className='bg-white border border-gray-200 rounded-lg p-3 shadow-sm'>
                <h4 className='font-medium text-gray-900 text-sm'>
                  {formData.title.trim()}
                </h4>
                {formData.description.trim() && (
                  <p className='text-gray-600 text-xs mt-1'>
                    {formData.description.trim()}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Info */}
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
            <p className='text-sm text-blue-800'>
              📋 This will be task #{taskCount + 1} in the column
            </p>
          </div>

          {/* Buttons */}
          <div className='flex gap-3 pt-4'>
            <button
              type='button'
              onClick={handleClose}
              disabled={isLoading}
              className='flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition-colors font-medium'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isLoading || !formData.title.trim()}
              className='flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2'
            >
              {isLoading ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Plus className='w-4 h-4' />
                  <span>Create Task</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateTaskModal;
