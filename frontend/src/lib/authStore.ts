import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi } from '@/lib/api';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { data } = await authApi.login({ email, password });
          const { user, accessToken, refreshToken } = data.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          set({ user, accessToken, refreshToken, isAuthenticated: true });
        } finally {
          set({ isLoading: false });
        }
      },
      register: async (data: any) => {
        set({ isLoading: true });
        try {
          const response = await authApi.register(data);
          const { user, accessToken, refreshToken } = response.data.data;
          localStorage.setItem('accessToken', accessToken);
          localStorage.setItem('refreshToken', refreshToken);
          set({ user, accessToken, refreshToken, isAuthenticated: true });
        } finally {
          set({ isLoading: false });
        }
      },
      logout: async () => {
        try { await authApi.logout(); } catch {}
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({ user: null, accessToken: null, refreshToken: null, isAuthenticated: false });
      },
      setUser: (user: User) => set({ user }),
      fetchProfile: async () => {
        try {
          const { data } = await authApi.profile();
          set({ user: data.data });
        } catch {}
      },
    }),
    { name: 'auth-storage', partialize: (state) => ({ user: state.user, accessToken: state.accessToken, refreshToken: state.refreshToken, isAuthenticated: state.isAuthenticated }) }
  )
);
