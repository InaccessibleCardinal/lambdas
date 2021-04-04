type ResultSuccess<T> = {
  type: 'success';
  value: T;
};

type ResultFailure = {
  type: 'error';
  value: Error;
};

export type Result<T> = ResultSuccess<T> | ResultFailure;
