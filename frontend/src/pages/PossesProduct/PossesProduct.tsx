import { getProducts, deleteProduct } from "../../apis/seller.api"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getProfileFromLS } from "../../ultis/auth"
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import { useEffect } from "react"

export default function PossesProduct() {
  

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
                  <div className="">
                    <Link to={`/seller/addProduct`} className="inline-flex justify-center items-center px-3 py-2 text-sm font-medium text-center text-black bg-white rounded shadow hover:bg-slate-100 " >
                      Add Product
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>

                    </Link>
                  </div>
                </div>
              </div>
            </div>
        
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 my-4">
            {productQuery?.data?.data.map((product: any) => (
              <div className="col-span-1 bg-white rounded shadow-sm hover:translate-y-[-0.08rem] mx-4 my-3 cursor-pointer" key = {`${product.id}`}>
                <a href="#">
                    <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                </a>
                <div className="p-5">
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold">{product.name}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700">{product.description}</p>
                    <Link to ={`/seller/editProduct/${product.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium  rounded text-center text-black bg-green-100 mx-3 my-3">
                        Edit
                        <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                        </svg>
                    </Link>
                    <Link to={`/seller/listProduct/${getProfileFromLS()}`} className="inline-flex items-center px-3 py-2 text-sm font-medium rounded text-center text-black bg-red-100 mx-3 my-3" 
                    onClick={() => handleDelete(product.id)}>
                        Delete
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>


                    </Link>
                </div>

            </div>))}
            </div>
        </div>
      }    
    </div>
  )
}