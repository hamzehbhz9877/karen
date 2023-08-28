import React from 'react';
import 'stories/button/Button.scss';

type ButtonProps ={
    primary?: boolean;
    icon?: React.ReactElement;
    className?:string;
    size?: 'small' | 'medium' | 'large';
    label: string;
    onClick?: () => void;
} & any


export const Button = ({
                           icon = null,
                           primary = false,
                           size = 'medium',
                           label,
                           className,
                           ...props
                       }: ButtonProps) => {
    const mode = primary ? 'button--primary' : 'button--secondary';
    return (
        <button
            type="button"
            className={['button', `button--${size}`,className, mode].join(' ') }
            {...props}
        >
            {icon}
            {label}
        </button>
    );
};
