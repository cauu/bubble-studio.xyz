import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Keep framework, API, static assets and root metadata routes outside locale routing.
  matcher: ['/((?!api|_next|fonts|images|favicon.ico|md.json|robots.txt|sitemap.xml|llms.txt).*)']
};
