import React from 'react';
import './Loading.scss';

interface LoadingProps {
    className?:string;
}


export const Loading = ({
                           className,
                           ...props
                       }: LoadingProps) => {
    return (
        <div className="text-center p-2 min-w-[100px]">
            <div className={['loading',className].join(' ') }{...props} />
        </div>

    );
};
