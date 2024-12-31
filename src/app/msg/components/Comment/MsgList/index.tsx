import React from "react";
import MsgItem from "./MsgItem";
import s from "./index.module.scss";
import { Message } from "@/app/msg/page";

interface Props {
  data: Message[];
}

const MsgList: React.FC<Props> = ({ data }) => {
  return (
    <>
      {data.map((msg) => (
        <div key={msg.id} className={s.completeMsg}>
          <MsgItem
            id={msg.id}
            name={msg.nickname}
            date={msg.createdAt}
            content={msg.body[0]?.body || ''}
            email={msg.email}
            avatar={msg.avatar}
          />
        </div>
      ))}
    </>
  );
};

export default MsgList;