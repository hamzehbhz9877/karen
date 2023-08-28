'use client'

import React from 'react';
import {ErrorMessage} from "formik";
import styles from "./index.module.scss"

type Props={
    name:string
}
const CustomError = ({name}:Props) => {
    return (
        <ErrorMessage name={name} className={styles.errorMessage} component="div"/>
    );
};

export default CustomError;