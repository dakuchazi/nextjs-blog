export const useLinkList = () => {
  const navArr = [
    { name: '说说', to: '/status-update' },
    { name: '留言', to: '/msg' },
    { name: '友链', to: '/link' },
    { name: '作品', to: '/portfolio' },
    { name: '关于', to: '/about' }
  ];
  const secondNavArr = [
    { name: '找文章', to: '/article-list' },
    { name: '分类', to: '/category' },
    { name: '标签', to: '/tag' }
  ];

  const mobileNavArr = [
    { name: '主页', to: '/' },
    { name: '文章', to: '/article-list' },
    { name: '分类', to: '/category' },
    { name: '标签', to: '/tag' },
    { name: '说说', to: '/status-update' },
    { name: '留言', to: '/msg' },
    { name: '友链', to: '/link' },
    { name: '作品', to: '/portfolio' },
    { name: '关于', to: '/about' }
  ];

  return {
    navArr,
    secondNavArr,
    mobileNavArr
  };
};
