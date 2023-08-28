import {create} from "zustand";
import {fetchData} from "server/fetchData";
import {AxiosRequestConfig} from "axios";
import {
    getBuy,
    getBuyHistory,
    getInventory, getInventoryPrice,
    getPortFolio,
    getSellHistory,
    getTradeDetails,
    getWatchlistMarketIds, postSell
} from "server/api";
import {toast} from "react-toastify";

type tradeDetailsType={
    tradeDetailsFetch: () => void
    tradeData: {
        total_irr_trades: number,
        total_usd_trades: number,
        total_trades: number,
        totals_portfolio: number
    }
    isLoading:boolean
}
const tradeData={totals_portfolio:0,total_irr_trades:0,total_trades:0,total_usd_trades:0}

export const tradeDetailsStore = create<tradeDetailsType>((set, get) => ({
    isLoading:false,
    tradeData,
    tradeDetailsFetch: async () => {
        set({isLoading: true})
        const res:any = await fetchData({url:getTradeDetails})

        set({tradeData:res.data.status===false?tradeData: res.data.response,isLoading: false})
    },
}))


export const profitLoosStore = create<any>((set:any, get:any) => ({
    profitLooseData:null,
    isLoading:false,
    profitLooseDetails: async () => {
        const ids:any = []
        set({isLoading: true})
        const res:any = await fetchData({url:getPortFolio})

        res.data.response.portfolio.map((item:any) => {
            ids.push(item.asset)
        })
        set({profitData: res.data.response.portfolio})
        if(ids.length===0) set({profitLooseData: [],isLoading:false})
        else await get().idMarkets(getWatchlistMarketIds(ids))
    },
    idMarkets: async (url:string) => {
        const res:any = await fetchData({url})
        const profitData = await get().profitData
        const resData = res.data.response.detail.map((item:any) => {
            for (let i = 0; i < profitData.length; i++) {
                if (item.item_id === +profitData[i].asset) {
                    return ({
                        ...item,
                        amount: profitData[i].amount,
                        latest_trade_price: profitData[i].latest_trade_price,
                        created_at:profitData[i].created_at
                    })
                }
            }
        })
        set({profitLooseData: resData,isLoading: false})
    },
}))


export type HistoryInvestment={
    amount: string
    asset: string
    created_at: any
    id: number
    label:string
    price: string
    total: string
    trade_amount: string
    type: string

}

type buyHistoryType={
    isLoading:boolean
    buyHistoryFetch:(options?:AxiosRequestConfig<any>) => void
    buyData?:HistoryInvestment[]
}

export const buyHistoryStore = create<buyHistoryType>((set, get) => ({
    isLoading:false,
    buyHistoryFetch: async (options) => {
        set({isLoading: true})
        const res:any = await fetchData({url:getBuyHistory,options})
        set({buyData: res.data.response.history.data,isLoading:false})
    },
}))



type addBuyType={
    addBuyFetch:(options?:AxiosRequestConfig<any>) => void
    isLoading:boolean
}

export const addBuyStore = create<addBuyType>((set, get) => ({
    isLoading:false,
    addBuyFetch: async (options) => {
        set({isLoading: true})
        await fetchData({url:getBuy,options,onSuccess:()=>{
                toast('عملیات با موفقیت انجام شد',
                    { hideProgressBar: true,rtl:true, autoClose: 2000, type: 'success' })
            }})

        set({isLoading: false})
    },
}))


type sellHistoryType={
    isLoading:boolean
    sellHistoryFetch:(options?:AxiosRequestConfig<any>) => void
    sellData?:HistoryInvestment[]
}

export const sellHistoryStore = create<sellHistoryType>((set, get) => ({
    isLoading:false,
    sellHistoryFetch: async (options) => {
        set({isLoading: true})
        const res:any = await fetchData({url:getSellHistory,options})
        set({sellData: res.data.response.history.data,isLoading:false})
    },
}))

type getInventoryProps={
    inventoryData:[]
    isLoading:boolean
    inventoryFetch:()=>void
}

export const getInventoryStore = create<getInventoryProps>((set, get) => ({
    inventoryData:[],
    isLoading:false,
    inventoryFetch: async () => {
        let id = null
        set({isLoading: true})
        const res:any = await fetchData({url:getInventory})
        const result=res.data.response.inventory.map(({label,asset,amount}:any)=>
            ({label,value:+asset,amount:+amount}))
        set({inventoryData: result,isLoading:false})
    },
}))


type getInventoryPriceProps={
    inventoryPriceData:any
    isLoading:boolean
    inventoryPriceFetch:(id:number)=>void
    clearInventoryPrice:()=>void
}

const data={price: {title: '-', p: 0,amount:0}, type: '-'}
export const getInventoryPriceStore = create<getInventoryPriceProps>((set:any, get) => ({
    inventoryPriceData:data,
    isLoading:false,
    inventoryPriceFetch: async (id:number) => {
        set({isLoading: true})
        const res:any = await fetchData({url:getInventoryPrice(id)})
        set({inventoryPriceData: res.data.response,isLoading:false})
    },
    clearInventoryPrice:()=>set({inventoryPriceData:data})
}))

type sellInvestmentType={
    isLoading:boolean
    sellInvestmentFetch:(options?:AxiosRequestConfig<any>) => void
}

export const sellInvestmentStore = create<sellInvestmentType>((set, get) => ({
    isLoading:false,
    sellInvestmentFetch: async (options) => {
        set({isLoading: true})
         await fetchData({url:postSell,options,onSuccess:()=>{
                toast('عملیات با موفقیت انجام شد',
                    { hideProgressBar: true,rtl:true, autoClose: 2000, type: 'success' })
            }})
        set({isLoading: false})
    },
}))

