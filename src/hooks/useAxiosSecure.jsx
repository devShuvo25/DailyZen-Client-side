import axios from "axios"
import { useEffect } from "react"

const instance = axios.create({
    baseURL: 'https://my-application-flame.vercel.app'
})

const useAxiosSecure = () => {
    useEffect(() => {
        const request = instance.interceptors.request.use(
            (config) => {
            config.headers.Authorization = ''
            return config;
        }, 
        (err) => {
            return Promise.reject(err)
        })
        const response = instance.interceptors.response.use((response) => {
            return response;
        },
    (error) => {
        if(error.response && error.response.status === '403'){
            console.warn('Unauthorized acces');
        }
        return Promise.reject(error)
    })
    return () => {
        instance.interceptors.request.eject(request)
        instance.interceptors.response.eject(response)
    }

    },[])
    return {instance};
}

export default useAxiosSecure;