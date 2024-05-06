import { keepPreviousData, useQuery } from '@tanstack/react-query'
import AsideFilter from './AsideFilter/AsideFilter'
import Product from './Product/Product'
import SortProductList from './SortProductList/SortProductList'
import useQueryParams from '../../hooks/useQueryParams'
import productApi from '../../apis/product.api'
import Pagination from '../../components/Pagination'
import { omitBy, isUndefined, omit } from 'lodash'
import { ProductListConfig } from 'types/product.type'
import categoryApi from '../../apis/category.api'

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

  const { data: productsData } = useQuery({
    queryKey: ['products', queryConfig],
    queryFn: () => {
      return productApi.getProduct(queryConfig as ProductListConfig)
    },
    placeholderData: keepPreviousData
  })

  const { data: categoriesData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => {
      return categoryApi.getCategories()
    }
  })
  return (
    <div className='bg-gray-200 py-6'>
      <div className='container'>
        {productsData && (
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-3'>
              {categoriesData?.data.data && (
                <AsideFilter queryConfig={queryConfig} categories={categoriesData.data.data} />
              )}
            </div>
            <div className='col-span-9'>
              <SortProductList queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
              <div className='mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
                {productsData.data.data.products.map((product) => (
                  <div className='col-span-1' key={product._id}>
                    <Product product={product} />
                  </div>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData.data.data.pagination.page_size} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
