type Role = 'User' | 'Admin'
export interface User {
  id : number
  email : string
  roles:  Role[]
  name : string
  date_of_birth : null
  address : string
  phone : string
  createAt: string
  updateAt: string
  __v : number
}