import { useMemo } from "react"

import { PoolDelegatorsResponse, PoolInfoResponse, PoolStakeSnapshotResponse } from "@/types/koios.types"
import { GlobalConfig } from "@/constants"

import MetricCard from "./MetricCard"
import RelayStatusIndicator from "./RelayStatusIndicator"

export const CardanoStaking = (props: {
    poolInfo: PoolInfoResponse,
    poolStakeSnapshot: PoolStakeSnapshotResponse,
    poolDelegators: PoolDelegatorsResponse
}) => {

    const { poolInfo, poolDelegators } = props;

    const statistics = useMemo(() => {
        const delegators = poolInfo[0].live_delegators;
        const saturation = poolInfo[0].live_saturation;
        const relays = poolInfo[0].relays;
        const maxRelays = 1;
        const activeRelays = relays.length
        const activeStake = Number(poolInfo[0].active_stake || 0) / 10 ** 6

        return {
            delegators,
            saturation,
            maxRelays,
            activeStake,
            activeRelays
        }
    }, [poolDelegators, poolInfo])

    const { delegators, maxRelays, activeRelays, activeStake, saturation } = statistics;

    const handleStake = () => {
        window.open(`https://tool.jamonbread.io/delegate/${GlobalConfig.POOL_ID}`, '_blank');
    }

    return (
        <div>
            <div className="relative z-10 max-w-6xl mx-auto">
                <section className="relative z-10 py-8 px-6">
                    <div className="max-w-4xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-black mb-2">
                            <div className="candy-gradient text-transparent !bg-clip-text">Bubble Pool 🏊‍♂️</div>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                            透明、可靠的 Cardano 质押池，支持去中心化生态发展
                        </p>
                    </div>
                </section>

                <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8 mt-4">
                    <MetricCard icon="💰" title="质押总量" value={activeStake} description="ADA" />
                    <MetricCard icon="🎯" title="饱和度" value={saturation} progressValue={saturation} />
                    <MetricCard icon="👥" title="委托者" value={delegators} description="活跃" />
                    {/* <MetricCard icon="📈" title="年化收益" value="4.2%" description="ROI" /> */}
                    <MetricCard icon="🔄" title="Relays 状态" value={
                        <div className="py-2">
                            <RelayStatusIndicator onlineCount={activeRelays} totalCount={maxRelays} />
                        </div>
                    } description={`${activeRelays}/${maxRelays} 在线`} />
                </section>

                <section className="text-center">
                    <button className="cardano-stake-button px-8 py-4 text-white rounded-2xl shadow-xl font-bold text-lg" onClick={handleStake}>
                        🎯 立即质押到 Bubble Pool
                    </button>
                </section>
            </div>

            <section className="relative z-10 mt-4 py-8 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
                        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">💝 为什么选择 Bubble Pool？</h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">💻</div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-1">支持开发工作</h4>
                                        <p className="text-sm text-gray-600">您的质押直接支持我们在 Cardano 生态系统中的开发工作，包括去中心化应用、工具和基础设施的构建。</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">🔧</div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-1">技术专业性</h4>
                                        <p className="text-sm text-gray-600">我们的团队具有丰富的区块链开发经验，确保矿池的稳定运行和最优性能。</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">🌱</div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-1">生态贡献</h4>
                                        <p className="text-sm text-gray-600">我们积极参与 Cardano 社区建设，推动生态系统的健康发展和创新。</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <div className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">🎯</div>
                                    <div>
                                        <h4 className="font-bold text-gray-800 mb-1">透明运营</h4>
                                        <p className="text-sm text-gray-600">所有运营数据公开透明，定期发布矿池状态报告和技术更新。</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}