import { getEditProduct, postEditProduct, addProduct } from "../../../apis/seller.api"
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
  quantityPerUnit: 0,
  description: '',
  unitInStock: 0,
  unitInOrder: 0,
  category: '',
  createdAt: '',
  updatedAt: '',
  sellerId: 0,
  typeId: 0
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
    
<div className="bg-gray-200 items-center justify-center">
<form className="max-w-sm mx-auto" onSubmit={handleSubmnit}>
  
  <div className="mb-5">
    <label htmlFor="id" className="block mb-2 text-sm font-medium text-black">ID Product</label>
    <input id="id" 
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
    placeholder="name@flowbite.com" 
    value= { formState.id }
    onChange={handleChange('id')}
    required />
  </div>
  <div className="mb-5">
    <label htmlFor="name" className="block mb-2 text-sm font-medium text-black">Name</label>
    <input id="name" 
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
    value={ formState.name }
    onChange={handleChange('name')}
    required />
  </div>
  <div className="mb-5">
    <label htmlFor="price" className="block mb-2 text-sm font-medium text-black">Price</label>
    <input id="price" 
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
    value={ formState.price }
    onChange={handleChange('price')}
    required />
  </div>
  {isAddMode && <div className="mb-5">
    <label htmlFor="unitInStock" className="block mb-2 text-sm font-medium text-black">Unit</label>
    <input id="unitInStock" 
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
    value={ formState.unitInStock }
    onChange={handleChange('unitInStock')}
    required />
  </div>}
  {isAddMode && 
  <div className="mb-5">
  <label htmlFor="Type" className="block mb-2 text-sm font-medium text-black">Type</label>
  <input id="Type" 
  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
  value={ formState.typeId }
  onChange={handleChange('typeId')}
  required />
</div>
  }
  <div className="mb-5">
    <label htmlFor="des" className="block mb-2 text-sm font-medium text-black">Description</label>
    <input id="des" 
    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
    value={ formState.description }
    onChange={handleChange('description')}
    required />
  </div>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
    {isAddMode ? 'Add' : 'Edit'}
  </button>
</form>
</div>
  )
  
}