export interface IAuth {
  accessToken: string,
  user: IUser
}

export interface IUser {
  id: number,
  email: string,
  role: UserRole
}

enum UserRole {
  CITIZEN,
  ADMIN,
  AGENT,
  LAWYER
}
