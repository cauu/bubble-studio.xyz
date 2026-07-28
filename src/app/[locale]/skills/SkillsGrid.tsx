'use client';

import { useState } from 'react';
import { Check, Copy, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';
import clsx from 'clsx';
import { Chip, ChipColor } from '@/components/ui/Chip';
import { Reveal } from '@/components/ui/Reveal';

const skills = [
  { key: 'immutableSpec', slug: 'immutable-spec', color: 'lemon', numberClass: 'bg-brand-lemon' },
  { key: 'challenge', slug: 'challenge', color: 'sky', numberClass: 'bg-brand-sky' },
  { key: 'codebaseDesign', slug: 'codebase-design', color: 'lavender', numberClass: 'bg-brand-lavender' },
  { key: 'tdd', slug: 'tdd', color: 'mint', numberClass: 'bg-brand-mint' },
  { key: 'codeReview', slug: 'code-review', color: 'grass', numberClass: 'bg-brand-grass' },
  { key: 'codebaseMap', slug: 'codebase-map', color: 'card', numberClass: 'bg-surface-card' }
] as const;

const repositoryUrl = 'https://github.com/cauu/skills';

export const SkillsGrid = () => {
  const t = useTranslations('skills');
  const [copiedSkill, setCopiedSkill] = useState<string | null>(null);

  const copyCommand = async (slug: string) => {
    const command = `npx skills@latest add cauu/skills --skill ${slug}`;
    await navigator.clipboard.writeText(command);
    setCopiedSkill(slug);
    window.setTimeout(() => setCopiedSkill((current) => (current === slug ? null : current)), 1800);
  };

  return (
    <div className="grid grid-cols-2 gap-7 max-[760px]:grid-cols-1">
      {skills.map((skill, index) => {
        const command = `npx skills@latest add cauu/skills --skill ${skill.slug}`;
        const isCopied = copiedSkill === skill.slug;

        return (
          <Reveal key={skill.slug} className="h-full" delay={(index % 2) * 70}>
            <article
              className={clsx(
                'flex h-full min-h-[300px] flex-col rounded-xl bg-white p-7 shadow-card max-[600px]:min-h-0 max-[600px]:p-6',
                skill.slug === 'immutable-spec' && 'ring-1 ring-brand-lemon'
              )}
            >
              <div className="mb-7 flex items-start justify-between gap-4">
                <span
                  className={clsx(
                    'grid h-11 w-11 flex-none place-items-center rounded-md text-sm font-bold text-ink tnum',
                    skill.numberClass
                  )}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </span>
                <Chip color={skill.color as ChipColor}>{t(`items.${skill.key}.tag`)}</Chip>
              </div>

              <h2 className="mb-3 font-mono text-[22px] font-semibold leading-tight text-ink">{skill.slug}</h2>
              <p className="mb-7 text-[15px] leading-[1.8] text-body">{t(`items.${skill.key}.description`)}</p>

              <div className="mt-auto">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                  {t('installLabel')}
                </span>
                <div className="flex items-center gap-2 rounded-md border border-hairline-soft bg-canvas p-2 pl-3">
                  <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-[12px] text-body">
                    {command}
                  </code>
                  <button
                    type="button"
                    onClick={() => copyCommand(skill.slug)}
                    className="grid h-9 w-9 flex-none place-items-center rounded-sm text-body transition-colors hover:bg-surface-card hover:text-ink"
                    aria-label={isCopied ? t('copiedLabel') : t('copyLabel', { skill: skill.slug })}
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4 text-brand-incana" aria-hidden="true" />
                    ) : (
                      <Copy className="h-4 w-4" aria-hidden="true" />
                    )}
                  </button>
                </div>

                <a
                  href={`${repositoryUrl}/tree/main/skills/engineering/${skill.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ink transition-colors hover:text-brand-incana"
                >
                  {t('viewDefinition')}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </div>
            </article>
          </Reveal>
        );
      })}
    </div>
  );
};
