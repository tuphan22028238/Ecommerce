import type { RegisterOptions } from 'react-hook-form'
import * as yup from 'yup'

type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions }
const rules: Rules = {
  email: {
    required: {
      value: true,
      message: 'Vui lòng nhập email đúng định dạng'
    },
    pattern: {
      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
      message: 'Vui lòng nhập email đúng định dạng'
    },
    maxLength: {
      value: 160,
      message: 'Email không được quá 160 ký tự'
    },
    minLength: {
      value: 5,
      message: 'Email không được ít hơn 5 ký tự'
    }
  },

  password: {
    required: {
      value: true,
      message: 'Password không được để trống'
    },
    maxLength: {
      value: 160,
      message: 'Password không được quá 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Password không được ít hơn 6 ký tự'
    }
  },

  confirm_password: {
    required: {
      value: true,
      message: 'Confirm Password không được để trống'
    },
    maxLength: {
      value: 160,
      message: 'Password không được quá 160 ký tự'
    },
    minLength: {
      value: 6,
      message: 'Password không được ít hơn 6 ký tự'
    }
  }
}

export const schema = yup.object({
  email: yup
    .string()
    .required('Email là bắt buộc')
    .email('Email không đúng định dạng')
    .min(5, 'Độ dài từ 5 -160 ký tự')
    .max(160, 'Độ dài từ 5 -160 ký tự'),
  password: yup
    .string()
    .required('Password là bắt buộc')
    .min(6, 'Độ dài từ 6 -160 ký tự')
    .max(160, 'Độ dài từ 6 -160 ký tự'),
  confirm_password: yup
    .string()
    .required('Confirm Password là bắt buộc')
    .min(6, 'Độ dài từ 6 -160 ký tự')
    .max(160, 'Độ dài từ 6 -160 ký tự')
    .oneOf([yup.ref('password')], 'Confirm Password không khớp với Password')

  // price_min: yup.string().test({
  //   name:'price-not-allow',
  //   message: 'giá không hợp lệ',
  //   test: function(value) {
  //     const price_min = value
  //     if(price_min)
  //   }
  // })
})

export const loginSchema = schema.omit(['confirm_password'])
export type Schema = yup.InferType<typeof schema>

export default rules
