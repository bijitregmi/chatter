import useAxiosInterceptor from "../helpers/useAxiosInterceptor";
import { BASE_URL } from "../config";

import React from 'react'

const useCrud = (initialData, apiURL) => {

    const [dataCrud, setDataCrud] = React.useState(initialData)
    const [error, setError] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const jwtAxios = useAxiosInterceptor()

    const fetchData = async() => {
        setIsLoading(true)
        try {
            const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {})
            const data = response.data
            setDataCrud(data)
            setError(null)
            setIsLoading(false)
            return data
        }
        catch(error){
            if (error.response && error.response.status === 400) {
                setError(new Error("400"))
            }
            setIsLoading(false)
            throw error;
        }
    }

    return { fetchData , dataCrud, error, isLoading }
}

export default useCrud