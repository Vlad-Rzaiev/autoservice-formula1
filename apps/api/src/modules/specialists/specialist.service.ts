import { MechanicCollection } from './specialist.model.js';

export const getAllMechanics = async () => {
  const mechanics = await MechanicCollection.find({
    isActive: true,
  })
    .sort({
      sortOrder: 1,
    })
    .lean()
    .exec();

  return mechanics;
};

export const getMechanicById = async (id: string) => {
  const mechanic = await MechanicCollection.findOne({
    _id: id,
    isActive: true,
  })
    .lean()
    .exec();

  return mechanic;
};
