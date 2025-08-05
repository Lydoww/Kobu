// components/skeletons/BoardDetailSkeleton.tsx

const BoardDetailSkeleton = () => {
  return (
    <div className='flex-1 w-full bg-gray-50 p-6 flex flex-col'>
      {/* Board Header Skeleton */}
      <div className='w-full mb-8'>
        <div className='bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden'>
          {/* Header Background Skeleton */}
          <div className='bg-gradient-to-r from-gray-300 to-gray-400 px-8 py-6 animate-pulse'>
            <div className='flex justify-between items-start'>
              <div className='flex-1 mr-6'>
                <div className='h-8 bg-white/30 rounded-lg w-80 mb-3'></div>
                <div className='h-5 bg-white/20 rounded w-96 mb-4'></div>
                <div className='flex items-center'>
                  <div className='w-4 h-4 bg-white/20 rounded mr-2'></div>
                  <div className='h-4 bg-white/20 rounded w-32'></div>
                </div>
              </div>

              {/* Action Buttons Skeleton */}
              <div className='flex items-center gap-2'>
                <div className='h-10 bg-white/20 rounded-lg w-20'></div>
                <div className='h-10 bg-white/20 rounded-lg w-28'></div>
                <div className='h-10 bg-white/20 rounded-lg w-10'></div>
              </div>
            </div>
          </div>

          {/* Bottom section skeleton */}
          <div className='px-8 py-4 bg-gray-50 border-t border-gray-100'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-6'>
                <div className='flex items-center space-x-2'>
                  <div className='w-2 h-2 bg-gray-300 rounded-full animate-pulse'></div>
                  <div className='h-3 bg-gray-300 rounded w-12 animate-pulse'></div>
                </div>
                <div className='h-3 bg-gray-300 rounded w-24 animate-pulse'></div>
              </div>
              <div className='h-3 bg-gray-300 rounded w-20 animate-pulse'></div>
            </div>
          </div>
        </div>
      </div>

      {/* Columns List Skeleton */}
      <div className='flex gap-6 w-full flex-1 overflow-x-auto'>
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className='bg-blue-50 border-blue-200 rounded-2xl flex-shrink-0 w-80 h-full shadow-lg flex flex-col animate-pulse'
          >
            {/* Column Header Skeleton */}
            <div className='p-6 pb-4'>
              <div className='flex justify-between items-start mb-4'>
                <div className='flex-1'>
                  <div className='flex items-center gap-3 mb-2'>
                    <div className='h-6 bg-blue-300 rounded w-24'></div>
                    <div className='bg-white/60 px-2 py-1 rounded-full'>
                      <div className='h-3 bg-blue-300 rounded w-4'></div>
                    </div>
                  </div>
                </div>
                <div className='w-8 h-8 bg-blue-200 rounded-lg'></div>
              </div>
            </div>

            {/* Tasks Skeleton */}
            <div className='flex-1 overflow-y-auto px-4 pb-4'>
              <div className='space-y-3'>
                {[1, 2, 3].map((j) => (
                  <div
                    key={j}
                    className='bg-white rounded-lg shadow-sm border border-gray-200 p-4 animate-pulse'
                  >
                    <div className='flex justify-between items-start mb-2'>
                      <div className='h-4 bg-gray-300 rounded w-3/4'></div>
                      <div className='flex gap-1'>
                        <div className='w-4 h-4 bg-gray-200 rounded'></div>
                        <div className='w-4 h-4 bg-gray-200 rounded'></div>
                      </div>
                    </div>
                    <div className='h-3 bg-gray-300 rounded w-1/2'></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Add Task Button Skeleton */}
            <div className='p-4 pt-2'>
              <div className='w-full h-12 bg-blue-100 border-2 border-dashed border-blue-200 rounded-xl flex items-center justify-center animate-pulse'>
                <div className='flex items-center'>
                  <div className='w-4 h-4 bg-blue-300 rounded mr-2'></div>
                  <div className='h-4 bg-blue-300 rounded w-16'></div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Column Skeleton */}
        <div className='bg-gray-100 border-2 border-dashed border-gray-300 rounded-2xl flex-shrink-0 w-80 h-96 shadow-lg flex flex-col items-center justify-center animate-pulse'>
          <div className='bg-gray-200 rounded-full p-4 mb-4'>
            <div className='w-8 h-8 bg-gray-300 rounded'></div>
          </div>
          <div className='h-6 bg-gray-300 rounded w-32 mb-2'></div>
          <div className='h-4 bg-gray-300 rounded w-24'></div>
        </div>
      </div>
    </div>
  );
};

export default BoardDetailSkeleton;
