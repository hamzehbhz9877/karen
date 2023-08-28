import React, {ChangeEvent, useEffect, useState} from 'react';
import "./Number.scss"

interface InputNumberProps {
    title?:string
    initValue?:number
    className?:string;
    size?: 'small' | 'medium' | 'large';
    label?: string;
    currentValue?:(value:number)=>void
    onClick?: () => void;
}


export const InputNumber = ({
                           size = 'medium',
                           label,
                                title='',
                                initValue,
                                currentValue,
                           className,
                           ...props
                       }: InputNumberProps) => {
    const [value,setValue]=useState<any>(initValue)

    const preventNegativeValues = (e: any) => ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()

    const handleChange=(e:ChangeEvent<HTMLInputElement>)=>{
        let val = parseInt(e.target.value, 10);
        if (isNaN(val)) {
            setValue('');
        } else {
            // is A Number
            val = val >= 0 ? val : 0;
            setValue(val);
            if (currentValue)
            currentValue(val)
        }
    }

    useEffect(()=>{
        setValue(initValue)
    },[initValue])
    return (
        <div className={["input-number",`input-number--${size}`,className].join(' ')}>
            <label htmlFor="">{title}</label>
            <input
                type="number"
                onKeyDown={(e)=>preventNegativeValues(e)}
                value={value && Math.max(0, value)}
                onChange={e=>handleChange(e)}
            />
        </div>

    );
};
