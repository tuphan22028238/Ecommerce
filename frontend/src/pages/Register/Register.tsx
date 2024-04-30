import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import rules  from "../../ultis/Rule";
import Input from "../../components/Input";
import {Schema,schema} from "../../ultis/Rule"
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { registerAccount } from "../../apis/auth.api";
import { omit } from "lodash";
import { isAxiosError } from "axios";
import { isAxiosUnprocessableEntity } from "../../ultis/utils";
import { ErrorResponse } from "types/utils.type";
// import { useContext } from "react";
// import { AppContext } from "../../context/app.context";

type FormData = Schema
export default function Register() {

  // const {setIsAuthenticated} = useContext(AppContext)
  // const navigate = useNavigate()
  const {register, handleSubmit,formState: {errors},setError} = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<Schema,'confirm_password'>) => registerAccount(body)
    
  })
  const onSubmit = handleSubmit(
    (data) => {
    const body = omit(data,['confirm_password'])
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        console.log(data)
        // setIsAuthenticated(true)
        // navigate('/')
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntity<ErrorResponse<Omit<Schema,'confirm_password'>>>(error)) {
            const formError = error.response?.data.data

            if(formError) {
              Object.keys(formError).forEach((key) => {
                setError(key as keyof Omit<Schema,'confirm_password'>, {
                  message: formError[key as keyof Omit<Schema,'confirm_password'>],
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
    
  
    },
  )

  
  return (
    <div className="bg-orange-600">
    <div className="max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-5 lg:py-32 lg:pr-10">
        <div className="lg:col-span-2 lg:col-start-4">
          <form className="p-10 rounded bg-white shadow-sm" onSubmit={onSubmit} noValidate>
            <div className="text-2xl">Đăng ký</div>
            <Input
              name = "email"
              register={register}
              type="email"
              className="mt-8"
              errorMessage={errors.email?.message}
              placeholder="Email"
              rules={rules.email}
            />
            <Input
              name = "password"
              register={register}
              type="password"
              className="mt-3"
              errorMessage={errors.password?.message}
              placeholder="Password"
              rules={rules.password}
              
            />

            <Input
              name = "confirm_password"
              register={register}
              type="password"
              className="mt-3"
              errorMessage={errors.confirm_password?.message}
              placeholder="Confirm Password"
              rules={rules.confirm_password}
            />
            <div className="mt-3">
              <button className="w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600">
                Đăng ký
              </button>
            </div>
            <div className="mt-8 text-center">
              <div className="flex justify-center items-center">
                <span className="text-slate-500">Bạn đã có tài khoản?</span>
                <Link to="/login" className="text-red-400 ml-2">Đăng nhập</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    
  </div>
  )
}