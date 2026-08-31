import { SpecializationLeanDocument } from '../specializations/specialization.model.js';
import { WorkDirectionLeanDocument } from '../work-directions/work-direction.model.js';
import { toMechanicDto } from './mechanic.mapper.js';
import {
  MechanicCollection,
  MechanicWithRelationsLeanDocument,
} from './mechanic.model.js';

export const getAllMechanics = async () => {
  const mechanics = await MechanicCollection.find({
    isActive: true,
  })
    .sort({
      sortOrder: 1,
    })
    .populate<SpecializationLeanDocument[]>('specializations')
    .populate<WorkDirectionLeanDocument[]>('workDirections')
    .lean<MechanicWithRelationsLeanDocument[]>()
    .exec();

  return mechanics.map(toMechanicDto);
};

export const getMechanicById = async (id: string) => {
  const mechanic = await MechanicCollection.findOne({
    _id: id,
    isActive: true,
  })
    .populate<SpecializationLeanDocument[]>('specializations')
    .populate<WorkDirectionLeanDocument[]>('workDirections')
    .lean<MechanicWithRelationsLeanDocument>()
    .exec();

  return mechanic ? toMechanicDto(mechanic) : null;
};
