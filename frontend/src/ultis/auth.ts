import { User } from "types/user.type"

export const setAccessTokenToLS = (accessToken: string) => {
  localStorage.setItem("accessToken", accessToken)
}

export const clearLS = () => {
  localStorage.removeItem("accessToken")
  localStorage.removeItem("profile")
}

export const getAccessTokenFromLS = () => {
  return localStorage.getItem("accessToken") || ''
}

export const getProfileFromLS = () => {
  const res = localStorage.getItem("profile")
  return res ? JSON.parse(res) : null
}

export const setProfileToLS = (profile: User) => {
  localStorage.setItem("profile", JSON.stringify(profile))
}

export const getRoleFromLS = () => {
  const res = localStorage.getItem("role")
  return res ? res : ''
}

export const setRoleToLS = (role : string) => {
  localStorage.setItem("role", role)
}