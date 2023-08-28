import React, {useEffect, useState} from 'react';
import {Button} from "stories/button/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import UseModal from "hooks/useModal/index";
import {Modal, ModalBody, ModalFooter} from "stories/modal/Modal";
import styles from 'app/(panel)/panel/investment/components/modal/buy/buy.module.scss'
import {InputNumber} from "stories/input/Number";
import IndexSelection from "app/(panel)/panel/components/modal/indexSelection";
import {toCommas} from "utils/index";
import {Alert} from "stories/alert/Alert"
import {indexSelectionsStore} from "store/investment/indexSelection";
import {Loading} from "stories/utilities/loading/Loading";
import {addBuyStore, buyHistoryStore, profitLoosStore, sellHistoryStore, tradeDetailsStore} from "store/investment/investment";
import {getBuy} from "server/api";


type Props = {
    closeModal: () => void
}
const Buy = ({closeModal}: Props) => {
    const {isModalOpen, handleClose, handleOpen, modalData, options} = UseModal();

    const [error, setError] = useState([]) as any


    const [number, setNumber] = useState(0)

    const {urlData,isFileLoading,clearData} = indexSelectionsStore()
    const {addBuyFetch,isLoading} = addBuyStore()

    const {tradeDetailsFetch} = tradeDetailsStore()
    const {profitLooseDetails} = profitLoosStore()
    const {buyHistoryFetch} = buyHistoryStore()
    const {sellHistoryFetch} = sellHistoryStore()

    const handleSubmit = async () => {
        let errors = []
        if (number === 0) {
            errors.push('تعداد را وارد کنید')
        }
        if (urlData.type === '-') {
            errors.push('شاخص مورد نظر را انتخاب نمایید')
        }

        setError(errors)

        if (errors.length === 0) {
            var bodyFormData = new FormData();
            bodyFormData.append('count', String(number))
            bodyFormData.append('asset', String(urlData.price?.grade))
           await addBuyFetch({
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

    useEffect(() => {
        if (urlData.type !== '-') handleClose()
    }, [urlData])

    useEffect(()=>{
        return()=>{
            clearData()
        }
    },[])

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
                <div className='grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-x-3 gap-y-3;'>
                    <div className='col-end-auto col-start-auto md:col-start-1 md:col-end-3'>
                        <ul className={styles.buyList}>
                            <li> آیتم انتخاب شده : <strong>{urlData?.price.title}</strong></li>
                            <li> قیمت فعلی : <strong>{toCommas(urlData?.price.p)}</strong>
                            </li>
                            <li> واحد ارزش : <strong>{urlData?.type}</strong></li>
                            <li> جمع ارزش خرید
                                : <strong>{toCommas(urlData?.price.p * number)}</strong></li>
                        </ul>
                    </div>
                    <div className="text-center md:text-left md:w-[100%]">
                        <Button onClick={() => handleOpen(<IndexSelection/>)}
                                className="button--danger w-[100%]" label={'انتخاب شاخص'}
                                icon={<FontAwesomeIcon icon={faList}/>}/>
                    </div>
                </div>
                <InputNumber className="mt-[30px]" title={'تعداد'} initValue={0}
                             currentValue={(value) => setNumber(value)}
                />
            </ModalBody>
            <ModalFooter align={"center"}>

                {isLoading ? <Loading/> : <Button className="button--success"
                                                      onClick={handleSubmit}
                                                      label={'ثبت سفارش خرید'}
                                                      icon={<FontAwesomeIcon icon={faShoppingCart}/>}/>}


            </ModalFooter>


            <Modal
                isLoadingOverlay={isFileLoading}
                className="index-selection"
                options={{...options, title: "شاخص یاب"}}
                showModal={isModalOpen}
                close={handleClose}
                children={modalData}
            />
        </>
    );
};

export default Buy;