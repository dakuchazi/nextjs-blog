
'use client';  // 添加这个声明

import {
  BgColorsOutlined,
  CheckOutlined,
  HomeOutlined,
  MenuOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  useEventListener,
  useLocalStorageState,
  useSafeState,
  useUpdateEffect,
} from "ahooks";
import { Drawer } from "antd";
import classNames from "classnames";
import React, { useEffect } from "react";
import { blogAdminUrl } from "@/utils/constant";
import { modeMap, modeMapArr } from "@/utils/modeMap";
import { useLinkList } from "./config";
import { useTheme } from "@/contexts/ThemeContext";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { Theme } from "@/contexts/ThemeContext/types";

import "./index.custom.scss";
import s from "./index.module.scss";

const Nav: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname();
  const { theme, setTheme, navShow, setNavShow } = useTheme()
  const [_, setLocalMode] = useLocalStorageState("localMode");
  const { navArr, secondNavArr, mobileNavArr } = useLinkList();
  const [visible, setVisible] = useSafeState(false);

  const modeOptions = [
    "rgb(19, 38, 36)",
    "rgb(110, 180, 214)",
    "rgb(171, 194, 208)",
  ];

  const isActiveLink = (path: string) => pathname === path;

  // 将 DOM 操作移到 useEffect 中
  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      setNavShow(event.deltaY < 0);
    };

    document.body.addEventListener('wheel', handleWheel);
    return () => document.body.removeEventListener('wheel', handleWheel);
  }, [setNavShow]);

  useUpdateEffect(() => {
    if (typeof window !== 'undefined') {
      const bodyStyle = document.getElementsByTagName("body")[0].style;

      setLocalMode(theme);
      for (const type of modeMapArr) {
        bodyStyle.setProperty(type, modeMap[type as keyof typeof modeMap][theme!]);
      }
    }
  }, [theme, setLocalMode]);

  return (
    <>
      <nav className={classNames(s.nav, { [s.hiddenNav]: !navShow })}>
        <div className={s.navContent}>
          {/* 主页 */}
          <Link href="/" prefetch={true} className={s.homeBtn}>
            <HomeOutlined />
          </Link>

          {/* 后台管理 */}
          <a
            className={s.adminBtn}
            href={blogAdminUrl}
            target="_blank"
            rel="noreferrer"
          >
            <SettingOutlined />
          </a>

          {/* 黑暗模式切换 */}
          <div className={s.modeBtn}>
            <BgColorsOutlined />
            <div className={s.modeOpions}>
              {modeOptions.map((backgroundColor, index) => (
                <div
                  key={index}
                  style={{ backgroundColor }}
                  className={classNames(s.modeItem, s[`modeItem${index}`])}
                  onClick={() => {
                    setTheme(index as Theme);
                  }}
                >
                  <CheckOutlined
                    style={{ display: theme === index ? "block" : "none" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 文章单独按钮 */}
          <div className={s.articlesBtn}>
            <div className={s.articelsSecond}>
              {secondNavArr.map((item, index) => (
                <Link
                  className={isActiveLink(item.to) ? s.sedActive : s.articelsSecondItem}
                  href={item.to}
                  prefetch={true}
                  key={index}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            文章
          </div>

          {/* 其他按钮 */}
          {navArr.map((item, index) => (
            <Link
              className={isActiveLink(item.to) ? s.navActive : s.navBtn}
              href={item.to}
              key={index}
              prefetch={true}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
      <div className={s.mobileNavBtn} onClick={() => setVisible(true)}>
        <MenuOutlined />
      </div>
      <Drawer
        placement="right"
        onClose={() => setVisible(false)}
        open={visible}
        className="mobile-nav-box"
      >
        <div className={s.mobileNavBox}>
          {mobileNavArr.map((item, index) => (
            <Link
              className={isActiveLink(item.to) ? s.mobileNavActive : s.mobileNavItem}
              href={item.to}
              key={index}
              prefetch={true}
            >
              {item.name}
            </Link>
          ))}
          {modeOptions.map((backgroundColor, index) => (
            <div
              key={index}
              style={{ backgroundColor }}
              className={classNames(s.modeItem, s[`modeItem${index}`])}
              onClick={() => setTheme(index as Theme)}
            >
              {theme === index && <CheckOutlined />}
            </div>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Nav;