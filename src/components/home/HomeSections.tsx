import { CSSProperties } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { GlobalConfig } from '@/constants';
import { Gate } from '@/components/neon/Gate';
import { CopyButton } from '@/components/neon/CopyButton';
import { COIL, WORKS } from '@/lib/works';
import type { PostData } from '@/lib/posts';
import type { Category } from '@/lib/categories';
import { PoolDelegator, PoolStats, shortStakeAddress } from '@/lib/pool-stats';

const vars = (v: Record<string, string | number>) => v as CSSProperties;
const CATEGORY_COLOR: Record<Category, string> = {
  ai: 'var(--mag)',
  cardano: 'var(--cy)',
  engineering: 'var(--yel)',
  weekly: 'var(--grn)',
  essay: 'var(--pur)'
};
const CARD_COLORS = ['mag', 'cy', 'yel', 'grn'];
const fmtAda = (n: number) => n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const poolIdShort = `${GlobalConfig.POOL_ID.slice(0, 9)}…${GlobalConfig.POOL_ID.slice(-4)}`;

export const HomeWorks = () => {
  const t = useTranslations('landing.works');
  const tp = useTranslations('projects.items');

  return (
    <section id="works" aria-labelledby="h-works">
      <Gate
        num="01"
        en={t('en')}
        title={t('title')}
        color="cy"
        titleId="h-works"
        aside={
          <Link className="cbtn sm alt" href="/projects">
            {t('all')}
          </Link>
        }
      />
      <div className="lane">
        <a className="coil reveal" href={COIL.href} target="_blank" rel="noopener noreferrer">
          <span className="scene">
            <img src={COIL.sleep} alt="" width={1440} height={730} loading="lazy" />
            <img className="awake" src={COIL.awake} alt="" width={1440} height={730} loading="lazy" />
          </span>
          <span className="cap">
            <h3>Coil</h3>
            <span>
              <span className="lead" style={{ display: 'block' }}>
                {t('coilLead')}
              </span>
              <span className="specs" style={{ display: 'block' }}>
                {t('coilNew')} · {COIL.version} · {COIL.platform}
              </span>
            </span>
            <span className="cbtn sm">{t('coilCta')}</span>
          </span>
        </a>
      </div>
      <div className="lane p-works">
        {WORKS.map((work, i) => (
          <a
            key={work.key}
            className="wk reveal"
            href={work.href}
            target="_blank"
            rel="noopener noreferrer"
            style={vars({ '--c': `var(--${work.color})`, '--d': `${i * 0.08}s` })}
            data-py={i % 2 ? '-.04' : '.05'}
          >
            <span className="th">
              <img src={work.screenshot} alt={`${work.name}`} width={1200} height={750} loading="lazy" />
            </span>
            <span className="row">
              <span className="no">{String(i + 1).padStart(2, '0')}</span>
              <h3>{work.name}</h3>
            </span>
            <p>{tp(`${work.key}.description`)}</p>
            <span className="tags">{work.tag}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export const HomePosts = ({ posts }: { posts: PostData[] }) => {
  const t = useTranslations('landing.posts');
  const tc = useTranslations('blog.categories');
  const [lead, ...rest] = posts;
  if (!lead) return null;

  return (
    <section id="writing" aria-labelledby="h-writing">
      <Gate
        num="02"
        en={t('en')}
        title={t('title')}
        color="mag"
        titleId="h-writing"
        aside={
          <Link className="cbtn sm alt" href="/blogs">
            {t('all')}
          </Link>
        }
      />
      <div className="lane p-posts">
        <Link className="pf reveal" href={`/blogs/${lead.slug}`} style={vars({ '--c': CATEGORY_COLOR[lead.category] })}>
          <span className="img">
            {lead.image && <img src={lead.image} alt="" width={1600} height={900} loading="lazy" data-py="-.06" />}
          </span>
          <span className="meta">
            <b>{tc(lead.category)}</b> · {lead.date}
          </span>
          <h3>{lead.title}</h3>
        </Link>
        {rest.slice(0, 3).map((post, i) => (
          <Link
            key={post.slug}
            className="pc reveal"
            href={`/blogs/${post.slug}`}
            style={vars({ '--c': CATEGORY_COLOR[post.category], '--d': `${(i + 1) * 0.08}s` })}
          >
            <span className="n">{String(i + 2).padStart(2, '0')}</span>
            <span>
              <span className="meta">
                <b>{tc(post.category)}</b> · {post.date}
              </span>
              <h3>{post.title}</h3>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export const HomePao = () => {
  const t = useTranslations('landing.pao');
  const items = [
    { key: 'p', color: 'mag', shape: 'g-p', py: '-.05' },
    { key: 'a', color: 'cy', shape: 'g-a', py: '.04' },
    { key: 'o', color: 'yel', shape: 'g-o', py: '-.06' }
  ];

  return (
    <section id="pao" aria-labelledby="h-pao">
      <Gate num="03" en={t('en')} title={t('title')} color="yel" titleId="h-pao" />
      <div className="p-pao">
        {items.map((item, i) => (
          <div
            key={item.key}
            className="pp reveal"
            style={vars({ '--c': `var(--${item.color})`, '--d': `${i * 0.1}s` })}
          >
            <span className={`shape ${item.shape}`} data-py={item.py} aria-hidden="true" />
            <span className="word">{t(`${item.key}.word`)}</span>
            <h3>{t(`${item.key}.title`)}</h3>
            <p>{t(`${item.key}.body`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export const HomeMembers = ({ stats, members }: { stats: PoolStats; members: PoolDelegator[] }) => {
  const t = useTranslations('landing.members');

  return (
    <section id="members" aria-labelledby="h-members">
      <Gate num="04" en={t('en')} title={t('title')} color="grn" titleId="h-members" />
      <div className="lane p-members">
        {members.slice(0, 4).map((m, i) => (
          <div
            key={m.stakeAddress}
            className="idc reveal"
            style={vars({ '--c': `var(--${CARD_COLORS[i]})`, '--d': `${i * 0.06}s` })}
          >
            <span className="no">#{String(i + 1).padStart(2, '0')}</span>
            <span className="addr">{shortStakeAddress(m.stakeAddress)}</span>
            <span className="amt tnum">₳ {fmtAda(m.amountAda)}</span>
            <span className="ep">
              {t('since')} {m.sinceEpoch}
              {m.isOperator && (
                <>
                  {' · '}
                  <b>{t('operator')}</b>
                </>
              )}
            </span>
          </div>
        ))}
        <a
          className="idc next reveal"
          href={GlobalConfig.DELEGATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          style={vars({ '--d': '.24s' })}
        >
          <span className="no">#{String(Math.min(members.length, 4) + 1).padStart(2, '0')}</span>
          <span className="addr">{t('yourAddress')}</span>
          <span className="amt">{t('next')}</span>
          <span className="ep">{t('delegate')}</span>
        </a>
        {members.length === 0 && <p className="members-note">{t('unavailable')}</p>}
        <div className="poolcol reveal" style={vars({ '--d': '.3s' })}>
          <b>PAO</b>
          <span>
            {poolIdShort}
            <CopyButton value={GlobalConfig.POOL_ID} ariaLabel="Copy pool ID" />
          </span>
          {stats.marginPct !== null && stats.fixedCostAda !== null && (
            <span className="tnum">
              {t('fees', { margin: stats.marginPct, fixed: Math.round(stats.fixedCostAda) })}
            </span>
          )}
          <a href={GlobalConfig.CARDANOSCAN_POOL_URL} target="_blank" rel="noopener noreferrer">
            CardanoScan ↗
          </a>
          <a className="cbtn sm" href={GlobalConfig.DELEGATE_URL} target="_blank" rel="noopener noreferrer">
            {t('delegate')}
          </a>
        </div>
      </div>
    </section>
  );
};

export const HomeEnd = () => {
  const t = useTranslations('landing.end');

  return (
    <section className="p-end" id="contact" aria-labelledby="h-end">
      <h2 id="h-end">
        <span className="o">{t('title1')}</span>
        <br />
        <span className="m">{t('title2')}</span>
      </h2>
      <div className="acts reveal">
        <a className="cbtn" href={GlobalConfig.DELEGATE_URL} target="_blank" rel="noopener noreferrer">
          {t('delegate')}
        </a>
        <a className="cbtn alt" href={`mailto:${GlobalConfig.CONTACT_EMAIL}`}>
          {t('email')}
        </a>
        <a className="cbtn alt" href={GlobalConfig.social.telegram} target="_blank" rel="noopener noreferrer">
          {t('telegram')}
        </a>
      </div>
    </section>
  );
};
