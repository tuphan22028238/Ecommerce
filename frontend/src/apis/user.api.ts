import http from "../ultis/http";

export const viewProfile = (id: number) => http.get(`/user/profile/${id}`)

export const editProfile = (id: number, data: any) => http.put(`/user/profile/update/${id}`, data)

export const getProductsFromCart = (id: number) => http.get(`/user/cart/${id}`)

export const addProductToCart = (id: number, data: any) => http.post(`/user/cart/add/${id}`, data)

export const deleteProductsFromCart = (id: number, productId: number ) => http.delete(`/user/cart/delete/${id}/${productId}`)

export const viewOrder = (id: number) => http.get(`/user/order/${id}`)

export const cancelOrder = (id: number) => http.put(`/user/order/cancel/${id}`)

export const prepareOrderFromCart = (id: number, data: any) => http.post(`/user/cart/prepare/${id}`, data)

export const placeOrderFromCart = (id: number, data: any) => http.post(`/user/cart/checkout/${id}`, data)
