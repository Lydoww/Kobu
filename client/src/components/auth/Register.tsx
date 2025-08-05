import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { useState, type FormEvent } from 'react';
import { ClipLoader } from 'react-spinners';
import { Eye, EyeClosed } from 'lucide-react';

const Register = () => {
  const register = useAuthStore((s) => s.register);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await register(username, email, password);
      navigate('/workspace'); // Corrigé : workspace au lieu de boardsPage
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-sm bg-white p-8 rounded-xl shadow-lg space-y-6'
    >
      <div className='text-center'>
        <h2 className='text-2xl font-bold text-gray-800'>Create account</h2>
        <p className='text-sm text-gray-500 mt-1'>Join Kōbu today</p>
      </div>

      <div className='space-y-4'>
        <div>
          <label
            htmlFor='username'
            className='block text-sm font-medium text-gray-700'
          >
            Username
          </label>
          <input
            type='text'
            id='username'
            name='username'
            value={username}
            className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition'
            placeholder='johndoe'
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor='email'
            className='block text-sm font-medium text-gray-700'
          >
            Email
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={email}
            className='mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition'
            placeholder='john@example.com'
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label
            htmlFor='password'
            className='block text-sm font-medium text-gray-700'
          >
            Password
          </label>
          <div className='relative mt-1'>
            <input
              type={showPassword ? 'text' : 'password'}
              id='password'
              name='password'
              value={password}
              className='w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none transition'
              placeholder='********'
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none'
            >
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <p className='text-xs text-gray-500 mt-1'>At least 6 characters</p>
        </div>
      </div>

      {error && (
        <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
          <p className='text-red-600 text-sm'>{error}</p>
        </div>
      )}

      <button
        type='submit'
        disabled={loading || !username || !email || !password}
        className={`w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <>
            <ClipLoader color='#ffffff' size={16} />
            <span>Creating account...</span>
          </>
        ) : (
          'Create Account'
        )}
      </button>

      <div className='text-center text-sm text-gray-600'>
        Already have an account?{' '}
        <Link to='/login' className='text-blue-600 font-medium hover:underline'>
          Sign in
        </Link>
      </div>
    </form>
  );
};

export default Register;
