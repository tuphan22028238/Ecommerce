import http from '../ultis/http'
import { Product, Products } from "types/product.type";

export const getProducts = () => http.get<Products>("/show");

export const getProduct = (id: number) => http.get<Product>(`/show/${id}`);

