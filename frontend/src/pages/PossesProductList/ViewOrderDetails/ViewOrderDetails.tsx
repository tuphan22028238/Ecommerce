import { useParams } from "react-router-dom"
import { getDetailOrder } from "../../../apis/seller.api"
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom'


export default function ViewOrderDetails() {
  const {productId} = useParams()

  const orderDetailQuery = useQuery({
    queryKey: ['orderDetail', productId],
    queryFn: () => getDetailOrder(Number(productId)),
  }) 
  
  console.log(orderDetailQuery.data?.data); 

  return (
  <div>
      <div className="container">
        <div className="items-center text-2xl font-bold text-center">Các sản phẩm đã bán</div>
        <div className="flex flex-col items-center">
          
          {orderDetailQuery.data?.data?.map((detail : any) => (
            <Link to = {`/seller/confirmOrder/${detail.orderDetail.id}/${productId}`}>
              <div className="grid grid-cols-12 text-center rounded-sm border border-gray bg-white py-5 px-4 text-sm text-gray-500">
                <div className="col-span-6">
                  <div className="flex">
                    <div className="flex-grow">
                      <div className="flex">
                        <img src="https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg" alt="" className="h-20 w-20"/>
                        <div className="">{detail.buyer.id}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-6">
                  <div className="grid text-center grid-cols-5">
                  <div className="col-span-2">{detail.buyer.name}</div>
                  <div className="col-span-2">{detail.orderDetail.quantity}</div>
                  <div className="col-span-1">{detail.orderDetail.status == 0 ? "Pending": "Confirm"}</div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
          
          </div>        
        </div>
  </div>
  )}