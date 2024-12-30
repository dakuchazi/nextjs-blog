import React from "react";

import Card from "@/components/Card";

import s from "./index.module.scss";

const TagCard: React.FC = () => {
  const tagData = [{
    name: "test",
    _id: "123"
  }]
  return (
    <Card className={s.card}>
      {tagData.map((item) => (
        <span className={s.tag} key={item._id}>
          {item.name}
        </span>
      ))}
    </Card>
  );
};

export default TagCard;
