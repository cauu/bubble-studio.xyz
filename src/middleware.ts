import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // 匹配所有路径除了 api, _next/static, _next/image, favicon.ico
  matcher: ['/((?!api|_next/static|_next/image|fonts|images|favicon.ico|md.json).*)']
};
