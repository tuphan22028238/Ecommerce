import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';	
import Button from "../../../components/Button";
import { useQuery, useMutation } from '@tanstack/react-query';
import { confirmOrder, getSpecificOrderDetail } from '../../../apis/seller.api';


export default function ConfirmOrder() {
  const { orderDetailId, productId } = useParams();
  console.log(orderDetailId, productId);
  const confirmOrderQuery = useQuery({
    queryKey: ['confirmOrder', orderDetailId],
    queryFn: () => getSpecificOrderDetail(Number(orderDetailId)),
  });


  console.log(confirmOrderQuery.data?.data);
  
  const navigate = useNavigate()
  const confirmOrderMutation = useMutation({
    mutationFn: (params: any) => confirmOrder(params),
    onSuccess: () => {
      confirmOrderQuery.refetch();
    },
  });

  const handleConfirm = () => { 
    confirmOrderMutation.mutate({ orderDetailId, productId });
    navigate('/seller/orderDetail/' + productId);
    
  }
  console.log(confirmOrderMutation.data?.data);
  return (
    <div>

      <div className="grid grid-cols-10 rounded-sm bg-white py-5 px-9 text-sm capitalize text-black shadow">
        <div className="col-span-2 text-center">Tên sản phẩm</div>
        <div className="col-span-2 text-center">Tên khách hàng</div>
        <div className="col-span-1 text-center">Số lượng</div>
        <div className="col-span-2 text-center">Phone</div>
        <div className="col-span-2 text-center">Địa chỉ </div>
        <div className="col-span-1 text-center">Giá</div>
      </div>
      <div className="border-b-2 border-gray-300"></div>
      <div className="grid grid-cols-10 rounded-sm bg-white py-5 px-9 text-sm capitalize text-black shadow overflow-hidden">
        <div className="px-1 col-span-2 text-wrap @apply break-words text-sm font-light text-center">{confirmOrderQuery.data?.data.product.name}</div>
        <div className="px-1 col-span-2 text-wrap @apply break-words text-sm font-light text-center">{confirmOrderQuery.data?.data.buyer.name}</div>
        <div className="px-1 col-span-1 text-wrap @apply break-words text-sm font-light text-center">{confirmOrderQuery.data?.data.orderDetail.quantity}</div>
        <div className="px-1 col-span-2 text-wrap @apply break-words text-sm font-light text-center">{confirmOrderQuery.data?.data.buyer.phone}</div>
        <div className="px-1 col-span-2 text-wrap @apply break-words text-sm font-light text-center">{confirmOrderQuery.data?.data.orders.address}</div>
       
        <div className="px-1 col-span-1 text-wrap @apply break-words text-sm font-light text-center">{confirmOrderQuery.data?.data.orderDetail.quantity *confirmOrderQuery.data?.data.orderDetail.unitPrice }</div>
      </div>
      <div className="flex justify-end px-5 py-6"> 
        <button onClick={()=> handleConfirm()} className='border-2 bg-green-400 rounded px-2 py-2'>Confirm now
        </button>
        <button onClick={()=> handleConfirm()} className='ml-3 border-2 bg-red-400 rounded px-2 py-2'>Cancel</button>
      </div>
     
      
    </div>
  );
}