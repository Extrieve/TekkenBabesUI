import { create } from 'zustand';

interface WinStreakState {
  winStreak: number;
  increaseWinStreak: () => void;
  resetWinStreak: () => void;
}

export const useWinStreakStore = create<WinStreakState>((set) => ({
  winStreak: 0,
  increaseWinStreak: () => set((state) => ({ winStreak: state.winStreak + 1 })),
  resetWinStreak: () => set({ winStreak: 0 }),
}));
