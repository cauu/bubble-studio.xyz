import { useTranslations } from 'next-intl';
import { Reveal } from '@/components/ui/Reveal';
import { CopyButton } from '@/components/neon/CopyButton';

const skills = [
  { key: 'immutableSpec', slug: 'immutable-spec', color: 'yel' },
  { key: 'challenge', slug: 'challenge', color: 'cy' },
  { key: 'codebaseDesign', slug: 'codebase-design', color: 'pur' },
  { key: 'tdd', slug: 'tdd', color: 'mag' },
  { key: 'codeReview', slug: 'code-review', color: 'grn' },
  { key: 'codebaseMap', slug: 'codebase-map', color: 'cy' }
];
export const SkillsGrid = () => {
  const t = useTranslations('skills');
  return (
    <div className="skgrid">
      {skills.map((skill, i) => (
        <Reveal key={skill.slug}>
          <article className="sk corners" style={{ ['--c' as string]: `var(--${skill.color})` }}>
            <div className="sh">
              <span className="n" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="tag">{t(`items.${skill.key}.tag`)}</span>
            </div>
            <h2>{skill.slug}</h2>
            <p>{t(`items.${skill.key}.description`)}</p>
            <div className="cmd">
              <span className="pr" aria-hidden="true">
                $
              </span>
              <code tabIndex={0}>{`npx skills@latest add cauu/skills --skill ${skill.slug}`}</code>
              <CopyButton
                value={`npx skills@latest add cauu/skills --skill ${skill.slug}`}
                ariaLabel={t('copyLabel', { skill: skill.slug })}
                copiedLabel={t('copiedLabel')}
              />
            </div>
            <a
              className="def"
              href={`https://github.com/cauu/skills/tree/main/skills/engineering/${skill.slug}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('viewDefinition')} ↗
            </a>
          </article>
        </Reveal>
      ))}
    </div>
  );
};
