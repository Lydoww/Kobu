import type { Task } from '../types/Task';
import instance from '../utils/axiosInstance';

export const getTasksForColumn = async (columnId: string): Promise<Task[]> => {
  const response = await instance.get(`/tasks?columnId=${columnId}`);
  return response.data.data;
};

export const createTask = async (
  title: string,
  order: number,
  columnId: string
): Promise<Task> => {
  const response = await instance.post('/task', {
    title,
    order,
    columnId,
  });
  return response.data.data;
};

export const updateTask = async (
  title: string,
  order: number,
  id: string
): Promise<Task> => {
  const response = await instance.patch(`/task/${id}`, {
    title,
    order,
  });
  return response.data.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await instance.delete(`/task/${id}`);
};

export const moveTask = async (
  taskId: string,
  newColumnId: string,
  newOrder: number
): Promise<Task> => {
  const response = await instance.patch(`/task/${taskId}/move`, {
    newColumnId,
    newOrder,
  });
  return response.data.data;
};


