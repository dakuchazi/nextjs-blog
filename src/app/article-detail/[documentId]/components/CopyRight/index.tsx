'use client';

import copy from 'copy-to-clipboard';
import React from 'react';
import { myLink, siteTitle } from '@/utils/constant';
import CopyIcon from './CopyIcon';
import CopyrightIcon from './CopyrightIcon';
import { toast } from '@/components/Toast';

import s from './index.module.scss';

interface Props {
  documentId?: string;
  title?: string
}

const CopyRight: React.FC<Props> = ({ documentId, title }) => {
  const url = `${myLink}/article-detail/${documentId}`;

  const copyUrl = () => {
    if (copy(url)) {
      toast.success('复制成功!');
    }
  };

  return (
    <div className={s.copyrightBox}>
      <CopyrightIcon className={s.copyrightIcon} />
      <div className={s.title}>{title}</div>
      <div className={s.urlBox}>
        <div className={s.url}>{url}</div>
        <div className={s.copyBtn} onClick={() => copyUrl()}>
          <CopyIcon className={s.copyIcon} />
        </div>
      </div>
      <div className={s.text}>
        本站所有文章除特别声明外，均采用
        <a
          href='https://creativecommons.org/licenses/by-nc-sa/4.0/'
          target='_blank'
          className={s.copyrightName}
          rel='noreferrer'
        >
          CC BY-NC-SA 4.0
        </a>
        许可协议，转载请注明来自
        <a href={myLink} target='_blank' className={s.copyrightName} rel='noreferrer'>
          {siteTitle}
        </a>
        。
      </div>
    </div>
  );
};

export default CopyRight;
