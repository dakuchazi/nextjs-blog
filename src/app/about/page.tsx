import Layout from "@/components/Layout";
import { Title } from "@/utils/titleConfig";
import MarkDown from '@/components/MarkDown';
import axios from "@/utils/axios";
import { Metadata } from 'next';

export const metadata: Metadata = {
  description: '关于我'
};

interface AboutResponse {
  data: {
    id: number;
    documentId: string;
    title: string;
    blocks: Array<{
      __component: string;
      id: number;
      body: string;
    }>;
  };
  meta: {};
}

async function getAboutContent() {
  try {
    const res = await axios.get('about?populate=blocks');
    return res.data as AboutResponse;
  } catch (error) {
    console.error('获取关于页面内容失败:', error);
    return null;
  }
}

export default async function AboutPage() {
  const aboutData = await getAboutContent();
  const markdownContent = aboutData?.data.blocks[0]?.body || '';

  return (
    <Layout title={Title.About}>
      <div className="max-w-3xl mx-auto px-4 py-6">
        <MarkDown content={markdownContent} />
      </div>
    </Layout>
  );
}