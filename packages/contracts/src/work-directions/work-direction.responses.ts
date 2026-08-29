import { ApiResponse } from '../common/api-response.js';
import { WorkDirectionDto } from './work-direction.dto.js';

export type WorkDirectionsResponse = ApiResponse<WorkDirectionDto[]>;

export type WorkDirectionResponse = ApiResponse<WorkDirectionDto>;
