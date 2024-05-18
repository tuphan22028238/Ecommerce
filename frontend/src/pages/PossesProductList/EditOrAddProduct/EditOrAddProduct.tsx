import { getEditProduct, postEditProduct, addProduct } from "../../../apis/seller.api"
import { getCategory } from "../../../apis/products.api"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Product } from "../../../types/product.type"
import { useParams, useMatch, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { toast } from 'react-toastify'
import { getProfileFromLS } from "../../../ultis/auth"

type FormStateType = Product

const intialFormState: FormStateType = {
  id: 0,
  name: '',
  price: 0,
  imageProduct: '',
  quantityPerUnit: 0,
  description: '',
  unitInStock: 0,
  unitInOrder: 0,
  quantitySold: 0,
  category: '',
  createdAt: '',
  updatedAt: '',
  sellerId: 0,
  typeId: 1
}

export default function EditOrAddProduct() {
  const params = useParams()
  const addMatch = useMatch('/seller/addProduct')
  const isAddMode = Boolean(addMatch)
  const navigate = useNavigate()
  const [formState, setFormState] = useState<FormStateType>(intialFormState)
  const queryClient = useQueryClient()

  const productQuery = useQuery({
    queryKey: ['editProduct', params.id],
    queryFn: () => getEditProduct(Number(params.id)),
    enabled: !isAddMode,
  })

  const categoryQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategory()
  })
  
  const editProductMutation = useMutation({
    mutationFn: (data: FormStateType) => postEditProduct(Number(params.id), data),
    onSuccess: (data) => {  
      queryClient.setQueryData(['editProduct', params.id], data)
    }
  })

  const addProductMutation = useMutation({
    mutationFn: (data: FormStateType) => addProduct(data),
    onSuccess: () => {
      toast.success('Add product success')
    }
  })

  const handleChange = (name: keyof FormStateType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prev) => ({...prev, [name]: e.target.value}))
    if (editProductMutation.data) {
      editProductMutation.reset()
    }
  }

  const handleSubmnit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    formState.sellerId = Number(getProfileFromLS())

    if (isAddMode) {
      addProductMutation.mutate(formState)
      navigate(`/seller/listProduct/${getProfileFromLS()}`)
      return
    } else {
      editProductMutation.mutate(formState, {
        onSuccess: () => {
          toast.success('Edit product success')
          navigate(`/seller/listProduct/${getProfileFromLS()}`)
        }
      })
    } 
  }

  useEffect(() => {
    if (productQuery.data) {
      setFormState(productQuery.data.data)
    }
  }, [productQuery.data])

  return (
    
<div className="bg-gray-200 items-center justify-center ">
<div className="container rounded py-3 bg-white max-w-[600px]">
<form className="max-w-sm mx-auto" onSubmit={handleSubmnit}>

  <div className="mb-5">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Name</label>
    <input id="name" 
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
    value={ formState.name }
    onChange={handleChange('name')}
    required />
  </div>
  <div className="mb-5">
    <label htmlFor="price" className="block mb-2 text-sm font-medium text-black">Price</label>
    <input id="price" 
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
    value={ formState.price }
    onChange={handleChange('price')}
    required />
  </div>
  <div className="mb-5">
    <label htmlFor="unitInStock" className="block mb-2 text-sm font-medium text-black">Unit</label>
    <input id="unitInStock" 
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
    value={ formState.unitInStock }
    onChange={handleChange('unitInStock')}
    required />
  </div>
  <div className="mb-5">
  <label htmlFor="Type" className="block mb-2 text-sm font-medium text-black">Type</label>
  <select id="Type" 
  className="mb-1 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
  onChange={(event)=> {setFormState((prev) => ({...prev, typeId : Number(event.target.value)}))}}>
    {categoryQuery.data?.data.map((category: any) => (
      <option key={category.id} value={category.id}>{category.name} </option>
    ))}
  </select>
  </div>
  <div className="mb-5">
    <label htmlFor="imageProduct" className="block mb-2 text-sm font-medium text-black">Image For Product (Link)</label>
    <input id="imageProduct" 
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded w-full p-2.5"
    value={ formState.imageProduct }
    onChange={handleChange('imageProduct')}
    required />
  </div>

  <div className="mb-5">
    <label htmlFor="des" className="block mb-2 text-sm font-medium text-black">Description</label>
    <input id="des" 
    className="shadow-sm bg-gray-50 border border-gray-300 rounded block w-full p-2.5"
    value={ formState.description }
    onChange={handleChange('description')}
    required />
  </div>
  <button type="submit" className="flex focus:ring-4 focus:outline-none  font-medium rounded text-sm px-5 py-2.5 text-center text-black bg-gray-400 items-center justify-center ">
    
    {isAddMode ? 'Add' : 'Edit'}
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

  </button>
</form>
</div>
</div>
  )
  
}