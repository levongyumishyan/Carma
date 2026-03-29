import { useUser } from '@clerk/clerk-expo';
import { useEffect, useRef } from 'react';

import { getOAuthNameParts } from '../lib/userName';

/**
 * After OAuth sign-in, Clerk may populate name fields asynchronously — reload once if they look empty.
 */
export function useSyncOAuthProfile() {
  const { user, isLoaded } = useUser();
  const attemptedReloadForUserId = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !user) return;

    const { firstName, lastName } = getOAuthNameParts(user);
    const hasName = Boolean(
      firstName || lastName || (user.fullName ?? '').trim(),
    );
    if (hasName) return;
    if (attemptedReloadForUserId.current === user.id) return;

    attemptedReloadForUserId.current = user.id;
    void user.reload().catch(() => {
      attemptedReloadForUserId.current = null;
    });
  }, [isLoaded, user]);
}
