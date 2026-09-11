import { createApiResponseSchema } from '../common/api-response.schema.js';
import { userDtoSchema } from './user.schemas.js';

export const userResponseSchema = createApiResponseSchema(userDtoSchema);
