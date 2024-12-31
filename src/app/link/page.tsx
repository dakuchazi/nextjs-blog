import Layout from "@/components/Layout";
import { Title } from "@/utils/titleConfig";
import { shuffleArray } from "@/utils/function";
import axios from "@/utils/axios";
import { Metadata } from 'next';
import LinkItem from "./components/LinkItem";
import { getFullImageUrl } from "@/utils/url";

import s from "./page.module.scss";

export const metadata: Metadata = {
  description: '友情链接'
};

// 类型定义
interface LinkAvatar {
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

interface Link {
  id: number;
  documentId: string;
  name: string;
  url: string;
  desc: string;
  avatar: LinkAvatar;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface LinksResponse {
  data: Link[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// 获取数据函数
async function getLinks() {
  try {
    const res = await axios.get('links?pagination[pageSize]=9999&populate=avatar&&sort[publishedAt]=desc');
    return res.data as LinksResponse;
  } catch (error) {
    console.error('获取友链失败:', error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 99999,
          pageCount: 0,
          total: 0
        }
      }
    };
  }
}

export default async function LinksPage() {
  const links = await getLinks();
  const shuffledLinks = shuffleArray([...links.data]);

  return (
    <Layout title={Title.Link} className={s.box}>
      {shuffledLinks.length > 0 ? (
        shuffledLinks.map((link) => (
          <LinkItem
            key={link.id}
            link={link.url}
            avatar={getFullImageUrl(link.avatar.formats.small.url)}
            name={link.name}
            descr={link.desc}
          />
        ))
      ) : (
        <div className="text-center py-8">暂无友链</div>
      )}
    </Layout>
  );
}