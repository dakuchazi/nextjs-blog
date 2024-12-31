import React from "react";
import Card from "@/components/Card";
import { Tag } from "@/app/page";

import s from "./index.module.scss";

interface Props {
  data: Tag[]
}

const TagCard: React.FC<Props> = ({ data }) => {

  return (
    <Card className={s.card}>
      {data.map((item) => (
        <span className={s.tag} key={item.id}>
          {item.name}
        </span>
      ))}
    </Card>
  );
};

export default TagCard;
