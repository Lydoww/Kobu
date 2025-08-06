import { Activity } from 'lucide-react';
import type {
  ActivityItemProps,
  RecentActivityProps,
} from '../../types/Profile';

function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className='flex items-start space-x-3 pb-4 last:pb-0 border-b last:border-b-0 border-gray-100'>
      <div className='bg-blue-100 rounded-full p-1 mt-1'>
        <Activity className='w-3 h-3 text-blue-600' />
      </div>
      <div className='flex-1'>
        <p className='text-gray-900 text-sm'>{activity.action}</p>
        <p className='text-gray-500 text-xs mt-1'>{activity.time}</p>
      </div>
    </div>
  );
}

function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
      <h2 className='text-xl font-semibold text-gray-900 mb-6'>
        Recent Activity
      </h2>

      <div className='space-y-4'>
        {activities.map((activity, index) => (
          <ActivityItem key={index} activity={activity} />
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
