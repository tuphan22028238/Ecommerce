import { viewOrder, cancelOrder } from "../../apis/user.api"
import { useQuery, useMutation } from "@tanstack/react-query"
import { getProfileFromLS } from "../../ultis/auth"
import { toast } from "react-toastify"


export default function userOrder() {

  const idUser = Number(getProfileFromLS())
  const orderQuery = useQuery({
    queryKey: ['order', idUser],
    queryFn: () => viewOrder(Number(idUser)),
  })

  const cancelOrderMutation = useMutation({
    mutationFn: (id: number) => cancelOrder(id),
    onSuccess: () => {
      orderQuery.refetch()
      toast.success('Cancel order success')
  }})

  const handleCancel = (id: number) => {
    cancelOrderMutation.mutate(id)
  }

return (

<div className="pt-5">
  <div className="container ">
    <div className="grid grid-cols-10 rounded-sm bg-white py-5 px-9 text-sm capitalize text-black shadow">
      <div className="col-span-2">
        Hình ảnh
      </div>
        <div className="col-span-2 text-center">Tên</div>
        <div className="col-span-2 text-center">Giá</div>
        <div className="col-span-1 text-center">Số lượng</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-1 text-center">Huỷ</div>
    </div>  

    {orderQuery?.data?.data.map((order: any) => (
      <div className="grid grid-cols-10 rounded-sm bg-white py-5 px-9 text-sm capitalize text-black shadow">
      <div className="col-span-2">
        <img src={order.product.imageProduct.split(', ')[0]} alt="anh san pham"  className="w-20 h-20"/>
      </div>
        <div className="col-span-2 text-center flex justify-center items-center">{order.product.name}</div>
        <div className="col-span-2 text-center flex justify-center items-center">{order.product.price}</div>
        <div className="col-span-1 text-center flex justify-center items-center">{order.orderDetail.quantity}</div>
        <div className="col-span-2 text-center flex justify-center items-center">{order.orderDetail.status == 1 ? "Confirm" : (order.orderDetail.status == 0 ? "Pending" : "Cancel")}</div>
        <div className="col-span-1 text-center flex justify-center items-center">
          <button 
            onClick={() => handleCancel(order.orderDetail.id)} 
            className="bg-orange-500 text-black px-2 py-1 rounded hover:bg-orange-300"
            disabled={order.orderDetail.status == 2}
          >Huỷ</button>
        </div>
    </div>
    ))}
    
  </div>
</div>
)}