'use client';

import { useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { useTitle } from "ahooks";
import { siteTitle } from "@/utils/constant";
import React from "react";

interface ClientHomeProps {
    children: React.ReactNode;
}

export default function ClientHome({ children }: ClientHomeProps) {
    const { setNavShow } = useTheme();

    useTitle(siteTitle);

    useEffect(() => {
        window.scrollTo(0, 0);
        setNavShow(true);
    }, [setNavShow]);

    return <>{children}</>;
}