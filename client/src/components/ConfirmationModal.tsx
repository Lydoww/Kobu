import { AlertTriangle, Trash2, X } from 'lucide-react';

export type ConfirmationType = 'board' | 'column' | 'task';

interface ConfirmationModalProps {
  isOpen: boolean;
  type: ConfirmationType;
  itemName?: string;
  onConfirm: () => void;
  onCancel: () => void;
  loading?: boolean;
}

const ConfirmationModal = ({
  isOpen,
  type,
  itemName,
  onConfirm,
  onCancel,
  loading = false,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  const getConfig = () => {
    switch (type) {
      case 'board':
        return {
          title: 'Delete Board',
          message: 'Are you sure you want to delete this board?',
          description:
            'This action cannot be undone. All columns and tasks in this board will be permanently deleted.',
          confirmText: 'Delete Board',
          icon: '🗂️',
          color: 'red',
        };
      case 'column':
        return {
          title: 'Delete Column',
          message: 'Are you sure you want to delete this column?',
          description:
            'This action cannot be undone. All tasks in this column will be permanently deleted.',
          confirmText: 'Delete Column',
          icon: '📋',
          color: 'red',
        };
      case 'task':
        return {
          title: 'Delete Task',
          message: 'Are you sure you want to delete this task?',
          description: 'This action cannot be undone.',
          confirmText: 'Delete Task',
          icon: '✅',
          color: 'red',
        };
      default:
        return {
          title: 'Confirm Action',
          message: 'Are you sure?',
          description: 'This action cannot be undone.',
          confirmText: 'Confirm',
          icon: '⚠️',
          color: 'red',
        };
    }
  };

  const config = getConfig();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    }
    if (e.key === 'Enter' && !loading) {
      onConfirm();
    }
  };

  return (
    <div
      className='fixed inset-0 bg-blur bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4'
      onClick={onCancel}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <div
        className='bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-auto transform transition-all'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center space-x-3'>
            <div className='bg-red-100 rounded-full p-3'>
              <AlertTriangle className='w-6 h-6 text-red-600' />
            </div>
            <div>
              <h2 className='text-xl font-semibold text-gray-900'>
                {config.title}
              </h2>
              {itemName && (
                <p className='text-sm text-gray-500 mt-1'>"{itemName}"</p>
              )}
            </div>
          </div>
          <button
            onClick={onCancel}
            disabled={loading}
            className='text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full w-8 h-8 flex items-center justify-center transition-colors disabled:opacity-50'
            type='button'
          >
            <X className='w-5 h-5' />
          </button>
        </div>

        {/* Content */}
        <div className='mb-6'>
          <p className='text-gray-800 font-medium mb-2'>{config.message}</p>
          <p className='text-gray-600 text-sm leading-relaxed'>
            {config.description}
          </p>
        </div>

        {/* Warning Box */}
        <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
          <div className='flex items-start space-x-3'>
            <AlertTriangle className='w-5 h-5 text-red-600 mt-0.5 flex-shrink-0' />
            <div>
              <p className='text-red-800 font-medium text-sm'>
                This action is permanent
              </p>
              <p className='text-red-700 text-sm'>
                You won't be able to recover this {type} once it's deleted.
              </p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className='flex gap-3'>
          <button
            type='button'
            onClick={onCancel}
            disabled={loading}
            className='flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 transition-colors font-medium'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={onConfirm}
            disabled={loading}
            className='flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400 disabled:cursor-not-allowed transition-colors font-medium flex items-center justify-center space-x-2'
          >
            {loading ? (
              <>
                <div className='animate-spin rounded-full h-4 w-4 border-b-2 border-white'></div>
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className='w-4 h-4' />
                <span>{config.confirmText}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
