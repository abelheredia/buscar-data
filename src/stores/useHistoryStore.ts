import { persist } from 'zustand/middleware';
import { type StateCreator, create } from 'zustand';
import { IResult } from '../entities';

interface HistoryState {
  history: IResult[];
  addToHistory: (result: IResult) => void;
}

const storeApi: StateCreator<HistoryState> = (set) => ({
  history: [],
  addToHistory: (result) => set((state) => ({ history: [...state.history, result] }))
});

export const useHistoryStore = create<HistoryState>()(persist(storeApi, { name: 'historial' }));
