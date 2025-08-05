import Register from '../../components/auth/Register';
import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';

const RegisterPage = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to='/workspace' replace />;
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <Register />
    </div>
  );
};

export default RegisterPage;
