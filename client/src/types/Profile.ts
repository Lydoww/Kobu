import type { LucideIcon } from 'lucide-react';

export interface FormData {
  name: string;
  email: string;
  bio: string;
  location: string;
  website: string;
}

export interface Activity {
  action: string;
  time: string;
}

export interface Stat {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export interface ProfileHeaderProps {
  formData: FormData;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export interface ProfileFormFieldProps {
  label: string;
  name: string;
  value: string;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
  isTextarea?: boolean;
  isLink?: boolean;
}

export interface ProfileInformationProps {
  formData: FormData;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface RecentActivityProps {
  activities: Activity[];
}

export interface ActivityItemProps {
  activity: Activity;
}

export interface ProfileStatisticsProps {
  stats: Stat[];
}

export interface StatItemProps {
  stat: Stat;
}

export interface SettingsQuickLinksProps {
  onSettingClick?: (action: string) => void;
}

export interface SettingItemProps {
  icon: LucideIcon;
  label: string;
  onClick?: () => void;
}

export interface ProfileSidebarProps {
  stats: Stat[];
  onSettingClick?: (action: string) => void;
}

export interface ProfileMainContentProps {
  formData: FormData;
  isEditing: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  recentActivity: Activity[];
}