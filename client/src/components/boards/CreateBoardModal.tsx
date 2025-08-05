import { useState } from 'react';
import { useBoardStore } from '../../store/boardStore';
import { X, Folder, Loader2 } from 'lucide-react';

interface BoardModalProps {
  onToggle: () => void;
}

const CreateBoardModal = ({ onToggle }: BoardModalProps) => {
  const createOneBoard = useBoardStore((s) => s.createBoard);
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

  const handleAddBoard = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Please enter a board title');
      return;
    }

    setIsLoading(true);

    try {
      await createOneBoard(formData.title.trim(), formData.description.trim());
      setFormData({ title: '', description: '' });
      handleClose();
    } catch (error) {
      console.error('Error creating board:', error);
      alert('Failed to create board. Please try again.');
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
            <div className='bg-blue-100 rounded-full p-2'>
              <Folder className='w-5 h-5 text-blue-600' />
            </div>
            <h2 className='text-xl font-semibold text-gray-900'>
              Create New Board
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
        <form onSubmit={handleAddBoard} className='space-y-4'>
          <div>
            <label
              htmlFor='title'
              className='block text-sm font-medium text-gray-700 mb-2'
            >
              Board Title *
            </label>
            <input
              value={formData.title}
              onChange={handleChange}
              type='text'
              id='title'
              name='title'
              placeholder='e.g., Product Roadmap'
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
              autoFocus
              disabled={isLoading}
              maxLength={100}
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
              placeholder="What's this board about? (optional)"
              rows={3}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none'
              disabled={isLoading}
              maxLength={500}
            />
            <p className='text-xs text-gray-500 mt-1'>
              {formData.description.length}/500 characters
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
              className='flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2'
            >
              {isLoading ? (
                <>
                  <Loader2 className='w-4 h-4 animate-spin' />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Folder className='w-4 h-4' />
                  <span>Create Board</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateBoardModal;
