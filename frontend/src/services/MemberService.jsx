import React from 'react'
import useAxiosInterceptor from '../helpers/useAxiosInterceptor'
import { BASE_URL } from '../config' 

const useMembership = () => {
    const jwtAxios = useAxiosInterceptor()
    const [ isMember, setIsMember ] = React.useState(false)
    const userId = localStorage.getItem("user_id")

    const joinServer = async(serverId) => {
        try {
            const res = await jwtAxios.post(`${BASE_URL}/member/${serverId}/`, {}, {withCredentials:true})
            setIsMember(true)
        }
        catch(e) {
            throw e
        }
    }

    const leaveServer = async(serverId) => {
        try {
            const res = await jwtAxios.delete(`${BASE_URL}/member/${serverId}/${userId}/`, {withCredentials:true})
            setIsMember(false)
        }
        catch (e) {
            throw e
        }
    }

    const memberCheck = async(serverId) => {
        try {
            const res = await jwtAxios.get(`${BASE_URL}/member/${serverId}/is_member/`, {withCredentials:true})
            setIsMember(res.data.is_member)
        }
        catch (e) {
            throw e
        }
    }

    return { joinServer, leaveServer, isMember, memberCheck} 
}

export default useMembership