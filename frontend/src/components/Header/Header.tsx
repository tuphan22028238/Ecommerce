
import { FloatingPortal, useFloating, arrow, shift, offset } from "@floating-ui/react-dom-interactions";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useRef, useState } from "react";
import { Link, useNavigate, createSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Popover from "../../components/Popover";
import { useMutation } from "@tanstack/react-query";
import { logout } from "../../apis/auth.api";
import { AppContext } from "../../context/app.context";
import {getProfileFromLS} from "../../ultis/auth"
import Profile from "pages/Profile";
import useQueryConfig from "../../hooks/useQueryConfig";
import path from "../../ultis/path";
import { yupResolver } from "@hookform/resolvers/yup";
import { omit } from "lodash";

function Header() {

  const queryConfig = useQueryConfig()
  const {register, handleSubmit} = useForm()
  
  const {isAuthenticated,setIsAuthenticated,setProfile,profile} = useContext(AppContext)
  const navigate = useNavigate()
   const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false)
      navigate('/login')
      setProfile(null)

    }
   })
   
   const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order ? omit(
      {
        ...queryConfig,
        name: data.name.trim()
      },
      ['order', 'sort_by']
      ) : {
        ...queryConfig,
        name: data.name.trim()
      }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()})
   })

   const handleLogout = () => {
      logoutMutation.mutate()
   }  
 

    return (
      <div className="pb-5 pt-2 text-white bg-[linear-gradient(-180deg,#f53d2d,#f63)] ">
        <div className="container">
          
          <div className="flex justify-between items-center pr-20">
            <div className="flex items-center gap-2 hover:text-gray-400 cursor-pointer pl-2">
                 <Link to={`/seller/listProduct/${getProfileFromLS()}`}>Kênh người bán</Link>  
                 {/* // nhớ cấu hình route sang kênh bán */}
            </div>
            <div className="flex justify-end text-sm">
              <Popover className="flex items-center py-1 hover:text-gray-400 cursor-pointer"
              renderPopover={
              <div className="bg-white relative shadow-md rounded-sm border border-gray-200">
                <div className="flex flex-col py-2 px-3">
                  <button className="py-2 px-3 hover:text-orange-500 mt-2 text-left">Tiếng Việt</button>
                  
                </div>

              </div>}
                          >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                          </svg>
              <span className="mx-1">Tiếng Việt</span>
              </Popover>
              

            {isAuthenticated && <Popover
            className="flex items-center  py-1 hover:text-gray-400 cursor-pointer pl-3 pr-3"
            renderPopover = {
              <div className="bg-white relative shadow-md rounded-sm border border-gray-200">
                <div className="flex flex-col py-2 px-3">
                  <Link to='/profile' className="py-2 px-3 hover:text-orange-500 mt-2 text-left">User</Link>
                  <Link to={path.user_order} className="py-2 px-3 hover:text-orange-500 mt-2 text-left">Orders</Link>
                  <button onClick={handleLogout} className="py-2 px-3 hover:text-orange-500 mt-2 text-left">Logout</button>
                </div>
              </div>
            }
            >
              <div className="w-5 h-5 mr-2 flex-shrink-0">
                <img src="https://lh3.googleusercontent.com/ogw/AF2bZyjsoNUqXJdq0w9FkQ4vTySxyCm1NPkODhI6mgrAaPJce-U=s32-c-mo" alt="avatar" 
                className="w-full h-full rounded-full object-cover "/>
               
              </div>
              <div className="">{profile?.email}</div>
            </Popover>}
            
            {!isAuthenticated && (
              <div className="flex items-center">
                  <Link to='/register' className="mx-3 capitalize hover:text-white/70">Đăng ký</Link>
                  <div className="border-r-[1px] border-r-white/40 h-4"></div>
                  <Link to='/login' className="mx-3 capitalize hover:text-white/70">Đăng nhập</Link>
              </div>
             ) 
            
            }
            </div>


            
          </div>
          <div className="mt-4 grid grid-cols-12 gap-4">
            <Link to="/" className="col-span-2">
            <img src="public/logo.png" alt="logo here" className="w-20 h-22"/>
            </Link>
            <form className="col-span-8 translate-y-4 pl-20 translate-x-8" onSubmit={onSubmitSearch}>
              <div className="flex bg-white rounded-sm p-1 ">
                <input 
                  type="text" 
                  className="flex-grow text-black px-3 py-2  border-none outline-none bg-transparent"
                  placeholder="Tìm kiếm sản phẩm"
                  {...register('name')}
                />

                <button className="rounded-sm py-2 px-6 flex-shrink-0 bg-orange-600 hover:opacity-80">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
</svg>


                </button>
              </div>

            </form>

            <div className="col-span-2 flex justify-end items-center translate-y-6 hover:text-gray-400 cursor-pointer  size-8 pl-20">
           
            <Link to={`/cart`}> <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
</svg></Link>  
            {/* // nhớ cấu hình route sang giỏ hàng */}
            </div>
          </div>
        </div>
      </div>
    )}

export default Header;