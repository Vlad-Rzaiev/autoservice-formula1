import type { User } from '@autoservice/contracts';
import type { UserLeanDocument } from './user.model.js';

export const toUserDto = (userLeanDocument: UserLeanDocument): User => {
  return {
    _id: userLeanDocument._id.toString(),
    userId: userLeanDocument.userId,
    firstName: userLeanDocument.firstName,
    lastName: userLeanDocument.lastName,
    photo: userLeanDocument.photo,
    gender: userLeanDocument.gender,
    birthDate: userLeanDocument.birthDate,
    phone: userLeanDocument.phone,
    email: userLeanDocument.email,
    role: userLeanDocument.role,
  };
};
