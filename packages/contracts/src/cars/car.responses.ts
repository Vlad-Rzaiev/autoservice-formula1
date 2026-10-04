import type { ApiResponse } from '../common/api-response.js';
import type { CarDto, CarListResponseData } from './car.schemas.js';

export type CarsListResponse = ApiResponse<CarListResponseData>;

export type CarResponse = ApiResponse<CarDto>;
