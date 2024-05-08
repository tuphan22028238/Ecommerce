import AsideFilter from "./AsideFilter/AsideFilter";
import Product from "./Product/Product";
import SortProductList from "./SortProductList/SortProductList";
import { useParams } from 'react-router-dom'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { getProducts, getCategory } from '../../apis/products.api'
import { Link } from 'react-router-dom'
import {ProductListConfig} from '../../types/product.type'
import useQueryParams from '../../hooks/useQueryParams'
import { omitBy, isUndefined, omit } from 'lodash'
import Pagination from "../../components/Pagination";


export type queryConfig = {
  [key in keyof ProductListConfig]: string
}


export default function ProductList() {

  const queryParams: queryConfig = useQueryParams()
  const queryConfig: queryConfig = omitBy(
    {
      page: queryParams.page || '1',
      limit: queryParams.limit || '15',
      sort_by: queryParams.sort_by,
      exclude: queryParams.exclude,
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      category: queryParams.category
    },
    isUndefined
  )

  const { data: productsQuery} = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return getProducts(queryConfig)
    },
    placeholderData: keepPreviousData
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return getCategory()
    }
  })

  console.log(categoriesData);
  
 
  return (
    <div className="bg-gray-200 py-6">
      <div className="container">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
          {<AsideFilter queryConfig={queryConfig} categories={categoriesData?.data} />}
          </div>
        <div className="col-span-9">
          <SortProductList queryConfig={queryConfig} pageSize={productsQuery?.data?.pagination.total_pages || 1}/>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {productsQuery?.data?.products.map((product) => ( 
              <div className="col-span-1" key = {product.id}>
                <Product data = {product}/>
              </div>
            ))}
          </div>
          <Pagination queryConfig={queryConfig} pageSize={productsQuery?.data?.pagination.total_pages || 1} />
        </div>
        </div>
      </div>
    </div>
  )
}