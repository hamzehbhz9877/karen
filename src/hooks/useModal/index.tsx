'use client'

import {ReactNode, useCallback, useState} from "react";

const UseModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState<ReactNode | null>(null);
  const [options, setOptions] = useState<any>(null);

  const handleOpen = useCallback((data: ReactNode, options?: any) => {
    //@ts-ignore
    document.querySelector("body").style.overflowY = 'hidden'
    setIsModalOpen(true);
    setModalData(data);
    if (options) setOptions(options);
    else setOptions(null);
  }, []);

  const handleClose = useCallback(() => {
    //@ts-ignore
    if (!document.querySelector('.overlay.index-selection'))
    {
      //@ts-ignore
      document.querySelector("body").style.overflowY = 'auto'
    }


    setIsModalOpen(false)
  }, []);

  return {isModalOpen, modalData, handleOpen, options, handleClose};
};

export default UseModal;
