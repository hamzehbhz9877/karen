'use client'

import React, {ReactNode} from 'react';
import './Modal.scss'
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Loading} from "stories/utilities/loading/Loading";

type ModalProps = {
    options?: any
    className?: string
    showModal: boolean;
    close: () => void;
    children: ReactNode;
    isLoadingOverlay?:boolean
}

export const Modal = ({children, close, className, showModal,options,isLoadingOverlay}: ModalProps) => {


        if (!showModal) {
            return null;
        }

        return (
            <div className={['overlay',className,options?.className].join(' ')} onClick={close}>
                <div className={['modal'].join(' ')} onClick={e => e.stopPropagation()}>
                    {options?.title && <div className="modal__header">
                        <h3>{options?.title}</h3>
                        <FontAwesomeIcon onClick={close} role="button" icon={faTimes}/>
                    </div>}
                    {children}
                    {isLoadingOverlay && <div className="loading-overlay">
                        <Loading/>
                    </div>
                        }
                </div>
            </div>
        );
    }
;

type Props = {
    children: ReactNode
}
const ModalHeader = ({children}: Props) => {
    return <div className="modal__header">{children}</div>;
};
const ModalBody = ({children}: Props) => {
    return <div className="modal__body">{children}</div>;
};
const ModalFooter = ({children, align}: Props & { align: 'right' | 'center' | 'left' }) => {
    return <div className={`modal__footer text-${align}`}>{children}</div>;
};

export {ModalHeader, ModalBody, ModalFooter};