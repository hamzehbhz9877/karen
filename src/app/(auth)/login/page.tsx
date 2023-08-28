'use client'

import React from 'react';
import styles from "./login.module.scss"
import IrFlag from "images/Flag_of_Iran.svg.png"
import Image from "next/image";
import Input from "lib/reactNumberFormat/customInput";
import {Button} from "stories/button/Button";
import {Form, Formik} from "formik"
import {initialValues, validationSchema} from "./validation";
import CustomError from "lib/formik/customError/index";
import {useRouter} from "next/navigation";


const Login = () => {

    const router=useRouter()

    const handleSubmit = () => {
        router.push('/panel/investment')
    }

    return (
        <section className={styles.login}>
            <div className={styles.loginWrapper}>
                <div  className={styles.loginInputs}>
                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleSubmit}
                        validationSchema={validationSchema}
                    >
                        {() => {
                            return (
                                <Form>
                                    <span className={styles.phoneTitle}>لطفا شماره همراه خود را وارد نمایید</span>
                                    <div className={styles.phoneBox}>
                                        <Input dir={'ltr'} name={"phoneNumber"}/>
                                        <div className={styles.phoneFlag}>
                                            <Image src={IrFlag} alt={'flag'} width={25} height={25}/>
                                        </div>
                                    </div>
                                    <CustomError name={'phoneNumber'}/>
                                    <Button  type="submit" label="تایید" size="large" className={`${styles.loginButton} mt-3`}/>
                                </Form>
                            )
                        }}
                    </Formik>
                </div>

            </div>
            <div className={styles.bg}/>
        </section>
    );
};

export default Login;