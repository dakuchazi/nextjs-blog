'use client';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CheckCircleFilled, CloseCircleFilled, InfoCircleFilled } from '@ant-design/icons';
import s from './toast.module.scss';

type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
    message: string;
    type?: ToastType;
    duration?: number;
    onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({
    message,
    type = 'info',
    duration = 3000,
    onClose
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose?.();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircleFilled className={s.icon} />;
            case 'error':
                return <CloseCircleFilled className={s.icon} />;
            case 'info':
                return <InfoCircleFilled className={s.icon} />;
        }
    };

    return createPortal(
        <div className={`${s.toast} ${s[type]}`}>
            <div className={s.content}>
                {getIcon()}
                <span className={s.message}>{message}</span>
            </div>
        </div>,
        document.body
    );
};

export default Toast;