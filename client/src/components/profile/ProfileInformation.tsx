import ProfileFormField from './ProfileFormField';
import type { ProfileInformationProps } from '../../types/Profile';

function ProfileInformation({
  formData,
  isEditing,
  onChange,
}: ProfileInformationProps) {
  return (
    <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
      <h2 className='text-xl font-semibold text-gray-900 mb-6'>
        Profile Information
      </h2>

      <div className='space-y-6'>
        <ProfileFormField
          label='Full Name'
          name='name'
          value={formData.name}
          isEditing={isEditing}
          onChange={onChange}
        />

        <ProfileFormField
          label='Email'
          name='email'
          value={formData.email}
          isEditing={isEditing}
          onChange={onChange}
          type='email'
        />

        <ProfileFormField
          label='Bio'
          name='bio'
          value={formData.bio}
          isEditing={isEditing}
          onChange={onChange}
          isTextarea={true}
        />

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <ProfileFormField
            label='Location'
            name='location'
            value={formData.location}
            isEditing={isEditing}
            onChange={onChange}
          />

          <ProfileFormField
            label='Website'
            name='website'
            value={formData.website}
            isEditing={isEditing}
            onChange={onChange}
            type='url'
            isLink={true}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileInformation;
