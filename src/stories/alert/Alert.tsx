import React from 'react';
import './Alert.scss';

type AlertProps= {
    withIcon?: React.ReactElement;
    className?:string;
    type?: 'success' | 'danger' | 'info' | 'warning';
    title: string;
    onClick?: () => void;
} & any


export const Alert = ({
                           withIcon = null,
                           type,
                           title,
                           className,
                           ...props
                       }: AlertProps) => {
    return (
        <div
            className={['alert',`alert--${type}`,className].join(' ') }
            {...props}
        >
            <strong className="pb-[5px] inline-block">{title}</strong>
            {props.children}
        </div>
    );
};
