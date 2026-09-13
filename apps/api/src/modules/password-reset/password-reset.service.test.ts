import bcrypt from 'bcrypt';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { sendMail } from '../../utils/send-mail.js';
import { UserCollection } from '../user/user.model.js';
import { PasswordResetTokenCollection } from './password-reset.model.js';
import {
  requestPasswordReset,
  resetPassword,
} from './password-reset.service.js';
import { hashToken } from '../../utils/token.js';
import { SessionCollection } from '../sessions/session.model.js';

vi.mock('../../utils/send-mail.js', () => ({
  sendMail: vi.fn(),
}));
beforeEach(() => {
  vi.clearAllMocks();
});

describe('requestPasswordReset', () => {
  it('creates a password reset token for an existing user', async () => {
    const passwordHash = await bcrypt.hash('TestPassword123!', 10);

    const user = await UserCollection.create({
      userId: '1',
      firstName: 'Vlad',
      lastName: 'Rzaiev',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client@test.com',
      emailVerified: true,
      passwordHash,
      role: 'client',
      isActive: true,
    });

    const token = await requestPasswordReset({
      email: 'client@test.com',
      locale: 'uk',
    });

    expect(token).toEqual(expect.any(String));
    expect(token).toHaveLength(64);

    const resetToken = await PasswordResetTokenCollection.findOne({
      userId: user._id,
    }).lean();

    expect(resetToken).not.toBeNull();
    expect(resetToken?.tokenHash).toBe(hashToken(token!));
    expect(resetToken?.tokenHash).not.toBe(token);
  });

  it('removes previous password reset tokens for the user', async () => {
    const passwordHash = await bcrypt.hash('TestPassword123!', 10);

    const user = await UserCollection.create({
      userId: '1',
      firstName: 'Vlad',
      lastName: 'Rzaiev',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client@test.com',
      emailVerified: true,
      passwordHash,
      role: 'client',
      isActive: true,
    });

    await PasswordResetTokenCollection.create({
      userId: user._id,
      tokenHash: hashToken('old-reset-token'),
      validUntil: new Date(Date.now() + 60_000),
    });

    const newToken = await requestPasswordReset({
      email: 'client@test.com',
      locale: 'uk',
    });

    const resetTokens = await PasswordResetTokenCollection.find({
      userId: user._id,
    }).lean();

    expect(resetTokens).toHaveLength(1);
    expect(resetTokens[0]?.tokenHash).toBe(hashToken(newToken!));
  });

  it('does nothing when the user does not exist', async () => {
    const token = await requestPasswordReset({
      email: 'unknown@test.com',
      locale: 'uk',
    });

    expect(token).toBeUndefined();

    const resetTokenCount = await PasswordResetTokenCollection.countDocuments();

    expect(resetTokenCount).toBe(0);
  });

  it('resets the password and invalidates the user sessions', async () => {
    const oldPassword = 'OldPassword123!';
    const newPassword = 'NewPassword456!';

    const passwordHash = await bcrypt.hash(oldPassword, 10);

    const user = await UserCollection.create({
      userId: '1',
      firstName: 'Vlad',
      lastName: 'Rzaiev',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client@test.com',
      emailVerified: true,
      passwordHash,
      role: 'client',
      isActive: true,
    });

    const resetToken = 'a'.repeat(64);

    await PasswordResetTokenCollection.create({
      userId: user._id,
      tokenHash: hashToken(resetToken),
      validUntil: new Date(Date.now() + 15 * 60 * 1000),
    });

    await SessionCollection.create({
      userId: user._id,
      accessTokenHash: hashToken('access-token'),
      refreshTokenHash: hashToken('refresh-token'),
      accessTokenValidUntil: new Date(Date.now() + 10 * 60 * 1000),
      refreshTokenValidUntil: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    await resetPassword({
      token: resetToken,
      password: newPassword,
    });

    const updatedUser = await UserCollection.findById(user._id).lean();

    expect(updatedUser).not.toBeNull();
    expect(updatedUser?.passwordHash).not.toBe(passwordHash);
    expect(await bcrypt.compare(newPassword, updatedUser!.passwordHash)).toBe(
      true,
    );
    expect(await bcrypt.compare(oldPassword, updatedUser!.passwordHash)).toBe(
      false,
    );

    const resetTokenCount = await PasswordResetTokenCollection.countDocuments({
      userId: user._id,
    });

    expect(resetTokenCount).toBe(0);

    const sessionCount = await SessionCollection.countDocuments({
      userId: user._id,
    });

    expect(sessionCount).toBe(0);
  });

  it('throws 401 when the reset token is invalid', async () => {
    const passwordHash = await bcrypt.hash('OldPassword123!', 10);

    await UserCollection.create({
      userId: '1',
      firstName: 'Vlad',
      lastName: 'Rzaiev',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client@test.com',
      emailVerified: true,
      passwordHash,
      role: 'client',
      isActive: true,
    });

    await expect(
      resetPassword({
        token: 'invalid-reset-token',
        password: 'NewPassword456!',
      }),
    ).rejects.toMatchObject({
      status: 401,
      message: 'Invalid or expired password reset token.',
    });
  });

  it('throws 401 and removes an expired reset token', async () => {
    const passwordHash = await bcrypt.hash('OldPassword123!', 10);

    const user = await UserCollection.create({
      userId: '1',
      firstName: 'Vlad',
      lastName: 'Rzaiev',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client@test.com',
      emailVerified: true,
      passwordHash,
      role: 'client',
      isActive: true,
    });

    const resetToken = 'a'.repeat(64);

    const resetTokenDocument = await PasswordResetTokenCollection.create({
      userId: user._id,
      tokenHash: hashToken(resetToken),
      validUntil: new Date(Date.now() - 1_000),
    });

    await expect(
      resetPassword({
        token: resetToken,
        password: 'NewPassword456!',
      }),
    ).rejects.toMatchObject({
      status: 401,
      message: 'Invalid or expired password reset token.',
    });

    const deletedResetToken = await PasswordResetTokenCollection.findById(
      resetTokenDocument._id,
    );

    expect(deletedResetToken).toBeNull();

    const unchangedUser = await UserCollection.findById(user._id).lean();

    expect(
      await bcrypt.compare('OldPassword123!', unchangedUser!.passwordHash),
    ).toBe(true);
  });

  it('throws 401 when the user is inactive', async () => {
    const passwordHash = await bcrypt.hash('OldPassword123!', 10);

    const user = await UserCollection.create({
      userId: '1',
      firstName: 'Vlad',
      lastName: 'Rzaiev',
      photo: null,
      gender: null,
      birthDate: null,
      phone: null,
      email: 'client@test.com',
      emailVerified: true,
      passwordHash,
      role: 'client',
      isActive: false,
    });

    const resetToken = 'a'.repeat(64);

    await PasswordResetTokenCollection.create({
      userId: user._id,
      tokenHash: hashToken(resetToken),
      validUntil: new Date(Date.now() + 15 * 60 * 1000),
    });

    await expect(
      resetPassword({
        token: resetToken,
        password: 'NewPassword456!',
      }),
    ).rejects.toMatchObject({
      status: 401,
      message: 'Invalid or expired password reset token.',
    });

    const unchangedUser = await UserCollection.findById(user._id).lean();

    expect(
      await bcrypt.compare('OldPassword123!', unchangedUser!.passwordHash),
    ).toBe(true);
  });

  it.each([
    {
      locale: 'uk',
      resetPasswordUrl: 'http://localhost:3000/uk/reset-password',
      subject: 'Скидання пароля — AutoService Formula 1',
    },
    {
      locale: 'en',
      resetPasswordUrl: 'http://localhost:3000/en/reset-password',
      subject: 'Password reset — AutoService Formula 1',
    },
    {
      locale: 'pl',
      resetPasswordUrl: 'http://localhost:3000/pl/reset-password',
      subject: 'Resetowanie hasła — AutoService Formula 1',
    },
  ] as const)(
    'sends a password reset email in $locale locale',
    async ({ locale, resetPasswordUrl, subject }) => {
      const passwordHash = await bcrypt.hash('TestPassword123!', 10);

      await UserCollection.create({
        userId: '1',
        firstName: 'Vlad',
        lastName: 'Rzaiev',
        photo: null,
        gender: null,
        birthDate: null,
        phone: null,
        email: 'client@test.com',
        emailVerified: true,
        passwordHash,
        role: 'client',
        isActive: true,
      });

      const token = await requestPasswordReset({
        email: 'client@test.com',
        locale,
      });

      expect(sendMail).toHaveBeenCalledOnce();

      expect(sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          to: 'client@test.com',
          subject,
          text: expect.stringContaining(`${resetPasswordUrl}?token=${token}`),
        }),
      );
    },
  );
});
