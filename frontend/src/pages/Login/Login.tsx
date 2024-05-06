import { useForm } from 'react-hook-form'
import { Form, Link, useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, loginSchema } from '../../ultis/Rule'
import { useMutation } from '@tanstack/react-query'
import { omit } from 'lodash'
import Input from '../../components/Input'
import authApi from '../../apis/auth.api'
import { isAxiosUnprocessableEntity } from '../../ultis/utils'
import { ErrorResponse } from 'types/utils.type'
import { useContext } from 'react'
import { AppContext } from '../../context/app.context'
import Button from '../../components/Button'
type FormData = Omit<Schema, 'confirm_password'>

export default function Login() {
  const { setIsAuthenticated, setProfile } = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    setError,
    handleSubmit,
    formState: { errors }
  } = useForm<Omit<Schema, 'confirm_password'>>({
    resolver: yupResolver(loginSchema)
  })

  const loginMutation = useMutation({
    mutationFn: (body: Omit<Schema, 'confirm_password'>) => authApi.login(body)
  })
  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        console.log(data)
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorResponse<FormData>>(error)) {
          const formError = error.response?.data.data

          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'server'
              })
            })
          }
        }
      }
    })
  })

  return (
    <div className='bg-emerald-600'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form className='rounded bg-white p-10 shadow-sm' onSubmit={onSubmit}>
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                name='email'
                register={register}
                type='email'
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              <Input
                name='password'
                register={register}
                type='password'
                className='mt-3'
                errorMessage={errors.password?.message}
                placeholder='Password'
              />
              <div className='mt-3'>
                <Button
                  type='submit'
                  className={`w-full px-2 py-4 text-center text-sm uppercase text-white ${loginMutation.isPending ? 'cursor-not-allowed bg-orange-500 hover:bg-orange-600' : 'bg-orange-500 hover:bg-orange-600'}`}
                  isLoading={loginMutation.isPending}
                  disabled={loginMutation.isPending}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className='mt-8 text-center'>
                <div className='flex items-center justify-center'>
                  <span className='text-slate-500'>Bạn chưa có tài khoản?</span>
                  <Link to='/register' className='ml-2 text-red-400'>
                    Đăng ký
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
