import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { FloatButton } from "antd";
import React from "react";
import { useTheme } from '@/contexts/ThemeContext'

import s from "./index.scss";
import "./index.custom.scss";


interface Props {
  setNavShow?: Function;
}

const BackToTop: React.FC<Props> = () => {
  const { theme, setTheme, navShow, setNavShow } = useTheme()

  const backTop = () => {
    (setNavShow(true));
  };

  return (
    <FloatButton.BackTop
      duration={700}
      visibilityHeight={300}
      onClick={backTop}
      className="BackTop"
    >
      <div className={s.backTop}>
        <VerticalAlignTopOutlined />
      </div>
    </FloatButton.BackTop>
  );
};

export default BackToTop;
