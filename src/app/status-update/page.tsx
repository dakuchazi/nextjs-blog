import Layout from "@/components/Layout";
import axios from "@/utils/axios";
import { Title } from "@/utils/titleConfig";
import { Metadata } from 'next';
import { myAvatar70 } from "@/utils/constant";
import dayjs from "dayjs";

import s from "./page.module.scss";

export const metadata: Metadata = {
  description: '说说'
};

// 类型定义
interface StatusUpdate {
  id: number;
  documentId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string | null;
}

interface StatusUpdateResponse {
  data: StatusUpdate[];
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
async function getStatusUpdates() {
  try {
    const res = await axios.get('status-updates?pagination[pageSize]=10000&sort[publishedAt]=desc');
    return res.data as StatusUpdateResponse;
  } catch (error) {
    console.error('获取状态更新失败:', error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 10000,
          pageCount: 0,
          total: 0
        }
      }
    };
  }
}

function SayPop({ content, date }: { content: string; date: string }) {
  return (
    <div className={s.sayItem}>
      <div className={s.avatarBox}>
        <img src={myAvatar70} className={s.avatar} alt="avatar" />
      </div>

      <div className={s.contentBox}>
        <div className={s.content}>
          {content}
          <span className={s.date}>{dayjs(date).format('YYYY-MM-DD HH:mm:ss')}</span>
        </div>
      </div>
    </div>
  );
}

export default async function StatusUpdatePage() {
  const statusUpdates = await getStatusUpdates();

  return (
    <Layout title={Title.StatusUpdate}>
      {statusUpdates.data.map((update) => (
        <SayPop
          key={update.id}
          content={update.content}
          date={update.createdAt}
        />
      ))}
      {statusUpdates.data.length === 0 && (
        <div className="text-center py-8">暂无动态</div>
      )}
    </Layout>
  );
}