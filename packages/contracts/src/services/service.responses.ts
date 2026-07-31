import type { ApiResponse } from "../common/api-response.js";
import type { ServiceDto } from "./service.dto.js";

export type ServicesResponse = ApiResponse<ServiceDto[]>;

export type ServiceResponse = ApiResponse<ServiceDto>;
