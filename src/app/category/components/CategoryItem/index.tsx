'use client';

import classNames from 'classnames';
import React from 'react';
import { useRouter } from 'next/navigation';

import s from './index.module.scss';

interface Props {
  content: string;
  num?: number;
  onClick?: string;
  className?: string;
}

const CategoryItem: React.FC<Props> = ({ content, num = 0, onClick, className }) => {
  const router = useRouter();

  return (
    <div
      className={classNames(s.classBar, className)}
      onClick={() => onClick && router.push(onClick)}
    >
      {content}
      <div className={s.classNum}>{num}</div>
    </div>
  );
};

export default CategoryItem;