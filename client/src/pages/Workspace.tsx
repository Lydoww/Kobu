import { useEffect, useState } from 'react';
import { useBoardStore } from '../store/boardStore';
import CreateBoardModal from '../components/boards/CreateBoardModal';
import { Link } from 'react-router-dom';
import {
  Plus,
  Calendar,
  Users,
  MoreVertical,
  Folder,
  TrendingUp,
} from 'lucide-react';
import WorkspaceSkeleton from '../components/skeleton/WorkspaceSkeleton';

function Workspace() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const boards = useBoardStore((state) => state.boards);
  const loading = useBoardStore((state) => state.loading);
  const error = useBoardStore((state) => state.error);
  const fetchBoards = useBoardStore((state) => state.fetchBoards);

  useEffect(() => {
    fetchBoards();
  }, [fetchBoards]);

  const handleOpenModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  if (loading) {
  return <WorkspaceSkeleton />;
}

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='bg-red-50 border border-red-200 rounded-xl p-6 max-w-md'>
          <div className='flex items-center space-x-3'>
            <div className='bg-red-100 rounded-full p-2'>
              <svg
                className='w-5 h-5 text-red-600'
                fill='currentColor'
                viewBox='0 0 20 20'
              >
                <path
                  fillRule='evenodd'
                  d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
            <div>
              <h3 className='text-red-800 font-semibold'>Loading Error</h3>
              <p className='text-red-600 text-sm'>Failed to load your workspace</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        {/* Header */}
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8'>
          <div>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>My Workspace</h1>
            <p className='text-gray-600'>
              Organize your projects with Kanban boards
            </p>
          </div>

          <button
            onClick={handleOpenModal}
            className='mt-4 sm:mt-0 inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm'
          >
            <Plus className='w-5 h-5 mr-2' />
            New Board
          </button>
        </div>

        {/* Stats Cards */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-600 text-sm font-medium'>
                  Total Boards
                </p>
                <p className='text-2xl font-bold text-gray-900'>
                  {boards.length}
                </p>
              </div>
              <div className='bg-blue-100 rounded-full p-3'>
                <Folder className='w-6 h-6 text-blue-600' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-600 text-sm font-medium'>Active</p>
                <p className='text-2xl font-bold text-green-600'>
                  {boards.length}
                </p>
              </div>
              <div className='bg-green-100 rounded-full p-3'>
                <TrendingUp className='w-6 h-6 text-green-600' />
              </div>
            </div>
          </div>

          <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-600 text-sm font-medium'>Recent</p>
                <p className='text-2xl font-bold text-purple-600'>
                  {Math.min(boards.length, 3)}
                </p>
              </div>
              <div className='bg-purple-100 rounded-full p-3'>
                <Calendar className='w-6 h-6 text-purple-600' />
              </div>
            </div>
          </div>
        </div>

        {/* Boards Grid */}
        {boards.length === 0 ? (
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
              onClick={handleOpenModal}
              className='inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200'
            >
              <Plus className='w-5 h-5 mr-2' />
              Create Your First Board
            </button>
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {boards.map((board) => (
              <Link
                key={board.id}
                to={`/board/${board.id}`}
                className='group block'
              >
                <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md hover:border-blue-200 transition-all duration-200 h-full'>
                  <div className='flex items-start justify-between mb-4'>
                    <div className='bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-3'>
                      <Folder className='w-6 h-6 text-white' />
                    </div>
                    <button className='opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-1 hover:bg-gray-100 rounded'>
                      <MoreVertical className='w-4 h-4 text-gray-400' />
                    </button>
                  </div>

                  <h3 className='text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200'>
                    {board.title}
                  </h3>

                  {board.description && (
                    <p className='text-gray-600 text-sm mb-4 line-clamp-2'>
                      {board.description}
                    </p>
                  )}

                  <div className='flex items-center justify-between text-sm text-gray-500'>
                    <div className='flex items-center space-x-1'>
                      <Users className='w-4 h-4' />
                      <span>1 member</span>
                    </div>
                    <div className='flex items-center space-x-1'>
                      <Calendar className='w-4 h-4' />
                      <span>Updated today</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}

            {/* Create New Board Card */}
            <button
              onClick={handleOpenModal}
              className='bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 h-full min-h-[200px] flex flex-col items-center justify-center group hover:cursor-pointer'
            >
              <div className='bg-gray-200 group-hover:bg-blue-100 rounded-full p-4 mb-4 transition-colors duration-200'>
                <Plus className='w-8 h-8 text-gray-400 group-hover:text-blue-600' />
              </div>
              <h3 className='text-lg font-medium text-gray-600 group-hover:text-blue-600 transition-colors duration-200'>
                Create New Board
              </h3>
              <p className='text-sm text-gray-500 mt-1'>Start a new project</p>
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && <CreateBoardModal onToggle={handleOpenModal} />}
    </div>
  );
}

export default Workspace;
