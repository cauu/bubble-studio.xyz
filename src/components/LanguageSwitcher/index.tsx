'use client';

import { usePathname, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

export const LanguageSwitcher = () => {
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations();
  const currentLocale = params.locale as string;

  const languages = [
    { code: 'zh', name: '中文' },
    { code: 'tw', name: '繁體' },
    { code: 'en', name: 'EN' }
  ];

  const getLocalizedPath = (locale: string) => {
    const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
    return `/${locale}${pathWithoutLocale}`;
  };

  return (
    <select
      className="text-[13.5px] font-medium text-body bg-white rounded-md px-3 py-2.5 cursor-pointer shadow-soft transition-shadow duration-200 ease-brand hover:shadow-soft-hover"
      aria-label={t('nav.langLabel')}
      value={currentLocale}
      onChange={(e) => {
        window.location.href = getLocalizedPath(e.target.value);
      }}
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code}>
          {lang.name}
        </option>
      ))}
    </select>
  );
};
