'use client'

import React, {useEffect} from 'react';
import {useRouter} from "next/navigation";

const IndexPage = () => {
    const router = useRouter()

    useEffect(()=>{
        router.replace("/login")
    },[])

    return null
};

export default IndexPage;