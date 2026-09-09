export const userGenderVariants = ['male', 'female', 'other'] as const;

export type UserGenderVariants = (typeof userGenderVariants)[number];

export const userRole = ['owner', 'manager', 'mechanic', 'client'] as const;

export type UserRole = (typeof userRole)[number];
