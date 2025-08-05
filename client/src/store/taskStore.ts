import { create } from 'zustand';
import type { Task } from '../types/Task';

import {
  createTask as createTaskService,
  updateTask as updateTaskService,
  deleteTask as deleteTaskService,
  getTasksForColumn as getTasks,
  moveTask as moveTaskService,
} from '../service/taskService';

interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  fetchAllTasksForBoard: (columnIds: string[]) => Promise<void>;
  fetchTasksForColumn: (columnId: string) => Promise<void>;
  createTask: (title: string, order: number, columnId: string) => Promise<void>;
  updateTask: (title: string, order: number, id: string) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  moveTask: (
    taskId: string,
    newColumnId: string,
    newOrder: number
  ) => Promise<void>;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  loading: false,
  error: null,

  fetchAllTasksForBoard: async (columnIds: string[]) => {
    try {
      set({ loading: true });
      const allTasks = [];

      for (const columnId of columnIds) {
        const tasks = await getTasks(columnId);
        allTasks.push(...tasks);
      }

      set({ tasks: allTasks });
    } catch (error) {
      set({ error: 'Error while fetching tasks for the board' });
    } finally {
      set({ loading: false });
    }
  },

  fetchTasksForColumn: async (columnId: string) => {
    try {
      set({ loading: true });
      const response = await getTasks(columnId);
      set({ tasks: response });
    } catch (error) {
      set({ error: 'Error while fetching tasks for the column' });
    } finally {
      set({ loading: false });
    }
  },

  createTask: async (title, order, columnId) => {
    try {
      set({ loading: true });
      const newTask = await createTaskService(title, order, columnId);
      set((state) => ({
        tasks: [...state.tasks, newTask],
      }));

      // Re-fetch toutes les tâches pour s'assurer que l'ordre est correct
      const allTasks = await getTasks(columnId);
      set((state) => ({
        tasks: state.tasks
          .filter((t) => t.columnId !== columnId)
          .concat(allTasks),
      }));
    } catch (error) {
      set({ error: 'Error while creating a task' });
    } finally {
      set({ loading: false });
    }
  },

  updateTask: async (title, order, id) => {
    try {
      set({ loading: true });
      const updatedTask = await updateTaskService(title, order, id);
      set((state) => ({
        tasks: state.tasks.map((task) => (task.id === id ? updatedTask : task)),
      }));
    } catch (error) {
      set({ error: 'Error while updating a task' });
    } finally {
      set({ loading: false });
    }
  },

  deleteTask: async (id) => {
    try {
      set({ loading: true });
      await deleteTaskService(id);
      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      set({ error: 'Error while deleting a task' });
    } finally {
      set({ loading: false });
    }
  },

  moveTask: async (taskId, newColumnId, newOrder) => {
    try {
      const state = useTaskStore.getState();
      const oldTask = state.tasks.find((t) => t.id === taskId);
      const oldColumnId = oldTask?.columnId;

      await moveTaskService(taskId, newColumnId, newOrder);

      const newColumnTasks = await getTasks(newColumnId);
      let oldColumnTasks: Task[] = [];

      if (oldColumnId && oldColumnId !== newColumnId) {
        oldColumnTasks = await getTasks(oldColumnId);
      }

      set((state) => {
        let filteredTasks = state.tasks.filter(
          (t) => t.columnId !== newColumnId && t.columnId !== oldColumnId
        );

        const updatedTasks = [
          ...filteredTasks,
          ...newColumnTasks,
          ...oldColumnTasks,
        ];
        return { tasks: updatedTasks };
      });
    } catch (error) {
      set({ error: 'Error while moving task' });
    }
  },
}));
