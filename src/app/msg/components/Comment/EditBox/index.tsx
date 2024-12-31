import { UserOutlined } from "@ant-design/icons";
import {
  useBoolean,
  useMount,
  useSafeState,
  useSetState,
} from "ahooks";
import classNames from "classnames";
import React, { useRef, useState } from "react";
import { defaultCommentAvatar, myAvatar70, myEmail, myLink, myName, myQQ } from "@/utils/constant";
import AdminBox from "./AdminBox";
import PreShow from "./PreShow";
import axios from "@/utils/axios";
import { toast } from "@/components/Toast";

import s from "./index.module.scss";

interface Props {
  refresh?: () => void;
}

const EditBox: React.FC<Props> = ({ refresh }) => {
  const QQRef = useRef(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showPre, { toggle: togglePre, setFalse: closePre }] =
    useBoolean(false);
  const [text, setText] = useSafeState("");
  const [formData, setFormData] = useSetState({
    nickname: "",
    QQNumber: "",
    email: "",
    link: "",
    avatar: ""
  })


  const validateConfig = {
    nickname: {
      check: /^[\u4e00-\u9fa5_a-zA-Z0-9]{2,8}$/,
      content: formData.nickname,
      errText: "昵称仅限中文、数字、字母，长度2~8！",
    },
    email: {
      check: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
      content: formData.email,
      errText: "请输入正确的邮箱地址！",
    },
    link: {
      check: /^$|^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/,
      content: formData.link,
      errText: "请输入正确的url，或不填！",
    },
    body: {
      check: /^[\s\S]*.*[^\s][\s\S]*$/,
      content: text,
      errText: "请输入内容再发布~",
    },
  };

  const validate = () => {
    Object.keys(validateConfig).forEach((item) => {
      const { check, errText, content } =
        validateConfig[item as keyof typeof validateConfig];
      if (!check.test(content!)) {
        toast.error(errText)
        throw new Error("breakForEach");
      }
    });
  };


  const submit = async () => {
    if (formData.email === myEmail && localStorage.getItem('token') !== "yijingdenglu") {
      toast.error('别用站长的邮箱啊');
      return
    }
    const getRandomAvatar = () => {
      const randomIndex = Math.floor(Math.random() * defaultCommentAvatar.length);
      return defaultCommentAvatar[randomIndex];
    };
    try {
      validate();
      const submitData = {
        data: {
          nickname: formData.nickname,
          email: formData.email,
          link: formData.link || null,
          avatar: formData.avatar || getRandomAvatar(),
          QQNumber: formData.QQNumber || null,
          body: [{
            __component: "shared.rich-text",
            body: text
          }]
        }
      };
      const res = await axios.post('/msgs', submitData);
      if (res.data) {
        toast.success('发布成功！');
        localStorage.setItem("userInfo", JSON.stringify(formData))
        setText("");
        closePre();
        refresh?.()
      }
    } catch (error: any) {
      if (error.message === "breakForEach") return;
      toast.error('发布失败：' + error.message);
    }
  };

  const handleQQ = () => {
    if (!formData.QQNumber) {
      setFormData({ avatar: "" })
      return
    }

    if (formData.QQNumber === myQQ && !localStorage.getItem("token")) {
      setShowAdmin(true)
    }

    const regQQ = /[1-9][0-9]{4,11}/;
    if (regQQ.test(formData.QQNumber)) {
      const avatarUrl = `https://q1.qlogo.cn/g?b=qq&nk=${formData.QQNumber}&s=100`;
      setFormData({ avatar: avatarUrl })
      return;
    }
  };

  const openPreShow = () => {
    if (!showPre && !text) {
      toast.info("请写点什么再预览~");
      return;
    }
    togglePre();
  };

  // const handleCloseReply = () => {
  //   closeReply?.();
  // };

  useMount(() => {
    const userInfo = localStorage.getItem('userInfo')
    if (userInfo) {
      setFormData(JSON.parse(userInfo))
    }
  })

  return (
    <div className={classNames(s.editBox)}>
      {/* {isReply && (
        <div className={s.replyNameBox}>
          回复给「<span>{replyName}</span>」：
        </div>
      )} */}
      <div className={s.flex}>
        <AdminBox visible={showAdmin} setVisible={setShowAdmin} />

        <div className={s.avatarBoxCol}>
          <div className={s.avatarBox}>
            {formData.avatar ? (
              <img src={formData.avatar} className={s.editAvatar} />
            ) : (
              <UserOutlined className={s.noAvatar} />
            )}
          </div>
        </div>
        <div className={s.editInputBox}>
          <div className={s.inputBox}>
            <div className={classNames(s.inputInfo, s.flex2)}>
              <div className={s.inputKey}>昵称</div>
              <input
                type="text"
                className={s.inputValue}
                placeholder="必填"
                value={formData.nickname}
                onChange={(e) => setFormData({ nickname: e.target.value })}
              />
            </div>
            <div className={classNames(s.inputInfo, s.flex2)}>
              <div className={s.inputKey}>邮箱</div>
              <input
                type="text"
                className={s.inputValue}
                placeholder="必填"
                value={formData.email}
                onChange={(e) => (setFormData({ email: e.target.value }))}
              />
            </div>
            <div className={classNames(s.inputInfo, s.flex2)}>
              <div className={s.inputKey}>QQ</div>
              <input
                type="text"
                ref={QQRef}
                className={s.inputValue}
                placeholder="选填"
                value={formData.QQNumber}
                onChange={(e) => setFormData({ QQNumber: e.target.value })}
                onBlur={handleQQ}
              />
            </div>
            <div className={classNames(s.inputInfo, s.flex2)}>
              <div className={s.inputKey}>网址</div>
              <input
                type="text"
                className={s.inputValue}
                placeholder="选填"
                value={formData.link}
                onChange={(e) => setFormData({ link: e.target.value })}
              />
            </div>
          </div>

          <div className={s.textareaBox}>
            <textarea
              className={s.textarea}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="写点什么吗？支持markdown格式！&#10;填写QQ号，自动获取「头像」"
            />
          </div>
          <div className={s.commentBtns}>
            {/* {isReply && (
              <div className={s.cancelBtn} onClick={handleCloseReply}>
                取消
              </div>
            )} */}
            <div className={s.previewBtn} onClick={openPreShow}>
              预览
            </div>
            <div className={s.sendBtn} onClick={submit}>
              发布
            </div>
          </div>
        </div>
      </div>
      <PreShow
        closePre={closePre}
        content={text}
        className={classNames({ [s.preShowHidden]: !showPre })}
      />
    </div>
  );
};

export default EditBox;
