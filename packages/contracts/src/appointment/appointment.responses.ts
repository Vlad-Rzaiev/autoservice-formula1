import { ApiResponse } from '../common/api-response.js';
import { AppointmentListResponseData } from './appointment-response.schemas.js';
import { AppointmentDto } from './appointment.schemas.js';

export type AppointmentResponse = ApiResponse<AppointmentDto>;

export type AppointmentListResponse = ApiResponse<AppointmentListResponseData>;
