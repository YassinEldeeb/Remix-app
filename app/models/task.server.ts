import type { User, Task } from '@prisma/client';
import { prisma } from '~/utils/db.server';
export type { Task } from '@prisma/client';

export function getTask({
  id,
  userId,
}: Pick<Task, 'id'> & {
  userId: User['id'];
}) {
  return prisma.task.findFirst({
    where: { id, userId },
  });
}

export function getTasks({ userId }: { userId: User['id'] }) {
  return prisma.task.findMany({
    where: { userId },
    select: { id: true, title: true },
    orderBy: { updatedAt: 'desc' },
  });
}

export function createTask({
  body,
  title,
  userId,
}: Pick<Task, 'body' | 'title'> & {
  userId: User['id'];
}) {
  return prisma.task.create({
    data: {
      title,
      body,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteTask({
  id,
  userId,
}: Pick<Task, 'id'> & { userId: User['id'] }) {
  return prisma.task.deleteMany({
    where: { id, userId },
  });
}
