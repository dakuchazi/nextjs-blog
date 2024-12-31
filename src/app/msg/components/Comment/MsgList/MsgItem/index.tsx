import "dayjs/locale/zh-cn";
import classNames from "classnames";
import { MessageOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import React, { useState } from "react";
import MarkDown from "@/components/MarkDown";
import { myEmail, smallLoadingUrl } from "@/utils/constant";
import { useLazyImg } from "@/utils/hooks/useLazyImg";
import EditBox from "../../EditBox";
import Modal from "@/components/Model";

import s from "./index.module.scss";

interface Props {
  id: number;
  nickname: string;
  date?: string;
  content?: string;
  email: string;
  avatar: string;
  link?: string;
  isReply?: boolean;
}

const MsgItem: React.FC<Props> = ({
  id,
  nickname,
  date,
  content,
  email,
  avatar,
  link,
  isReply,
}) => {
  const { imgRef, imgUrl } = useLazyImg(avatar || smallLoadingUrl, smallLoadingUrl);
  const [showReplyModal, setShowReplyModal] = useState(false);

  return (
    <div className={classNames(s.commentItem, { [s.marginLeft]: isReply })}>
      <div className={s.flex}>
        <div ref={imgRef} className={s.avatarBox}>
          <img
            src={imgUrl}
            alt={nickname}
            className={classNames({
              [s.avatar]: imgUrl !== smallLoadingUrl,
              [s.loading]: imgUrl === smallLoadingUrl,
            })}
          />
        </div>
        {!isReply && (
          <div className={s.replyBtn} onClick={() => setShowReplyModal(true)}>
            <MessageOutlined />
          </div>
        )}
        <div className={s.contentBox}>
          <div className={s.usrInfo}>
            <a
              href={link}
              target={link ? "_blank" : "_self"}
              rel="noreferrer"
              className={s.name}
              style={{ cursor: link ? "pointer" : "default" }}
            >
              {nickname}
            </a>
            {email === myEmail && <span className={s.flag}>站长</span>}
            <span className={s.date}>{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</span>
          </div>
          <MarkDown content={content || ""} className={s.content} />
        </div>
      </div>

      <Modal
        title={`回复给：${name}`}
        visible={showReplyModal}
        onClose={() => setShowReplyModal(false)}
      >
        <EditBox
          isReply={true}
          replyTo={{ id, nickname }}
          onCancelReply={() => setShowReplyModal(false)}
        />
      </Modal>
    </div>



  );
};

export default MsgItem;