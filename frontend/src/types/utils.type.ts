export interface SuccessResponse<Data> {
  token(arg0: string, token: any, arg2: { expires: number }): unknown
  message: string
  data: Data
}
export interface ErrorResponse<Data> {
  message: string
  data?: Data
}
