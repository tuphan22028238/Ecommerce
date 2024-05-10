export interface Product { 
  id: number
  name: string
  price: number
  description: string
  quantityPerUnit: number
  unitInStock: number
  unitInOrder: number
  category: string
  createdAt: string
  updatedAt: string
  sellerId: number
  typeId: number
}

export interface ProductList {
  products: Product[]
  page: number
  pagination: {
    page: number
    limit: number
    total_pages: number
  }
}

export interface ProductListConfig {
  page?: number | string
  limit?: number | string
  sort_by?: 'created_date' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: number | string
  price_max?: number | string
  price_min?: number | string
  name?: string
  category?: string
}