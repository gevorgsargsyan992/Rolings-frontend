export enum UserType {
  SUPER_ADMIN = 1,
  ADMIN = 2,
  MANAGER = 3,
  SELLER = 4,
}

export interface Permissions {
  [key: string]: UserType[];
}

export const permissions: Permissions = {
  viewDashboard: [UserType.SUPER_ADMIN, UserType.ADMIN, UserType.MANAGER, UserType.SELLER],
  viewSettings: [UserType.SUPER_ADMIN],
};