'use client'

import React, { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import MyPagination from "@/components/MyPagination";
import { detailPostSize } from "@/utils/constant";
import ArtList from "./components/ArtList";
import Search from "./components/Search";
import { Title } from "@/utils/titleConfig";


const Articles: React.FC = () => {

  const [current, setCurrent] = useState(1);
  const [title, seTtitle] = useState("");
  const onSearch = () => {

  };
  return (
    <Layout title={Title.Articles}>
      <Search value={title} onChange={seTtitle} onSearch={onSearch} />
      <ArtList data={[]} />
      <MyPagination
        current={current}
        defaultPageSize={detailPostSize}
        total={0}
        setPage={setCurrent}
        autoScroll={true}
        scrollToTop={440}
      />
    </Layout>
  );
};

export default Articles;
