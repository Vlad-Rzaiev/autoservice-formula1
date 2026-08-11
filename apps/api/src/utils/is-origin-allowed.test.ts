import { describe, expect, it } from 'vitest';

import { isOriginAllowed } from './is-origin-allowed.js';

describe('isOriginAllowed', () => {
  it('allows an origin configured in CORS_ORIGINS', () => {
    expect(isOriginAllowed('http://localhost:3000')).toBe(true);
  });

  it('normalizes whitespace and trailing slashes', () => {
    expect(isOriginAllowed('  http://localhost:3000///  ')).toBe(true);
  });

  it('rejects an origin that is not configured', () => {
    expect(isOriginAllowed('https://example.com')).toBe(false);
  });

  it('allows a valid Vercel preview origin', () => {
    expect(
      isOriginAllowed(
        'https://autoservice-formula1-git-dev-test-team.vercel.app',
      ),
    ).toBe(true);
  });

  it('rejects a Vercel preview origin using http', () => {
    expect(
      isOriginAllowed(
        'http://autoservice-formula1-git-dev-test-team.vercel.app',
      ),
    ).toBe(false);
  });

  it('rejects a Vercel origin with a different project name', () => {
    expect(
      isOriginAllowed('https://another-project-git-dev-test-team.vercel.app'),
    ).toBe(false);
  });

  it('rejects a Vercel origin with a different team slug', () => {
    expect(
      isOriginAllowed(
        'https://autoservice-formula1-git-dev-another-team.vercel.app',
      ),
    ).toBe(false);
  });

  it('rejects a malformed origin', () => {
    expect(isOriginAllowed('not-a-valid-url')).toBe(false);
  });

  it('rejects a hostname that only mimics a Vercel preview domain', () => {
    expect(
      isOriginAllowed(
        'https://autoservice-formula1-git-dev-test-team.vercel.app.example.com',
      ),
    ).toBe(false);
  });
});
