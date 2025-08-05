import { create } from 'zustand';
import type { Board } from '../types/Board';
import {
  createBoard as createBoardService,
  getBoard,
  getBoards,
  updateBoard as updateBoardService,
  deleteBoard as deleteBoardService,
} from '../service/boardService';

interface BoardState {
  boards: Board[];
  currentBoard: Board | null;
  loading: boolean;
  error: string | null;

  fetchBoards: () => Promise<void>;
  fetchOneBoard: (id: string) => Promise<void>;
  createBoard: (title: string, description?: string) => Promise<void>;
  updateBoard: (
    id: string,
    title: string,
    description?: string
  ) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
}

export const useBoardStore = create<BoardState>((set) => ({
  boards: [],
  currentBoard: null,
  loading: false,
  error: null,

  fetchBoards: async () => {
    try {
      set({ loading: true });
      const response = await getBoards();
      set({ boards: response });
    } catch (error) {
      set({ error: 'Error while fetching the boards' });
    } finally {
      set({ loading: false });
    }
  },

  fetchOneBoard: async (id: string) => {
    try {
      set({ loading: true });
      const response = await getBoard(id);
      set({ currentBoard: response });
    } catch (error) {
      set({ error: 'Error while fetching the board' });
    } finally {
      set({ loading: false });
    }
  },

  createBoard: async (title, description) => {
    try {
      set({ loading: true });
      const newBoard = await createBoardService(title, description);
      set((state) => ({
        boards: [...state.boards, newBoard],
      }));
    } catch (error) {
      set({ error: 'Error while creating a board' });
    } finally {
      set({ loading: false });
    }
  },

  updateBoard: async (id, title, description) => {
    try {
      set({ loading: true });
      const updatedBoard = await updateBoardService(id, title, description);
      set((state) => ({
        boards: state.boards.map((board) =>
          board.id === id ? updatedBoard : board
        ),
        currentBoard:
          state.currentBoard?.id === id ? updatedBoard : state.currentBoard,
      }));
    } catch (error) {
      set({ error: 'Error while updating board' });
    } finally {
      set({ loading: false });
    }
  },

  deleteBoard: async (id: string) => {
    try {
      set({ loading: true });
      await deleteBoardService(id);
      set((state) => ({
        boards: state.boards.filter((board) => board.id !== id),
        currentBoard: state.currentBoard?.id === id ? null : state.currentBoard,
      }));
    } catch (error) {
      set({ error: 'Error while deleting a board' });
    } finally {
      set({ loading: false });
    }
  },
}));
