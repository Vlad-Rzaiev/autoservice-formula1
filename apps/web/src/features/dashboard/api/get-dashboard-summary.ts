import {
  dashboardSummaryResponseSchema,
  type DashboardSummaryDto,
} from '@autoservice/contracts';
import { apiClient } from '@/lib';

interface GetDashboardSummaryOptions {
  signal?: AbortSignal;
  clientId?: string;
}

export async function getDashboardSummary({
  signal,
  clientId,
}: GetDashboardSummaryOptions): Promise<DashboardSummaryDto> {
  const response = await apiClient.get<unknown>('/dashboard/summary', {
    signal,
    params: clientId ? { clientId } : undefined,
  });

  const parsedResponse = dashboardSummaryResponseSchema.parse(response.data);

  return parsedResponse.data;
}
