'use client'

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import MyPagination from "@/components/MyPagination";
import { detailPostSize } from "@/utils/constant";
import DisplayBar from "@/components/DisplayBar";
import Search from "../Search";
import { Title } from "@/utils/titleConfig";
import { useRouter } from 'next/navigation';
import axios from "@/utils/axios";
import { ArticlesResponse } from "@/app/page";

interface ArticleListProps {
    initialArticles: ArticlesResponse;
    initialTag?: string;
    initialCategory?: string;
}

interface QueryParams {
    [key: string]: string;  // 添加索引签名
    populate: string;
    'pagination[page]': string;
    'pagination[pageSize]': string;
}

const ArticleList = ({ initialArticles, initialTag = '', initialCategory = '' }: ArticleListProps) => {
    const router = useRouter();
    const [articles, setArticles] = useState<ArticlesResponse>(initialArticles);
    const [loading, setLoading] = useState(false);
    const [searchValues, setSearchValues] = useState({
        title: '',
        tag: initialTag,           // 使用初始标签
        category: initialCategory  // 使用初始分类
    });
    const [current, setCurrent] = useState(1);

    // 当有初始搜索值时自动搜索
    useEffect(() => {
        if (initialTag || initialCategory) {
            fetchArticles({
                title: '',
                tag: initialTag,
                category: initialCategory
            }, 1);
        }
    }, [initialTag, initialCategory]);

    const fetchArticles = async (values: typeof searchValues, page: number) => {
        setLoading(true);
        try {
            const queryParams: QueryParams = {
                'populate': '*',
                'pagination[page]': String(page),
                'pagination[pageSize]': String(detailPostSize)
            };

            // 添加标题搜索条件
            if (values.title) {
                queryParams['filters[title][$contains]'] = values.title;
            }

            // 添加标签搜索条件
            if (values.tag) {
                queryParams['filters[tags][name][$contains]'] = values.tag;
            }

            // 添加分类搜索条件
            if (values.category) {
                queryParams['filters[category][name][$contains]'] = values.category;
            }

            const queryString = new URLSearchParams(queryParams).toString();
            const res = await axios.get(`/articles?${queryString}`);
            setArticles(res.data);
        } catch (error) {
            console.error('获取文章失败:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        setCurrent(1);
        fetchArticles(searchValues, 1);
    };

    const handleReset = () => {
        router.replace('/article-list');
        setSearchValues({ title: '', tag: '', category: '' });
        setCurrent(1);
        fetchArticles({ title: '', tag: '', category: '' }, 1);
    };

    const handleSearchChange = (key: keyof typeof searchValues, value: string) => {
        setSearchValues(prev => ({ ...prev, [key]: value }));
    };

    const handlePageChange = (page: number) => {
        setCurrent(page);
        fetchArticles(searchValues, page);
    };

    return (
        <Layout title={Title.Article}>
            <Search
                values={searchValues}
                onChange={handleSearchChange}
                onSearch={handleSearch}
                onReset={handleReset}
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