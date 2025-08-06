function ErrorState() {
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
            <p className='text-red-600 text-sm'>
              Failed to load your workspace
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorState;
