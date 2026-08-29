import { ApiResponse } from '../common/api-response.js';
import { SpecializationDto } from './specialization.dto.js';

export type SpecializationsResponse = ApiResponse<SpecializationDto[]>;

export type SpecializationResponse = ApiResponse<SpecializationDto>;
