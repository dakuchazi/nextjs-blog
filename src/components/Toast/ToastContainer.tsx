'use client';

import React, { useState, useCallback, FC } from 'react';
import Toast from './Toast';

type ToastType = 'success' | 'error' | 'info';

interface ToastData {
    id: number;
    message: string;
    type: ToastType;
}

let add: (toast: { message: string; type: ToastType }) => void;

const ToastContainer: FC = () => {
    const [toasts, setToasts] = useState<ToastData[]>([]);

    add = useCallback(({ message, type }: { message: string; type: ToastType }) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
    }, []);

    const handleRemove = (id: number) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    };

    return (
        <>
            {toasts.map(({ id, message, type }) => (
                <Toast
                    key={id}
                    message={message}
                    type={type}
                    onClose={() => handleRemove(id)}
                />
            ))}
        </>
    );
};

export const toast = {
    success: (message: string) => add({ message, type: 'success' }),
    error: (message: string) => add({ message, type: 'error' }),
    info: (message: string) => add({ message, type: 'info' })
};

export default ToastContainer;