"use client"

import React from "react";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";

import s from "./index.module.scss";

const DataCard: React.FC = () => {
  const router = useRouter()

  return (
    <Card className={s.card} >
      <div className={s.blogData} onClick={() => router.push("/articles")}>
        <div className={s.name}>文章</div>
        <div className={s.num}>{10}</div>
      </div>
      <div className={s.blogData} onClick={() => router.push("/classes")}>
        <div className={s.name}>分类</div>
        <div className={s.num}>{10}</div>
      </div>
      <div className={s.blogData} onClick={() => router.push("/tags")}>
        <div className={s.name}>标签</div>
        <div className={s.num}>{10}</div>
      </div>
    </Card>
  );
};

export default DataCard;
