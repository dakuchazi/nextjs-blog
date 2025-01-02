import React, { MouseEventHandler } from 'react';
import dayjs from 'dayjs';
import DisplayBarLoading from './DisplayBarLoading';

import s from './index.module.scss';

interface Props {
  content?: string;
  right?: string;
  loading?: boolean;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const DisplayBar: React.FC<Props> = ({ content = '', right = '', loading, onClick }) => {
  return (
    <div className={s.displayBar} onClick={onClick}>
      {loading ? (
        <DisplayBarLoading />
      ) : (
        <>
          <div className={s.content}>{content}</div>
          <div className={s.rightContent}>
            <div className={s.rightBar}>{dayjs(right).format('YYYY-MM-DD')}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayBar;
