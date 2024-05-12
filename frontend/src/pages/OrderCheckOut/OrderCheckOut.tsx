import Popover from "../../components/Popover";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { useQuery, useMutation } from "@tanstack/react-query";
import { prepareOrderFromCart, placeOrderFromCart } from '../../apis/user.api'
import { getProfileFromLS } from "../../ultis/auth"
import { ProductToBuy } from "../../types/product.type"
import { useState } from "react";
import { toast } from "react-toastify";

type BuyProductType = ProductToBuy

const productToBuy: BuyProductType = {
  productIds : [],
  address: '',
  paymentMode: 0
}

export default function OrderCheckOut(props: any) {

    const id = Number(getProfileFromLS())

    productToBuy.productIds = props.data.productIds

    const [BuyProduct, setBuyProduct] = useState<BuyProductType>(productToBuy)
    
    const listBuyProduct = useQuery({
        queryKey: ['listBuyProduct'],
        queryFn: () => prepareOrderFromCart(id, props.data)
    })

    const placeOrderMutation = useMutation({
        mutationFn: (data: BuyProductType) => placeOrderFromCart(id, data),
        onSuccess: () => {
            toast.success('Place order success')
        }
    })
    const handlePlaceOrder = () => {
        placeOrderMutation.mutate(BuyProduct)
    }

    const handleChange = (name: keyof BuyProductType) => (e: React.ChangeEvent<HTMLInputElement>) => {
        setBuyProduct((prev) => ({...prev, [name]: e.target.value}))
      }

    let totalPrice = 0
    for (let i = 0; i < listBuyProduct.data?.data.length; i++) {
        totalPrice += listBuyProduct.data?.data[i].price * listBuyProduct.data?.data[i].quantity
    }

    const handleSelectPaymentMode = (mode: number) => {
        setBuyProduct((prev) => ({...prev, paymentMode: mode}))
    }

    return(
        <div className='bg-neutral-100 py-16'>
            <div className="container">
                <h1 className="py-5 text-2xl text-black-900 capitalize">xác nhận đơn hàng</h1>
                <div className="overflow-auto">
                    <div className="min-w-[1000px]">                
                        <div className="my-3 rounded-sm bg-white p-5 shadow">
                            <div className="grid grid-cols-12 rounded-sm bg-white py-5 px-9 text-sm capitalize text-gray-500">
                                <div className="col-span-8">
                                    <div className="flex items-center">
                                        <div className="flex-grow text-black">
                                            Sản phẩm
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-4">
                                    <div className="grid text-center grid-cols-3">
                                        <div className="col-span-1 text-center">Đơn giá</div>
                                        <div className="col-span-1 text-center">Số lượng</div>
                                        <div className="col-span-1 text-center">Số tiền</div>
                                    </div>
                                </div>
                            </div>
                            {listBuyProduct.data?.data.map((item: any) => (
                                <div className="grid grid-cols-12 text-center rounded-sm border border-gray bg-white py-5 px-4 text-sm text-gray-500">
                                    <div className="col-span-8">
                                        <div className="flex">
                                            <div className="flex-grow">
                                                <div className="flex">
                                                    <img src="https://api-ecom.duthanhduoc.com/images/bbea6d3e-e5b1-494f-ab16-02eece816d50.jpg" alt="" className="h-20 w-20"/>
                                                    <div className="">{item.name}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-4">
                                        <div className="grid text-center grid-cols-3">
                                            <div className="col-span-1 text-center">{item.price}đ</div>
                                            <div className="col-span-1 text-center">{item.quantity}</div>
                                            <div className="col-span-1 text-center">{item.price * item.quantity}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="my-3 rounded-sm bg-white p-5 shadow">
                            <div>
                                <div className="flex items-center my-3">
                                    <div className="flex-grow text-black">
                                        Vui lòng điền địa chỉ nhận hàng:
                                    </div>
                                </div>
                                <Input
                                    name = "address"
                                    type="address"
                                    placeholder="Địa chỉ nhận hàng"
                                    onChange={handleChange('address')}
                                    />
                            </div>
                            <div className="grid grid-cols-12">
                                <div className="col-span-10">
                                    <div className="flex items-center">
                                        <div className="flex-grow text-black">
                                            Phương thức thanh toán:
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2">
                                    <Popover className="flex items-center py-1 hover:text-gray-400 cursor-pointer"
                                        renderPopover={
                                        <div className="bg-white relative shadow-md rounded-sm border border-gray-200">
                                            <div className="flex flex-col py-2 px-3">
                                                <button onClick = {() => handleSelectPaymentMode(0)} className="py-2 px-3 hover:text-orange-500 mt-2 text-left">Thanh toán khi nhận hàng</button>
                                                <button onClick = {() => handleSelectPaymentMode(1)} className="py-2 px-3 hover:text-orange-500 mt-2 text-left">Thanh toán trực tuyến</button>
                                            </div>
                                        </div>}>
                                        <span className="mx-1">{BuyProduct.paymentMode === 0 ? 'Thanh toán khi nhận hàng' : 'Thanh toán trực tuyến'}</span>
                                    </Popover>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="sticky bottom-0 z-0 flex items-center rounded-sm justify-end bg-white p-5 border border-gray-100 shadow">
                    <div className="flex flex-shrink-0 items-center justify-center pr-3">
                        <div className="ml-auto flex items-center">
                            <div>
                                <div className="flex items-center justify-end">
                                    <div>Tổng thanh toán (n sản phẩm):</div>
                                    <div className="ml-2 text-2xl text-orange">{totalPrice} VND</div>
                                </div>
                            </div>
                            <Button onClick = {handlePlaceOrder}className="ml-4 flex h-10 w-40 items-center justify-center bg-red-500 text-sm uppercase text-white hover:bg-red-600">mua hàng</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}