import React from "react";
import MsgItem from "./MsgItem";
import s from "./index.module.scss";
import { Message } from "@/app/msg/page";

interface Props {
  data: Message[];
}

const MsgList: React.FC<Props> = ({ data }) => {
  const rootMessages = data.filter(m => !m.parent);
  const replies = data.filter(m => m.parent);

  const getChildren = (parentId: number) => {
    return replies.filter(reply => reply.parent === String(parentId));
  };
  return (
    <>
      {rootMessages.map((msg) => (
        <div key={msg.id} className={s.completeMsg}>
          <MsgItem
            id={msg.id}
            nickname={msg.nickname}
            date={msg.createdAt}
            content={msg.body[0]?.body || ''}
            email={msg.email}
            avatar={msg.avatar}
          />
          {getChildren(msg.id).map(reply => (
            <MsgItem
              key={reply.id}
              id={reply.id}
              nickname={reply.nickname}
              date={reply.createdAt}
              content={reply.body[0]?.body || ''}
              email={reply.email}
              avatar={reply.avatar}
              isReply={true}
            />
          ))}
        </div>
      ))}
    </>
  );
};

export default MsgList;