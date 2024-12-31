import React from "react";
import MyPagination from "@/components/MyPagination";
import Divider from "./Divider";
import MsgList from "./MsgList";
import Placehold from "./Placehold";
import { MessagesResponse } from "../../page";
import EditBox from "./EditBox";


interface Props {
  data: MessagesResponse | null;
  current: number;
  setPage: (page: number) => void;
  autoScroll?: boolean;
  scrollToTop?: number;
  refresh?: () => void;
}

const Comment: React.FC<Props> = ({
  data,
  current,
  setPage,
  autoScroll = true,
  scrollToTop = 0,
  refresh
}) => {
  if (!data) return null;  // 添加空值检查

  return (
    <div>
      <Divider />
      <Placehold msgCount={data.meta.pagination.total} />
      <EditBox refresh={refresh} />
      <MsgList data={data.data} />
      <MyPagination
        current={current}
        defaultPageSize={25}  // 改为25以匹配API请求
        total={data.meta.pagination.total}
        setPage={setPage}
        autoScroll={autoScroll}
        scrollToTop={scrollToTop}
      />
    </div>
  );
};

export default Comment;