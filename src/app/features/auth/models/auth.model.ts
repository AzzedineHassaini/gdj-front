export interface IAuth {
  id: number,
  email: string,
  role: UserRole,
  accessToken: string
}

export enum UserRole {
  CITIZEN = 'CITIZEN',
  ADMIN = 'ADMIN',
  AGENT = 'AGENT',
  LAWYER = 'LAWYER'
}
