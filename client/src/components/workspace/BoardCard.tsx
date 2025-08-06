import { Link } from 'react-router-dom';
import { Folder, MoreVertical, Users, Calendar } from 'lucide-react';

function BoardCard({ board }) {
  return (
    <Link key={board.id} to={`/board/${board.id}`} className='group block'>
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
  );
}

export default BoardCard;
