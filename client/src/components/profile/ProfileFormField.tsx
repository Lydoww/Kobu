import type { ProfileFormFieldProps } from '../../types/Profile';

function ProfileFormField({
  label,
  name,
  value,
  isEditing,
  onChange,
  type = 'text',
  isTextarea = false,
  isLink = false,
}: ProfileFormFieldProps) {
  if (isEditing) {
    if (isTextarea) {
      return (
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            {label}
          </label>
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            rows={3}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
          />
        </div>
      );
    }

    return (
      <div>
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          {label}
        </label>
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
      </div>
    );
  }

  return (
    <div>
      <label className='block text-sm font-medium text-gray-700 mb-2'>
        {label}
      </label>
      {isLink && type === 'url' ? (
        <a
          href={value}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-600 hover:text-blue-700'
        >
          {value}
        </a>
      ) : (
        <p className='text-gray-900'>{value}</p>
      )}
    </div>
  );
}

export default ProfileFormField;
