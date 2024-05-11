import Profile from "./pages/Profile"
import MainLayout from "./layouts/MainLayout"
import Registerlayout from "./layouts/Registerlayout"
import Login from "./pages/Login"
import ProductList from "./pages/ProductList"
import Register from "./pages/Register"
import ProductDetail from "./pages/ProductDetail"
import PossesProduct from "./pages/PossesProduct"
import EditOrAddProduct from "./pages/PossesProduct/EditOrAddProduct"
import { Navigate, Outlet, useRoutes } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "./context/app.context"
import path from "./ultis/path"
import OrderCheckOut from "./pages/OrderCheckOut"
function ProtectedRoute() {
  const {isAuthenticated} = useContext(AppContext)
  return isAuthenticated ? <Outlet/> : <Navigate to='/login' />
}

function RejectedRoute() {
  const {isAuthenticated} = useContext(AppContext)
  return !isAuthenticated ? <Outlet/> : <Navigate to='/' />
}



export default function useRouteElements() {
  const routerElements = useRoutes([
    {
      path: "",
      element: <ProtectedRoute />,
      children: [
        {
          path: path.profile,
          element: (
            <MainLayout>
            <Profile></Profile>
          </MainLayout>
          )
        }
        
      ]
    },
    {
      path:'',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: <Registerlayout><Login /></Registerlayout>
        },
        
        {
          path: path.register,
          element: <Registerlayout><Register /></Registerlayout>
        }
      ]
    },
    {
      path: path.home,
      index : true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.product,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    {
      path: path.seller.list_product,
      element: (
        <MainLayout>
          <PossesProduct />
        </MainLayout>
      )
    },
    {
      path: path.seller.edit_product,
      element: (
        <MainLayout>
          <EditOrAddProduct />
        </MainLayout>
      )
    },
    {
      path: path.seller.add_product,
      element: (
        <MainLayout>
          <EditOrAddProduct />
        </MainLayout>
      )
    },
    {
      path: path.order_checkout,
      element: (
        <MainLayout>
          <OrderCheckOut/>
        </MainLayout>
      )
    }
    
  ])
  return routerElements
}