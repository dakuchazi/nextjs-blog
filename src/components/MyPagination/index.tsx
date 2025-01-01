'use client';

import "./pagination.custom.scss";
import { Pagination } from "antd";
import React, { useCallback } from "react";

import s from "./index.module.scss";

interface Props {
  current?: number;
  defaultPageSize?: number;
  total?: number;
  setPage?: (value: number) => void;
  scrollToTop?: number;
  autoScroll?: boolean;
}

const MyPagination: React.FC<Props> = ({
  current,
  defaultPageSize = 8,
  total = 0,
  setPage,
  scrollToTop = 0,
  autoScroll = false,
}) => {
  // 使用 useCallback 优化性能
  const handlePageChange = useCallback((page: number) => {
    setPage?.(page);
    if (autoScroll && typeof window !== 'undefined') {
      window.scrollTo({
        top: scrollToTop,
        behavior: 'smooth' // 添加平滑滚动效果
      });
    }
  }, [setPage, autoScroll, scrollToTop]);

  // 只有当总数大于每页显示数时才显示分页
  if (total <= defaultPageSize) {
    return null;
  }

  return (
    <div id="myPagination" className={s.pageBox}>
      <Pagination
        current={current}
        total={total}
        defaultPageSize={defaultPageSize}
        showSizeChanger={false}
        showTitle={false}
        onChange={handlePageChange}
      />
    </div>
  );
};

export default MyPagination;