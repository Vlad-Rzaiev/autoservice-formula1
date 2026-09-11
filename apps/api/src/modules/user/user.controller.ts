import { RequestHandler } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type {
  ApiSuccess,
  AuthDto,
  LoginDto,
  RegisterDto,
  UserDto,
} from '@autoservice/contracts';
import { createUser, loginUser } from './user.service.js';
import { createAccessToken } from '../../utils/jwt.js';
import { toUserDto } from './user.mapper.js';

export const registerUserController: RequestHandler<
  ParamsDictionary,
  ApiSuccess<UserDto>,
  RegisterDto
> = async (req, res) => {
  const createdUser = await createUser(req.body);

  const userDto = toUserDto(createdUser);

  res.status(201).json({
    status: 201,
    success: true,
    message: 'User successfully registered.',
    data: userDto,
  });
};

export const loginUserController: RequestHandler<
  ParamsDictionary,
  ApiSuccess<AuthDto>,
  LoginDto
> = async (req, res) => {
  const user = await loginUser(req.body);

  const accessToken = await createAccessToken({
    userId: user.userId,
    role: user.role,
  });

  const userDto = toUserDto(user);

  res.status(200).json({
    status: 200,
    success: true,
    message: 'User successfully logged in.',
    data: {
      user: userDto,
      accessToken,
    },
  });
};
