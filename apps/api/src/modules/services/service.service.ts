import { ServiceCollection } from './service.model.js';

export const getAllServices = async () => {
  const services = await ServiceCollection.find();

  return services;
};

export const getServiceById = async (serviceId: string) => {
  const service = await ServiceCollection.findById(serviceId);

  return service;
};
