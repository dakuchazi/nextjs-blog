"use client"

import React from "react";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";

import s from "./index.module.scss";

interface Props {
  articleCount: number;
  tagsCount: number;
  categoriesCount: number;
}


const DataCard: React.FC<Props> = ({ articleCount, tagsCount, categoriesCount }) => {
  const router = useRouter()

  return (
    <Card className={s.card} >
      <div className={s.blogData} onClick={() => router.push("/articles")}>
        <div className={s.name}>文章</div>
        <div className={s.num}>{articleCount}</div>
      </div>
      <div className={s.blogData} onClick={() => router.push("/classes")}>
        <div className={s.name}>分类</div>
        <div className={s.num}>{categoriesCount}</div>
      </div>
      <div className={s.blogData} onClick={() => router.push("/tags")}>
        <div className={s.name}>标签</div>
        <div className={s.num}>{tagsCount}</div>
      </div>
    </Card>
  );
};

export default DataCard;
