import { detailPostSize } from "@/utils/constant";
import { ArticlesResponse } from "../page";
import ArticleList from './components/ArticleList';
import { Metadata } from "next";

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  description: '文章列表',
};

interface PageProps {
  searchParams: Promise<{
    tag?: string;
    category?: string
  }>;
}

export default async function Page(props: PageProps) {
  const searchParams = await props.searchParams

  // 获取文章数据
  const queryParams: Record<string, string> = {
    'populate': '*',
    'pagination[page]': '1',
    'pagination[pageSize]': String(detailPostSize)
  };

  if (searchParams.tag) {
    queryParams['filters[tags][name][$contains]'] = searchParams.tag;
  }

  if (searchParams.category) {
    queryParams['filters[category][name][$contains]'] = searchParams.category;
  }

  let initialArticles: ArticlesResponse;
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?${queryString}`, {
      cache: 'no-store'
    });

    if (!res.ok) throw new Error('Failed to fetch articles');
    initialArticles = await res.json();
  } catch (error) {
    console.error('获取文章失败:', error);
    initialArticles = {
      data: [],
      meta: { pagination: { page: 1, pageSize: detailPostSize, pageCount: 0, total: 0 } }
    };
  }

  return (
    <ArticleList
      initialArticles={initialArticles}
      initialTag={searchParams.tag}
      initialCategory={searchParams.category}
    />
  );
}