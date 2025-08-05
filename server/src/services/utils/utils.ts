import { NotFoundError, UnauthorizedError } from '../../errors/AppError';
import prisma from '../../lib/prisma';

export const verifyBoardOwnership = async (boardId: string, userId: string) => {
  const board = await prisma.board.findFirst({
    where: { id: boardId, userId },
  });
  if (!board) throw new UnauthorizedError('You do not own this board');
  return board;
};

export const verifyColumnOwnership = async (
  columnId: string,
  userId: string
) => {
  

  const column = await prisma.column.findUnique({
    where: { id: columnId },
    include: { board: { select: { userId: true } } },
  });



  if (!column) {
    console.error('\x1b[31m%s\x1b[0m', '[ERROR] Colonne non trouvée'); // Rouge
    throw new NotFoundError('Column not found');
  }

  if (column.board.userId !== userId) {
    console.error('\x1b[31m%s\x1b[0m', '[ERROR] Accès refusé:'); // Rouge
    console.error('- Board owner:', column.board.userId);
    console.error('- Requester:', userId);
    throw new UnauthorizedError('You do not own this column');
  }

  return column;
};

export const verifyTaskOwnership = async (taskId: string, userId: string) => {
  

  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: {
      column: {
        include: {
          board: {
            select: { userId: true },
          },
        },
      },
    },
  });

  if (!task) {
    console.error('[ERREUR] Tâche non trouvée');
    throw new NotFoundError('Task not found');
  }

  if (task.column.board.userId !== userId) {
    console.error(
      '[ERREUR] Accès refusé :',
      `User ${userId} != propriétaire réel ${task.column.board.userId}`
    );
    throw new UnauthorizedError('You do not own this task');
  }

  return task;
};
