import http from "../ultis/http";

export const getProducts = (id : number) => http.get(`/seller/listProduct/${id}`)

export const getEditProduct = (id : number) => http.get(`/seller/reqEdit/${id}`)

export const postEditProduct = (id : number, data : any) => http.put(`/seller/editProduct/${id}`, data)

export const deleteProduct = (id : number) => http.delete(`/seller/deleteProduct/${id}`)

export const addProduct = (data : any) => http.post(`/seller/addProduct`, data)

export const getOrders = (id : number) => http.get(`/seller/listOrders/${id}`)

export const getDetailOrder = (id : number) => http.get(`/seller/orderDetail/${id}`)

export const confirmOrder = (params: any) => http.put(`/seller/confirmOrder/${params.orderDetailId}/${params.productId}`)

export const cancelOrder = (id: number) => http.put(`/seller/cancelOrder/${id}`)

export const getSpecificOrderDetail = (id : number) => http.get(`/seller/viewSpecificOrderDetail/${id}`)