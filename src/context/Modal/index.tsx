'use client'


import React, {createContext, FC, ReactNode} from "react";
import UseModal from "hooks/useModal/index";
import {Modal} from "stories/modal/Modal"

type Modal = {
    openModal: (data: React.ReactNode, options?: (any | undefined)) => void,
    closeModal:()=>void
}

export const ModalProvider = createContext({} as any);

type Props = {
    children: ReactNode
}

const ModalContext= ({children}:Props) => {
    const {isModalOpen, handleClose, handleOpen, modalData, options} = UseModal();

    return (
        <ModalProvider.Provider
            value={{
                openModal: handleOpen,
                closeModal: handleClose,
            }}
        >
            {children}
            <Modal
                options={options}
                showModal={isModalOpen}
                close={handleClose}
                children={modalData}
            />
        </ModalProvider.Provider>
    );
};

export default ModalContext;
