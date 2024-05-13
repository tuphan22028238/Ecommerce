import { getProducts, deleteProduct } from "../../apis/seller.api"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getProfileFromLS } from "../../ultis/auth"
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import path from "../../ultis/path"
import { useEffect } from "react"

export default function PossesProductList() {
  

  const idSeller = Number(getProfileFromLS())
  
  const productQuery = useQuery({
    queryKey: ['productsOfSeller', idSeller],
    queryFn: () => getProducts(idSeller),
  })

  useEffect(() => {
    productQuery.refetch()
  }, [idSeller])

  const deleteProductMutation = useMutation({
    mutationFn: (id: number) => deleteProduct(id),
    onSuccess: () => {
      productQuery.refetch()
      toast.success('Delete product success')
    }
  })

  const handleDelete = (id: number) => {
    deleteProductMutation.mutate(id)
  }

  if (productQuery.data?.data)

  return (
    <div className="bg-gray-200">
      {
      typeof productQuery?.data?.data === 'string' ? 
            (<p>{productQuery.data.data}</p>) :
            <div>
            

            <div className="mx-3 my-4">
              <div className="">
                <div className="rounded-sm bg-gray-100 py-5 px-9 text-sm capitalize text-gray-500 shadow">
                  <div className="flex">
                    <Link to={`/seller/addProduct`} className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-black bg-white rounded shadow hover:bg-slate-100 " >
                      Add Product
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

                    </Link>

                    <Link to={path.seller.view_order} className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-black bg-white rounded shadow hover:bg-slate-100 ml-8">
                      ViewOrder
                    </Link>
                  </div>
                </div>
              </div>
            </div>
        
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 my-4">
            {productQuery?.data?.data.map((product: any) => (
              <div className="col-span-1 bg-white rounded shadow-sm hover:translate-y-[-0.08rem] mx-1 cursor-pointer" key = {`${product.id}`}>
                <a href="#">
                <h5 className="text-base font-bold text-center">{product.name}</h5>
                </a>
                <hr className="border-gray-200 my-auto" />

                <div className="p-5">
                    <a href="#">
                    <img className="rounded-t-lg shadow" src="https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg" alt="image here" />
                    </a>
                    <p className="mb-3 font-normal text-gray-700 pt-3">{product.description}</p>
                   
                </div>
                <div className="flex justify-between items-end">

                <Link to ={`/seller/editProduct/${product.id}`} className="w-1/2 bg-green-300 text-black font-bold py-2 px-4 rounded">
                        Edit
                        
                    </Link>
                    <Link to={`/seller/listProduct/${getProfileFromLS()}`} className="w-1/2 bg-red-300  text-black font-bold py-2 px-4 rounded" 
                    onClick={() => handleDelete(product.id)}>
                        Delete
                    </Link>
                </div>

            </div>))}
            </div>
        </div>
      }    
    </div>
  )
}