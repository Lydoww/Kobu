import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { ClipLoader } from 'react-spinners';
import { Eye, EyeClosed } from 'lucide-react';

const Login = () => {
  const login = useAuthStore((s) => s.login);

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
      await login(email, password);
      window.location.replace('/workspace');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
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
        <h2 className='text-2xl font-bold text-gray-800'>Welcome back</h2>
        <p className='text-sm text-gray-500 mt-1'>Sign in to your account</p>
      </div>

      <div className='space-y-4'>
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
            />
            <button
              type='button'
              onClick={togglePasswordVisibility}
              className='absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700 focus:outline-none'
            >
              {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
          <p className='text-red-600 text-sm'>{error}</p>
        </div>
      )}

      <button
        type='submit'
        disabled={loading || !email || !password}
        className={`w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <>
            <ClipLoader color='#ffffff' size={16} />
            <span>Signing in...</span>
          </>
        ) : (
          'Sign In'
        )}
      </button>

      <div className='text-center text-sm text-gray-600'>
        Don't have an account?{' '}
        <Link
          to='/register'
          className='text-blue-600 font-medium hover:underline'
        >
          Sign up
        </Link>
      </div>
    </form>
  );
};

export default Login;
