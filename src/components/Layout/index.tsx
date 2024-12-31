"use client"

import { useMount, useTitle } from "ahooks";
import classNames from "classnames";
import React, { ReactNode } from "react";
import { siteTitle } from "@/utils/constant";
import Card from "@/components/Card";
import LayoutLoading from "../LayoutLoading";
import PageTitle from "../PageTitle";
import { useTheme } from "@/contexts/ThemeContext";
import { Category } from "@/app/page";
import dayjs from "dayjs";

import s from "./index.module.scss";


interface Props {
  title?: string;
  className?: string;
  setNavShow?: Function;
  loading?: boolean;
  isArticle?: boolean;
  category?: Category;
  date?: string;
  rows?: number;
  children: ReactNode
}

const Layout: React.FC<Props> = ({
  title,
  className,
  loading,
  children,
  category,
  date,
  isArticle = false,
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
        className={classNames({ [s.postTitle]: isArticle })}
      >
        {isArticle && (
          <div>
            <span className={s.articleClass}>{category?.name}</span>
            <span className={s.articleDate}>{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</span>
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
