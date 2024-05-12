import http from '../ultis/http'
import { Product, ProductList, } from "types/product.type";

export const getProducts = (params: any) => http.get<ProductList>("/show", { params });

export const getProduct = (id: string) => http.get<Product>(`/show/${id}`);

export const getCategory = () => http.get("/category");

