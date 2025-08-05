import type { Task } from './Task';

export type Column = {
  id: string;
  title: string;
  order: number;
  boardId: string;

  createdAt?: string;
  updatedAt?: string;
  tasks?: Task[];
};
