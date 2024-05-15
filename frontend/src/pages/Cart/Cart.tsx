import { useQuery, useMutation } from '@tanstack/react-query'
import { getProductsFromCart, deleteProductsFromCart, prepareOrderFromCart } from '../../apis/user.api'
import  OrderCheckOut  from "../OrderCheckOut/OrderCheckOut"
import { getProfileFromLS } from "../../ultis/auth"
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify' 
import path from '../../ultis/path'
import { ProductToBuy } from '../../types/product.type'
import { useState } from 'react'

type BuyProduct = Omit<ProductToBuy, 'address' | 'paymentMode'>

const productToBuy: BuyProduct = {
  productIds : []
}

export default function Cart() {

  const id = Number(getProfileFromLS())

  const [ProductWantToBuy, setProductWantToBuy] = useState<BuyProduct>(productToBuy)
  const [ProcessBuy, setProcessBuy] = useState(false)

  const cartItems= useQuery({
    queryKey: ['cart', id],
    queryFn: () => getProductsFromCart(id)
  })

  const deleteProductMutation = useMutation({
    mutationFn: (productId: number) => deleteProductsFromCart(id, productId),
    onSuccess: () => {
      cartItems.refetch()
      toast.success('Delete product success')
    }
  })

  const prepareOrderFromCartMutation = useMutation({
    mutationFn: (data: BuyProduct) => prepareOrderFromCart(id, data),
    onSuccess: () => {
      toast.success('Prepare order success')
    }
  })

  const handleDelete = (id: number) => {
    deleteProductMutation.mutate(id)
  }

  const handleCheckboxChange = (productId: number) => {
    setProductWantToBuy(prevState => {
      if (prevState.productIds.includes(productId)) {
        return {...prevState , productIds: prevState.productIds.filter(id => id !== productId)};
      } else {
        return { ...prevState , productIds: [...prevState.productIds, productId] };
      }
    });
  };

  const handleSubmit = () => {
    setProcessBuy(true)
    prepareOrderFromCartMutation.mutate(ProductWantToBuy)
  }
  
return (
  <div className="bg-neutral-100 py-16">
    {!ProcessBuy ? (<div className="container">
      <div className="overflow-auto">
        <div className="min-w-[1000px]">
          <div className="grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500 shadow">
            <div className="col-span-6">
              <div className="flex items-center">
                <div className="flex flex-shrink-0 items-center justify-center pr-3">
                  {/* <input type="checkbox" className="h-5 w-5 accent-orange-500" /> */}
                </div>
                <div className="flex-grow text-black">Sản phẩm</div>
              </div>
            </div>
            <div className="col-span-6">
              <div className="grid text-center grid-cols-5">
                <div className="col-span-2">Đơn giá</div>
                <div className="col-span-1">Số lượng</div>
                <div className="col-span-1">Số tiền</div>
                <div className="col-span-1">Thao tác</div>
              </div>
            </div>
          </div>
          <div className="my-3 rounded-sm bg-white p-5 shadow">
            {cartItems?.data?.data.map((item: any) => (<div className="grid grid-cols-12 text-center rounded-sm border border-gray bg-white py-5 px-4 text-sm text-gray-500">
              <div className="col-span-6">
                <div className="flex">
                  <div className="flex flex-shrink-0 items-center justify-center pr-3">
                    <input type="checkbox" className="h-5 w-5 accent-orange-500" 
                    checked = {ProductWantToBuy.productIds.includes(item.product.id)}
                    onChange={() => handleCheckboxChange(item.product.id)}
                    />
                  </div>
                  <Link to = {`${path.home}show/${item.product.id}`}>
                  <div className="flex-grow">
                    <div className="flex">
                      <img src="https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg" alt="" className="h-20 w-20"/>
                      <div className="">{item.product.name}</div>
                    </div>
                  </div>
                  </Link>
                </div>
                
              </div>
              <div className="col-span-6">
                <div className="grid text-center grid-cols-5">
                <div className="col-span-2">{item.product.price}</div>
                <div className="col-span-1">{item.cartDetails.quantity}</div>
                <div className="col-span-1">{item.product.price * item.cartDetails.quantity}</div>
                <div className="col-span-1">
                  <button 
                    className="bg-orange-500 rounded border-2 border-red-100 text-black hover:bg-orange-300 px-2 py-1"
                    onClick={() =>handleDelete(item.product.id)}

                   >Xoá</button>
                </div>
                </div>
              </div>          
            </div>
          ))}
          </div>
          <div className="my-3 rounded-sm bg-white p-5 shadow">
            <div className="grid grid-cols-12 text-center rounded-sm border border-gray bg-white py-5 px-4 text-sm text-gray-500">
              <div className="col-span-6">
                <div className="flex flex-shrink-0 items-center pr-3">
                    <input type="checkbox" className="h-5 w-5 accent-orange-500"/>
                    <div className="ml-3">Chọn tất cả</div>
                </div>
              </div>
              <div className="col-span-6">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    {/* đơn giá = tổng giá đc tick ở trên */}
                  </div>
                  <div className="col-span-2">
                    <button 
                      className="bg-orange-500 border-4 text-black border-red-500 rounded-sm"
                      onClick={handleSubmit}
                      >Mua hàng
                    </button>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>) : (<OrderCheckOut data = {ProductWantToBuy}/>)}
  </div>
)}