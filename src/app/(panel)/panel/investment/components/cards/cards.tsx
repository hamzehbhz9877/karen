'use client'

import React, {useEffect} from 'react';
import {Card} from "stories/card/Card";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartLine, faFileAlt, faFileMedicalAlt, faUsd} from "@fortawesome/free-solid-svg-icons";
import {tradeDetailsStore} from "store/investment/investment"
import {profitLooseHandler, profitLooseIconHandler, toCommas} from "utils/index";


//styles
import styles from "app/(panel)/panel/investment/components/cards/cards.module.scss"


const Cards = () => {

    const state = tradeDetailsStore()


    useEffect(()=>{
        state.tradeDetailsFetch()
    },[])

    return (
        <div>
            <div className={styles.cardWrapper}>
                <Card
                    borderBottomColor={'#df7471'}
                    title='دارایی کل' label={state.tradeData?toCommas(state.tradeData?.total_irr_trades) + ' ' + 'ریال':'...'}
                    icon={<FontAwesomeIcon icon={faFileAlt}/>}/>
                <Card
                    borderBottomColor={'#f4c450'}
                    title='سود / زیان در 24 ساعت گذشته'
                    className={profitLooseHandler(+state.tradeData?.totals_portfolio)}
                    label={(profitLooseIconHandler(+state.tradeData?.totals_portfolio) + ' ' + (toCommas(Math.abs(state.tradeData?.totals_portfolio as number))))+ ' ' + 'ریال'}
                    icon={<FontAwesomeIcon icon={faChartLine}/>}/>
                <Card
                    borderBottomColor={'#59ac81'}
                    title='مقادیر ریالی واریزی' label={toCommas(state.tradeData?.total_irr_trades)+ ' ' + 'ریال' }
                    icon={<FontAwesomeIcon icon={faFileMedicalAlt}/>}/>
                <Card
                    borderBottomColor={'#5a9ce1'}
                    title='مقادیر ارزی واریزی' label={toCommas(+state.tradeData?.total_usd_trades.toFixed(3))+ ' ' + 'دلار' }
                    icon={<FontAwesomeIcon icon={faUsd}/>}/>
            </div>
        </div>
    );
};

export default Cards;