'use client';

import { useEffect, useRef } from 'react';
import { Bell, ExternalLink, LineChart, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { GlobalConfig } from '@/constants';

export const SubscribePaoDialog = () => {
  const t = useTranslations('home.hero.subscribe');
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previousBodyOverflow = useRef('');

  const unlockPage = () => {
    document.body.style.overflow = previousBodyOverflow.current;
  };

  const openDialog = () => {
    const dialog = dialogRef.current;

    if (!dialog || dialog.open) return;

    previousBodyOverflow.current = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    dialog.showModal();
  };

  const closeDialog = () => {
    dialogRef.current?.close();
  };

  useEffect(() => unlockPage, []);

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="lg"
        className="max-[600px]:w-full"
        aria-haspopup="dialog"
        onClick={openDialog}
      >
        {t('cta')}
      </Button>

      <dialog
        ref={dialogRef}
        aria-labelledby="subscribe-pao-title"
        onClose={unlockPage}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeDialog();
        }}
        className="fixed inset-0 m-auto max-h-[calc(100dvh-32px)] w-[min(92vw,480px)] overflow-y-auto rounded-xl border border-[rgba(23,32,38,.08)] bg-white p-0 text-ink shadow-[0_24px_80px_rgba(23,32,38,.24)] backdrop:bg-[rgba(23,32,38,.38)] backdrop:backdrop-blur-[3px]"
      >
        <div className="p-7 max-[600px]:p-5">
          <div className="flex items-start justify-between gap-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[.12em] text-brand-incana">Pao Studio</span>
              <h2 id="subscribe-pao-title" className="mt-2 text-[28px] leading-[1.2]">
                {t('title')}
              </h2>
              <p className="mt-2 text-[15px] text-body">{t('intro')}</p>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              aria-label={t('close')}
              className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-md bg-surface-soft text-body transition-colors hover:bg-surface-card hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-incana/35 focus-visible:ring-offset-2"
            >
              <X size={18} aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex gap-4 rounded-lg bg-surface-card p-4">
              <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-md bg-brand-lavender text-ink">
                <LineChart size={19} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[16px] leading-6">{t('strategyTitle')}</h3>
                <p className="mt-1 text-[14px] leading-6 text-body">{t('strategyBody')}</p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg bg-surface-card p-4">
              <span className="inline-flex h-10 w-10 flex-none items-center justify-center rounded-md bg-brand-sky text-ink">
                <Bell size={19} aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[16px] leading-6">{t('eventsTitle')}</h3>
                <p className="mt-1 text-[14px] leading-6 text-body">{t('eventsBody')}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-hairline pt-4">
            <p className="text-[13px] leading-6 text-muted">
              {t('notePrefix')}
              <a
                href={GlobalConfig.OURO_PASS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-body underline decoration-hairline underline-offset-4 transition-colors hover:text-ink"
              >
                Ouro Pass
              </a>
              {t('noteSuffix')}
            </p>
            <Button
              href={GlobalConfig.SUBSCRIBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              variant="primary"
              size="lg"
              className="mt-4 w-full"
              onClick={closeDialog}
            >
              {t('subscribeNow')}
              <ExternalLink size={17} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </dialog>
    </>
  );
};
