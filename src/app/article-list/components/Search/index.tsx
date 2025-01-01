import { ArrowRightOutlined, RedoOutlined } from "@ant-design/icons";
import { useKeyPress } from "ahooks";
import React, { useRef } from "react";
import s from "./index.module.scss";

interface SearchValues {
  title: string;
  tag: string;
  category: string;
}

interface Props {
  values: SearchValues;
  onSearch: () => void;
  onChange: (key: keyof SearchValues, value: string) => void;
  onReset: () => void;
}

const Search: React.FC<Props> = ({ values, onSearch, onChange, onReset }) => {
  const titleRef = useRef(null);

  useKeyPress(13, () => onSearch(), {
    target: titleRef,
  });

  useKeyPress(27, () => onReset(), {
    target: titleRef,
  });

  return (
    <div className={s.searchBox}>
      <div className={s.inputGroup}>
        <input
          ref={titleRef}
          autoFocus
          type="text"
          placeholder="搜索文章标题..."
          className={s.search}
          value={values.title}
          onChange={(e) => onChange('title', e.target.value)}
        />
        <input
          type="text"
          placeholder="标签..."
          className={s.search}
          value={values.tag}
          onChange={(e) => onChange('tag', e.target.value)}
        />
        <input
          type="text"
          placeholder="分类..."
          className={s.search}
          value={values.category}
          onChange={(e) => onChange('category', e.target.value)}
        />
      </div>
      <div className={s.btnBox}>
        {/* 搜索按钮 */}
        <div className={s.searchBtn} onClick={onSearch}>
          <ArrowRightOutlined />
        </div>

        {/* 重置按钮 */}
        <div className={s.searchBtn} onClick={onReset}>
          <RedoOutlined />
        </div>
      </div>

    </div>
  );
};

export default Search;