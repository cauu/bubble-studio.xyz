import { ValidatorData } from "@/types/voyager.types";
import MetricCard from "./MetricCard";
import { useMemo } from "react";
import { GlobalConfig } from "@/constants";


export const StarknetStaking = (props: {
    validatorInfo: ValidatorData['validatorDetails'] | null
}) => {
    const { validatorInfo } = props;

    // const { liveness, totalStake, address, livenessTotalEpochs, revenueShare } = validatorInfo || {};

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
                    <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                        高性能 StarkNet 验证节点，助力以太坊扩容生态
                    </p>
                </div>
            </section>

            <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-4">
                <MetricCard icon="💎" title="Apr" value={<div className="starknet-gradient text-transparent !bg-clip-text">{apr}</div>} description="%" />
                <MetricCard icon="🟢" title="活跃度" value={<div className="starknet-gradient text-transparent !bg-clip-text">{liveness}</div>} description="%" />
                <MetricCard icon="🔒" title="质押总量" value={<div className="starknet-gradient text-transparent !bg-clip-text">{totalStake}</div>} description="STRK" />
                <MetricCard icon="📈" title="参与轮次" value={<div className="starknet-gradient text-transparent !bg-clip-text">{livenessTotalEpochs}</div>} description="Epochs" />
            </section>

            <div className="text-center">
                <button className="starknet-stake-button px-8 py-4 text-white rounded-2xl shadow-xl font-bold text-lg transition-all" onClick={handleStake}>
                    ⚡ 委托到 Bubble Validator
                </button>
                <p className="text-sm text-gray-500 mt-2">参与 StarkNet 网络验证获得奖励</p>
            </div>
        </div>
    )
}