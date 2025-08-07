import { persist } from 'zustand/middleware';
import { type StateCreator, create } from 'zustand';
import { IResult } from '../entities';

interface HistoryState {
  history: IResult[];
  addToHistory: (result: IResult) => void;
  deleteResult: (key: React.Key) => void;
}

const storeApi: StateCreator<HistoryState> = (set) => ({
  history: [],
  addToHistory: (result) => set((state) => ({ history: [...state.history, result] })),
  deleteResult: (key) => set((state) => ({ history: state.history.filter((item) => item.key !== key) }))
});

export const useHistoryStore = create<HistoryState>()(persist(storeApi, { name: 'historial' }));
