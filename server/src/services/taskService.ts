import prisma from '../lib/prisma';
import { verifyColumnOwnership, verifyTaskOwnership } from './utils/utils';
import type { PrismaClient } from '@prisma/client';

interface UpdateTaskInput {
  taskId: string;
  userId: string;
  title: string;
  description?: string;
  dueDate?: Date;
  order: number;
}

export const getTasksForUser = async (columnId: string, userId: string) => {
  await verifyColumnOwnership(columnId, userId);

  return prisma.task.findMany({
    where: { columnId },
    orderBy: [{ order: 'asc' }],
  });
};

export const createUserTask = async (
  columnId: string,
  userId: string,
  title: string,
  // description: string,
  dueDate: Date | undefined,
  order: number
) => {
  await verifyColumnOwnership(columnId, userId);

  return prisma.task.create({
    data: {
      title,
      // description,
      dueDate,
      order,
      columnId,
    },
  });
};

export const getTask = async (taskId: string, userId: string) => {
  return await verifyTaskOwnership(taskId, userId);
};

export const updateOneTask = async ({
  taskId,
  userId,
  title,
  description,
  dueDate,
  order,
}: UpdateTaskInput) => {
  await verifyTaskOwnership(taskId, userId);
  return prisma.task.update({
    where: { id: taskId },
    data: { title, description, dueDate, order },
  });
};

export const deleteOneTask = async (taskId: string, userId: string) => {
  await verifyTaskOwnership(taskId, userId);
  return await prisma.task.delete({
    where: { id: taskId },
  });
};

export const moveTaskToPosition = async (
  taskId: string,
  userId: string,
  newColumnId: string,
  newOrder: number
) => {
  const task = await verifyTaskOwnership(taskId, userId);
  await verifyColumnOwnership(newColumnId, userId);

  return await prisma.$transaction(async (tx) => {
    const oldColumnId = task.columnId;
    const oldOrder = task.order;

    if (oldColumnId === newColumnId && oldOrder === newOrder) {
      return task;
    }

    if (oldColumnId !== newColumnId) {
      await tx.task.updateMany({
        where: {
          columnId: oldColumnId,
          order: { gt: oldOrder },
        },
        data: { order: { decrement: 1 } },
      });

      await tx.task.updateMany({
        where: {
          columnId: newColumnId,
          order: { gte: newOrder },
        },
        data: { order: { increment: 1 } },
      });
    } else {
      if (newOrder > oldOrder) {
        await tx.task.updateMany({
          where: {
            columnId: newColumnId,
            order: { gt: oldOrder, lte: newOrder },
          },
          data: { order: { decrement: 1 } },
        });
      } else if (newOrder < oldOrder) {
        await tx.task.updateMany({
          where: {
            columnId: newColumnId,
            order: { gte: newOrder, lt: oldOrder },
          },
          data: { order: { increment: 1 } },
        });
      }
    }

    const updatedTask = await tx.task.update({
      where: { id: taskId },
      data: {
        columnId: newColumnId,
        order: newOrder,
      },
    });

    const allTasksInColumn = await tx.task.findMany({
      where: { columnId: newColumnId },
      orderBy: { order: 'asc' },
    });

    const orders = allTasksInColumn.map((t) => t.order);
    const hasDuplicates = orders.length !== new Set(orders).size;

    if (hasDuplicates) {
      console.warn('⚠️ Fixing duplicate orders in column:', newColumnId);

      for (let i = 0; i < allTasksInColumn.length; i++) {
        await tx.task.update({
          where: { id: allTasksInColumn[i].id },
          data: { order: i },
        });
      }

      return await tx.task.findUnique({ where: { id: taskId } });
    }

    return updatedTask;
  });
};

export const fixTaskOrders = async (columnId: string) => {
  const tasks = await prisma.task.findMany({
    where: { columnId },
    orderBy: { createdAt: 'asc' },
  });

  for (let i = 0; i < tasks.length; i++) {
    await prisma.task.update({
      where: { id: tasks[i].id },
      data: { order: i },
    });
  }
};
