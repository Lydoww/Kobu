import axios from '../utils/axiosInstance';

export const authService = {
  register: async (username: string, email: string, password: string) => {
    const res = await axios.post('/auth/register', {
      username,
      email,
      password,
    });
    return res.data;
  },

  login: async (email: string, password: string) => {
    const res = await axios.post('/auth/login', {
      email,
      password,
    });
    return res.data;
  },

  logout: async () => {
    const res = await axios.post('/auth/logout');
    return res.data;
  },

  getMe: async () => {
    const res = await axios.get('/auth/me');
    return res.data;
  },
};
