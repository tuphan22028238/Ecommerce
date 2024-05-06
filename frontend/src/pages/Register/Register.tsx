import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import rules from '../../ultis/Rule'
import Input from '../../components/Input'
import { Schema, schema } from '../../ultis/Rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { omit } from 'lodash'
import { isAxiosError } from 'axios'
import { isAxiosUnprocessableEntity } from '../../ultis/utils'
import { ErrorResponse } from 'types/utils.type'
import Button from '../../components/Button'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'

type FormData = Schema
export default function Register() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<Schema, 'confirm_password'>) => authApi.registerAccount(body)
  })
  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorResponse<Omit<Schema, 'confirm_password'>>>(error)) {
          const formError = error.response?.data.data

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof Omit<Schema, 'confirm_password'>, {
                message: formError[key as keyof Omit<Schema, 'confirm_password'>],
                type: 'server'
              })
            })
          }
          // if(formError?.email) {
          //   setError('email', {
          //     type: 'server',
          //     message: formError.email
          //   })
          // }

          // if(formError?.password) {
          //   setError('password', {
          //     type: 'server',
          //     message: formError.password
          //   })
          // }
        }
      }
    })
  })

  return (
    <div className='bg-emerald-600'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit} noValidate>
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
                rules={rules.email}
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.password?.message}
                placeholder='Password'
                rules={rules.password}
              />

              <Input
                name='confirm_password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.confirm_password?.message}
                placeholder='Confirm Password'
                rules={rules.confirm_password}
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className={`w-full px-2 py-4 text-center text-sm uppercase text-white ${registerAccountMutation.isPending ? 'cursor-not-allowed bg-red-500 hover:bg-red-600' : 'bg-red-500 hover:bg-red-600'}`}
                  isLoading={registerAccountMutation.isPending}
                  disabled={registerAccountMutation.isPending}
                >
                  Đăng ký
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-slate-500'>Bạn đã có tài khoản?</span>
                  <Link to='/login' className='ml-2 text-red-400'>
                    Đăng nhập
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
