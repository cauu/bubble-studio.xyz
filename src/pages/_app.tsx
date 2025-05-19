import { Layout } from '@/components/Layout';
import { appWithTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config'; // 路径根据实际情况调整

import '@/globals.css';

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}

function App({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available
  const getLayout = (Component as any).getLayout ?? ((page: any) => <Layout>{page}</Layout>);

  return getLayout(<Component {...pageProps} />);
}

export default appWithTranslation(App, nextI18NextConfig);
