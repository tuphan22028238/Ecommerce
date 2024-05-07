import {useQuery} from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getProduct } from "../../apis/products.api"

export default function ProductDetail() {

  const {id} = useParams()

  const productQuery = useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(Number(id))
  })

  const data = productQuery?.data?.data
  console.log(data);
  
  return (
    <div>
      <h1>
        {data?.name}
      </h1>
      <p>
        {data?.description}
      </p>
    </div>
  )
}