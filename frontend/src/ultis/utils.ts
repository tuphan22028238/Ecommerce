import axios, { AxiosError } from 'axios'

export function isAxiosError(error: unknown): error is AxiosError {
  return axios.isAxiosError(error)
}

//422 status code
export function isAxiosUnprocessableEntity<FormError>(error: unknown): error is AxiosError<FormError> {
  return isAxiosError(error) && error.response?.status === 422
}

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export function rateSale(original: number, sale: number) {
  return Math.round((1 - sale / original) * 100) + '%'
}
