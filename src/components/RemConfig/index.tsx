'use client';

import { useEffect } from 'react';

export default function RemConfig() {
    useEffect(() => {
        function setRootFontSize() {
            const html = document.getElementsByTagName('html')[0];
            html.style.fontSize = `${document.documentElement.clientWidth / 450}px`;
        }

        // 初始设置
        setRootFontSize();

        // 监听窗口大小变化
        window.addEventListener('resize', setRootFontSize);

        // 清理函数
        return () => window.removeEventListener('resize', setRootFontSize);
    }, []);

    return null;
}