import http from "../ultis/http";

export const getProductsFromCart = (id: number) => http.get(`/user/cart/${id}`)

export const addProductToCart = (id: number, data: any) => http.post(`/user/cart/add/${id}`, data)

export const deleteProductsFromCart = (id: number, productId: number ) => http.delete(`/user/cart/delete/${id}/${productId}`)

