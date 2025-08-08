import { Plus } from 'lucide-react';

interface WorkspaceHeaderPros {
  onCreateBoard: () => void;
}

function WorkspaceHeader({ onCreateBoard }: WorkspaceHeaderPros) {
  return (
    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8'>
      <div>
        <h1 className='text-3xl font-bold text-gray-900 mb-2'>My Workspace</h1>
        <p className='text-gray-600'>
          Organize your projects with Kanban boards
        </p>
      </div>

      <button
        onClick={onCreateBoard}
        className='mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm'
      >
        <Plus className='w-5 h-5 mr-2' />
        New Board
      </button>
    </div>
  );
}

export default WorkspaceHeader;
