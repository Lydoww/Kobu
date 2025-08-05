import { useState } from 'react';
import {
  User,
  Mail,
  Calendar,
  Settings,
  Bell,
  Shield,
  Edit3,
  Save,
  X,
  Camera,
  Folder,
  CheckCircle,
  Activity,
} from 'lucide-react';

function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Product Manager passionate about building great user experiences.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: Save to backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    // Reset form data
    setIsEditing(false);
  };

  const stats = [
    {
      label: 'Boards Created',
      value: 12,
      icon: Folder,
      color: 'text-blue-600',
    },
    {
      label: 'Tasks Completed',
      value: 89,
      icon: CheckCircle,
      color: 'text-green-600',
    },
    {
      label: 'Days Active',
      value: 45,
      icon: Activity,
      color: 'text-purple-600',
    },
  ];

  const recentActivity = [
    { action: 'Created board "Product Roadmap"', time: '2 hours ago' },
    { action: 'Completed task "Design Review"', time: '1 day ago' },
    { action: 'Updated board "Marketing Campaign"', time: '3 days ago' },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 py-8'>
        {/* Profile Header */}
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
                          onClick={handleSave}
                          className='inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium'
                        >
                          <Save className='w-4 h-4 mr-2' />
                          Save
                        </button>
                        <button
                          onClick={handleCancel}
                          className='inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
                        >
                          <X className='w-4 h-4 mr-2' />
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => setIsEditing(true)}
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

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            {/* Profile Details */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <h2 className='text-xl font-semibold text-gray-900 mb-6'>
                Profile Information
              </h2>

              <div className='space-y-6'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  ) : (
                    <p className='text-gray-900'>{formData.name}</p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                  ) : (
                    <p className='text-gray-900'>{formData.email}</p>
                  )}
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-2'>
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name='bio'
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                    />
                  ) : (
                    <p className='text-gray-900'>{formData.bio}</p>
                  )}
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Location
                    </label>
                    {isEditing ? (
                      <input
                        type='text'
                        name='location'
                        value={formData.location}
                        onChange={handleChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      />
                    ) : (
                      <p className='text-gray-900'>{formData.location}</p>
                    )}
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                      Website
                    </label>
                    {isEditing ? (
                      <input
                        type='url'
                        name='website'
                        value={formData.website}
                        onChange={handleChange}
                        className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                      />
                    ) : (
                      <a
                        href={formData.website}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-blue-600 hover:text-blue-700'
                      >
                        {formData.website}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <h2 className='text-xl font-semibold text-gray-900 mb-6'>
                Recent Activity
              </h2>

              <div className='space-y-4'>
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className='flex items-start space-x-3 pb-4 last:pb-0 border-b last:border-b-0 border-gray-100'
                  >
                    <div className='bg-blue-100 rounded-full p-1 mt-1'>
                      <Activity className='w-3 h-3 text-blue-600' />
                    </div>
                    <div className='flex-1'>
                      <p className='text-gray-900 text-sm'>{activity.action}</p>
                      <p className='text-gray-500 text-xs mt-1'>
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className='space-y-8'>
            {/* Stats */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Statistics
              </h3>

              <div className='space-y-4'>
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className='flex items-center justify-between'
                  >
                    <div className='flex items-center space-x-3'>
                      <stat.icon className={`w-5 h-5 ${stat.color}`} />
                      <span className='text-gray-600 text-sm'>
                        {stat.label}
                      </span>
                    </div>
                    <span className='font-semibold text-gray-900'>
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings Quick Links */}
            <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Settings
              </h3>

              <div className='space-y-3'>
                <button className='w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors'>
                  <Settings className='w-5 h-5 text-gray-400' />
                  <span className='text-gray-700'>Account Settings</span>
                </button>

                <button className='w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors'>
                  <Bell className='w-5 h-5 text-gray-400' />
                  <span className='text-gray-700'>Notifications</span>
                </button>

                <button className='w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors'>
                  <Shield className='w-5 h-5 text-gray-400' />
                  <span className='text-gray-700'>Privacy & Security</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
