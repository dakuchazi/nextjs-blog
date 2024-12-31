'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { CloseOutlined } from '@ant-design/icons';
import s from './index.module.scss';

interface ModalProps {
    title?: string;
    visible: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
    title,
    visible,
    onClose,
    children
}) => {
    if (!visible) return null;

    return createPortal(
        <div className={s.modalWrapper}>
            <div className={s.modalMask} onClick={onClose} />
            <div className={s.modalContent}>
                <div className={s.modalHeader}>
                    <div className={s.modalTitle}>{title}</div>
                    <button className={s.closeButton} onClick={onClose}>
                        <CloseOutlined />
                    </button>
                </div>
                <div className={s.modalBody}>
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;