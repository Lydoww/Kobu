import { Plus } from 'lucide-react';

function CreateBoardCard({ onCreateBoard }) {
  return (
    <button
      onClick={onCreateBoard}
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
  );
}

export default CreateBoardCard;
