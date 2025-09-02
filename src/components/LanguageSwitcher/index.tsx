'use client';

import { usePathname } from 'next/navigation';
import { useParams } from 'next/navigation';
import { Globe } from 'lucide-react';


export const LanguageSwitcher = () => {
    const pathname = usePathname();
    const params = useParams();
    const currentLocale = params.locale as string;

    const languages = [
        { code: 'zh', name: '简体中文' },
        { code: 'tw', name: '繁體中文' },
        { code: 'en', name: 'English' }
    ];

    const getLocalizedPath = (locale: string) => {
        // 移除当前语言前缀，然后添加新的语言前缀
        const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '') || '/';
        return `/${locale}${pathWithoutLocale}`;
    };

    return (
        <div className="relative">
            <Globe size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white z-10" />
            <select
                className="candy-gradient text-white font-bold rounded-full pl-10 pr-6 py-2 shadow-lg hover-grow cursor-pointer appearance-none border-none outline-none transition-all"
                value={currentLocale}
                onChange={(e) => {
                    const newLocale = e.target.value;
                    const newPath = getLocalizedPath(newLocale);
                    window.location.href = newPath;
                }}
            >
                {languages.map((lang) => (
                    <option key={lang.code} value={lang.code} className="text-gray-800 bg-white">
                        {lang.name}
                    </option>
                ))}
            </select>
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L6 6L11 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </div>
    );
};
