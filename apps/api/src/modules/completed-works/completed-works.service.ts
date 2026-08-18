import { CompletedWorksCollection } from './completed-works.model.js';

export const getAllCompletedWorks = async () => {
  const completedWorks = await CompletedWorksCollection.find({
    isActive: true,
  })
    .sort({
      sortOrder: 1,
    })
    .lean()
    .exec();

  return completedWorks;
};

export const getCompletedWorkById = async (id: string) => {
  const completedWork = await CompletedWorksCollection.findOne({
    _id: id,
    isActive: true,
  })
    .lean()
    .exec();

  return completedWork;
};
