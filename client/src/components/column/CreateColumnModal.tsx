import { useState } from 'react';
import { useColumnStore } from '../../store/columnStore';
import { X, Columns, Loader2 } from 'lucide-react';

interface ColumnModalProps {
  onToggle: () => void;
  boardId: string;
  columnsCount: number;
}

const CreateColumnModal = ({
  onToggle,
  boardId,
  columnsCount,
}: ColumnModalProps) => {
  const createOneColumn = useColumnStore((s) => s.createColumn);
  const [formData, setFormData] = useState({
    title: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddColumn = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Please enter a column title');
      return;
    }

    setIsLoading(true);

    try {
      await createOneColumn(boardId, formData.title.trim(), columnsCount + 1);
      setFormData({ title: '' });
      handleClose();
    } catch (error) {
      console.error('Error creating column:', error);
      alert('Failed to create column. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    if (!isLoading) {
      setFormData({ title: '' });
      onToggle();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape' && !isLoading) {
      handleClose();
    }
  };

  // Suggestions for column names
  const suggestions = [
    'To Do',
    'In Progress',
    'Review',
    'Done',
    'Backlog',
    'Testing',
    'Blocked',
  ];

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
            <div className='bg-purple-100 rounded-full p-2'>
              <Columns className='w-5 h-5 text-purple-600' />
            </div>
            <h2 className='text-xl font-semibold text-gray-900'>
              Add New Column
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
        <form onSubmit={handleAddColumn} className='space-y-4'>
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Column Title *
            </label>
            <input
              value={formData.title}
              onChange={handleChange}
              type='text'
              id='title'
              name='title'
              placeholder='e.g., To Do'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all'
              autoFocus
              disabled={isLoading}
              maxLength={50}
            />
          </div>

          {/* Quick Suggestions */}
          <div>
            <p className='text-sm font-medium text-gray-700 mb-2'>
              Quick suggestions:
            </p>
            <div className='flex flex-wrap gap-2'>
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type='button'
                  onClick={() => setFormData({ title: suggestion })}
                  disabled={isLoading}
                  className='px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-purple-100 hover:text-purple-700 transition-colors disabled:opacity-50'
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-3'>
            <p className='text-sm text-blue-800'>
              💡 This will be column #{columnsCount + 1} in your board
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
              className='flex-1 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2'
            >
              {isLoading ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  <span>Adding...</span>
                </>
              ) : (
                <>
                  <Columns className='w-4 h-4' />
                  <span>Add Column</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateColumnModal;
