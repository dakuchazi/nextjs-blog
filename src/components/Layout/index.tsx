"use client"

import { useMount, useTitle } from "ahooks";
import classNames from "classnames";
import React, { ReactNode } from "react";
import { siteTitle } from "@/utils/constant";
import useTop from "@/utils/hooks/useTop";
import Card from "@/components/Card";
import LayoutLoading from "../LayoutLoading";
import PageTitle from "../PageTitle";
import { useTheme } from "@/contexts/ThemeContext";

import s from "./index.module.scss";


interface Props {
  title?: string;
  className?: string;
  setNavShow?: Function;
  loading?: boolean;
  isPost?: boolean;
  classes?: string;
  date?: string;
  rows?: number;
  children: ReactNode
}

const Layout: React.FC<Props> = ({
  title,
  className,
  loading,
  children,
  classes,
  date,
  isPost = false,
  rows,
}) => {
  const { setNavShow } = useTheme()

  useTitle(`${siteTitle} | ${title || ""}`);

  useMount(() => {
    window.scrollTo(0, 0);
    setNavShow(true)
  });

  return (
    <>
      <PageTitle
        title={title}
        className={classNames({ [s.postTitle]: isPost })}
      >
        {isPost && (
          <div>
            <span className={s.articleClass}>{classes}</span>
            <span className={s.articleDate}>{date}</span>
          </div>
        )}
      </PageTitle>
      <Card isStatic={true} className={classNames(s.layoutCard, className)}>
        {loading ? <LayoutLoading rows={rows} /> : children}
      </Card>
    </>
  );
};

export default Layout;