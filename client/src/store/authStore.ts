import { create } from 'zustand';
import { authService } from '../service/authService';
import type { User } from '../types/User';

type AuthState = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
};

const initialToken = localStorage.getItem('token');

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: initialToken,
  isAuthenticated: !!initialToken,

  login: async (email, password) => {
    try {
      const data = await authService.login(email, password);
      localStorage.setItem('token', data.token);
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: !!data.user,
      });
      return data.user;
    } catch (error) {
      localStorage.removeItem('token');
      throw error;
    }
  },

  register: async (username, email, password) => {
    const data = await authService.register(username, email, password);
    localStorage.setItem('token', data.token);
    set({
      user: data.user,
      token: data.token,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null, isAuthenticated: false });
    sessionStorage.clear();
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      set({ isAuthenticated: false, user: null });
      return null;
    }

    try {
      const data = await authService.getMe();
      if (!data?.user?.id) throw new Error('User data incomplete');

      set({
        user: data.user,
        token,
        isAuthenticated: true,
      });
      return data.user;
    } catch (err) {
      localStorage.removeItem('token');
      set({ user: null, token: null, isAuthenticated: false });
      return null;
    }
  },
}));
