export interface Register {
  email: string;
  password: string;
}

export interface User {
  id: number;
  email: string;
  nickname: string;
  createdAt: number;
  updatedAt: number;
}
