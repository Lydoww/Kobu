import type { Column } from '../types/Column';
import instance from '../utils/axiosInstance';

export const getColumnsForBoard = async (
  boardId: string
): Promise<Column[]> => {
  const response = await instance.get(`/columns?boardId=${boardId}`);
  return response.data.data;
};

export const createColumn = async (
  boardId: string,
  title: string,
  order: number
): Promise<Column> => {
  const response = await instance.post('/column', {
    boardId,
    title,
    order,
  });
  return response.data.data;
};

export const updateOneColumn = async (
  columnId: string,
  title: string,
  order: number
): Promise<Column> => {
  const trimmedTitle = title.trim();

  const response = await instance.patch(`/column/${columnId}`, {
    title: trimmedTitle,
    order,
  });
  return response.data.data;
};

export const deleteOneColumn = async (columnId: string): Promise<void> => {
  await instance.delete(`/column/${columnId}`);
};
