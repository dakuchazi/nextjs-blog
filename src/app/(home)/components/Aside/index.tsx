import React from "react";
import AccountCard from "./AccountCard";
import BlogCard from "./BlogCard";
import ClockCard from "./ClockCard";
import DataCard from "./DataCard";
import NoticeCard from "./NoticeCard";
import SiteCard from "./SiteCard";
import TagCard from "./TagCard";

import s from "./index.module.scss";

const Aside: React.FC = () => {
  return (
    <aside className={s.aside}>
      <BlogCard />
      <AccountCard />
      <DataCard />
      <NoticeCard />
      <ClockCard />
      <div className={s.cardSticky}>
        <TagCard />
        {/* <SiteCard /> */}
      </div>
    </aside>
  );
};

export default Aside;
