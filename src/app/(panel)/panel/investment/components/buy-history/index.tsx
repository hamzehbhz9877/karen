'use client'

import React, {useEffect} from 'react';
import {Table} from "stories/table/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {buyHistoryStore, HistoryInvestment} from "store/investment/investment";
import {toCommas} from "utils/index";
import JalaliMomentMiladyToPersian from "lib/jalali-moment/jalalimoment";
import {getBuyHistory} from "server/api";
import {Loading} from "stories/utilities/loading/Loading";
import {heading2} from "server/fake/index";

const BuyHistory = () => {


    const buy=buyHistoryStore()

    useEffect(() => {
        buy.buyHistoryFetch({method:'post'})
    }, [])

    return (
        <Table title="سوابق خرید"
               data={buy.buyData}
               loading={buy.isLoading}
               heading={[...heading2, {th: 'زمان خرید'}]} icon={<FontAwesomeIcon icon={faShoppingCart}/>}>
            {buy.buyData?.map(({id,amount,label,price,total,created_at}) =>
                <tr key={id}>
                    <td>{label}</td>
                    <td>{amount}</td>
                    <td>{toCommas(+price)}</td>
                    <td>{toCommas(+total)}</td>
                    <td>{JalaliMomentMiladyToPersian({data:created_at})}</td>
                </tr>
            )}
        </Table>
    );
};

export default BuyHistory;