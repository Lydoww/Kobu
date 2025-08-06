import ProfileInformation from './ProfileInformation';
import RecentActivity from './RecentActivity';
import type { ProfileMainContentProps } from '../../types/Profile';

function ProfileMainContent({
  formData,
  isEditing,
  onChange,
  recentActivity,
}: ProfileMainContentProps) {
  return (
    <div className='lg:col-span-2 space-y-8'>
      <ProfileInformation
        formData={formData}
        isEditing={isEditing}
        onChange={onChange}
      />
      <RecentActivity activities={recentActivity} />
    </div>
  );
}

export default ProfileMainContent;
