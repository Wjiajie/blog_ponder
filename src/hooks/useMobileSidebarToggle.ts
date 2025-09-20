import { useEffect, useCallback } from 'react';

export function useMobileSidebarToggle() {
  // 检查是否为移动设备（基于CSS媒体查询的断点）
  const isMobile = useCallback(() => {
    return window.innerWidth <= 996;
  }, []);

  // 通过触发按钮点击事件来隐藏侧边栏，确保状态完全同步
  const hideSidebar = useCallback(() => {
    if (!isMobile()) return;
    
    const sidebar = document.querySelector('.navbar-sidebar--show');
    const toggleButton = document.querySelector('.navbar__toggle');
    
    if (sidebar && toggleButton) {
      // 移除显示类以隐藏侧边栏
      sidebar.classList.remove('navbar-sidebar--show');
      
      // 更新切换按钮的aria-expanded属性为false
      toggleButton.setAttribute('aria-expanded', 'false');
      
      // 触发一次切换按钮的点击事件，确保所有内部状态都被重置
      setTimeout(() => {
        // 确保侧边栏确实已经隐藏了
        if (!document.querySelector('.navbar-sidebar--show')) {
          const clickEvent = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
          });
          // 但不实际执行，只是为了触发状态更新
          Object.defineProperty(clickEvent, 'target', {value: toggleButton, enumerable: true});
          toggleButton.dispatchEvent(clickEvent);
        }
      }, 10);
    }
  }, [isMobile]);

  // 处理背景遮罩点击事件
  const handleBackdropClick = useCallback(() => {
    hideSidebar();
  }, [hideSidebar]);

  // 处理点击侧边栏外部区域的事件
  const handleDocumentClick = useCallback((event: MouseEvent) => {
    if (!isMobile()) return;
    
    const sidebar = document.querySelector('.navbar-sidebar--show');
    const backdrop = document.querySelector('.navbar-sidebar__backdrop');
    const toggleButton = document.querySelector('.navbar__toggle');
    
    // 检查点击是否发生在侧边栏外部且不是在切换按钮上
    if (sidebar && 
        !sidebar.contains(event.target as Node) && 
        event.target !== toggleButton && 
        toggleButton && 
        !toggleButton.contains(event.target as Node)) {
      
      // 如果存在背景遮罩，优先通过点击遮罩来关闭侧边栏
      if (backdrop && backdrop.contains(event.target as Node)) {
        handleBackdropClick();
      } else {
        // 否则直接隐藏侧边栏
        hideSidebar();
      }
    }
  }, [isMobile, handleBackdropClick, hideSidebar]);

  useEffect(() => {
    // 只在移动设备上添加事件监听器
    if (!isMobile()) return;
    
    // 获取背景遮罩元素
    const backdrop = document.querySelector('.navbar-sidebar__backdrop');
    
    // 如果背景遮罩不存在，创建一个
    if (!backdrop) {
      const newBackdrop = document.createElement('div');
      newBackdrop.className = 'navbar-sidebar__backdrop';
      document.body.appendChild(newBackdrop);
    }
    
    // 添加点击事件监听器
    document.addEventListener('click', handleDocumentClick);
    
    // 清理函数
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isMobile, handleDocumentClick]);
}