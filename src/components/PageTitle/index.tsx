import classNames from "classnames";
import React, { ReactNode } from "react";

import s from "./index.module.scss";

export interface PageTitleProps {
  title?: string;
  desc?: string;
  children?: React.ReactNode;
  className?: string;
}

const PageTitle: React.FC<PageTitleProps> = ({ title, desc, className, children }) => {
  return (
    <div className={classNames(s.box, className)}>
      <div className={s.title}>{title}</div>
      <div style={{ fontSize: "16px" }}>{children}</div>
      {desc && <div className={s.desc}>{desc}</div>}
    </div>
  );
};

export default PageTitle;
