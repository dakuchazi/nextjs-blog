// app/tags/page.tsx
import Layout from "@/components/Layout";
import { Title } from "@/utils/titleConfig";
import axios from "@/utils/axios";
import { Metadata } from 'next';
import TagItem from "./components/TagItem";

import s from "./page.module.scss";

export const metadata: Metadata = {
  description: '文章标签'
};

interface Tag {
  id: number;
  documentId: string;
  name: string;
  articles?: {
    count: number;
  };
}

interface TagsResponse {
  data: Tag[];
  meta: {
    pagination: {
      total: number;
    };
  };
}

async function getTags() {
  try {
    const res = await axios.get('tags?pagination[pageSize]=9999&sort[publishedAt]=desc');

    return res.data as TagsResponse;
  } catch (error) {
    console.error('获取标签失败:', error);
    return { data: [], meta: { pagination: { total: 0 } } };
  }
}

export default async function TagsPage() {
  const tags = await getTags();

  return (
    <Layout title={Title.Tag} className={s.box} rows={3}>
      {tags.data.map((tag) => (
        <TagItem
          key={tag.id}
          id={tag.id}
          name={tag.name}
          count={tag.articles?.count || 0}
        />
      ))}
    </Layout>
  );
}