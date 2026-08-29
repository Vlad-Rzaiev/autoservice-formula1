import { WorkDirectionCollection } from './work-direction.model.js';

export const getAllWorkDirections = async () => {
  const workDirections = await WorkDirectionCollection.find({
    isActive: true,
  })
    .lean()
    .exec();

  return workDirections;
};

export const getWorkDirectionById = async (workDirectionId: string) => {
  const workDirection = await WorkDirectionCollection.findOne({
    _id: workDirectionId,
    isActive: true,
  })
    .lean()
    .exec();

  return workDirection;
};
