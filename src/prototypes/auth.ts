import { User } from './user';

export interface Login {
  email: string;
  password: string;
}

export interface Auth {
  token: string;
  user: User;
}

export interface JwtUserPub {
  userID: number;
  email: string;
}

export interface JwtPayload {
  iss?: string;
  sub?: string;
  aud?: string;
  iat: number;
  nbf?: number;
  exp?: number;
  jti?: number;
  pub: JwtUserPub;
}
