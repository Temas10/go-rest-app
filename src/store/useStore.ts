import { create } from 'zustand';

interface AppState {
  token: string;
  setToken: (token: string) => void;
}

export const useStore = create<AppState>((set) => ({
  token: '',
  setToken: (token) => set({ token }),
}));