import axios, { AxiosError } from "axios";


export function isAxiosError(error: unknown): error is AxiosError{
  return axios.isAxiosError(error)
}

//422 status code
export function isAxiosUnprocessableEntity<FormError>(error: unknown): error is AxiosError<FormError>{ 
  return isAxiosError(error) && error.response?.status === 422
}