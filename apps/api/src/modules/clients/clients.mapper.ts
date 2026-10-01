import { ClientDto } from '@autoservice/contracts';
import { UserLeanDocument } from '../user/user.model.js';
import { toUserDto } from '../user/user.mapper.js';

export const toClientDto = (userLeanDocument: UserLeanDocument): ClientDto => {
  return {
    ...toUserDto(userLeanDocument),
    role: 'client',
  };
};
