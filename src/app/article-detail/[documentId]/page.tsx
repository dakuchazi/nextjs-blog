import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import MarkDown from "@/components/MarkDown";
import CopyRight from "./components/CopyRight";
import ArtTags from "./components/ArtTags";
import { notFound } from "next/navigation";
import axios from "@/utils/axios";
import { Category, Tag } from "@/app/page";
import { Metadata } from "next";

import s from "./page.module.scss";

interface Cover {
  url: string;
  formats: {
    small: {
      url: string;
    };
    thumbnail: {
      url: string;
    };
  };
}

interface Block {
  __component: string;
  id: number;
  body: string;
}

interface Article {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: Cover;
  category: Category;
  blocks: Block[];
  tags: Tag[];
}

interface ArticleResponse {
  data: Article;
  meta: {};
}

interface PageProps {
  params: {
    documentId: string;
  };
}


// 获取文章数据
async function getArticle(documentId: string): Promise<ArticleResponse> {
  try {
    const res = await axios.get(`/articles/${documentId}?populate=*`);
    return res.data;
  } catch (error) {
    console.error('获取文章失败:', error);
    notFound();
  }
}

// 生成元数据
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const article = await getArticle(params.documentId);
  return {
    description: article.data.description
  };
}

// 页面组件
export default async function ArtDetail({ params }: PageProps) {
  const { documentId } = await params

  const article = await getArticle(params.documentId);
  const content = article.data.blocks[0]?.body || '';

  return (
    <Layout
      title={article.data.title}
      category={article.data.category}
      date={article.data.publishedAt}
      isArticle={true}
      rows={14}
    >
      <MarkDown content={content} className={s.mb} />
      <ArtTags tags={article.data.tags} />
      <CopyRight
        documentId={article.data.documentId}
        title={article.data.title}
      />
    </Layout>
  );
}
