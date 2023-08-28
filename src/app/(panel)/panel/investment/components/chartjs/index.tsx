'use client'

import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {ChartOption} from "app/(panel)/panel/investment/components/chartjs/options";
import {profitLoosStore} from "store/investment/investment";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);
import { defaults } from 'chart.js';
import styles from "./chart.module.scss"
import {faBarChart} from "@fortawesome/free-regular-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import NoInformation from "stories/table/noinfo";
import {Loading} from "stories/utilities/loading/Loading";


defaults.font.family = 'IranYekan';

const legendMargin={
    id:'legendMargin',
    beforeInit(chart:any,legend:any,options:any){
        const fitValue=chart.legend.fit
        chart.legend.fit=function fit(){
            fitValue.bind(chart.legend)();
            return this.height+=10
        }
    }
}

const Index = () => {

    const getProfitLoos = profitLoosStore()

    const {options,data}=ChartOption(getProfitLoos.profitLooseData||[])

    return (
            <div className={styles.chart}>
                    {getProfitLoos.isLoading?<Loading/>: getProfitLoos?.profitLooseData?.length=== 0 ?
                        <NoInformation icon={<FontAwesomeIcon icon={faBarChart}/>}/>:
                        <Bar options={options} data={data} plugins={[legendMargin]} />}
            </div>
    );
};

export default Index;
