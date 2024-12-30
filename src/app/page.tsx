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
    slug: string;
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

export interface Pagination {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
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

// 获取文章的函数
async function getArticles(): Promise<ArticlesResponse> {
    try {
        const res = await axios.get('/articles?populate=tags&sort[publishedAt]=desc');
        return res.data;
    } catch (error) {
        console.error('获取文章失败:', error);
        return {
            data: [],
            meta: {
                pagination: {
                    page: 1,
                    pageSize: 25,
                    pageCount: 0,
                    total: 0
                }
            }
        };
    }
}

// 服务端组件
export default async function Home() {
    // 并行获取数据
    const [articlesResponse, poem] = await Promise.all([
        getArticles(),
        getPoem()
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
                <Aside />
            </div>
        </ClientHome>
    );
}