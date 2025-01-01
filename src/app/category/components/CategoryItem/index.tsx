'use client';

import classNames from 'classnames';
import React from 'react';
import { useRouter } from 'next/navigation';

import s from './index.module.scss';

interface Props {
  name: string;
  num?: number;
  className?: string;
}

const CategoryItem: React.FC<Props> = ({ name, num = 0, className }) => {
  const router = useRouter();

  return (
    <div
      className={classNames(s.classBar, className)}
      onClick={() => router.push(`/article-list?category=${name}`)}
    >
      {name}
      <div className={s.classNum}>{num}</div>
    </div>
  );
};

export default CategoryItem;