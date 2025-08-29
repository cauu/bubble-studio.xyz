import { ValidatorData } from "@/types/voyager.types";
import MetricCard from "./MetricCard";
import { useMemo } from "react";
import { GlobalConfig } from "@/constants";
import { useTranslation } from "next-i18next";
import { numberWithCommas } from "@/utils";
import { StepGuid } from "./StepGuid";


export const StarknetStaking = (props: {
    validatorInfo: ValidatorData['validatorDetails'] | null
}) => {
    const { validatorInfo } = props;

    const { t } = useTranslation('common');

    const statistics = useMemo(() => {
        const { liveness, totalStake, livenessTotalEpochs, apr } = validatorInfo || {};

        return {
            totalStake: Number(totalStake || 0) / 10 ** 18,
            liveness,
            livenessTotalEpochs,
            apr: Number(apr || 0) / 10 ** 2
        }
    }, [validatorInfo])

    const { totalStake, liveness, livenessTotalEpochs, apr } = statistics;

    const guideSteps = [
        {
            title: t('stakingGuide.starknet.steps.step1.title'),
            description: t('stakingGuide.starknet.steps.step1.description')
        },
        {
            title: t('stakingGuide.starknet.steps.step2.title'),
            description: t('stakingGuide.starknet.steps.step2.description')
        },
        {
            title: t('stakingGuide.starknet.steps.step3.title'),
            description: t('stakingGuide.starknet.steps.step3.description')
        },
        {
            title: t('stakingGuide.starknet.steps.step4.title'),
            description: t('stakingGuide.starknet.steps.step4.description')
        }
    ]


    const handleStake = () => {
        window.open(`https://voyager.online/staking?validator=${GlobalConfig.STARKNET_VALIDATOR_ADDRESS}`, '_blank');
    }

    return (
        <div className="relative z-10 max-w-6xl mx-auto">
            <section className="relative z-10 py-8 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-black mb-2">
                        <div className="starknet-gradient text-transparent !bg-clip-text">Bubble Validator️ ⚡</div>
                    </h1>
                    <p className="text-base md:text-base text-gray-500 leading-relaxed max-w-4xl mx-auto">
                        {t('hero.starknet.description')}
                    </p>
                </div>
            </section>

            <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-4">
                <MetricCard icon="💰" title={t('metric.totalPledge')} value={<div className="starknet-gradient text-transparent !bg-clip-text">{numberWithCommas(totalStake)}</div>} description="STRK" />
                <MetricCard icon="📈" title={t('metric.estimatedAnnualizedReturn')} value={<div className="starknet-gradient text-transparent !bg-clip-text">{`${apr}%`}</div>} />
                <MetricCard icon="🔄" title={t('metric.activity')} value={<div className="starknet-gradient text-transparent !bg-clip-text">{`${liveness}%`}</div>} />
                <MetricCard icon="🟢" title={t('metric.participationEpoch')} value={<div className="starknet-gradient text-transparent !bg-clip-text">{livenessTotalEpochs}</div>} description="Epochs" />
            </section>

            <div className="text-center">
                <button className="starknet-stake-button px-8 py-4 text-white rounded-2xl shadow-xl font-bold text-lg transition-all" onClick={handleStake}>
                    ⚡ {`${t('button.stakeNow')} ${t('hero.starknet.title')}`}
                </button>
            </div>

            <section className="pt-16">
                <StepGuid title={t('stakingGuide.starknet.title')} steps={guideSteps} theme="starknet" />
            </section>
        </div>
    )
}