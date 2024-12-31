import React from "react";
import { Tag } from "@/app/page";

import s from "./index.module.scss";

interface Props {
  tags: Tag[];
}

const ArtTags: React.FC<Props> = ({ tags }) => {
  return (
    <div className={s.articleTags}>
      {tags.length &&
        tags.map((item, index) => (
          <span className={s.articleTag} key={item.id}>
            {item.name}
          </span>
        ))}
    </div>
  );
};

export default ArtTags;
