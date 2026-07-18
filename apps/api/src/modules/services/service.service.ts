import { ServiceCollection } from './service.model.js';

export const getAllServices = async () => {
  const services = await ServiceCollection.find();

  return services;
};
