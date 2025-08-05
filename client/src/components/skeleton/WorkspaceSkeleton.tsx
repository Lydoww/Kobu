// components/skeletons/WorkspaceSkeleton.tsx

const WorkspaceSkeleton = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <div className="h-8 bg-gray-300 rounded-lg w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-96 animate-pulse"></div>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="h-10 bg-gray-300 rounded-lg w-32 animate-pulse"></div>
          </div>
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="h-4 bg-gray-300 rounded w-20 mb-2 animate-pulse"></div>
                  <div className="h-8 bg-gray-300 rounded w-12 animate-pulse"></div>
                </div>
                <div className="bg-gray-200 rounded-full p-3 animate-pulse">
                  <div className="w-6 h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Boards Grid Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 h-full">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gray-300 rounded-lg p-3 animate-pulse">
                  <div className="w-6 h-6 bg-gray-400 rounded"></div>
                </div>
                <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>

              <div className="h-6 bg-gray-300 rounded w-3/4 mb-2 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-full mb-4 animate-pulse"></div>
              <div className="h-4 bg-gray-300 rounded w-2/3 mb-4 animate-pulse"></div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-300 rounded w-16 animate-pulse"></div>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="h-3 bg-gray-300 rounded w-20 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Board Card Skeleton */}
          <div className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl p-6 h-full min-h-[200px] flex flex-col items-center justify-center">
            <div className="bg-gray-200 rounded-full p-4 mb-4 animate-pulse">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
            <div className="h-6 bg-gray-300 rounded w-32 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-300 rounded w-24 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkspaceSkeleton;