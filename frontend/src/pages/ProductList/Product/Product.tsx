import { Link } from 'react-router-dom'
import { Product as ProductType } from 'types/product.type'
import { formatCurrency, formatNumberToSocialStyle } from '../../../ultis/utils'
import ProductRating from '../../../components/ProductRating'
import path from '../../../ultis/path'

interface Props {
  product: ProductType
}
export default function Product({ product }: Props) {
  return (
    <Link to={`${path.home}${product._id}`}>
      <div className='rounded-sm border-2 border-white bg-white shadow transition-transform duration-100 hover:translate-y-[-0.065rem] hover:border-red-600 hover:shadow-md'>
        <div className='relative w-full pt-[100%]'>
          <img src={product.image} alt={product.name} className='obj absolute left-0 top-0 h-full w-full bg-white' />
        </div>
        <div className='over-flow-hidden p-2'>
          <div className='line-clamp-2 min-h-[1.75rem] text-sm'>{product.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>d</span>
              <span>{formatCurrency(product.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange-400'>
              <span className='text-xs'>đ</span>
              <span>{formatCurrency(product.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={product.rating} />
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(product.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
