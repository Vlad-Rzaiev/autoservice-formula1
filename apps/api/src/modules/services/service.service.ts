import { ServiceCollection } from './service.model.js';
import { CreateServiceInput } from '@autoservice/contracts';
import { getNextCounterValue } from '../counters/counter.service.js';
import { SERVICES_SORT_ORDER_COUNTER_KEY } from './service.constants.js';

export const getAllServices = async () => {
  const services = await ServiceCollection.find({
    isActive: true,
  })
    .sort({
      sortOrder: 1,
    })
    .lean()
    .exec();

  return services;
};

export const getServiceBySlug = async (serviceSlug: string) => {
  const service = await ServiceCollection.findOne({
    slug: serviceSlug,
    isActive: true,
  })
    .lean()
    .exec();

  return service;
};

export const createService = async (payload: CreateServiceInput) => {
  const nextSortOrder = await getNextCounterValue(
    SERVICES_SORT_ORDER_COUNTER_KEY,
  );

  return ServiceCollection.create({
    ...payload,
    sortOrder: nextSortOrder,
  });
};
