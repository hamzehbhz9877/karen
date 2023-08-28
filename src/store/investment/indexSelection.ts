import {create} from "zustand";
import {fetchData} from "server/fetchData";

type indexSelection = {
    secondColumn: []
    thirdColumn: []
    forthColumn: []

    getSecondId: (url: string) => void
    getThirdId: (url: string) => void
    getForthId: (url: string) => void
    getUrl: (url: string) => void

    urlData: { price: { title: string, p: number,grade?:string }, type?: string }

    isLoading2: boolean
    isLoading3: boolean
    isLoading4: boolean
    isFileLoading:boolean

    clearData:()=>void
}

const data={price: {title: '-', p: 0}, type: '-'}

export const indexSelectionsStore = create<indexSelection>((set, get) => ({
    secondColumn: [],
    thirdColumn: [],
    forthColumn: [],
    isLoading2: false,
    isLoading3: false,
    isLoading4: false,
    isFileLoading:false,
    urlData: data,
    getSecondId: async (url) => {
        await set({
            secondColumn: [],
            thirdColumn: [],
            forthColumn: []
        })
        set({isLoading2: true,})
        const res:any = await fetchData({url, auth: false})
        const data = res.data.response.items
        set({
            secondColumn: data.length === 0 ? null : data, isLoading2: false
        })
    },
    getThirdId: async (url) => {
        await set({
            thirdColumn: [],
            forthColumn: []
        })
        set({isLoading3: true,})
        const res:any = await fetchData({url, auth: false})
        const data = res.data.response.items
        set({thirdColumn: data.length === 0 ? null : data, isLoading3: false})
    },
    getForthId: async (url) => {
        await set({
            forthColumn: []
        })
        set({isLoading4: true,})
        const res:any = await fetchData({url, auth: false})
        const data = res.data.response.items
        set({forthColumn: data.length === 0 ? null : data, isLoading4: false})
    },
    getUrl: async (url) => {
        set({isFileLoading: true})
        const res:any = await fetchData({url,onError:()=> set({isFileLoading: false})})
         set({isFileLoading: false})
        set({urlData: res.data.response})
        await set({
            secondColumn: [],
            thirdColumn: [],
            forthColumn: [],
            isFileLoading:false
        })
    },
    clearData:()=>set({urlData:data})
}))