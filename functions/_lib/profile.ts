export const HANDLE_RE = /^[A-Za-z0-9_.-]{3,24}$/;

export type Row = {
  display_name: string | null;
  cf_handle: string | null;
  lang: 'en' | 'bn';
  created_at: string;
};

export type ProfileInput = { displayName?: unknown; cfHandle?: unknown; lang?: unknown };
export type CleanProfile = { displayName: string | null; cfHandle: string | null; lang: 'en' | 'bn' };

/** Validate a profile update. Returns the clean value or an error message. */
export function cleanProfile(body: ProfileInput): CleanProfile | string {
  const name = typeof body.displayName === 'string' ? body.displayName.trim() : '';
  if (name.length > 60) return 'Display name is too long (60 characters at most).';

  let handle: string | null = null;
  if (typeof body.cfHandle === 'string' && body.cfHandle.trim() !== '') {
    handle = body.cfHandle.trim();
    if (!HANDLE_RE.test(handle)) return 'A Codeforces handle uses 3 to 24 letters, digits, _ . or -';
  }

  const lang = body.lang === 'bn' ? 'bn' : body.lang === 'en' || body.lang === undefined ? 'en' : null;
  if (!lang) return 'Language must be en or bn.';

  return { displayName: name || null, cfHandle: handle, lang };
}

