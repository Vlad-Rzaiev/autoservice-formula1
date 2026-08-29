import {
  ServiceCollection,
  ServicesWithRelationsLeanDocument,
} from './service.model.js';
import { CreateServiceInput } from '@autoservice/contracts';
import { getNextCounterValue } from '../counters/counter.service.js';
import { SERVICES_SORT_ORDER_COUNTER_KEY } from './service.constants.js';
import { SpecializationLeanDocument } from '../specializations/specialization.model.js';
import { WorkDirectionLeanDocument } from '../work-directions/work-direction.model.js';
import { toServiceDto } from './service.mapper.js';

export const getAllServices = async () => {
  const services = await ServiceCollection.find({
    isActive: true,
  })
    .sort({
      sortOrder: 1,
    })
    .populate<SpecializationLeanDocument[]>('specializationIds')
    .populate<WorkDirectionLeanDocument[]>('workDirectionIds')
    .lean<ServicesWithRelationsLeanDocument[]>()
    .exec();

  return services.map(toServiceDto);
};

export const getServiceBySlug = async (serviceSlug: string) => {
  const service = await ServiceCollection.findOne({
    slug: serviceSlug,
    isActive: true,
  })
    .populate<SpecializationLeanDocument[]>('specializationIds')
    .populate<WorkDirectionLeanDocument[]>('workDirectionIds')
    .lean<ServicesWithRelationsLeanDocument>()
    .exec();

  return service ? toServiceDto(service) : null;
};

export const createService = async (payload: CreateServiceInput) => {
  const nextSortOrder = await getNextCounterValue(
    SERVICES_SORT_ORDER_COUNTER_KEY,
  );

  const service = await ServiceCollection.create({
    ...payload,
    sortOrder: nextSortOrder,
  });

  const createdService = await ServiceCollection.findById(service._id)
    .populate<SpecializationLeanDocument[]>('specializationIds')
    .populate<WorkDirectionLeanDocument[]>('workDirectionIds')
    .lean<ServicesWithRelationsLeanDocument>()
    .exec();

  if (!createdService) {
    throw new Error('Created service was not found.');
  }

  return createdService;
};
