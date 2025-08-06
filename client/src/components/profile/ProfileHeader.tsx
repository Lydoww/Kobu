import { User, Mail, Calendar, Camera, Edit3, Save, X } from 'lucide-react';
import type { ProfileHeaderProps } from '../../types/Profile';

function ProfileHeader({
  formData,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}: ProfileHeaderProps) {
  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mb-8'>
      {/* Cover Image */}
      <div className='h-32 bg-gradient-to-r from-blue-500 to-purple-600 relative'>
        <button className='absolute top-4 right-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-2 text-white hover:bg-opacity-30 transition-all'>
          <Camera className='w-4 h-4' />
        </button>
      </div>

      {/* Profile Info */}
      <div className='px-6 pb-6'>
        <div className='flex flex-col sm:flex-row sm:items-end sm:space-x-6'>
          {/* Avatar */}
          <div className='relative -mt-16 mb-4 sm:mb-0'>
            <div className='w-32 h-32 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center'>
              <User className='w-16 h-16 text-gray-400' />
            </div>
            <button className='absolute bottom-2 right-2 bg-blue-600 rounded-full p-2 text-white hover:bg-blue-700 transition-colors shadow-lg'>
              <Camera className='w-4 h-4' />
            </button>
          </div>

          {/* User Info */}
          <div className='flex-1'>
            <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
              <div>
                <h1 className='text-2xl font-bold text-gray-900'>
                  {formData.name}
                </h1>
                <p className='text-gray-600 flex items-center mt-1'>
                  <Mail className='w-4 h-4 mr-2' />
                  {formData.email}
                </p>
                <p className='text-gray-600 flex items-center mt-1'>
                  <Calendar className='w-4 h-4 mr-2' />
                  Joined March 2024
                </p>
              </div>

              <div className='flex space-x-2 mt-4 sm:mt-0'>
                {isEditing ? (
                  <>
                    <button
                      onClick={onSave}
                      className='inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium'
                    >
                      <Save className='w-4 h-4 mr-2' />
                      Save
                    </button>
                    <button
                      onClick={onCancel}
                      className='inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
                    >
                      <X className='w-4 h-4 mr-2' />
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={onEdit}
                    className='inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium'
                  >
                    <Edit3 className='w-4 h-4 mr-2' />
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
