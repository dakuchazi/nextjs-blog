'use client'

import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import MyPagination from "@/components/MyPagination";
import { detailPostSize } from "@/utils/constant";
import DisplayBar from "@/components/DisplayBar";
import Search from "./components/Search";
import { Title } from "@/utils/titleConfig";
import { useRouter } from 'next/navigation';
import axios from "@/utils/axios";
import { ArticlesResponse } from "../page";

const ArticleList = () => {
  const router = useRouter();
  const [articles, setArticles] = useState<ArticlesResponse>({
    data: [],
    meta: { pagination: { page: 1, pageSize: detailPostSize, pageCount: 0, total: 0 } }
  });
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState('');
  const [current, setCurrent] = useState(1);

  const fetchArticles = async (searchTitle: string, page: number) => {
    setLoading(true);
    try {
      const queryString = new URLSearchParams({
        'populate': 'tags',
        'filters[title][$contains]': searchTitle,
        'pagination[page]': String(page),
        'pagination[pageSize]': String(detailPostSize)
      }).toString();

      const res = await axios.get(`/articles?${queryString}`);
      setArticles(res.data);
    } catch (error) {
      console.error('获取文章失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载
  useEffect(() => {
    fetchArticles('', 1);
  }, []);

  const handleSearch = () => {
    setCurrent(1);
    fetchArticles(title, 1);
  };

  const handlePageChange = (page: number) => {
    setCurrent(page);
    fetchArticles(title, page);
  };

  return (
    <Layout title={Title.Article}>
      <Search
        value={title}
        onChange={setTitle}
        onSearch={handleSearch}
      />

      {loading ? (
        <div className="text-center py-4">加载中...</div>
      ) : articles.data.length ? (
        articles.data.map((article) => (
          <DisplayBar
            key={article.id}
            content={article.title}
            right={new Date(article.createdAt).toLocaleDateString()}
            onClick={() => router.push(`/article-detail/${article.documentId}`)}
          />
        ))
      ) : (
        <div className="text-center py-4">暂时无相应文章 ~</div>
      )}

      <MyPagination
        current={current}
        defaultPageSize={detailPostSize}
        total={articles.meta.pagination.total}
        setPage={handlePageChange}
        autoScroll={true}
        scrollToTop={440}
      />
    </Layout>
  );
};

export default ArticleList;