import { AuthResponse } from 'types/auth.type'
import http from '../ultis/http'


export const registerAccount = (body: {email: string, password: string}) => http.post<AuthResponse>('/auth/register', body)

export const login = (body: {email: string, password: string}) => http.post<AuthResponse>('/auth/login', body)

export const logout = () => http.post('/auth/logout')