import { detailPostSize } from "@/utils/constant";
import { ArticlesResponse, CategoriesResponse, TagsResponse } from "../page";
import ArticleList from './components/ArticleList';
import { Metadata } from "next";
import axios from "@/utils/axios";

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


// 获取文章
async function getArticles(queryString: string): Promise<ArticlesResponse> {
  try {
    const res = await axios.get(`/articles?${queryString}`);
    return res.data;
  } catch (error) {
    console.error('获取文章失败:', error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 5,
          pageCount: 0,
          total: 0
        }
      }
    };
  }
}

// 获取标签
async function getTags(): Promise<TagsResponse> {
  try {
    const res = await axios.get('/tags?pagination[pageSize]=9999&sort[publishedAt]=desc');
    return res.data
  } catch (error) {
    console.error('获取标签失败:', error);
    return { data: [], meta: { pagination: { total: 0 } } };
  }
}

// 获取分类
async function getCategories(): Promise<CategoriesResponse> {
  try {
    const res = await axios.get('/categories?pagination[pageSize]=9999&sort[publishedAt]=desc');
    return res.data
  } catch (error) {
    console.error('获取分类失败:', error);
    return { data: [], meta: { pagination: { total: 0 } } };
  }
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


  const queryString = new URLSearchParams(queryParams).toString();
  const [articlesData, tagsData, categoriesData] = await Promise.all([
    getArticles(queryString),
    getTags(),
    getCategories()
  ]);


  return (
    <ArticleList
      initialArticles={articlesData}
      initialTag={searchParams.tag}
      initialCategory={searchParams.category}
      tags={tagsData.data}
      categories={categoriesData.data}
    />
  );
}