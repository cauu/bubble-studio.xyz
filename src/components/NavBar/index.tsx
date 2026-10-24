'use client';

import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/navigation';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { PaoLogo } from '@/components/PaoLogo';
import { GlobalConfig } from '@/constants';

export const NavBar = () => {
  const t = useTranslations();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!isMenuOpen) return;
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    document.addEventListener('keydown', escape);
    return () => document.removeEventListener('keydown', escape);
  }, [isMenuOpen]);

  const isHomePage = pathname === '/' || /^\/(en|zh|tw)\/?$/.test(pathname);

  // Main navigation only: /staking, /about and /governance stay low-exposure (S0002.1, S0004)
  const navItems = [
    { label: '/home', text: t('nav.home'), path: '/', isActive: isHomePage },
    { label: '/works', text: t('nav.projects'), path: '/projects', isActive: pathname.includes('/projects') },
    { label: '/blog', text: t('nav.blog'), path: '/blogs', isActive: pathname.includes('/blogs') },
    { label: '/skills', text: t('nav.skills'), path: '/skills', isActive: pathname.includes('/skills') }
  ];

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="nav" aria-label={t('nav.mainNav')}>
      <div className="wrap">
        <Link href="/" className="logo" prefetch>
          <PaoLogo alt={`Pao Studio ${t('nav.logoAlt')}`} height={28} className="h-7 w-auto" priority />
        </Link>

        <div className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              prefetch
              title={item.text}
              aria-current={item.isActive ? 'page' : undefined}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="nav-right">
          <LanguageSwitcher />
          <a className="cbtn sm nav-cta" href={GlobalConfig.DELEGATE_URL} target="_blank" rel="noopener noreferrer">
            {t('nav.stakeShort')}
          </a>
          <button
            type="button"
            className="nav-burger"
            ref={menuButton}
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-expanded={isMenuOpen}
            aria-controls="mnav"
            aria-label={isMenuOpen ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
              <path d="M1 1h16M1 7h16M1 13h16" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
            </svg>
          </button>
        </div>
      </div>

      <div id="mnav" className="mnav" hidden={!isMenuOpen}>
        {navItems.map((item) => (
          <Link key={item.path} href={item.path} prefetch onClick={closeMenu}>
            {item.label} · {item.text}
          </Link>
        ))}
        <a href={GlobalConfig.DELEGATE_URL} target="_blank" rel="noopener noreferrer" onClick={closeMenu}>
          {t('nav.stakeCta')} ↗
        </a>
      </div>
    </nav>
  );
};
