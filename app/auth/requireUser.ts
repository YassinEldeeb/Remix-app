import { getUserById } from '~/prisma-actions/user.server';
import { logout } from './logout';
import { requireUserId } from './redirectUserId';

export async function requireUser(request: Request) {
  const userId = await requireUserId(request);

  const user = await getUserById(userId);
  if (user) return user;

  throw await logout(request);
}
