import { RequestHandler } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type {
  ApiSuccess,
  AuthDto,
  LoginDto,
  RegisterDto,
  UserDto,
} from '@autoservice/contracts';
import {
  createUser,
  loginUser,
  logoutUser,
  refreshSession,
} from './user.service.js';
import { toUserDto } from './user.mapper.js';
import {
  AUTH_COOKIE_OPTIONS,
  REFRESH_TOKEN_COOKIE_NAME,
  SESSION_ID_COOKIE_NAME,
} from '../sessions/session.constants.js';

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
  const { user, sessionId, accessToken, refreshToken } = await loginUser(
    req.body,
  );

  const userDto = toUserDto(user);

  res
    .cookie(REFRESH_TOKEN_COOKIE_NAME, refreshToken, AUTH_COOKIE_OPTIONS)
    .cookie(SESSION_ID_COOKIE_NAME, sessionId, AUTH_COOKIE_OPTIONS)
    .status(200)
    .json({
      status: 200,
      success: true,
      message: 'User successfully logged in.',
      data: {
        user: userDto,
        accessToken,
      },
    });
};

export const refreshTokenController: RequestHandler = async (req, res) => {
  const refreshToken = req.cookies[REFRESH_TOKEN_COOKIE_NAME];

  if (!refreshToken) {
    res.status(401).json({
      status: 401,
      success: false,
      message: 'Refresh token is missing.',
    });
    return;
  }

  const { accessToken, refreshToken: newRefreshToken } =
    await refreshSession(refreshToken);

  res
    .cookie(REFRESH_TOKEN_COOKIE_NAME, newRefreshToken, AUTH_COOKIE_OPTIONS)
    .status(200)
    .json({
      status: 200,
      success: true,
      message: 'Access token successfully refreshed.',
      data: {
        accessToken,
      },
    });
};

export const logoutUserController: RequestHandler = async (req, res) => {
  const sessionId = req.cookies[SESSION_ID_COOKIE_NAME];

  if (sessionId) {
    await logoutUser(sessionId);
  }

  res
    .clearCookie(REFRESH_TOKEN_COOKIE_NAME, AUTH_COOKIE_OPTIONS)
    .clearCookie(SESSION_ID_COOKIE_NAME, AUTH_COOKIE_OPTIONS)
    .status(200)
    .json({
      status: 200,
      success: true,
      message: 'User successfully logged out.',
    });
};
