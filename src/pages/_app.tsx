import { Layout } from '@/components/Layout';

import '@/globals.css';

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}

export default function App({ Component, pageProps }: AppProps) {
  // Use the layout defined at the page level, if available
  const getLayout = (Component as any).getLayout ?? ((page: any) => <Layout>{page}</Layout>);

  return getLayout(<Component {...pageProps} />);
}
