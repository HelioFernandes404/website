import { describe, expect, it } from 'vitest';

import { getFaviconUrl, getToolHostname } from '@/lib/tool-card-utils';

describe('ToolCard', () => {
  it('extracts hostname from valid urls', () => {
    expect(getToolHostname('https://example.com/path')).toBe('example.com');
  });

  it('returns an empty hostname for invalid urls', () => {
    expect(getToolHostname('invalid-url')).toBe('');
  });

  it('builds the favicon url when hostname exists', () => {
    expect(getFaviconUrl('https://example.com/path')).toBe(
      'https://www.google.com/s2/favicons?sz=64&domain_url=example.com',
    );
  });

  it('returns null favicon url when hostname cannot be resolved', () => {
    expect(getFaviconUrl('invalid-url')).toBeNull();
  });
});
