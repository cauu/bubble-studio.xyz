'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { PaoLogo } from '@/components/PaoLogo';

export const NavBar = () => {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isHomePage = pathname === '/' || /^\/(en|zh|tw)$/.test(pathname);
  const contactHref = locale === 'en' ? '/#contact' : `/${locale}/#contact`;

  const navItems = [
    { text: t('nav.home'), path: '/', isActive: isHomePage },
    { text: t('nav.blog'), path: '/blogs', isActive: pathname.includes('/blogs') },
    { text: t('nav.projects'), path: '/projects', isActive: pathname.includes('/projects') },
    { text: t('nav.skills'), path: '/skills', isActive: pathname.includes('/skills') }
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav
      className="sticky top-0 z-50 bg-[rgba(249,248,246,.6)] backdrop-blur-[20px] backdrop-saturate-[1.8] border-b border-[rgba(23,32,38,.06)]"
      aria-label={t('nav.mainNav')}
    >
      <div className="mx-auto max-w-wrap px-6 max-[600px]:px-[18px] flex items-center gap-6 h-[68px]">
        <Link href="/" className="flex items-center gap-[11px] font-bold text-[17px] text-ink" prefetch>
          <PaoLogo alt={`Pao Studio ${t('nav.logoAlt')}`} height={28} className="h-7 w-auto" priority />
        </Link>

        <div className="ml-3 hidden min-[861px]:flex gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              prefetch
              aria-current={item.isActive ? 'page' : undefined}
              className={clsx(
                'text-sm font-medium px-[13px] py-[9px] rounded-pill transition-colors duration-[180ms] hover:bg-surface-card hover:text-ink',
                item.isActive ? 'bg-surface-card text-ink' : 'text-body'
              )}
            >
              {item.text}
            </Link>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <LanguageSwitcher />
          <Button href={contactHref} variant="primary" size="md" className="max-[600px]:hidden">
            {t('nav.contactCta')}
          </Button>
          <button
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mnav"
            aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
            className="hidden max-[860px]:inline-flex items-center justify-center w-[42px] h-[42px] flex-none bg-white rounded-md text-ink shadow-soft"
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      <div
        id="mnav"
        className={clsx(
          'min-[861px]:hidden border-t border-hairline bg-canvas px-6 pb-4 pt-2',
          !isMenuOpen && 'hidden'
        )}
      >
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            prefetch
            onClick={closeMenu}
            className="block px-2 py-[13px] text-[15px] font-semibold text-ink border-b border-hairline-soft last:border-b-0"
          >
            {item.text}
          </Link>
        ))}
        <a href={contactHref} onClick={closeMenu} className="block px-2 py-[13px] text-[15px] font-semibold text-ink">
          {t('nav.contactCta')}
        </a>
      </div>
    </nav>
  );
};
