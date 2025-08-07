import { create } from 'zustand';
import { authService } from '../service/authService';
import type { User } from '../types/User';

type AuthState = {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email, password) => {
    try {
      const data = await authService.login(email, password);

      set({
        user: data.user,
        isAuthenticated: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      throw error;
    }
  },

  register: async (username, email, password) => {
    try {
      const data = await authService.register(username, email, password);
      set({
        user: data.user,
        isAuthenticated: true,
      });

      await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      set({ user: null, isAuthenticated: false });
      throw error;
    }
  },

  logout: async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      set({ user: null, isAuthenticated: false });
      sessionStorage.clear();
    }
  },

  checkAuth: async () => {
    try {
      const data = await authService.getMe();
      if (!data?.user?.id) throw new Error('User data incomplete');

      set({
        user: data.user,
        isAuthenticated: true,
      });
      return data.user;
    } catch (err) {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
