export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

export function createSuccess<T>(data: T): Result<T> {
  return { success: true, data };
}

export function createError<E>(error: E): Result<never, E> {
  return { success: false, error };
}

export function isSuccess<T, E>(result: Result<T, E>): result is { success: true; data: T } {
  return result.success;
}

export function isError<T, E>(result: Result<T, E>): result is { success: false; error: E } {
  return !result.success;
} 