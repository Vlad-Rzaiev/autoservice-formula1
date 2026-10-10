import {
  dashboardSummaryResponseSchema,
  type DashboardSummaryDto,
} from '@autoservice/contracts';
import { apiClient } from '@/lib';

interface GetDashboardSummaryOptions {
  accessToken: string;
  signal?: AbortSignal;
}

export async function getDashboardSummary({
  accessToken,
  signal,
}: GetDashboardSummaryOptions): Promise<DashboardSummaryDto> {
  const response = await apiClient.get<unknown>('/dashboard/summary', {
    signal,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const parsedResponse = dashboardSummaryResponseSchema.parse(response.data);

  return parsedResponse.data;
}
