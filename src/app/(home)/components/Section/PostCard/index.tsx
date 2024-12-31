import React, { MouseEventHandler } from "react";
import Card from "@/components/Card";
import PostCardLoading from "./PostCardLoading";

import s from "./index.module.scss";

interface Props {
  title?: string;
  content?: string;
  date?: string;
  tags?: any[];
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const PostCard: React.FC<Props> = ({
  title,
  content,
  date,
  tags,
  loading,
  onClick,
}) => {
  return (
    <Card className={s.card} isStatic={true} onClick={onClick}>
      {loading ? (
        <PostCardLoading />
      ) : (
        <>
          <div className={s.title}>{title}</div>
          <p className={s.content}>
            {content!
              .replace(/<a(.*?)>(.*?)<\/a>/g, "$2")
              .replace(/[# |**|`|>]/g, "")}
          </p>
          <div className={s.info}>
            <span className={s.date}>{date}</span>
            <div className={s.tags}>
              {tags!.map((tag) => (
                <span className={s.tag} key={tag.id}>
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default PostCard;
