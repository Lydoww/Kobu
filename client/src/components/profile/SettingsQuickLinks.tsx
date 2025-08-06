import { Settings, Bell, Shield } from 'lucide-react';
import type {
  SettingItemProps,
  SettingsQuickLinksProps,
} from '../../types/Profile';

function SettingItem({ icon: Icon, label, onClick }: SettingItemProps) {
  return (
    <button
      onClick={onClick}
      className='w-full flex items-center space-x-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors'
    >
      <Icon className='w-5 h-5 text-gray-400' />
      <span className='text-gray-700'>{label}</span>
    </button>
  );
}

function SettingsQuickLinks({ onSettingClick }: SettingsQuickLinksProps) {
  const settingsItems = [
    {
      icon: Settings,
      label: 'Account Settings',
      action: 'account',
    },
    {
      icon: Bell,
      label: 'Notifications',
      action: 'notifications',
    },
    {
      icon: Shield,
      label: 'Privacy & Security',
      action: 'privacy',
    },
  ];

  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>Settings</h3>

      <div className='space-y-3'>
        {settingsItems.map((item, index) => (
          <SettingItem
            key={index}
            icon={item.icon}
            label={item.label}
            onClick={() => onSettingClick?.(item.action)}
          />
        ))}
      </div>
    </div>
  );
}

export default SettingsQuickLinks;
