import MainLayout from "./layouts/MainLayout"
import Registerlayout from "./layouts/Registerlayout"
import Login from "./pages/Login"
import ProductList from "./pages/ProductList"
import Register from "./pages/Register"
import { useRoutes } from "react-router-dom"
export default function useRouteElements() {
  const routerElements = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },

    {
      path: "/login",
      element: <Registerlayout><Login /></Registerlayout>
    },

    {
      path: "/register",
      element: <Registerlayout><Register /></Registerlayout>
    }
  ])
  return routerElements
}