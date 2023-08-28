import React, {useEffect, useState} from 'react';
import {Button} from "stories/button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {ModalBody, ModalFooter} from "stories/modal/Modal";
import styles from 'app/(panel)/panel/investment/components/modal/buy/buy.module.scss'
import {InputNumber} from "stories/input/Number";
import {isEmpty, toCommas} from "utils/index";
import {Alert} from "stories/alert/Alert"
import {
    buyHistoryStore,
    getInventoryPriceStore,
    getInventoryStore,
    profitLoosStore,
    sellHistoryStore,
    sellInvestmentStore,
    tradeDetailsStore
} from "store/investment/investment";
import Select from "react-select";
import {Loading} from "stories/utilities/loading/Loading";


const customStyles = {
    option: (defaultStyles:any, state:any) => ({
        ...defaultStyles,
        fontSize: "14px"
    }),

    control: (defaultStyles:any) => ({
        ...defaultStyles,
        fontSize: "14px"
    }),
    singleValue: (defaultStyles:any) => ({...defaultStyles, color: "#000000"}),
};

type Props = {
    closeModal: () => void
}

const Buy = ({closeModal}: Props) => {

    const [error, setError] = useState<any>([])
    const [selected, setSelected] = useState<any>(null);
    const [number, setNumber] = useState(0)

    const {inventoryFetch, inventoryData, isLoading: getInventoryLoading} = getInventoryStore()
    const {sellInvestmentFetch, isLoading: sellInvestmentLoading} = sellInvestmentStore()
    const {inventoryPriceFetch, inventoryPriceData, isLoading, clearInventoryPrice} = getInventoryPriceStore()

    const {tradeDetailsFetch} = tradeDetailsStore()
    const {profitLooseDetails} = profitLoosStore()
    const {buyHistoryFetch} = buyHistoryStore()
    const {sellHistoryFetch} = sellHistoryStore()

    const handleSubmit = async () => {
        let errors = []
        if (number === 0) {
            errors.push('تعداد را وارد کنید')
        }
        if (isEmpty(selected)) {
            errors.push('دارایی خود را انتخاب کنید')
        }
        if (number > selected?.amount) {
            errors.push('تعداد انتخاب شده از حد دارایی شما بیشتر است')
        }

        setError(errors)

        if (errors.length === 0) {
            var bodyFormData = new FormData();
            bodyFormData.append('count',String (number))
            bodyFormData.append('asset', String(selected.value))
            await sellInvestmentFetch({
                method: 'post',
                data: bodyFormData
            })
            closeModal()
            await tradeDetailsFetch()
            await profitLooseDetails()
            await buyHistoryFetch({method: 'post'})
            await sellHistoryFetch({method: 'post'})
        }
    }


    const handleChange = (selectedOption:any) => {
        setSelected(selectedOption);
        inventoryPriceFetch(selectedOption.value)
    };


    useEffect(() => {
        if (inventoryPriceData.type !== '-') {
            setNumber(selected?.amount)
            setNumber(selected?.amount)
        }
    }, [inventoryPriceData])


    useEffect(() => {
        inventoryFetch()

        return () => {
            clearInventoryPrice()
        }
    }, [])

    return (
        <>
            <ModalBody>
                {error.length > 0 &&
                <Alert className="text-[12px]" title='خطا های زیر را رفع کنید :' type="danger">
                    <ul>
                        {error.map((error:Array<string>) => <li>{error}</li>)}
                    </ul>
                </Alert>
                }
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-5  gap-x-3 gap-y-3;'>
                    <div className='col-end-auto col-start-auto md:col-start-1 md:col-end-4'>
                        <ul className={styles.buyList}>
                            <li> قیمت فعلی هر واحد : <strong>{toCommas(inventoryPriceData?.price.p)}</strong></li>
                            <li> واحد ارزش : <strong>{inventoryPriceData?.type}</strong></li>
                            <li> جمع ارزش فروش : <strong>{toCommas(inventoryPriceData?.price.p * number)}</strong></li>
                            <li> تعداد دارایی : <strong>{number}</strong></li>
                        </ul>
                    </div>
                    <div className="col-end-auto col-start-auto md:col-start-4 md:col-end-6">
                        <Select
                            noOptionsMessage={() => "دارایی یافت نشد"}
                            placeholder={'انتخاب ...'}
                            styles={customStyles}
                            isRtl
                            onChange={handleChange}
                            options={inventoryData}/>
                    </div>
                </div>
                <InputNumber className="mt-[30px]" title={'تعداد'} initValue={number}
                             currentValue={(value) => setNumber(value)}
                />
            </ModalBody>
            <ModalFooter align={"center"}>

                {sellInvestmentLoading ? <Loading/> :
                    <Button className="button--danger"
                            onClick={handleSubmit}
                            label={'ثبت سفارش فروش'}
                            icon={<FontAwesomeIcon icon={faShoppingCart}/>}/>
                }


            </ModalFooter>
            {
                (isLoading || getInventoryLoading) &&
                <div className="loading-overlay">
                    <Loading/>
                </div>
            }

        </>
    );
};

export default Buy;