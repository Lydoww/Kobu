import { Plus, Folder } from 'lucide-react';

interface EmptyStateProps {
  onCreateBoard: () => void;
}

function EmptyState({ onCreateBoard }: EmptyStateProps) {
  return (
    <div className='text-center py-16'>
      <div className='bg-gray-100 rounded-full p-4 w-20 h-20 mx-auto mb-6 flex items-center justify-center'>
        <Folder className='w-10 h-10 text-gray-400' />
      </div>
      <h3 className='text-xl font-semibold text-gray-900 mb-2'>
        No boards yet
      </h3>
      <p className='text-gray-600 mb-6 max-w-md mx-auto'>
        Create your first board to start organizing your projects with our
        Kanban system.
      </p>
      <button
        onClick={onCreateBoard}
        className='inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200'
      >
        <Plus className='w-5 h-5 mr-2' />
        Create Your First Board
      </button>
    </div>
  );
}

export default EmptyState;
