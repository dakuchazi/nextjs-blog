import React from 'react';

import s from './index.module.scss';

interface Props {
  msgCount: number | null;
}

const Placehold: React.FC<Props> = ({ msgCount }) => {
  return (
    <>
      {msgCount ? (
        <div className={s.hasMag}>
          {msgCount}条留言
        </div>
      ) : (
        <div className={s.noMag}>暂时没有留言&nbsp;~</div>
      )}
    </>
  );
};

export default Placehold;
