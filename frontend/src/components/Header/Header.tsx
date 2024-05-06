import { FloatingPortal, useFloating, arrow, shift, offset } from '@floating-ui/react-dom-interactions'
import { AnimatePresence, motion } from 'framer-motion'
import { useContext, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Popover from '../../components/Popover'
import { useMutation } from '@tanstack/react-query'
import authApi from '../../apis/auth.api'
import { AppContext } from '../../context/app.context'
import Profile from 'pages/Profile'

function Header() {
  const { isAuthenticated, setIsAuthenticated, setProfile, profile } = useContext(AppContext)
  const navigate = useNavigate()
  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      navigate('/login')
      setProfile(null)
    }
  })

  const handleLogout = () => {
    logoutMutation.mutate()
  }

  return (
    <div className='bg-green-500 pb-5 pt-2 text-white '>
      <div className='container'>
        <div className='flex items-center justify-between pr-20'>
          <div className='flex cursor-pointer items-center gap-2 pl-2 hover:text-gray-400'>
            <Link to='/'>Kênh người bán</Link>
            {/* // nhớ cấu hình route sang kênh bán */}
          </div>
          <div className='flex justify-end text-sm'>
            <Popover
              className='flex cursor-pointer items-center py-1 hover:text-gray-400'
              renderPopover={
                <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                  <div className='flex flex-col px-3 py-2'>
                    <button className='mt-2 px-3 py-2 text-left hover:text-orange-500'>Tiếng Việt</button>
                    <button className='mt-2 px-3 py-2 text-left hover:text-orange-500'>English</button>
                  </div>
                </div>
              }
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='h-6 w-6'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
                />
              </svg>
              <span className='mx-1'>Tiếng Việt</span>
            </Popover>

            {isAuthenticated && (
              <Popover
                className='flex cursor-pointer  items-center py-1 pl-3 pr-3 hover:text-gray-400'
                renderPopover={
                  <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                    <div className='flex flex-col px-3 py-2'>
                      <Link to='/profile' className='mt-2 px-3 py-2 text-left hover:text-orange-500'>
                        User
                      </Link>
                      <Link to='/profile' className='mt-2 px-3 py-2 text-left hover:text-orange-500'>
                        Giỏ hàng
                      </Link>
                      <button onClick={handleLogout} className='mt-2 px-3 py-2 text-left hover:text-orange-500'>
                        Logout
                      </button>
                    </div>
                  </div>
                }
              >
                <div className='mr-2 h-5 w-5 flex-shrink-0'>
                  <img
                    src='https://lh3.googleusercontent.com/ogw/AF2bZyjsoNUqXJdq0w9FkQ4vTySxyCm1NPkODhI6mgrAaPJce-U=s32-c-mo'
                    alt='avatar'
                    className='h-full w-full rounded-full object-cover '
                  />
                </div>
                <div className=''>{profile?.email}</div>
              </Popover>
            )}

            {!isAuthenticated && (
              <div className='flex items-center'>
                <Link to='/register' className='mx-3 capitalize hover:text-white/70'>
                  Đăng ký
                </Link>
                <div className='h-4 border-r-[1px] border-r-white/40'></div>
                <Link to='/login' className='mx-3 capitalize hover:text-white/70'>
                  Đăng nhập
                </Link>
              </div>
            )}
          </div>
        </div>
        <div className='mt-4 grid grid-cols-12 gap-4'>
          <Link to='/' className='col-span-2'>
            <img className='w-21 h-14 pl-5' src='src/images/logo.png' alt='' />
          </Link>
          <form className='col-span-8 translate-y-4'>
            <div className='flex rounded-sm bg-white p-1 '>
              <input
                type='text'
                name='search'
                className='flex-grow border-none bg-transparent px-3  py-2 text-black outline-none'
                placeholder='Search....'
              />

              <button className='flex-shrink-0 rounded-sm bg-green-600 px-6 py-2 hover:opacity-80'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-6 w-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </button>
            </div>
          </form>

          <div className='col-span-2 flex size-8 translate-y-6 cursor-pointer items-center justify-end  hover:text-gray-400'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-6 w-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
              />
            </svg>
            {/* // nhớ cấu hình route sang giỏ hàng */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
