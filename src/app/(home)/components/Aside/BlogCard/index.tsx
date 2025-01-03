import React from "react";

import Card from "@/components/Card";
import { cardUrl } from "@/utils/constant";
import { useTime } from "@/utils/hooks/useTime";

import s from "./index.module.scss";

const BlogCard: React.FC = () => {
  const { timeText } = useTime();

  return (
    <Card className={s.card}>
      <p className={s.text}>
        {timeText}，<br />
        我叫
        <br />
        <span className={s.color}>大苦茶籽</span>，<br />
        欢迎来到
        <br />
        我的<span className={s.color}>个人博客</span>。
      </p>
      <img src={cardUrl} className={s.avatar} />
    </Card>
  );
};

export default BlogCard;
