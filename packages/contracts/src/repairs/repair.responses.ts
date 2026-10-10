import type { ApiResponse } from '../common/api-response.js';
import type { RepairDto } from './repair.schemas.js';
import type { RepairItemDto } from './repair-item.schemas.js';
import type { RepairListResponseData } from './repair-response.schemas.js';

export type RepairResponse = ApiResponse<RepairDto>;

export type RepairsListResponse = ApiResponse<RepairListResponseData>;

export type RepairItemResponse = ApiResponse<RepairItemDto>;

export type RepairItemsListResponse = ApiResponse<{
  items: RepairItemDto[];
}>;
