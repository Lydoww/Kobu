export type Task = {
  id: string;
  title: string;
  order: number;
  columnId: string;

  createdAt?: string;
  updatedAt?: string;
  description?: string;
  dueDate?: string;
};
