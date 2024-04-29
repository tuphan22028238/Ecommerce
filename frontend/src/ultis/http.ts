import axios, { AxiosError, AxiosInstance } from "axios";
import { toast } from "react-toastify";



class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'https://api-ecom.duthanhduoc.com/', // need a api url
      timeout: 10000,
      headers: {
        'Content-Type' : 'application/json',
      }
    })

    this.instance.interceptors.response.use(
      function (response) {

        return response;
      },

      function (error : AxiosError) {
        console.log(error)
        if(error.response?.status !== 422) {
          const data : any | undefined = error.response?.data
          const message = data?.message || error.message
          toast.error(message)
        }
        return Promise.reject(error);
      }
    )
  }
}


const http = new Http().instance

export default http