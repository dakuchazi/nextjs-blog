import Layout from "@/components/Layout";
import { Title } from "@/utils/titleConfig";
import axios from "@/utils/axios";
import CategoryItem from "./components/CategoryItem";
import { Metadata } from 'next';
import { Category } from "../page";

import s from "./page.module.scss";

export const metadata: Metadata = {
  description: '文章分类'
};


interface CategoriesResponse {
  data: Category[];
  meta: {
    pagination: {
      total: number;
    };
  };
}

async function getCategories() {
  try {
    const res = await axios.get('categories?pagination[pageSize]=9999&sort[publishedAt]=desc&populate[articles][count]=true');

    return res.data as CategoriesResponse;
  } catch (error) {
    console.error('获取分类失败:', error);
    return { data: [], meta: { pagination: { total: 0 } } };
  }
}

export default async function CategoriesPage() {
  const categoriesData = await getCategories();

  return (
    <Layout title={Title.Category} className={s.classBox} rows={8}>
      {categoriesData.data.map((category) => (
        <CategoryItem
          key={category.id}
          className={s.classItem}
          name={category.name}
          num={category.articles.count}
        />
      ))}
    </Layout>
  );
}