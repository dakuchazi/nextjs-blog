'use client';

import React from 'react';
import { getFullImageUrl } from "@/utils/url";

import s from './index.module.scss';

interface Props {
  cover?: string;
  link?: string;
  name?: string;
  descr?: string;
}

const Item: React.FC<Props> = ({ cover, link, name, descr }) => {
  const backgroundStyle = cover ? {
    backgroundImage: `url(${getFullImageUrl(cover)})`
  } : {};

  return (
    <div style={backgroundStyle} className={s.showItem}>
      <a
        href={link?.startsWith('http') ? link : `http://${link}`}
        rel="noreferrer"
        target="_blank"
        className={s.link}
      >
        <div className={s.title}>
          <span>{name}</span>
        </div>
        <div className={s.descr}>{descr}</div>
        <div className={s.mask} />
      </a>
    </div>
  );
};

export default Item;