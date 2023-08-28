import React from 'react';
import './Table.scss';
import NoInformation from "stories/table/noinfo";
import {Loading} from "stories/utilities/loading/Loading";

type  TableProps ={
    heading: Array<{ th: string, class?: string }>,
    className?: string;
    size?: 'small' | 'medium' | 'large';
    title: string
    icon: React.ReactElement
    onClick?: () => void;
    loading: boolean
    data?:any
} & any

export const Table = ({
                          size = 'medium',
                          heading, icon, loading,
                          data,
                          title,
                          className,
                          ...props
                      }: TableProps) => {


    return (

        <div className="widget">
            <div className="widget-wrapper">
                <div className="widget__header">
                    <h3>{title}</h3>
                    <div>
                        {icon}
                    </div>
                </div>
                <div className="overflow">
                    <div className="widget__bottom">

                        {loading ? <Loading/> : data?.length === 0 ? <NoInformation icon={icon}/> :
                            <table className="table" {...props}>
                                <thead>
                                <tr>{heading?.map((data:{th:string,class?:string}, index:number) => <th key={index}
                                                                       className={data.class?data.class:''}>{data.th}</th>)}</tr>
                                </thead>
                                <tbody>
                                {props?.children}
                                </tbody>
                            </table>
                        }
                    </div>
                </div>

            </div>
        </div>

    );
};
