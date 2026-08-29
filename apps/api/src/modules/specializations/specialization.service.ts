import { SpecializationCollection } from './specialization.model.js';

export const getAllSpecializations = async () => {
  const specializations = await SpecializationCollection.find({
    isActive: true,
  })
    .sort({
      sortOrder: 1,
    })
    .lean()
    .exec();

  return specializations;
};

export const getSpecializationById = async (specializationId: string) => {
  const specialization = await SpecializationCollection.findOne({
    _id: specializationId,
    isActive: true,
  })
    .lean()
    .exec();

  return specialization;
};
