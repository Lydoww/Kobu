import { Link } from 'react-router-dom';
import { ArrowLeft, Folder } from 'lucide-react';

function NotFoundPage() {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center justify-center px-4'>
      <div className='max-w-md w-full text-center'>
        {/* 404 Illustration */}
        <div className='mb-8'>
          <div className='inline-flex items-center justify-center w-32 h-32 bg-blue-100 rounded-full mb-6'>
            <span className='text-4xl font-bold text-blue-600'>404</span>
          </div>
          <h1 className='text-3xl font-bold text-gray-900 mb-4'>
            Page Not Found
          </h1>
          <p className='text-gray-600 mb-8'>
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className='space-y-4'>
          <Link
            to='/boards'
            className='w-full inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200'
          >
            <Folder className='w-5 h-5 mr-2' />
            Workspace
          </Link>

          <button
            onClick={() => window.history.back()}
            className='w-full inline-flex items-center justify-center px-6 py-3 text-gray-500 font-medium hover:text-gray-700 transition-colors duration-200'
          >
            <ArrowLeft className='w-5 h-5 mr-2' />
            Go Back
          </button>
        </div>

        {/* Helpful Links */}
        <div className='mt-12 pt-8 border-t border-gray-200'>
          <p className='text-sm text-gray-500 mb-4'>Popular pages:</p>
          <div className='flex flex-wrap justify-center gap-4 text-sm'>
            <Link
              to='/boards'
              className='text-blue-600 hover:text-blue-700 transition-colors duration-200'
            >
              Workspace
            </Link>
            <Link
              to='/profile'
              className='text-blue-600 hover:text-blue-700 transition-colors duration-200'
            >
              Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;
