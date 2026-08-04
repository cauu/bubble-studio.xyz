import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Bot, CandlestickChart, Code2, Gift, Sparkles } from 'lucide-react';
import { NoiseTexture } from '@/components/ui/NoiseTexture';
import { Reveal } from '@/components/ui/Reveal';

const StrategyChart = () => (
  <div className="overflow-hidden rounded-lg bg-[#0b1114] shadow-soft">
    <Image
      src="/images/trading-strategy-card.png"
      alt="BTCUSDT 4 小时交易策略示意图，标有入场位、两个止盈位和止损位"
      width={2244}
      height={701}
      sizes="(max-width: 900px) calc(100vw - 80px), 620px"
      className="h-auto w-full"
      priority={false}
    />
  </div>
);

const RaffleVisual = () => (
  <div
    className="relative h-[104px] min-w-[150px] overflow-hidden rounded-lg bg-[linear-gradient(145deg,#dff3ff,#f1eaff_60%,#fff5c7)]"
    aria-hidden="true"
  >
    <span
      className="absolute left-[13%] top-[19%] h-12 w-12 -rotate-12 rounded-full border-4 border-white/80 bg-white bg-[length:72%] bg-center bg-no-repeat shadow-soft"
      style={{ backgroundImage: "url('https://cardano.org/img/brand-assets/cardano-starburst-blue.svg')" }}
    />
    <span
      className="absolute right-[12%] top-[15%] h-11 w-11 rotate-12 rounded-full border-4 border-white/80 bg-cover bg-center shadow-soft"
      style={{
        backgroundImage: "url('https://assets.coingecko.com/coins/images/30496/standard/Snek-Square-BG_200x200.png')"
      }}
    />
    <span className="absolute bottom-[10%] left-[44%] grid h-9 w-9 place-items-center rounded-full border-[3px] border-white/80 bg-brand-lemon text-sm font-black shadow-soft">
      ?
    </span>
    <Sparkles className="absolute bottom-3 right-4 text-primary" size={17} />
  </div>
);

const AgentVisual = () => (
  <div
    className="h-[104px] min-w-[150px] rounded-lg bg-[linear-gradient(145deg,#e9fbf2,#dff4f5)] p-3"
    aria-hidden="true"
  >
    <div className="h-full rounded-md bg-white p-2.5 shadow-soft">
      <div className="mb-2 flex items-center gap-2">
        <span className="grid h-6 w-6 place-items-center rounded-full bg-primary text-white">
          <Bot size={12} />
        </span>
        <span className="text-[9px] font-bold">Trading Agent</span>
        <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-grass" />
      </div>
      <div className="ml-auto h-3.5 w-[62%] rounded-full bg-surface-soft" />
      <div className="mt-1.5 h-5 w-[78%] rounded-full bg-brand-sky" />
    </div>
  </div>
);

const CodeVisual = () => (
  <div
    className="w-[270px] flex-none overflow-hidden rounded-lg bg-[#172328] shadow-soft max-[760px]:w-full"
    aria-hidden="true"
  >
    <div className="flex gap-1.5 border-b border-white/10 px-4 py-2.5">
      <span className="h-2 w-2 rounded-full bg-[#ff7f73]" />
      <span className="h-2 w-2 rounded-full bg-brand-lemon" />
      <span className="h-2 w-2 rounded-full bg-brand-grass" />
    </div>
    <div className="space-y-1.5 px-4 py-3 font-mono text-[10px]">
      <p className="text-brand-mint">
        <span className="text-brand-lavender">const</span> build ={' '}
        <span className="text-brand-sky">&apos;Cardano&apos;</span>;
      </p>
      <p className="text-white/50">openSource.contribute(build);</p>
    </div>
  </div>
);

export const StakeBenefits = () => {
  const t = useTranslations('home.stakeBenefits');

  return (
    <section
      className="relative isolate overflow-hidden bg-white py-section max-[860px]:py-[72px]"
      aria-labelledby="stake-benefits-h2"
    >
      <NoiseTexture
        frequency={0.48}
        octaves={5}
        slope={0.13}
        noiseOpacity={0.34}
        className="-z-10 opacity-[.28] [mask-image:radial-gradient(70%_65%_at_82%_16%,black,transparent)] max-[700px]:opacity-[.16]"
      />
      <div className="wrap relative z-10">
        <Reveal className="mb-9 max-w-[760px]">
          <h2 id="stake-benefits-h2" className="text-[clamp(30px,4vw,46px)] leading-[1.15] text-balance">
            {t('title')}
          </h2>
        </Reveal>

        <div className="grid grid-cols-[1.2fr_.8fr] grid-rows-2 gap-4 max-[900px]:grid-cols-2 max-[900px]:grid-rows-none max-[650px]:grid-cols-1">
          <Reveal className="row-span-2 overflow-hidden rounded-xl border border-hairline bg-surface-soft p-7 shadow-soft max-[900px]:col-span-2 max-[900px]:row-span-1 max-[650px]:col-span-1 max-[500px]:p-5">
            <div className="flex h-full flex-col">
              <div className="flex items-start gap-3">
                <span className="grid h-11 w-11 flex-none place-items-center rounded-md bg-brand-lavender text-primary">
                  <CandlestickChart size={20} strokeWidth={1.9} />
                </span>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[.1em] text-primary">
                    {t('items.strategy.label')}
                  </span>
                  <h3 className="mt-1 text-[24px] leading-tight">{t('items.strategy.title')}</h3>
                </div>
              </div>
              <p className="mb-6 mt-4 max-w-[590px] text-[14px] leading-[1.7] text-body">{t('items.strategy.body')}</p>
              <div className="mt-auto">
                <StrategyChart />
              </div>
            </div>
          </Reveal>

          <Reveal delay={55} className="rounded-xl border border-hairline bg-white p-5 shadow-soft max-[500px]:p-4">
            <div className="grid h-full grid-cols-[minmax(0,1fr)_150px] items-center gap-4 max-[1050px]:grid-cols-1">
              <div>
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <Gift size={17} />
                  <span className="text-[10.5px] font-bold uppercase tracking-[.1em]">{t('items.raffle.label')}</span>
                </div>
                <h3 className="text-[19px] leading-tight">{t('items.raffle.title')}</h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-body">{t('items.raffle.body')}</p>
              </div>
              <RaffleVisual />
            </div>
          </Reveal>

          <Reveal delay={110} className="rounded-xl border border-hairline bg-white p-5 shadow-soft max-[500px]:p-4">
            <div className="grid h-full grid-cols-[minmax(0,1fr)_150px] items-center gap-4 max-[1050px]:grid-cols-1">
              <div>
                <div className="mb-3 flex items-center gap-2 text-primary">
                  <Bot size={17} />
                  <span className="text-[10.5px] font-bold uppercase tracking-[.1em]">{t('items.agent.label')}</span>
                </div>
                <h3 className="text-[19px] leading-tight">{t('items.agent.title')}</h3>
                <p className="mt-2 text-[13px] leading-[1.6] text-body">{t('items.agent.body')}</p>
              </div>
              <AgentVisual />
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={150}
          className="mt-4 rounded-xl border border-hairline bg-[linear-gradient(105deg,#f6f3ff,#eef9ff)] p-5 shadow-soft"
        >
          <div className="flex items-center gap-5 max-[760px]:flex-col max-[760px]:items-stretch">
            <span className="grid h-11 w-11 flex-none place-items-center rounded-md bg-white text-primary shadow-soft">
              <Code2 size={20} strokeWidth={1.9} />
            </span>
            <div className="min-w-0 flex-1">
              <h3 className="text-[19px] leading-tight">{t('items.opensource.title')}</h3>
              <p className="mt-2 max-w-[650px] text-[13px] leading-[1.65] text-body">{t('items.opensource.body')}</p>
            </div>
            <CodeVisual />
          </div>
        </Reveal>
      </div>
    </section>
  );
};
