import type { NextFunction, Request, Response } from 'express';

import { describe, expect, it, vi } from 'vitest';

import { authorize } from './authorize.js';

describe('authorize middleware', () => {
  it('returns 401 when the authenticated user is missing', () => {
    const request = {} as Request;
    const response = {} as Response;
    const nextMock = vi.fn();

    authorize('owner')(request, response, nextMock as unknown as NextFunction);

    expect(nextMock).toHaveBeenCalledOnce();

    const error = nextMock.mock.calls[0]?.[0];

    expect(error).toMatchObject({
      status: 401,
      message: 'Authentication is required.',
    });
  });

  it('returns 403 when the user role is not allowed', () => {
    const request = {
      user: {
        userId: '1',
        role: 'client',
      },
    } as Request;

    const response = {} as Response;
    const nextMock = vi.fn();

    authorize('owner')(request, response, nextMock as unknown as NextFunction);

    expect(nextMock).toHaveBeenCalledOnce();

    const error = nextMock.mock.calls[0]?.[0];

    expect(error).toMatchObject({
      status: 403,
      message: 'You do not have permission to perform this action.',
    });
  });

  it('allows the request when the user role is allowed', () => {
    const request = {
      user: {
        userId: '1',
        role: 'owner',
      },
    } as Request;

    const response = {} as Response;
    const nextMock = vi.fn();

    authorize('owner', 'manager')(
      request,
      response,
      nextMock as unknown as NextFunction,
    );

    expect(nextMock).toHaveBeenCalledOnce();
    expect(nextMock).toHaveBeenCalledWith();
  });
});
