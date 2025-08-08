import { useState } from 'react';
import { Edit3, Trash2, Plus, Save, X, Calendar } from 'lucide-react';
import type { Board } from '../../types/Board';

interface BoardHeaderProps {
  currentBoard: Board | null;
  boardError: string | null;
  boardLoading: boolean;
  onUpdate: (title: string, description: string) => void;
  onDelete: () => void;
  onToggleModal: () => void;
}

const BoardHeader = ({
  currentBoard,
  boardError,
  onUpdate,
  onDelete,
  onToggleModal,
}: BoardHeaderProps) => {
  const [editMode, setEditMode] = useState(false);
  const [inputInfo, setInputInfo] = useState<{
    title?: string;
    description?: string;
  }>({});

  const handleEdit = () => {
    if (editMode === false && currentBoard) {
      setInputInfo({
        title: currentBoard.title,
        description: currentBoard.description,
      });
      setEditMode(true);
    }
  };

  const handleUpdate = () => {
    const newTitle = inputInfo.title || '';
    const newDescription = inputInfo.description || '';
    onUpdate(newTitle, newDescription);
    setEditMode(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputInfo({ ...inputInfo, [name]: value });
  };

  return (
    <div className='w-full mb-8'>
      <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
        {boardError && (
          <div className='bg-red-50 border-l-4 border-red-400 p-4 mb-4'>
            <div className='flex items-center'>
              <div className='ml-3'>
                <p className='text-red-800 font-medium'>Error loading board</p>
                <p className='text-red-600 text-sm'>
                  Please try refreshing the page
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Header with gradient background */}
        <div className='bg-gradient-to-r from-blue-500 to-purple-600 px-4 sm:px-6 lg:px-8 py-6'>
          {editMode ? (
            <div className='space-y-4'>
              <input
                name='title'
                value={inputInfo.title}
                onChange={handleChange}
                className='w-full text-xl sm:text-2xl font-bold bg-white/90 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-white/50'
                placeholder='Board title...'
              />
              <input
                name='description'
                value={inputInfo.description}
                onChange={handleChange}
                className='w-full bg-white/90 rounded-lg px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-white/50'
                placeholder='Board description...'
              />
              <div className='flex flex-col sm:flex-row gap-3 pt-2'>
                <button
                  onClick={handleUpdate}
                  className='inline-flex items-center justify-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors'
                >
                  <Save className='w-4 h-4 mr-2' />
                  Save
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className='inline-flex items-center justify-center px-4 py-2 bg-white/20 text-white font-medium rounded-lg hover:bg-white/30 transition-colors'
                >
                  <X className='w-4 h-4 mr-2' />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className='flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6'>
              <div className='flex-1'>
                <h1 className='text-2xl sm:text-3xl font-bold text-white mb-3 break-words'>
                  {currentBoard?.title}
                </h1>
                <p className='text-white/90 mb-4 text-base sm:text-lg break-words'>
                  {currentBoard?.description}
                </p>
                <div className='flex items-center text-white/80 text-sm'>
                  <Calendar className='w-4 h-4 mr-2 flex-shrink-0' />
                  <span>
                    Created:{' '}
                    {currentBoard?.createdAt &&
                      new Date(currentBoard.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className='flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-3 lg:ml-6'>
                <button
                  onClick={handleEdit}
                  className='inline-flex items-center justify-center px-4 sm:px-5 py-2.5 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/15 transition-all duration-200 shadow-sm border border-white/20 text-sm sm:text-base'
                >
                  <Edit3 className='w-4 h-4 mr-2 flex-shrink-0' />
                  <span className='hidden sm:inline'>Edit</span>
                </button>

                {/* Add Column - Primary action */}
                <button
                  onClick={onToggleModal}
                  className='inline-flex items-center justify-center px-4 sm:px-5 py-2.5 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/15 hover:border-blue-300 transition-all duration-200 shadow-sm border border-white/20 text-sm sm:text-base'
                >
                  <Plus className='w-4 h-4 mr-2 flex-shrink-0' />
                  <span className='hidden sm:inline'>Add Column</span>
                  <span className='sm:hidden'>Add</span>
                </button>

                {/* Delete - Subtle danger button */}
                <button
                  onClick={onDelete}
                  className='inline-flex items-center justify-center px-4 sm:px-5 py-2.5 bg-white/20 text-white font-semibold rounded-lg hover:bg-white/15 hover:border-red-400 transition-all duration-200 shadow-sm border border-white/20 text-sm sm:text-base'
                >
                  <Trash2 className='w-4 h-4 mr-2 flex-shrink-0' />
                  <span className='hidden sm:inline'>Delete</span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom info section */}
        {!editMode && (
          <div className='px-4 sm:px-6 lg:px-8 py-4 bg-gray-50'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-600'>
              <div className='flex flex-col sm:flex-row sm:items-center sm:space-x-4 gap-2 sm:gap-0'>
                <div className='flex items-center'>
                  <div className='w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0'></div>
                  <span>Active</span>
                </div>
                <span>Last updated: Today</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardHeader;