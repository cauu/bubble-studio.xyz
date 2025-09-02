'use client';

import { createContext, useContext, ReactNode } from 'react';

type TranslationFunction = (key: string) => string;

const IntlContext = createContext<TranslationFunction | null>(null);

type Props = {
    children: ReactNode;
    messages: Record<string, any>;
};

export const IntlProvider = ({ children, messages }: Props) => {
    const t = (key: string): string => {
        const keys = key.split('.');
        let value = messages;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key; // 返回 key 作为 fallback
            }
        }

        return typeof value === 'string' ? value : key;
    };

    return (
        <IntlContext.Provider value={t}>
            {children}
        </IntlContext.Provider>
    );
};

export const useTranslations = (namespace?: string) => {
    const t = useContext(IntlContext);
    if (!t) {
        throw new Error('useTranslations must be used within IntlProvider');
    }

    return (key: string) => {
        const fullKey = namespace ? `${namespace}.${key}` : key;
        return t(fullKey);
    };
}; 