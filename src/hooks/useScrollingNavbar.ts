import { useEffect, useCallback } from 'react';

export function useScrollingNavbar() {
  const handleScroll = useCallback(() => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    // 获取当前滚动位置
    const currentScrollY = window.scrollY;
    // 获取上一次滚动位置
    const lastScrollY = Number(navbar.getAttribute('data-scroll') || '0');
    
    // 更新滚动位置
    navbar.setAttribute('data-scroll', String(currentScrollY));

    // 如果在页面顶部附近，始终显示导航栏
    if (currentScrollY < 100) {
      navbar.classList.remove('navbar-hidden');
      return;
    }

    // 计算滚动距离
    const scrollDelta = currentScrollY - lastScrollY;

    // 向下滚动超过 10px 时隐藏
    if (scrollDelta > 10) {
      navbar.classList.add('navbar-hidden');
    }
    // 向上滚动超过 10px 时显示
    else if (scrollDelta < -10) {
      navbar.classList.remove('navbar-hidden');
    }
  }, []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // 使用 requestAnimationFrame 和 setTimeout 来节流
    const throttledScroll = () => {
      if (timeoutId) return;

      timeoutId = setTimeout(() => {
        requestAnimationFrame(() => {
          handleScroll();
          timeoutId = null;
        });
      }, 100); // 100ms 的节流时间
    };

    // 初始化时确保导航栏可见
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      navbar.classList.remove('navbar-hidden');
      navbar.setAttribute('data-scroll', '0');
    }

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [handleScroll]);
} 