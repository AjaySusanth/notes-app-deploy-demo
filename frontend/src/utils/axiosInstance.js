import axios from "axios"
import {BASE_URL} from'./constants'

const axiosInstance = axios.create({ 
    //This line creates a new Axios instance. Axios instances allow you to create separate configurations for different use cases.
    
    baseURL:BASE_URL,

    //This property sets a timeout of 1000 milliseconds (1 second) for requests made using this Axios instance. If a request takes longer than 1 second, it will be aborted.
    headers:{
        "Content-Type":"application/json",
    }
})

axiosInstance.interceptors.request.use(

    //This line sets up an interceptor for requests made using the axiosInstance. Interceptors are functions that Axios runs before a request is sent or after a response is received. The request.use method takes two arguments: the first is a function that will run before the request is sent, and the second is a function that will run if there is an error.


    (config)=>{ 
        //This is the first argument to the use method. It's a function that takes a single parameter, config, which is the Axios request configuration object.

        const accessToken = localStorage.getItem("token")
        // This line retrieves a token from the browser's local storage. It assumes the token is stored under the key "token".

        if (accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error)

        //If an error occurs, this line returns a rejected promise with the error. This ensures that the error is propagated to the code that made the request.
    }
    
)


export default axiosInstance;
