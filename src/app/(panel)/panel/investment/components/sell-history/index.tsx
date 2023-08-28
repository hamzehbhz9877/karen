'use client'

import React, {useEffect} from 'react';
import {Table} from "stories/table/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {sellHistoryStore} from "store/investment/investment";
import {toCommas} from "utils/index";
import JalaliMomentMiladyToPersian from "lib/jalali-moment/jalalimoment";
import {heading2} from "server/fake/index";

const SellHistory = () => {

    const sell=sellHistoryStore()


    useEffect(() => {
        sell.sellHistoryFetch({method:'post'})
    }, [])

    return (
        <Table
            data={sell.sellData}
            loading={sell.isLoading}
            title="سوابق فروش" heading={[...heading2, {th: 'زمان فروش'}]} icon={<FontAwesomeIcon icon={faShoppingCart}/>}>
            {sell.sellData?.map(({id,amount,label,price,total,created_at}) =>
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

export default SellHistory;