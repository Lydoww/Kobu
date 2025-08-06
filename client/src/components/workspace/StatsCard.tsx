import { Folder, TrendingUp, Calendar } from 'lucide-react';

function StatCard({ title, value, color, Icon }) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-100',
      text: 'text-blue-600',
      value: 'text-gray-900',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
      value: 'text-green-600',
    },
    purple: {
      bg: 'bg-purple-100',
      text: 'text-purple-600',
      value: 'text-purple-600',
    },
  };

  const classes = colorClasses[color];

  return (
    <div className='bg-white rounded-xl p-6 shadow-sm border border-gray-200'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='text-gray-600 text-sm font-medium'>{title}</p>
          <p className={`text-2xl font-bold ${classes.value}`}>{value}</p>
        </div>
        <div className={`${classes.bg} rounded-full p-3`}>
          <Icon className={`w-6 h-6 ${classes.text}`} />
        </div>
      </div>
    </div>
  );
}

function StatsCards({ boards }) {
  const stats = [
    {
      title: 'Total Boards',
      value: boards.length,
      color: 'blue',
      Icon: Folder,
    },
    {
      title: 'Active',
      value: boards.length,
      color: 'green',
      Icon: TrendingUp,
    },
    {
      title: 'Recent',
      value: Math.min(boards.length, 3),
      color: 'purple',
      Icon: Calendar,
    },
  ];

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-6 mb-8'>
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          color={stat.color}
          Icon={stat.Icon}
        />
      ))}
    </div>
  );
}

export default StatsCards;
