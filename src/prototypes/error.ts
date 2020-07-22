export interface Error {
  Description: string;
  timestamp: number;
}

export interface ServerError extends Error {
  statusCode: number;
  errorCode: number;
}
