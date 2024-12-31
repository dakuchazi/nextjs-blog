'use client'

import React, { useState, useEffect } from "react";
import Comment from "./components/Comment";
import Layout from "@/components/Layout";
import MsgInfo from "./components/MsgInfo";
import { Title } from "@/utils/titleConfig";
import axios from "@/utils/axios";

interface RichText {
  __component: string;
  id: number;
  body: string;
}

export interface Message {
  id: number;
  nickname: string;
  email: string;
  body: RichText[];
  parent: number | null;
  avatar: string;
  createdAt: string;
}

export interface MessagesResponse {
  data: Message[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const Msg = () => {
  const [messages, setMessages] = useState<MessagesResponse | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMessages = async (page: number) => {
    try {
      const res = await axios.get(`/msgs?populate=*&sort[updatedAt]=desc&pagination[page]=${page}&pagination[pageSize]=${25}`);
      setMessages(res.data);
    } catch (error) {
      console.error('获取留言失败:', error);
    }
  };

  const refreshMessages = () => {
    fetchMessages(1); // 刷新后返回第一页
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchMessages(currentPage);
  }, [currentPage]);

  return (
    <Layout title={Title.Msg}>
      <MsgInfo />
      <Comment
        refresh={refreshMessages}
        data={messages}
        current={currentPage}
        setPage={setCurrentPage}
        autoScroll={true}
        scrollToTop={440 + 370}
      />
    </Layout>
  );
};

export default Msg;