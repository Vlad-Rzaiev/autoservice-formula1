import { ApiResponse } from '../common/api-response.js';
import { CompletedWorkDto } from './completed-works.dto.js';

export type CompletedWorksResponse = ApiResponse<CompletedWorkDto[]>;

export type CompletedWorkResponse = ApiResponse<CompletedWorkDto>;
