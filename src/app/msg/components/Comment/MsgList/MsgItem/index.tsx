import "dayjs/locale/zh-cn";
import classNames from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React from "react";
import MarkDown from "@/components/MarkDown";
import { myEmail, smallLoadingUrl } from "@/utils/constant";
import { useLazyImg } from "@/utils/hooks/useLazyImg";

import s from "./index.module.scss";

dayjs.locale("zh-cn");
dayjs.extend(relativeTime);

interface Props {
  id: number;
  name: string;
  date?: string;
  content?: string;
  email: string;
  avatar: string;
  link?: string;
  isReply?: boolean;
}

const MsgItem: React.FC<Props> = ({
  name,
  date,
  content,
  email,
  avatar,
  link,
  isReply,
}) => {
  const { imgRef, imgUrl } = useLazyImg(avatar || smallLoadingUrl, smallLoadingUrl);

  return (
    <div className={classNames(s.commentItem, { [s.marginLeft]: isReply })}>
      <div className={s.flex}>
        <div ref={imgRef} className={s.avatarBox}>
          <img
            src={imgUrl}
            alt={name}
            className={classNames({
              [s.avatar]: imgUrl !== smallLoadingUrl,
              [s.loading]: imgUrl === smallLoadingUrl,
            })}
          />
        </div>

        <div className={s.contentBox}>
          <div className={s.usrInfo}>
            <a
              href={link}
              target={link ? "_blank" : "_self"}
              rel="noreferrer"
              className={s.name}
              style={{ cursor: link ? "pointer" : "default" }}
            >
              {name}
            </a>
            {email === myEmail && <span className={s.flag}>站长</span>}
            <span className={s.date}>{dayjs(date).fromNow()}</span>
          </div>
          <MarkDown content={content || ""} className={s.content} />
        </div>
      </div>
    </div >
  );
};

export default MsgItem;