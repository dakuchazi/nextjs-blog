"use client"

import React, { useEffect } from "react";
import Card from "@/components/Card";


import s from "./index.module.scss";

interface Props {
  data: string
}

const NoticeCard: React.FC<Props> = ({ data }) => {

  return (
    <Card >
      <div className={s.notice}>{data}</div>
    </Card>
  );
};

export default NoticeCard;
