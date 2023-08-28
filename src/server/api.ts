
//investment api
export const getSellHistory='https://dashboard-api.tgju.org/v1/investment/history/sell'
export const getBuyHistory='https://dashboard-api.tgju.org/v1/investment/history/buy'
export const getBuy='https://dashboard-api.tgju.org/v1/investment/buy'
export const getTradeDetails='https://dashboard-api.tgju.org/v1/investment/trade-details'
export const getPortFolio='https://dashboard-api.tgju.org/v1/investment/portfolio/'
export const getMarketPlace=(url:any)=>`https://dashboard-api.tgju.org/v1/investment/market-price/${url}`

//market api
export const getMarketFinder=(id:any)=>`https://api.tgju.org/v1/market/finder/list?type=dashboard&market=false&id=${id}&lang=fa`


//watchlist api
export const getWatchlistMarketIds=(ids:any)=>`https://dashboard-api.tgju.org/v1/watchlist/market?market_ids=${ids}`


//inventory
export const getInventory='https://dashboard-api.tgju.org/v1/investment/my-inventory/'
export const getInventoryPrice=(id:any)=>`https://dashboard-api.tgju.org/v1/investment/market-price/${id}`

export const postSell='https://dashboard-api.tgju.org/v1/investment/sell'
