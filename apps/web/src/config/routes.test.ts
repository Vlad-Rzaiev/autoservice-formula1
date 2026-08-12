import { describe, expect, it } from 'vitest';

import { routes } from './routes';

describe('routes', () => {
  it('creates a service details route', () => {
    expect(routes.marketing.service('engine-repair')).toBe(
      '/services/engine-repair',
    );
  });

  it('encodes a service slug used in a URL', () => {
    expect(routes.marketing.service('engine repair')).toBe(
      '/services/engine%20repair',
    );
  });

  it('creates a client details route', () => {
    expect(routes.dashboard.clients.detail('client-123')).toBe(
      '/dashboard/clients/client-123',
    );
  });
});
