export interface IAuth {
  accessToken: string,
  user: IUser
}

export interface IUser {
  id: number,
  email: string,
  role: UserRole
}

export enum UserRole {
  CITIZEN,
  ADMIN,
  AGENT,
  LAWYER
}
