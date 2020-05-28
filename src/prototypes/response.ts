export interface ServerResponse<T> {
  data: T;
  ok: boolean;
  timestamp: number;
}
