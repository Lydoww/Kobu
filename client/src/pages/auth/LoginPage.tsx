import Login from '../../components/auth/Login';
import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';

// LoginPage.tsx
const LoginPage = () => {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to='/workspace' replace />;
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 p-4'>
      <Login />
    </div>
  );
};

export default LoginPage;
