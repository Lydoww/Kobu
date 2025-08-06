import type {
  StatItemProps,
  ProfileStatisticsProps,
} from '../../types/Profile';

function StatItem({ stat }: StatItemProps) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex items-center space-x-3'>
        <stat.icon className={`w-5 h-5 ${stat.color}`} />
        <span className='text-gray-600 text-sm'>{stat.label}</span>
      </div>
      <span className='font-semibold text-gray-900'>{stat.value}</span>
    </div>
  );
}

function ProfileStatistics({ stats }: ProfileStatisticsProps) {
  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
      <h3 className='text-lg font-semibold text-gray-900 mb-4'>Statistics</h3>

      <div className='space-y-4'>
        {stats.map((stat, index) => (
          <StatItem key={index} stat={stat} />
        ))}
      </div>
    </div>
  );
}

export default ProfileStatistics;
