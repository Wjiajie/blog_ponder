import React, { type ReactNode } from 'react';
import { useScrollingNavbar } from '@site/src/hooks/useScrollingNavbar';
import { useMobileSidebarToggle } from '@site/src/hooks/useMobileSidebarToggle';

interface Props {
  children: ReactNode;
}

// 默认导出一个根组件包装器
export default function Root({ children }: Props): JSX.Element {
  // 在根组件中使用导航栏滚动 hook
  useScrollingNavbar();
  
  // 在根组件中使用移动端侧边栏切换 hook
  useMobileSidebarToggle();
  
  return <>{children}</>;
}