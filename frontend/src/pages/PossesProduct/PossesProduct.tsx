import { getProducts, deleteProduct } from "../../apis/seller.api"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getProfileFromLS } from "../../ultis/auth"
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"

export default function PossesProduct() {
  

  const idSeller = Number(getProfileFromLS())
  
  const productQuery = useQuery({
    queryKey: ['productsOfSeller', idSeller],
    queryFn: () => getProducts(idSeller),
  })

  const deleteProductMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      toast.success('Delete product success')
    }
  })

  const handleDelete = (id: number) => {
    deleteProductMutation.mutate(id)
  }

  if (productQuery.data?.data)

  return (
    <div>
      {
      typeof productQuery?.data?.data === 'string' ? 
            (<p>{productQuery.data.data}</p>) :
            <div>
            {productQuery?.data?.data.map((product: any) => (
              <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" key = {`${product.id}`}>
                <a href="#">
                    <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{product.description}</p>
                    <Link to ={`/seller/editProduct/${product.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Edit
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </Link>
                    <Link to={`/seller/listProduct/${getProfileFromLS()}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
                    onClick={() => handleDelete(product.id)}>
                        Delete
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </Link>
                </div>
            </div>))}

            <div className="mx-3 my-4">
              <div className="container">
                <div className="grid grid-cols-6 rounded-sm bg-gray-200 py-5 px-9 text-sm capitalize text-gray-500 shadow">
                  <div className="col-span-1">
                    <Link to={`/seller/addProduct`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" >
                      Add Product
                      <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        
        </div>
      }    
    </div>
  )
}