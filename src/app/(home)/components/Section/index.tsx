'use client';

import React, { useEffect, useState } from "react";
import MyPagination from "@/components/MyPagination";
import PostCard from "./PostCard";
import { useRouter } from "next/navigation";
import { formatDate } from "@/utils/function";

import s from "./index.module.scss";

interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tags: any[];
  locale: string | null;
}

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface SectionProps {
  articles: Article[];
  pagination: Pagination;
}

const Section: React.FC<SectionProps> = ({ articles, pagination }) => {
  const router = useRouter();
  const [current, setCurrent] = useState(pagination.page);
  const [scrollPosition, setScrollPosition] = useState(0);


  useEffect(() => {
    // 在客户端更新滚动位置
    setScrollPosition(document.body.clientHeight - 80);
  }, []); // 空依赖数组，只在组件挂载时执行一次

  return (
    <section className={s.section}>
      {articles.map((article) => (
        <PostCard
          key={article.id}
          title={article.title}
          content={article.description}
          date={formatDate(article.publishedAt)}
          tags={article.tags}
          onClick={() => router.push(`/artDetail?artId=${article.id}`)}
        />
      ))}
      <MyPagination
        current={current}
        defaultPageSize={pagination.pageSize}
        total={pagination.total}
        setPage={setCurrent}
        autoScroll={true}
        scrollToTop={scrollPosition}
      />
    </section>
  );
};

export default Section;