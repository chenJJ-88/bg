// 无限滚动
import { useState, useEffect, useRef, RefObject } from 'react';
interface InfiniteScrollResult {
  domRef: RefObject<HTMLTableSectionElement>;
  setStartTimer: (value: boolean) => void;
}
function useInfiniteScroll(dataSource: any[]): InfiniteScrollResult {
  const [startTimer, setStartTimer] = useState(true);
  const top = useRef(0);
  const domRef = useRef<HTMLTableSectionElement>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (dataSource && dataSource.length > 0 && startTimer) {
      const tableHtml = domRef.current;
      if (tableHtml && tableHtml.scrollHeight >= tableHtml.clientHeight) {
        timer = setInterval(() => {
          if (
            tableHtml.scrollTop >= tableHtml.scrollHeight - tableHtml.clientHeight
          ) {
            top.current = 0;
            tableHtml.scrollTo(0, 0);
          } else {
            top.current += 1;
            tableHtml.scrollTo(0, top.current);
          }
        }, 50);
      }
    }
    return () => {
      timer && clearInterval(timer);
    };
  }, [dataSource, startTimer]);

  return {
    domRef,
    setStartTimer
  };
}

export default useInfiniteScroll;
