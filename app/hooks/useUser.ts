import type { User } from '~/prisma-actions/user.server';
import { useOptionalUser } from './useOptionalUser';

export const useUser = (): User => {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.',
    );
  }
  return maybeUser;
};
