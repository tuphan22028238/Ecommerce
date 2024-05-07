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
  idSeller: number
  typeId: number
}

export type Products = Product[]