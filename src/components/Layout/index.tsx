import { useTranslations } from 'next-intl';
import { NavBar } from '../NavBar';
import { Footer } from '../Footer';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();

  return (
    <div className="min-h-screen bg-canvas flex flex-col">
      <a className="skip" href="#main">
        {t('nav.skipToContent')}
      </a>
      <NavBar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};
