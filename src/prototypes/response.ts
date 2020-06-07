import { ServerError } from '@/prototypes/error';

export interface ServerResponse<T> {
  data: T;
  error: ServerError;
  ok: boolean;
  timestamp: number;
}
