'use client'

import React from 'react';
import {Table} from "stories/table/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWallet} from "@fortawesome/free-solid-svg-icons";
import {toCommas} from "utils/index";
import {profitLoosStore} from "store/investment/investment";
import {heading2} from "server/fake/index";

const Inventory = () => {

    const fetchData = profitLoosStore()

    return (
        <Table
            data={fetchData.profitLooseData}
            loading={fetchData.isLoading}
            title="دارایی ها" heading={heading2} icon={<FontAwesomeIcon icon={faWallet}/>}>
            {fetchData.profitLooseData?.map(({item_id, title, amount, latest_trade_price, p}:any) =>
                <tr key={item_id}>
                    <td>{title}</td>
                    <td>{amount}</td>
                    <td>{toCommas(p)}</td>
                    <td>{toCommas(amount * latest_trade_price)}</td>
                </tr>
            )}
        </Table>
    );
};

export default Inventory;