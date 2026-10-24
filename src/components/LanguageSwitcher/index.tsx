'use client';

import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Check, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import { getLocalizedPostSlug } from '@/lib/seo';

const languages = [
  { code: 'zh', name: '简体中文' },
  { code: 'tw', name: '繁體中文' },
  { code: 'en', name: 'English' }
] as const;

type LanguageCode = (typeof languages)[number]['code'];

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale() as LanguageCode;
  const t = useTranslations();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const currentLanguage = languages.find((language) => language.code === currentLocale) ?? languages[0];

  useEffect(() => {
    if (!isOpen) return;

    const closeOnOutsideClick = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };

    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const focusOption = (index: number) => {
    window.requestAnimationFrame(() => optionRefs.current[index]?.focus());
  };

  const openAndFocus = (index: number) => {
    setIsOpen(true);
    focusOption(index);
  };

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      openAndFocus(0);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      openAndFocus(languages.length - 1);
    }
  };

  const handleOptionKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      focusOption((index + 1) % languages.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      focusOption((index - 1 + languages.length) % languages.length);
    }

    if (event.key === 'Home') {
      event.preventDefault();
      focusOption(0);
    }

    if (event.key === 'End') {
      event.preventDefault();
      focusOption(languages.length - 1);
    }
  };

  const selectLanguage = (locale: LanguageCode) => {
    setIsOpen(false);
    if (locale !== currentLocale) {
      const target = pathname.startsWith('/blogs/')
        ? `/blogs/${getLocalizedPostSlug(pathname.slice('/blogs/'.length), locale)}`
        : pathname;
      router.replace(target, { locale });
    }
  };

  return (
    <div ref={containerRef} className="lang">
      <button
        type="button"
        aria-label={t('nav.langLabel')}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls="language-menu"
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={handleTriggerKeyDown}
      >
        <span className="lang-full">{currentLanguage.name}</span>
        <span className="lang-short" aria-hidden="true">
          {currentLocale === 'en' ? 'EN' : currentLocale === 'zh' ? '简中' : '繁中'}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={clsx('transition-transform duration-200', isOpen && 'rotate-180')}
          aria-hidden="true"
        />
      </button>

      <div id="language-menu" role="menu" aria-label={t('nav.langLabel')} className="lang-menu" data-open={isOpen}>
        {languages.map((language, index) => {
          const isCurrent = language.code === currentLocale;

          return (
            <button
              key={language.code}
              ref={(element) => {
                optionRefs.current[index] = element;
              }}
              type="button"
              role="menuitemradio"
              aria-checked={isCurrent}
              tabIndex={isOpen ? 0 : -1}
              onClick={() => selectLanguage(language.code)}
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
            >
              <span className="whitespace-nowrap">{language.name}</span>
              <Check
                size={15}
                strokeWidth={2.2}
                className={isCurrent ? 'opacity-100' : 'opacity-0'}
                aria-hidden="true"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};
