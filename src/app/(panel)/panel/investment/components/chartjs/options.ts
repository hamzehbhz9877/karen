import JalaliMomentMiladyToPersian from "lib/jalali-moment/jalalimoment";
import {randomRGB, toCommas} from "utils/index";
import {Bar} from "react-chartjs-2";

export const ChartOption = (datum:any) => {


    const options = {
        responsive: true,
        responsiveAnimationDuration: 0.5,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                title:{
                    display: true,
                    text:'تاریخ'
                }

            },
            y: {
                title:{
                    display: true,
                    text:'قیمت'
                },
                stacked: true,
                ticks:{
                    callback:(value:any)=>{
                        return toCommas(value)+' '+"﷼"
                    }
                }
            },
        },
        plugins: {
            title: {
                display: true,
                text: 'نمودار دارایی ها',
                titleColor: 'rgb(219,219,219)',
                font: {
                    size: 14,
                },
            },
            tooltip: {
                titleFont: {
                    size: 14,
                },
                bodyFont: {
                    size: 13,
                },
                callbacks: {
                    label: function(context:any) {
                        let label = context.dataset.label || '';

                        if (label) {
                            label += ': ';
                        }
                        if (context.parsed.y !== null) {
                            label+=toCommas(context.parsed.y)+' '+"﷼"
                        }
                        return label;
                    }
                },
            },
            animation: {
                duration: 1000,
            },
            legend: {
                position: 'top' as const,
            },
        },
    };

    const datasets = datum?.map((data:any) => ({
        label: data.title,
        data: [{y:data.p*data.amount,x:JalaliMomentMiladyToPersian({data: data.created_at,format:'jYYYY/jMM/jDD'})}],
        backgroundColor: randomRGB()
    }))
    const data = {
        datasets
    };

    return {data, options};
}


