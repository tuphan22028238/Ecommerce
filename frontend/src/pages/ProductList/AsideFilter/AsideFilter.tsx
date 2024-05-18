import { Link, createSearchParams } from 'react-router-dom'
import path from '../../../ultis/path.ts'
import Input from '../../../components/Input/input.tsx'
import Button from '../../../components/Button/Button.tsx'
import { queryConfig } from '../../../hooks/useQueryConfig.tsx'
import { Category } from '../../../types/category.type.ts'
import classNames from 'classnames'
import InputNumber from '../../../components/InputNumber/InputNumber.tsx'
import { useForm, Controller } from 'react-hook-form'

interface Props {
  queryConfig: queryConfig
  categories: Category[]
}
export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  return (
    <div className='px-3 py-4'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange-600': !category
        })}
      >
        <svg viewBox='0 0 12 10' className='h-3 w-3 pr-1'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Danh Mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300'></div>
      <ul>
        {categories!= null && categories.map((categoryItem) => {
          const isActive = category === categoryItem.id

          return (
            <li className='py-2 pl-2' key={categoryItem.id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem.id
                  }).toString()
                }}
                className={classNames('relative px-2', {
                  'font-semibold text-orange-600 ': isActive
                })}
              >
                {isActive && (
                  <svg viewBox='0 0 4 7' className='absolute left-[-10px] top-1 h-2 w-2 fill-orange-400'>
                    <polygon points='4 3.5 0 0 0 7' />
                  </svg>
                )}
                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
