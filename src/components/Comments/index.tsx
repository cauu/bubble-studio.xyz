'use client'; // 必须加上这一行！

import Giscus from '@giscus/react';

type Language = 'en' | 'zh' | 'tw';

interface CommentsProps {
  term: string; // 你的文章 ID 或 unique key
  language?: Language;
}

const langMapping: Record<Language, string> = {
  en: 'en',
  zh: 'zh-CN',
  tw: 'zh-TW'
};

export default function Comments({ term, language }: CommentsProps) {
  const lang = langMapping[language || 'en'] || 'en';

  return (
    <div style={{ marginTop: '20px' }}>
      <Giscus
        id="comments"
        repo="cauu/bubble-studio.xyz"
        repoId="R_kgDOMmNaeA"
        category="Announcements"
        categoryId="DIC_kwDOMmNaeM4CzSSH"
        mapping="specific"
        term={term} // 这里接收动态传入的 ID
        strict="1"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="preferred_color_scheme"
        lang={lang}
        loading="eager"
      />
    </div>
  );
}
