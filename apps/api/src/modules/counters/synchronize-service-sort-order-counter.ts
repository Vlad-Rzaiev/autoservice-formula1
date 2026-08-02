import { CounterCollection } from './counter.model.js';
import { ServiceCollection } from '../services/service.model.js';
import { SERVICES_SORT_ORDER_COUNTER_KEY } from '../services/service.constants.js';

interface LastServiceSortOrder {
  sortOrder: number;
}

export const synchronizeServiceSortOrderCounter = async (): Promise<void> => {
  const lastService = await ServiceCollection.findOne()
    .sort({
      sortOrder: -1,
    })
    .select({
      _id: 0,
      sortOrder: 1,
    })
    .lean<LastServiceSortOrder>()
    .exec();

  const highestSortOrder = lastService?.sortOrder ?? 0;

  await CounterCollection.updateOne(
    {
      key: SERVICES_SORT_ORDER_COUNTER_KEY,
    },
    {
      $max: {
        value: highestSortOrder,
      },
    },
    {
      upsert: true,
      runValidators: true,
    },
  ).exec();
};
