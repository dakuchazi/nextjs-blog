'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import classNames from 'classnames';

import 'highlight.js/styles/github-dark.css';
import s from './index.module.scss';

interface Props {
  content?: string;
  className?: string;
}

const MarkDown: React.FC<Props> = ({ content = '', className }) => {
  return (
    <div className={classNames(s.markdown, className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          // 自定义渲染组件
          a: ({ node, ...props }) => (
            <a target="_blank" rel="noopener noreferrer" {...props} />
          ),
          // 可以添加更多自定义组件渲染
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkDown;