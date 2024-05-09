import { ToastContainer, toast } from "react-toastify"
import useRouteElements from "./useRouteElements"
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const routeElement = useRouteElements()


  return (
    <div>
      {routeElement}
      <ToastContainer />
    </div>
  )
}

export default App
