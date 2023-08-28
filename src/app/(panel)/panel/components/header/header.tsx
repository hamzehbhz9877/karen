'use client'

import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLayerGroup, faReceipt, faShoppingCart, faWallet} from "@fortawesome/free-solid-svg-icons";
import styles from "app/(panel)/panel/components/header/header.module.scss"
import {Button} from "stories/button/Button";
import {Tab} from "stories/tab/Tab";
import Sell from "app/(panel)/panel/investment/components/modal/sell/sell";
import Buy from "app/(panel)/panel/investment/components/modal/buy/buy";
import {usePathname} from "next/navigation";
import UseModalContext from "context/Modal/useModalContext";

export const tabs = [
    {
        path: '/panel/investment',
        label: 'نمای کلی',
        icon: <FontAwesomeIcon icon={faLayerGroup}/>,
    },
    {
        path: '/panel/investment/inventory',
        label: 'دارایی ها',
        icon: <FontAwesomeIcon icon={faWallet}/>
    },
    {
        path: '/panel/investment/buy-history',
        label: 'سوابق خرید',
        icon: <FontAwesomeIcon icon={faReceipt}/>
    },
    {
        path: '/panel/investment/sell-history',
        label: 'سوابق فروش',
        icon: <FontAwesomeIcon icon={faReceipt}/>
    }
]

const Header = () => {


    const {closeModal,openModal}=UseModalContext()
    const pathname = usePathname()

    return (
        <div className={styles.investmentWidget}>
            <div className={styles.investmentWidgetContent}>
                <h5 className="text-xl font-bold dark:text-white">سبد دارایی</h5>
            </div>
            <div className={styles.investmentWidgetTabs}>
                <div className={styles.investmentWidgetTabsNav}>
                    <Tab tabs={tabs}/>

                </div>
                {pathname === "/panel/investment" && <div className={styles.investmentWidgetTabsButton}>
                    <Button onClick={() =>openModal(<Buy closeModal={closeModal}/>,{title:'سفارش خرید',className:'buy'})} className={[styles.buyBtn,'button--success'].join(' ')} size={'small'} label={'خرید'}
                            icon={<FontAwesomeIcon icon={faShoppingCart}/>}/>
                    <Button onClick={() =>openModal(<Sell closeModal={closeModal}/>,{title:'سفارش فروش',className:'sell'})} className={[styles.sellBtn,'button--danger'].join(' ')} size={'small'} label={'فروش'}
                            icon={<FontAwesomeIcon icon={faShoppingCart}/>}/>
                </div>}
            </div>
        </div>
    );
};

export default Header;