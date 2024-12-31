import React from "react";
import AccountCard from "./AccountCard";
import BlogCard from "./BlogCard";
import ClockCard from "./ClockCard";
import DataCard from "./DataCard";
import NoticeCard from "./NoticeCard";
import SiteCard from "./SiteCard";
import TagCard from "./TagCard";
import { ArticlesResponse, CategoriesResponse, NoticeResponse, TagsResponse } from "@/app/page";

import s from "./index.module.scss";


interface Props {
  articlesData: ArticlesResponse;
  noticeData: NoticeResponse | null;
  tagsData: TagsResponse;
  categoriesData: CategoriesResponse;
}


const Aside: React.FC<Props> = ({ articlesData, noticeData, tagsData, categoriesData }) => {

  return (
    <aside className={s.aside}>
      <BlogCard />
      <AccountCard />
      <DataCard articleCount={articlesData.meta.pagination.total} tagsCount={articlesData.meta.pagination.total} categoriesCount={categoriesData.meta.pagination.total} />
      <NoticeCard data={noticeData?.data.content || ""} />
      <ClockCard />
      <div className={s.cardSticky}>
        <TagCard data={tagsData.data} />
        {/* <SiteCard /> */}
      </div>
    </aside>
  );
};

export default Aside;
