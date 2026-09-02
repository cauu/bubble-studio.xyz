import { useTranslations } from 'next-intl';
import { GlobalConfig } from '@/constants';
import type { PoolStats } from '@/lib/pool-stats';

export const PoolLedgerCard = ({ stats }: { stats: PoolStats }) => {
  const t = useTranslations('home.ledger');

  const rows = [
    { k: t('rows.ticker'), v: stats.ticker },
    { k: t('rows.stake'), v: stats.stake },
    { k: t('rows.apy'), v: stats.apy },
    { k: t('rows.delegators'), v: stats.delegators }
  ];

  return (
    <div
      role="table"
      aria-label={t('ariaLabel')}
      className="bg-[rgba(255,255,255,.66)] backdrop-blur-[24px] backdrop-saturate-[1.6] border border-white/60 rounded-[20px] overflow-hidden shadow-[0_1px_2px_rgba(23,32,38,.05),0_18px_48px_rgba(23,32,38,.12),inset_0_1px_0_rgba(255,255,255,.7)] max-[900px]:max-w-[520px] max-[900px]:mx-auto max-[900px]:w-full"
    >
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[rgba(23,32,38,.06)] bg-[rgba(231,232,244,.6)]">
        <span className="flex gap-[5px] flex-none" aria-hidden="true">
          <i className="w-[9px] h-[9px] rounded-full bg-hairline" />
          <i className="w-[9px] h-[9px] rounded-full bg-hairline" />
          <i className="w-[9px] h-[9px] rounded-full bg-hairline" />
        </span>
        {stats.isLive && (
          <span
            className="w-[9px] h-[9px] rounded-full flex-none bg-brand-orange animate-pulse-dot"
            aria-hidden="true"
          />
        )}
        <span className="text-base font-bold text-ink">{t('title')}</span>
        <a
          href={GlobalConfig.CARDANOSCAN_POOL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-[12.5px] font-semibold text-body underline underline-offset-[3px] transition-colors hover:text-brand-incana"
        >
          {stats.isLive ? t('liveLink') : t('staticLink')}
        </a>
      </div>

      <div>
        {rows.map((row) => (
          <div
            key={row.k}
            role="row"
            className="flex items-center justify-between gap-4 px-5 py-3.5 text-[14.5px] even:bg-[rgba(235,235,244,.55)]"
          >
            <span className="text-body font-medium">{row.k}</span>
            <span className="text-ink font-bold text-[15.5px] tnum">{row.v}</span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2.5 px-5 py-[15px] bg-primary text-on-dark text-sm font-semibold">
        <span
          className="w-5 h-5 rounded-full flex-none grid place-items-center text-[11px] font-bold leading-none bg-white/[.18]"
          aria-hidden="true"
        >
          ✓
        </span>
        {t('foot')}
      </div>
    </div>
  );
};
