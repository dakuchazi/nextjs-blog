import { siteTitle, annotation } from "@/utils/constant";
import PageTitle from "@/components/PageTitle";
import Section from "./(home)/components/Section";
import Aside from "./(home)/components/Aside";
import ClientHome from "./(home)/components/ClientHome";
import axios from "@/utils/axios";

import s from "./(home)/page.module.scss";

export interface Article {
    id: number;
    documentId: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    locale: string | null;
    tags: any[];
}

export interface ArticlesResponse {
    data: Article[];
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            pageCount: number;
            total: number;
        };
    };
}

export interface NoticeResponse {
    data: {
        id: number,
        documentId: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        locale: string | null;
        content: string;
    }
    meta: {};
}
interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
}

export interface Tag {
    id: number;
    documentId: string;
    name: string;
    articles?: {
        count: number;
    };
}

export interface TagsResponse {
    data: Tag[];
    meta: {
        pagination: {
            total: number;
        };
    };
}

export interface Category {
    id: number;
    documentId: string;
    name: string;
    description: string | null;
    publishedAt: string;
    articles: {
        count: number;
    }
}

export interface CategoriesResponse {
    data: Category[];
    meta: {
        pagination: {
            total: number;
        };
    };
}

// 获取诗句的函数
async function getPoem() {
    try {
        const res = await fetch('https://v2.jinrishici.com/one.json');
        const data = await res.json();
        return data.data.content;
    } catch (error) {
        console.error('获取诗句失败:', error);
        return '';
    }
}

// 获取公告
async function getNotice() {
    try {
        const res = await axios.get('/notice');
        return res.data as NoticeResponse;
    } catch (error) {
        console.error('获取公告失败:', error);
        return null;
    }
}

// 获取文章
async function getArticles(): Promise<ArticlesResponse> {
    try {
        const res = await axios.get('/articles?populate=tags&pagination[pageSize]=5&pagination[page]=1&sort[publishedAt]=desc');
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
async function getTags() {
    try {
        const res = await axios.get('tags?pagination[pageSize]=9999&sort[publishedAt]=desc');
        return res.data as TagsResponse;
    } catch (error) {
        console.error('获取标签失败:', error);
        return { data: [], meta: { pagination: { total: 0 } } };
    }
}

// 获取分类
async function getCategories() {
    try {
        const res = await axios.get('categories?fields[0]=id');
        return res.data as CategoriesResponse;
    } catch (error) {
        console.error('获取分类失败:', error);
        return { data: [], meta: { pagination: { total: 0 } } };
    }
}

// 服务端组件
export default async function Home() {
    // 并行获取数据
    const [articlesResponse, poem, noticeResponse, tagsResponse, categoriesResponse] = await Promise.all([
        getArticles(),
        getPoem(),
        getNotice(),
        getTags(),
        getCategories()
    ]);

    return (
        <ClientHome>
            <PageTitle
                title={siteTitle}
                desc={poem}
                children={annotation}
                className={s.homeTitle}
            />
            <div className={s.body}>
                <Section
                    articles={articlesResponse.data}
                    pagination={articlesResponse.meta.pagination}
                />
                <Aside articlesData={articlesResponse} noticeData={noticeResponse} tagsData={tagsResponse} categoriesData={categoriesResponse} />
            </div>
        </ClientHome>
    );
}