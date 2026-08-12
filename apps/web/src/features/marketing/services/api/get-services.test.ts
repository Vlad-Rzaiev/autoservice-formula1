import { beforeEach, describe, expect, it, vi } from 'vitest';

import { apiClient } from '@/lib';
import { createServiceFixture } from '@/test/fixtures/service.fixture';

import { getServices } from './get-services';

vi.mock('@/lib', () => ({
  apiClient: {
    get: vi.fn(),
  },
}));

const mockedApiGet = vi.mocked(apiClient.get);

describe('getServices', () => {
  beforeEach(() => {
    mockedApiGet.mockReset();
  });

  it('returns services from a valid API response', async () => {
    const services = [
      createServiceFixture({
        _id: '1',
        slug: 'diagnostics',
      }),
      createServiceFixture({
        _id: '2',
        slug: 'engine-repair',
      }),
    ];

    mockedApiGet.mockResolvedValue({
      data: {
        status: 200,
        success: true,
        message: 'Successfully found services.',
        data: services,
      },
    });

    const result = await getServices();

    expect(result).toEqual(services);
  });

  it('requests /services', async () => {
    mockedApiGet.mockResolvedValue({
      data: {
        status: 200,
        success: true,
        message: 'Successfully found services.',
        data: [],
      },
    });

    await getServices();

    expect(mockedApiGet).toHaveBeenCalledWith('/services', {
      signal: undefined,
    });
  });

  it('passes AbortSignal to apiClient', async () => {
    const abortController = new AbortController();

    mockedApiGet.mockResolvedValue({
      data: {
        status: 200,
        success: true,
        message: 'Successfully found services.',
        data: [],
      },
    });

    await getServices({
      signal: abortController.signal,
    });

    expect(mockedApiGet).toHaveBeenCalledWith('/services', {
      signal: abortController.signal,
    });
  });

  it('returns an empty array when the API returns no services', async () => {
    mockedApiGet.mockResolvedValue({
      data: {
        status: 200,
        success: true,
        message: 'Successfully found services.',
        data: [],
      },
    });

    const result = await getServices();

    expect(result).toEqual([]);
  });

  it('throws when the API response is invalid', async () => {
    mockedApiGet.mockResolvedValue({
      data: {
        status: 200,
        success: true,
        message: 'Successfully found services.',
        data: {
          slug: 'not-an-array',
        },
      },
    });

    await expect(getServices()).rejects.toThrow();
  });
});
