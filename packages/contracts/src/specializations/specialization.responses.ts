import { ApiResponse } from '../common/api-response.js';
import { SpecializationsDto } from './specialization.dto.js';

export type SpecializationsResponse = ApiResponse<SpecializationsDto[]>;

export type SpecializationResponse = ApiResponse<SpecializationsDto>;
