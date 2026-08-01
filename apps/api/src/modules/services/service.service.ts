import { ServiceCollection } from './service.model.js';

export const getAllServices = async () => {
  const services = await ServiceCollection.find({
    isActive: true,
  })
    .sort({
      sortOrder: 1,
    })
    .exec();

  return services;
};

export const getServiceBySlug = async (serviceSlug: string) => {
  const service = await ServiceCollection.findOne({
    slug: serviceSlug,
    isActive: true,
  }).exec();

  return service;
};
