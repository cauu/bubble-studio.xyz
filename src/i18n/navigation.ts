import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

// 提供 Next.js 导航 API 的包装器来处理语言路由
export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
