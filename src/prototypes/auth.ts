import { User } from './user';

export interface Login {
  email: string;
  password: string;
}

export interface Auth {
  token: string;
  user: User;
}
