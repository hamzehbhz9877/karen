import axios, {AxiosRequestConfig} from "axios";
import {toast} from "react-toastify";

type fetch = {
    url: string,
    options?: AxiosRequestConfig<any>
    auth?: boolean
    onError?: (e: any) => void
    onSuccess?: (data: any) => void
}

const fetchData = async ({url, options, auth = true, onError, onSuccess}: fetch) => {

    let authorization = {}
    if (auth)
        authorization = {
            headers: {
                Authorization: 'Basic ' + `${process.env.NEXT_PUBLIC_JWT}`
            }
        }
    try {
        const res = await axios(url, {...authorization, ...options})
        if (onSuccess)
            onSuccess(res)
        return res
    } catch (e) {
        toast('خطای سرور',
            {hideProgressBar: true, rtl: true, autoClose: 2000, type: 'error'})
        if (onError)
            onError(e)
    }
}
export {fetchData}