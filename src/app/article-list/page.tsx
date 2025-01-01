import { Metadata } from 'next';
import { detailPostSize } from "@/utils/constant";
import { ArticlesResponse } from "../page";
import ArticleList from './components/ArticleList';

export const dynamic = 'force-dynamic';

// 根据 URL 参数获取文章
async function getArticles(searchParams: { tag?: string; category?: string }): Promise<ArticlesResponse> {
  try {
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

    const queryString = new URLSearchParams(queryParams).toString();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/articles?${queryString}`, {
      cache: 'no-store'
    });

    if (!res.ok) throw new Error('Failed to fetch articles');
    return res.json();
  } catch (error) {
    console.error('获取文章失败:', error);
    return {
      data: [],
      meta: { pagination: { page: 1, pageSize: detailPostSize, pageCount: 0, total: 0 } }
    };
  }
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { tag?: string; category?: string }
}) {
  const initialArticles = await getArticles(searchParams);

  return <ArticleList
    initialArticles={initialArticles}
    initialTag={searchParams.tag || ''}
    initialCategory={searchParams.category || ''}
  />;
}