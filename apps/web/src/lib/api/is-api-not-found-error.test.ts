import axios from 'axios';
import { describe, expect, it } from 'vitest';
import { isApiNotFoundError } from './is-api-not-found-error';
import { createAxiosError } from '../../test/fixtures/create-axios-error';
import { apiErrorCodes } from '@autoservice/contracts';

describe('isApiNotFoundError', () => {
  it('returns true for a SERVICE_NOT_FOUND API error with status 404', () => {
    const error = createAxiosError();
    const result = isApiNotFoundError(error, apiErrorCodes.SERVICE_NOT_FOUND);

    expect(result).toBe(true);
  });

  it('returns false for a non-Axios error', () => {
    const error = new Error('Something went wrong.');

    const result = isApiNotFoundError(error, apiErrorCodes.SERVICE_NOT_FOUND);

    expect(result).toBe(false);
  });

  it('returns false when the Axios error status is not 404', () => {
    const error = createAxiosError({
      status: 500,
      data: {
        status: 500,
        success: false,
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong.',
      },
    });

    const result = isApiNotFoundError(error, apiErrorCodes.SERVICE_NOT_FOUND);

    expect(result).toBe(false);
  });

  it('returns false when the 404 response body is not a valid API error', () => {
    const error = createAxiosError({
      data: {
        hello: 'world',
      },
    });

    const result = isApiNotFoundError(error, apiErrorCodes.SERVICE_NOT_FOUND);

    expect(result).toBe(false);
  });

  it('returns false when the API error code is not SERVICE_NOT_FOUND', () => {
    const error = createAxiosError({
      data: {
        status: 404,
        success: false,
        code: 'ROUTE_NOT_FOUND',
        message: 'Route not found.',
      },
    });

    const result = isApiNotFoundError(error, apiErrorCodes.SERVICE_NOT_FOUND);

    expect(result).toBe(false);
  });

  it('returns false when the Axios error has no response', () => {
    const error = new axios.AxiosError('Network Error', 'ERR_NETWORK');

    const result = isApiNotFoundError(error, apiErrorCodes.SERVICE_NOT_FOUND);

    expect(result).toBe(false);
  });
});
