import { useState, useEffect, useRef } from 'react';

/**
 * 检测页面滚动方向的Hook
 * @param threshold 滚动方向判断的阈值（像素），默认为10px
 * @param initialDirection 初始方向，默认为'idle'
 * @returns 当前滚动方向：'up' | 'down' | 'idle'
 */
const useScrollDirection = (
  threshold = 10,
  initialDirection: 'up' | 'down' | 'idle' = 'idle'
) => {
  const [direction, setDirection] = useState<('up' | 'down' | 'idle')>(initialDirection);
  const [scrollY, setScrollY] = useState(0);
  const prevScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrollY(currentScrollY);

      // 当滚动位置变化超过阈值时，更新滚动方向
      if (Math.abs(currentScrollY - prevScrollY.current) > threshold) {
        const newDirection = currentScrollY > prevScrollY.current ? 'down' : 'up';
        setDirection(newDirection);
        prevScrollY.current = currentScrollY > 0 ? currentScrollY : 0;
      }
    };

    // 节流处理，避免频繁触发
    let frameRequestId: number;
    const throttledScroll = () => {
      handleScroll();
      frameRequestId = requestAnimationFrame(throttledScroll);
    };

    // 初始化并开始监听滚动事件
    window.addEventListener('scroll', () => {
      if (!frameRequestId) {
        frameRequestId = requestAnimationFrame(throttledScroll);
      }
    });

    // 清理函数
    return () => {
      if (frameRequestId) {
        cancelAnimationFrame(frameRequestId);
      }
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [threshold]);

  return { direction, scrollY };
};

export default useScrollDirection;