import type { Column } from "./Column";

export type Board = {
  id: string;
  title: string;
  userId: string;

  createdAt?: string;
  updatedAt?: string;
  description?: string;
  columns?: Column[];
};


export type CreateBoardInput = Pick<Board, 'title' | 'userId'> & {
  description?: string;
};

export type UpdateBoardInput = Partial<Pick<Board, 'title' | 'description'>>;
