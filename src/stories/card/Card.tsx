'use client'

import React from 'react';
import 'stories/card/Card.scss';

interface CardProps {
    icon?: React.ReactElement|null;
    className?: string;
    label: string;
    title: string
    onClick?: () => void;
    borderBottomColor?:string
}


export const Card = ({
                         icon = null,
                         label,
                         title = '',
                         borderBottomColor='',
                         className,
                         ...props
                     }: CardProps) => {
    return (
        <div
            className={['card',className].join(' ')}
            {...props}
        >
            <div className='card-contnet'>
                <h5>{title}</h5>
                <span>{label}</span>
            </div>
                <div className='card-icon'>
                    {icon}
                </div>

            <style jsx>{`
                .card {
                    border-bottom-color:${borderBottomColor};
                }
            `}</style>
        </div>
    );
};
