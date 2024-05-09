import axios, { AxiosError, AxiosInstance } from "axios";
import { toast } from "react-toastify";
import { clearLS, getAccessTokenFromLS, getRoleFromLS, setAccessTokenToLS, setProfileToLS, setRoleToLS } from "./auth";

class Http {
  instance: AxiosInstance
  private accessToken: string;
  private role: string;
  constructor() {
    this.accessToken = getAccessTokenFromLS()  // get token from local storage using Ram instead of Disk be cause in class
    this.role = getRoleFromLS()
    this.instance = axios.create({
      baseURL: 'http://localhost:8000', // need a api url
      timeout: 10000,
      headers: {
        'Content-Type' : 'application/json',
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        
      if(this.accessToken && config.headers) {
        config.headers.Authorization = this.accessToken
        config.headers.Role = this.role
        return config
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    })

    this.instance.interceptors.response.use(
       (response) => {

        console.log(response);
        
        const {url} = response.config
        if(url === '/auth/login' || url === '/auth/register') {
          try {
            this.accessToken = response.data.accessToken
            this.role = response.data.role
            setAccessTokenToLS(this.accessToken)
            setProfileToLS(response.data.id)    
            setRoleToLS(this.role)  
          } catch (error) {
            console.log(error)
          }      
        }
        else if (url === '/auth/logout') {
          this.accessToken = ''
          clearLS()
        }
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