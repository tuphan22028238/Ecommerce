import {useQuery,useMutation } from "@tanstack/react-query"
import { Link, useParams } from "react-router-dom"
import { getProduct } from "../../apis/products.api"
import { addProductToCart, prepareOrderFromCart } from "../../apis/user.api"
import { getProfileFromLS } from "../../ultis/auth"
import { formatCurrency, formatNumberToSocialStyle, rateSale } from '../../ultis/utils'
import InputNumber from '../../components/InputNumber'
import { useEffect, useMemo, useState } from 'react'
import { Product, ProductTocart } from 'types/product.type'
import { toast } from 'react-toastify'
import OrderCheckOut from "../OrderCheckOut/OrderCheckOut"

type FormStateType = ProductTocart

const intialFormState : FormStateType = {
  productId: 0, 
  quantity: 1, 
  color: 1, 
  discount: 0,
  size: 2
}

export default function ProductDetail() {
  const { id } = useParams()
  const [formState, setFormState] = useState<FormStateType>(intialFormState)
  const [ProcessBuy, setProcessBuy] = useState(false)
  const [ProductWantToBuy, setProductWantToBuy] = useState({productIds: [Number(id)]} as any)
  const { data: ProductDetailData } = useQuery({
    queryKey: ['product', id],
    queryFn: () => {
      setFormState((prev) => ({...prev, productId: Number(id)}))
      return getProduct(id as string)
    }
  })
  const product = ProductDetailData?.data

  const [currentIndexImages, setCurrentIndexImages] = useState([0, 3])
  const [activeImage, setActiveImage] = useState('')
  
  const addToCartMutation = useMutation({
    mutationFn: (data) => addProductToCart(Number(getProfileFromLS()), data),
    onSuccess: () => {  
      toast.success('Add product success')
    },
    onError: (error) => {
      toast.error(error.response?.data)
    }
  })

  const addToCart = () =>{
    addToCartMutation.mutate(formState)
  }
  const handleChange = (name: keyof FormStateType) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value)
    if (name === 'quantity') {
      if (product !== undefined && value > product?.unitInStock) {
        value = product?.unitInStock
      }
    }
    setFormState((prev) => ({...prev, [name]: value}))
  }
  const images = product?.imageProduct?.split(', ')
  
  const currentImages = useMemo(
    () => (product ? images : []),
    [product, currentIndexImages]
  )

  useEffect(() => {
    if (images && images?.length > 0) setActiveImage(images[0])
  }, [product])

  const next = () => {
    if (images && currentIndexImages[1] < images.length) {
      setCurrentIndexImages((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }

  const prev = () => {
    if (currentIndexImages[0] > 0) {
      setCurrentIndexImages((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }

  const chooseActive = (img: string) => {
    setActiveImage(img)
  }

  const handleBuyNow = (id: any) => {
    addToCartMutation.mutate(formState)
    setTimeout(() => setProcessBuy(true), 200)
  }

  if (!product) return <div>Loading...</div>
  return (
    <div className='bg-gray-300 py-6'>
      {!ProcessBuy ? (
      <div><div className='container'>
        <div className='bg-white p-4 shadow'>
          <div className='grid grid-cols-12 gap-9'>
            <div className='col-span-5'>
              <div className='relative w-full pt-[100%] shadow'>
                <img
                  src={activeImage}
                  alt={product.name}
                  className='absolute left-0 top-0 h-full w-full bg-white object-cover'
                />
              </div>
              <div className='relative mt-4 grid grid-cols-3 gap-1'>
                <button
                  className='absolute left-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={prev}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-5 w-5'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5 8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImages?.map((image, index) => {
                  const isActive = image === activeImage
                  return (
                    <div className='relative w-full pt-[100%]' key={index} onMouseEnter={() => chooseActive(image)}>
                      <img
                        src={image}
                        alt={product.name}
                        className='absolute left-0 top-0 h-full w-full bg-white object-cover'
                      />
                      {isActive && <div className='absolute inset-0 border-2 border-orange-500'></div>}
                    </div>
                  )
                })}
                <button
                  className='absolute right-0 top-1/2 z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={next}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium uppercase'>{product.name}</h1>
              <div className='mt-8 flex items-center'>
                <span>{formatNumberToSocialStyle(product.unitInStock)}</span>
                <span className='ml-1 text-gray-500'>Đã bán</span>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>đ{formatCurrency(product.price * 1.5)}</div>
                <div className='ml-3 text-3xl font-medium text-orange-500'>đ{formatCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange-600 px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price, product.price * 1.5)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center '>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <div className='ml-10 flex items-center'>
                  <button
                    className='flex h-8 w-8 items-center justify-center rounded-l-sm border-gray-300 text-gray-600 '
                    // onClick={next}
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-4 w-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
                    </svg>
                  </button>
                  <InputNumber
                    value={formState.quantity > product.unitInStock ? product.unitInStock : formState.quantity}
                    className=''
                    onChange={handleChange('quantity')}
                    classNameError='hidden'
                    classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
                  />
                  <button className='flex h-8 w-8 items-center justify-center rounded-r-sm border-gray-300 text-gray-600 '>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='h-4 w-4'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                    </svg>
                  </button>
                  <div className='ml-6 text-sm text-gray-500'>{product.unitInStock} sản phẩm có sẵn</div>
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <Link to='' 
                  className='flex h-12 items-center justify-center rounded-sm border-2 border-blue-600 bg-blue-300 px-5 capitalize text-black shadow-sm hover:bg-blue-100'
                  onClick={addToCart}
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='h-5 w-5 fill-black stroke-black text-black'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </Link>

                <Link to = '' onClick = {() => handleBuyNow(product.id)} className='ml-16 flex h-12 min-w-[5rem] items-center justify-center rounded-sm bg-blue-700 capitalize text-white shadow-sm outline-none hover:bg-blue-700/80'>
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='mt-8 bg-white p-4 shadow'>
        <div className='container'>
          <div className='text-translate-700 rounded bg-gray-50 p-4 text-lg capitalize'>Mô tả sản phẩm </div>
          <div className='mx-4 mb-4 mt-12 text-sm leading-loose'>
            <div dangerouslySetInnerHTML={{ __html: product.description }}>{}</div>
          </div>
        </div>
      </div></div>) : (<OrderCheckOut data = {ProductWantToBuy}/>)}
    </div>
  )
}
