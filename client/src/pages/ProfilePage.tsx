import { useState } from 'react';
import { Folder, CheckCircle, Activity } from 'lucide-react';
import ProfileHeader from '../components/profile/ProfileHeader';
import ProfileMainContent from '../components/profile/ProfileMainContent';
import ProfileSidebar from '../components/profile/ProfileSidebar';
import type {
  FormData,
  Stat,
  Activity as ActivityType,
} from '../types/Profile';

function ProfilePage() {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Product Manager passionate about building great user experiences.',
    location: 'San Francisco, CA',
    website: 'https://johndoe.com',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = (): void => {
    // TODO: Save to backend
    setIsEditing(false);
  };

  const handleCancel = (): void => {
    // Reset form data
    setIsEditing(false);
  };

  const handleEdit = (): void => {
    setIsEditing(true);
  };

  const handleSettingClick = (action: string): void => {
    console.log('Setting clicked:', action);
    // TODO: Handle setting navigation
  };

  const stats: Stat[] = [
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

  const recentActivity: ActivityType[] = [
    { action: 'Created board "Product Roadmap"', time: '2 hours ago' },
    { action: 'Completed task "Design Review"', time: '1 day ago' },
    { action: 'Updated board "Marketing Campaign"', time: '3 days ago' },
  ];

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 py-8'>
        <ProfileHeader
          formData={formData}
          isEditing={isEditing}
          onEdit={handleEdit}
          onSave={handleSave}
          onCancel={handleCancel}
        />

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          <ProfileMainContent
            formData={formData}
            isEditing={isEditing}
            onChange={handleChange}
            recentActivity={recentActivity}
          />

          <ProfileSidebar stats={stats} onSettingClick={handleSettingClick} />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
