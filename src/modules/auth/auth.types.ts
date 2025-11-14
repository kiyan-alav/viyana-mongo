export interface CreateUserData {
  firstName: string;
  lastName: string;
  mobile: string;
  email: string;
  password: string;
  avatar?: string;
}

export interface LoginData {
  identifier: string;
  password: string
}
