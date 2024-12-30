"use client"

import React, { useEffect } from "react";
import Card from "@/components/Card";


import s from "./index.module.scss";

const NoticeCard: React.FC = () => {



  return (
    <Card >
      <div className={s.notice}>{123}</div>
    </Card>
  );
};

export default NoticeCard;
