import Profile from "./pages/Profile"
import MainLayout from "./layouts/MainLayout"
import Registerlayout from "./layouts/Registerlayout"
import Login from "./pages/Login"
import ProductList from "./pages/ProductList"
import Register from "./pages/Register"
import { Navigate, Outlet, useRoutes } from "react-router-dom"
import { useContext } from "react"
import { AppContext } from "./context/app.context"
// const isAuthenticated = false
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
          path: '/profile',
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
          path: "/login",
          element: <Registerlayout><Login /></Registerlayout>
        },
        
        {
          path: "/register",
          element: <Registerlayout><Register /></Registerlayout>
        }
      ]
    },
    {
      path: "/",
      index : true,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    
    
  ])
  return routerElements
}