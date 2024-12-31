import classNames from 'classnames';
import React from 'react';
import { CloseOutlined } from "@ant-design/icons";
import MarkDown from '@/components/MarkDown';

import s from './index.module.scss';

interface Props {
  closePre?: Function;
  content?: string;
  className?: string;
}

const PreShow: React.FC<Props> = ({ closePre, content, className }) => {
  const handleClose = () => closePre?.();

  return (
    <div className={classNames(s.preShow, className)}>
      <div className={s.closeBtn} onClick={handleClose}>
        <CloseOutlined />
      </div>
      <MarkDown className={s.preMarked} content={content} />
    </div>
  );
};

export default PreShow;
