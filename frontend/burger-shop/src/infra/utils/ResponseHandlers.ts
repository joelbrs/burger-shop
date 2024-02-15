export function setDataHandler<T>(data: T) {
  return { data, error: null }
}

export function setErrorHandler(error: Error) {
  return { data: null, error }
}
