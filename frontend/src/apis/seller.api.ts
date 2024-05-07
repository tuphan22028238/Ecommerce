import http from "../ultis/http";

export const getProducts = (id : number) => http.get(`/seller/listProduct/${id}`)

export const getEditProduct = (id : number) => http.get(`/seller/reqEdit/${id}`)

export const postEditProduct = (id : number, data : any) => http.put(`/seller/editProduct/${id}`, data)

export const deleteProduct = (id : number) => http.delete(`/seller/deleteProduct/${id}`)

export const addProduct = (data : any) => http.post(`/seller/addProduct`, data)