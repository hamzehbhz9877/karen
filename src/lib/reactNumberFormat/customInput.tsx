'use client'

import React from 'react';
import styles from  "./input.module.scss"
import {useField} from "formik"
import {PatternFormat} from "react-number-format";

const CustomInput = (props:any) => {
    const { name,...rest } = props
    const [field] = useField(name)
    return (
        <div className={styles.input}>
            <PatternFormat {...field} {...rest}  format="09## ### ####"
                           allowEmptyFormatting mask="_"/>
        </div>
    );
};

export default CustomInput;