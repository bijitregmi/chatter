import useAxiosInterceptor from "../helpers/useAxiosInterceptor";
import { BASE_URL } from "../config";

import React from 'react'

const useCrud = (initialData, apiURL) => {

    const jwtAxios = useAxiosInterceptor()
    const [dataCrud, setDataCrud] = React.useState(initialData)
    const [error, setError] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    

    const fetchData = async () => {
        setIsLoading(true)
        try {
            const response = await jwtAxios.get(`${BASE_URL}${apiURL}`, {})
            const data = response.data
            setDataCrud(data)
            setError()
            setIsLoading(false)
            return data
        }
        catch(e){
            if (e.response && e.response.status >= 400) {
                setError(new Error("400"))
            }
            setIsLoading(false);
            return error;
        }
    }

    return { fetchData , dataCrud, error, isLoading }
}

export default useCrud