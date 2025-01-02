
import { ArrowRightOutlined, RedoOutlined } from "@ant-design/icons";
import React, { useRef } from "react";
import { Category, Tag } from "@/app/page";
import { Input, Select } from "antd";

import s from "./index.module.scss";


interface SearchValues {
  title: string;
  tag: string | null;
  category: string | null;
}

interface Props {
  values: SearchValues;
  onSearch: () => void;
  onChange: (key: keyof SearchValues, value: string) => void;
  onReset: () => void;
  tags: Tag[];
  categories: Category[];
}

const Search: React.FC<Props> = ({ values, onSearch, onChange, onReset, tags, categories }) => {


  return (
    <div className={s.searchBox}>
      <div className={s.inputGroup}>
        <Input
          placeholder="搜索文章标题..."
          className={s['antd-input']}
          value={values.title}
          onChange={(e) => onChange('title', e.target.value)}
        />

        <Select
          className={s['antd-select']}
          placeholder="选择标签..."
          value={values.tag}
          onChange={(value) => onChange('tag', value)}
          allowClear
        >
          {tags.map(tag => (
            <Select.Option key={tag.id} value={tag.name}>
              {tag.name}
            </Select.Option>
          ))}
        </Select>
        <Select
          className={s['antd-select']}
          placeholder="选择分类..."
          value={values.category}
          onChange={(value) => onChange('category', value)}
          allowClear
        >
          {categories.map(category => (
            <Select.Option key={category.id} value={category.name}>
              {category.name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <div className={s.btnBox}>
        <div className={s.searchBtn} onClick={onSearch}>
          <ArrowRightOutlined />
        </div>
        <div className={s.searchBtn} onClick={onReset}>
          <RedoOutlined />
        </div>
      </div>
    </div>
  );
};

export default Search;