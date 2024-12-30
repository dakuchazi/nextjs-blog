import Layout from "@/components/Layout";
import { Title } from "@/utils/titleConfig";
import axios from "@/utils/axios";
import { Metadata } from 'next';
import Item from "./components/Item";

import s from "./page.module.scss";

export const metadata: Metadata = {
  description: '作品展示'
};

// 类型定义
interface PortfolioCover {
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

interface Portfolio {
  id: number;
  documentId: string;
  title: string;
  desc: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  cover: PortfolioCover;
  locale: string | null;
}

interface PortfoliosResponse {
  data: Portfolio[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function getPortfolios() {
  try {
    const res = await axios.get('portfolios?populate=cover&pagination[pageSize]=10000&sort[publishedAt]=desc');
    console.log('===res.data===', res.data);
    return res.data as PortfoliosResponse;
  } catch (error) {
    console.error('获取作品列表失败:', error);
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

export default async function PortfoliosPage() {
  const portfolios = await getPortfolios();

  return (
    <Layout title={Title.Portfolio} className={s.showBox}>
      {portfolios.data.length > 0 ? (
        portfolios.data.map((item) => (
          <Item
            key={item.id}
            cover={item.cover.url}
            link={item.url}
            name={item.title}
            descr={item.desc}
          />
        ))
      ) : (
        <div className="text-center py-8">暂无作品展示</div>
      )}
    </Layout>
  );
}