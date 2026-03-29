import type { UserResource } from '@clerk/types';

/**
 * Reads first/last name from Clerk’s user profile (filled from Google / Apple OAuth
 * when the provider shares them). Falls back to splitting `fullName` if needed.
 */
export function getOAuthNameParts(user: UserResource | null | undefined): {
  firstName: string;
  lastName: string;
} {
  if (!user) {
    return { firstName: '', lastName: '' };
  }

  let firstName = (user.firstName ?? '').trim();
  let lastName = (user.lastName ?? '').trim();

  if (!firstName && !lastName) {
    const full = (user.fullName ?? '').trim();
    if (full) {
      const parts = full.split(/\s+/).filter(Boolean);
      firstName = parts[0] ?? '';
      lastName = parts.slice(1).join(' ');
    }
  }

  return { firstName, lastName };
}

export function formatFullName(parts: { firstName: string; lastName: string }): string {
  return [parts.firstName, parts.lastName].filter(Boolean).join(' ').trim();
}
