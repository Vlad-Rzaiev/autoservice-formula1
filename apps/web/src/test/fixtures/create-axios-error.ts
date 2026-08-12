import axios from 'axios';

interface CreateAxiosErrorOptions {
  status?: number;
  data?: unknown;
}

export function createAxiosError({
  status = 404,
  data = {
    status: 404,
    success: false,
    code: 'SERVICE_NOT_FOUND',
    message: 'Service not found.',
  },
}: CreateAxiosErrorOptions = {}) {
  return new axios.AxiosError(
    `Request failed with status code ${status}`,
    'ERR_BAD_REQUEST',
    undefined,
    undefined,
    {
      data,
      status,
      statusText: 'Request failed',
      headers: {},
      config: {
        headers: new axios.AxiosHeaders(),
      },
    },
  );
}
