import React from 'react';
import Cards from "app/(panel)/panel/investment/components/cards/cards";
import BuyHistory from "app/(panel)/panel/investment/components/buy-history/index";
import SellHistory from "app/(panel)/panel/investment/components/sell-history/index";
import ProfitLoos from "app/(panel)/panel/investment/components/profit-loos/index";
import Inventory from "app/(panel)/panel/investment/components/inventory/index";
import HighChartStock from "./components/chartjs"

//we can use suspense for streaming for parallel components
const Page = () => {
    return (
        <>
            <Cards/>
            <ProfitLoos/>
            <Inventory/>
            <HighChartStock/>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-x-4 gap-y-1">
                <BuyHistory/>
                <SellHistory/>
            </div>
        </>
    );
};

export default Page;