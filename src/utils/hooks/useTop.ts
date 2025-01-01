import { useMount } from 'ahooks';

const useTop = (setNavShow?: (value: boolean) => void) => {
  useMount(() => {
    window.scrollTo(0, 0);
    setNavShow?.(true);
  });
};

export default useTop;
