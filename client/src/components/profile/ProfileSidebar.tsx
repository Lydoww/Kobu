import ProfileStatistics from './StatItem';
import SettingsQuickLinks from './SettingsQuickLinks';
import type { ProfileSidebarProps } from '../../types/Profile';

function ProfileSidebar({ stats, onSettingClick }: ProfileSidebarProps) {
  return (
    <div className='space-y-8'>
      <ProfileStatistics stats={stats} />
      <SettingsQuickLinks onSettingClick={onSettingClick} />
    </div>
  );
}

export default ProfileSidebar;
