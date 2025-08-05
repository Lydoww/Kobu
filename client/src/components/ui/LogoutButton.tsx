import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useState } from 'react';
import { LogOut } from 'lucide-react';

const LogoutButton = () => {
  const logout = useAuthStore((s) => s.logout);
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      logout();
      navigate('/login', { replace: true });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className=' text-red-500 cursor-pointer hover:text-red-600 transition-colors'
      >
        <LogOut />
      </button>
    </div>
  );
};

export default LogoutButton;
