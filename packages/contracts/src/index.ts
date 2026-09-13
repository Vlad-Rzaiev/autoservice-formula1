export type {
  ApiResponse,
  ApiSuccess,
  ApiSuccessWithoutData,
} from './common/api-response.js';

export { isSupportedLocale, supportedLocales } from './common/locale.js';

export type { AppLocale, ServiceLocale } from './common/locale.js';

export { serviceCategories } from './services/service.constants.js';

export type { ServiceCategory } from './services/service.constants.js';

export type {
  ServiceDto,
  ServiceTranslationDto,
} from './services/service.dto.js';

export type {
  ServiceResponse,
  ServicesResponse,
} from './services/service.responses.js';

export {
  serviceResponseSchema,
  servicesResponseSchema,
} from './services/service-response.schemas.js';

export { apiErrorSchema, type ApiError } from './common/api-error.schema.js';

export {
  createServiceSchema,
  type CreateServiceInput,
} from './services/service.schemas.js';

export { iconKeys, type IconKey } from './lib/constants.js';

export type {
  CompletedWorkDto,
  CompletedWorkTranslationDto,
} from './completed-works/completed-works.dto.js';

export {
  completedWorksCategories,
  completedWorksCategoriesSlug,
  type CompletedWorksCategory,
  type CompletedWorksCategorySlug,
} from './completed-works/completed-works.constants.js';

export {
  completedWorkDtoSchema,
  createCompletedWorkSchema,
  getCompletedWorkByIdParamsSchema,
  type CreateCompletedWorkInput,
} from './completed-works/completed-works.schemas.js';

export type {
  CompletedWorksResponse,
  CompletedWorkResponse,
} from './completed-works/completed-works.responses.js';

export {
  completedWorksResponseSchema,
  completedWorkResponseSchema,
} from './completed-works/completed-works-response.schemas.js';

export type {
  MechanicNameDto,
  MechanicTranslationDto,
  MechanicCertificateDto,
  MechanicDto,
} from './mechanics/mechanic.dto.js';

export {
  mechanicDtoSchema,
  createMechanicSchema,
  getMechanicByIdSchema,
  type CreateMechanicInput,
} from './mechanics/mechanic.schemas.js';

export {
  mechanicsResponseSchema,
  mechanicResponseSchema,
} from './mechanics/mechanic-response.schemas.js';

export type {
  MechanicsResponse,
  MechanicResponse,
} from './mechanics/mechanic.responses.js';

export type {
  SpecializationDto,
  SpecializationTranslationDto,
} from './specializations/specialization.dto.js';

export {
  specializationDtoSchema,
  getSpecializationByIdSchema,
} from './specializations/specialization.schemas.js';

export {
  specializationsResponseSchema,
  specializationResponseSchema,
} from './specializations/specialization-response.schemas.js';

export type {
  SpecializationsResponse,
  SpecializationResponse,
} from './specializations/specialization.responses.js';

export type {
  WorkDirectionTranslationDto,
  WorkDirectionDto,
} from './work-directions/work-direction.dto.js';

export {
  workDirectionTranslationDtoSchema,
  workDirectionDtoSchema,
  getWorkDirectionByIdSchema,
} from './work-directions/work-direction.schemas.js';

export type {
  WorkDirectionsResponse,
  WorkDirectionResponse,
} from './work-directions/work-direction.responses.js';

export type {
  workDirectionsResponseSchema,
  workDirectionResponseSchema,
} from './work-directions/work-direction-response.schemas.js';

export {
  apiErrorCodes,
  apiErrorCodeSchema,
  type ApiErrorCode,
} from './common/api-error-codes.js';

export {
  userRoleSchema,
  userGenderSchema,
  phoneSchema,
  userDtoSchema,
} from './auth/user.schemas.js';

export type { UserPhone, User } from './auth/user.schemas.js';

export {
  registerRequestSchema,
  loginRequestSchema,
  passwordSchema,
  resetEmailRequestSchema,
  resetPasswordRequestSchema,
} from './auth/auth.schemas.js';

export type {
  RegisterRequest,
  LoginRequest,
  ResetEmailRequest,
  ResetPasswordRequest,
} from './auth/auth.schemas.js';

export { userGenderVariants, userRole } from './auth/user.constants.js';

export type { UserGenderVariants, UserRole } from './auth/user.constants.js';

export type { RegisterDto } from './auth/register.dto.js';
export type { LoginDto } from './auth/login.dto.js';

export { userResponseSchema } from './auth/user-response.schemas.js';
export type { UserResponse } from './auth/user.response.js';

export type { UserDto } from './auth/user.dto.js';
export type { AuthDto } from './auth/auth.dto.js';
