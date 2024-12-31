import { useKeyPress, useSafeState } from "ahooks";
import { message } from "antd";
import classNames from "classnames";
import React, { useRef } from "react";
import { myAvatar, myEmail, myKey, myLink, myName } from "@/utils/constant";
import { toast } from "@/components/Toast";

import s from "./index.module.scss";

interface Props {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const AdminBox: React.FC<Props> = ({ visible = false, setVisible }) => {
  const pwdRef = useRef(null);
  const [adminEmail, setAdminEmail] = useSafeState("");
  const [adminPwd, setAdminPwd] = useSafeState("");

  const hideAdmin = () => {
    setVisible(false);
    setAdminEmail("");
    setAdminPwd("");
  };

  const adminLogin = () => {
    if (adminPwd === "0114kucha,,") {
      localStorage.setItem("token", "yijingdenglu")
      toast.success("验证通过");
      setVisible(false);
    } else {
      toast.error('密码错误');
    }
  }


  return (
    <div className={classNames(s.adminBox, { [s.showAdmin]: visible })}>
      <div className={s.itemBox}>
        <div className={s.adminKey}>邮箱</div>
        <input
          type="text"
          className={s.adminValue}
          value={adminEmail}
          onChange={(e) => setAdminEmail(e.target.value)}
        />
      </div>
      <div className={s.itemBox}>
        <div className={s.adminKey}>密码</div>
        <input
          ref={pwdRef}
          type="password"
          className={s.adminValue}
          value={adminPwd}
          onChange={(e) => setAdminPwd(e.target.value)}
        />
      </div>
      <div className={classNames(s.itemBox, s.adminBtns)}>
        <div className={s.adminBtn} onClick={hideAdmin}>
          取消
        </div>
        <div className={s.adminBtn} onClick={adminLogin}>
          登录
        </div>
      </div>
    </div>
  );
};

export default AdminBox;
