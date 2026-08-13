import { CounterCollection } from './counter.model.js';

interface CounterValue {
  value: number;
}

export const getNextCounterValue = async (
  counterKey: string,
): Promise<number> => {
  const updatedCounter = await CounterCollection.findOneAndUpdate<CounterValue>(
    {
      key: counterKey,
    },
    {
      $inc: {
        value: 1,
      },
    },
    {
      returnDocument: 'after',
      upsert: true,
      setDefaultsOnInsert: true,
      runValidators: true,
    },
  )
    .select({
      _id: 0,
      value: 1,
    })
    .lean()
    .exec();

  if (!updatedCounter) {
    throw new Error(
      `Failed to generate the next value for counter "${counterKey}".`,
    );
  }

  return updatedCounter.value;
};
