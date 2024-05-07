import AsideFilter from "./AsideFilter/AsideFilter";
import Product from "./Product/Product";
import SortProductList from "./SortProductList/SortProductList";
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '../../apis/products.api'
import { Link } from 'react-router-dom'


export default function ProductList() {

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: () => getProducts(),
    staleTime: 15000
  })
  
  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <AsideFilter/>
          </div>
        <div className="col-span-9">
          <SortProductList/>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {productsQuery?.data?.data.map((product) => ( 
              <div className="col-span-1" key = {product.id}>
                <Product data = {product}/>
              </div>
            ))}
          </div>
        </div>
        </div>
      </div>
    </div>
  )
}