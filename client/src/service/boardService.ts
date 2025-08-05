import type { Board } from '../types/Board';
import instance from '../utils/axiosInstance';

export const getBoards = async (): Promise<Board[]> => {
  const response = await instance.get('/boards');
  return response.data;
};

export const getBoard = async (id: string): Promise<Board> => {
  const response = await instance.get(`board/${id}`);
  return response.data.data;
};

export const createBoard = async (
  title: string,
  description?: string
): Promise<Board> => {
  const response = await instance.post('/board', {
    title,
    description,
  });
  return response.data.data;
};

export const updateBoard = async (
  id: string,
  title: string,
  description?: string
): Promise<Board> => {
  const response = await instance.patch(`/board/${id}`, {
    title,
    description,
  });
  return response.data.data;
};

export const deleteBoard = async (id: string): Promise<void> => {
  await instance.delete(`/board/${id}`);
};
