import { UserDto } from '../auth/user.dto.js';
import type { ApiResponse } from '../common/api-response.js';

import type { ClientListResponseData } from './client.schemas.js';

export type ClientListResponse = ApiResponse<ClientListResponseData>;

export type ClientResponse = ApiResponse<UserDto>;
