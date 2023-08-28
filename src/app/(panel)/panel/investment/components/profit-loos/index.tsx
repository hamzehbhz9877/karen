'use client'

import React, {useEffect} from 'react';
import {Table} from "stories/table/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine} from "@fortawesome/free-solid-svg-icons";
import {profitLoosStore} from "store/investment/investment"
import {toCommas} from "utils"
import {profitLooseHandler, profitLooseIconHandler} from "utils/index";
import JalaliMomentMiladyToPersian from "lib/jalali-moment/jalalimoment";
import {Loading} from "stories/utilities/loading/Loading";
import {heading} from "server/fake/index";

const ProfitLoos = () => {

    const fetchData = profitLoosStore()


    useEffect(() => {
        fetchData.profitLooseDetails()
    }, [])


    return (
        <Table title="سود | زیان" heading={heading} icon={<FontAwesomeIcon icon={faChartLine}/>}
        data={fetchData.profitLooseData} loading={fetchData.isLoading}
        >
            {fetchData.profitLooseData?.map(({item_id, title, amount, latest_trade_price, p, created_at}:any) =>
                <tr key={item_id}>
                    <td>{title}</td>
                    <td>{amount}</td>
                    <td>{toCommas(latest_trade_price)}</td>
                    <td>{toCommas(p)}</td>
                    <td>{toCommas(amount * latest_trade_price)}</td>
                    <td>{toCommas(p * amount)}</td>
                    <td className={profitLooseHandler((p-latest_trade_price)*amount)}>{(toCommas(Math.abs((latest_trade_price-p)*amount))+' '+profitLooseIconHandler((p-latest_trade_price)*amount))}</td>
                    <td>{JalaliMomentMiladyToPersian({data:created_at})}</td>
                </tr>
            )}
        </Table>
    );
};

export default ProfitLoos;