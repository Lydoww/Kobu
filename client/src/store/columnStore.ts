import { create } from 'zustand';
import type { Column } from '../types/Column';
import {
  getColumnsForBoard,
  createColumn as createColumnService,
  updateOneColumn,
  deleteOneColumn,
} from '../service/columnService';

interface ColumnState {
  columns: Column[];
  loading: boolean;
  error: string | null;

  fetchColumnsForBoard: (boardId: string) => Promise<void>;
  createColumn: (
    boardId: string,
    title: string,
    order: number
  ) => Promise<void>;
  updateColumn: (
    columnId: string,
    title: string,
    order: number
  ) => Promise<void>;
  deleteColumn: (columnId: string) => Promise<void>;
}

export const useColumnStore = create<ColumnState>((set) => ({
  columns: [],
  loading: false,
  error: null,

  fetchColumnsForBoard: async (boardId: string) => {
    try {
      set({ loading: true });
      const response = await getColumnsForBoard(boardId);
      set({ columns: response });
    } catch (error) {
      set({ error: 'Error while fetching the columns for the board' });
    } finally {
      set({ loading: false });
    }
  },

  createColumn: async (boardId: string, title: string, order: number) => {
    try {
      set({ loading: true });
      const newColumn = await createColumnService(boardId, title, order);
      set((state) => ({
        columns: [...state.columns, newColumn],
      }));
    } catch (error) {
      set({ error: 'Error while creating a column' });
    } finally {
      set({ loading: false });
    }
  },

  updateColumn: async (columnId: string, title: string, order: number) => {
    try {
      set({ loading: true });
      const updatedColumn = await updateOneColumn(columnId, title, order);
      set((state) => ({
        columns: state.columns.map((column) =>
          column.id === columnId ? updatedColumn : column
        ),
      }));
    } catch (error) {
      set({ error: 'Error while updating this column' });
    } finally {
      set({ loading: false });
    }
  },

  deleteColumn: async (columnId: string) => {
    try {
      set({ loading: true });
      await deleteOneColumn(columnId);
      set((state) => ({
        columns: state.columns.filter((col) => col.id !== columnId),
      }));
    } catch (error) {
      set({ error: 'Error while deleting this column' });
    } finally {
      set({ loading: false });
    }
  },
}));
