import { useTranslations } from 'next-intl';
import { NavBar } from '../NavBar';
import { Footer } from '../Footer';
import { Particles } from '../neon/Particles';
import { MotionRuntime } from '../neon/MotionRuntime';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const t = useTranslations();

  return (
    <div className="min-h-screen flex flex-col">
      <a className="skip" href="#main">
        {t('nav.skipToContent')}
      </a>
      <Particles />
      <NavBar />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <MotionRuntime />
    </div>
  );
};
