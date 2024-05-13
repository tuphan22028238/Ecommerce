import { useParams } from 'react-router-dom';	
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
  

  const confirmOrderMutation = useMutation({
    mutationFn: (params: any) => confirmOrder(params),
    onSuccess: () => {
      confirmOrderQuery.refetch();
    },
  });

  const handleConfirm = () => { 
    confirmOrderMutation.mutate({ orderDetailId, productId });
  }
  
  return (
    <div>
      <Button onClick={()=> handleConfirm()}>Confirm now</Button>
    </div>
  );
}