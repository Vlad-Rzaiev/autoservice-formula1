import type { ApiResponse } from '../common/api-response.js';
import type { MechanicDto } from './specialist.dto.js';

export type MechanicsResponse = ApiResponse<MechanicDto[]>;

export type MechanicResponse = ApiResponse<MechanicDto>;
