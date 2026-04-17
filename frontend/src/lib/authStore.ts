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
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: Record<string, unknown>) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User) => void;
  fetchProfile: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          // Backend sets HTTP-only cookies automatically on login
          const { data } = await authApi.login({ email, password });
          const { user } = data.data;
          set({ user, isAuthenticated: true });
        } finally {
          set({ isLoading: false });
        }
      },
      register: async (data: Record<string, unknown>) => {
        set({ isLoading: true });
        try {
          // Backend sets HTTP-only cookies automatically on register
          const response = await authApi.register(data);
          const { user } = response.data.data;
          set({ user, isAuthenticated: true });
        } finally {
          set({ isLoading: false });
        }
      },
      logout: async () => {
        try { await authApi.logout(); } catch {
          // Silently handle logout failures - user is still cleared locally
        }
        // Backend clears HTTP-only cookies automatically on logout
        set({ user: null, isAuthenticated: false });
      },
      setUser: (user: User) => set({ user }),
      fetchProfile: async () => {
        try {
          // Backend reads token from HTTP-only cookie automatically
          const { data } = await authApi.profile();
          set({ user: data.data });
        } catch (err: unknown) {
          // Only log in development - in production, silently degrade
          if (process.env.NODE_ENV === 'development') {
            const message = err instanceof Error ? err.message : 'Unknown error';
            // eslint-disable-next-line no-console
            console.error('[authStore] Profile fetch failed:', message);
          }
          // Don't throw - allow graceful degradation (user still sees cached data)
        }
      },
    }),
    { name: 'auth-storage', partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }) }
  )
);
