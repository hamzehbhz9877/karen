import React from 'react';
import {ModalBody} from "stories/modal/Modal";
import Columns from "app/(panel)/panel/components/modal/columns";
import {getMarketFinder, getMarketPlace} from "server/api";
import {indexSelectionsStore} from "store/investment/indexSelection";


const data = [
    {id: 28064, label: "بازار طلا", type: "folder"},
    {id: 28066, label: "بازار سکه", type: "folder"},
    {id: 28069, label: "بازار ارز", type: "folder"},
    {id: "exchanges", label: "صرافی‌ها", type: "folder"},
    {id: "stocks-fund", label: "صندوق ها", type: "folder"},
    {id: "stocks-future", label: "بازار آتی", type: "folder"},
    {id: 28426, label: "بازار ارزهای دیجیتال", type: "folder"},
    {id: 28048, label: "بازار فلزات گرانبها", type: "folder"},
    {id: 28047, label: "بازار فلزات پایه", type: "folder"},
    {id: 28049, label: "بازار نفت و انرژی", type: "folder"},
    {id: 28042, label: "بازارهای کالایی", type: "folder"},
    {id: 28043, label: "شاخص بورس", type: "folder"},
    {id: 29907, label: "بازارهای سهام", type: "folder"},
    {id: "currencies", label: "بازارهای ارزی", type: "folder"},
    {id: 6860, label: "بازار اوراق قرضه", type: "folder"},
    {id: "economics-countries", label: "اقتصاد کشورها", type: "folder"},
    {id: "economics-indicators", label: "شاخص‌های اقتصادی", type: "folder"}
]

const IndexSelection = () => {

    const {
        secondColumn,
        thirdColumn,
        forthColumn,
        getSecondId,
        getForthId,
        getThirdId,
        getUrl,
        isLoading2,
        isLoading3,
        isLoading4
    } = indexSelectionsStore()

    return (
        <div>
            <ModalBody>
                <div className={"grid grid-cols-4"}>
                    <Columns getId={(id) => getSecondId(getMarketFinder(id))} data={data}/>

                    {isLoading2 ? <>...</> : secondColumn ? <Columns
                        getUrl={(url) => getUrl(getMarketPlace(url))}
                        getId={(id) => getThirdId(getMarketFinder(id))}
                        data={secondColumn}/> : ''}

                    {isLoading3 ? <>...</> : thirdColumn ?
                        <Columns getId={(id) => getForthId(getMarketFinder(id))}
                                 getUrl={(url) => getUrl(getMarketPlace(url))}
                                 data={thirdColumn}/> :
                        thirdColumn === null ?
                            <span className="empty-index-selection">شاخصی در این بخش وجود ندارد</span> : ''

                    }

                    {isLoading4 ? <>...</> : forthColumn ?
                        <Columns getUrl={(url) => getUrl(getMarketPlace(url))} data={forthColumn}/> :
                        forthColumn === null ?
                            <span className="empty-index-selection">شاخصی در این بخش وجود ندارد</span> : ''
                    }
                </div>
            </ModalBody>
        </div>
    );
};

export default IndexSelection;