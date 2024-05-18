import { useParams } from "react-router-dom"
import { getDetailOrder } from "../../../apis/seller.api"
import { useQuery } from "@tanstack/react-query";
import { Link } from 'react-router-dom'
import { useEffect } from "react"; 
import { getProfileFromLS } from "../../../ultis/auth";

export default function ViewOrderDetails() {
  const {productId} = useParams()

  const idSeller = Number(getProfileFromLS())

  const orderDetailQuery = useQuery({
    queryKey: ['orderDetail', productId],
    queryFn: () => getDetailOrder(Number(productId)),
  }) 

  console.log(orderDetailQuery.data?.data);
  
  
  useEffect(() => {
    orderDetailQuery.refetch()
  }, [idSeller])

  return (
  <div className="bg-gray-100">
      <div className="container">
        <div className="pt-5 items-center text-2xl font-bold text-center">Các sản phẩm đã bán</div>
        <div className="flex flex-col items-center ">
        <div className="w-auto max-w-[523px]">
            <div className="mt-5">
              <div className="grid grid-cols-12 text-center rounded-sm border border-gray bg-white py-5 px-4 text-sm text-gray-500">
                <div className="col-span-2">
                  <div className="flex">
                    <div className="flex-grow">
                      <div className="flex">
                        Loại sản phẩm
                        <div className=""></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4">
                  Tên sản phẩm
                </div>
                <div className="col-span-6">
                  <div className="grid text-center grid-cols-5">
                  <div className="col-span-2">Tên khách hàng</div>
                  
                  <div className="col-span-2">Số lượng</div>
                  <div className="col-span-1">Trạng thái</div>
                  </div>
                </div>
              </div>
            </div>
            </div>
          {orderDetailQuery.data?.data?.map((detail : any,index : any)  => (
            <div className="w-auto max-w-[523px]">
            <Link to = {detail.orderDetail.status === 0 ? `/seller/confirmOrder/${detail.orderDetail.id}/${productId}` : '#'} key={index}>
              <div className="grid grid-cols-12 text-center rounded-sm border border-gray bg-white py-5 px-4 text-sm text-gray-500">
                <div className="col-span-2">
                  <div className="flex">
                    <div className="flex-grow">
                      <div className="flex">
                        <img  alt="" src = {detail.product.imageProduct.split(', ')[0]} className="h-20 w-20"/>
                        {/* <div className="items-center justify-center">{detail.buyer.id}</div> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-4">
                  {detail.product.name}
                </div>
                <div className="col-span-6">
                  <div className="grid text-center grid-cols-5">
                  <div className="col-span-2">{detail.buyer.email}</div>
                  <div className="col-span-2">{detail.orderDetail.quantity}</div>
                  <div className="col-span-1" style={{ color: detail.orderDetail.status === 1 ? "lightgreen" : "red"}}  >{detail.orderDetail.status == 0 ? "Pending": (detail.orderDetail.status == 1 ? "Confirm" : "Cancel")}</div>
                  </div>
                </div>
              </div>
            </Link>
            </div>
          ))}
          
          </div>        
        </div>
  </div>
  )}