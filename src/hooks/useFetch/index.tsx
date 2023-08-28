import React, {useEffect, useState,} from 'react';
import axios, {AxiosError, AxiosRequestConfig} from "axios";

type Props = {
    url: string
    options?: AxiosRequestConfig<any>
    disable?:boolean,
}

const UseFetchData = ({options, url,disable}: Props) => {
    const [data, setData] = useState(null)
    const [error, setError] = useState<any>(null)
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async () => {
        try {
            setIsLoading(true)
            const res = await axios(url, {...options})
            setIsLoading(false)
            setData(res.data)
        }catch (e:any){
            setIsLoading(false)
            setError(e)
        }
    }

    useEffect(() => {
        if(!disable && url!==null)
        {
            fetchData()
        }
    }, [disable,url])

    return {data, error, isLoading}
};

export default UseFetchData;