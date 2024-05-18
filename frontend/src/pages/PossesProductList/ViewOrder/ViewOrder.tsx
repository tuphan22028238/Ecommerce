import { getProducts } from "../../../apis/seller.api"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getProfileFromLS } from "../../../ultis/auth"
import { Link } from 'react-router-dom'
import { toast } from "react-toastify"
import path from "../../../ultis/path"
import { useEffect } from "react"

export default function ViewOrder() {
  
  const idSeller = Number(getProfileFromLS())
  
  const orderQuery = useQuery({
    queryKey: ['Orders', idSeller],
    queryFn: () => getProducts(idSeller),
  })

  useEffect(() => {
    orderQuery.refetch()
  }, [idSeller])


  if (orderQuery.data?.data)

  return (
    <div className="bg-gray-200">
      {
      typeof orderQuery?.data?.data === 'string' ? 
            (<p>{orderQuery.data.data}</p>) :
            <div>   
        
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 my-4">
            {orderQuery?.data?.data.map((product: any) => (
              <Link to = {'/seller/orderDetail/' + `${product.id}`}>
              <div className="col-span-1 bg-white rounded shadow-sm hover:translate-y-[-0.08rem] mx-1 cursor-pointer" key = {`${product.id}`}>
                <h5 className="text-base font-bold text-center line-clamp-2 truncate">{product.name}</h5>
                <hr className="border-gray-200 my-auto" />

                <div className="p-5">
                    <a href="#">
                    <img className="rounded-t-lg shadow" src={product.imageProduct.split(', ')[0]} alt="image here" />
                    </a>
                    <p className="mb-3 font-normal text-gray-700 pt-3">Số lượng đơn: {product.quantitySold}</p>
                </div>
            </div>
            </Link>
            ))}
            </div>
        </div>
      }    
    </div>
  )
}