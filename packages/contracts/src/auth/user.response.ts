import { ApiResponse } from '../common/api-response.js';
import { UserDto } from './user.dto.js';

export type UserResponse = ApiResponse<UserDto>;
