import MetricCard from "./MetricCard";
import RelayStatusIndicator from "./RelayStatusIndicator";

export default function Staking() {
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

        <section className="grid md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8 mt-4">
          <MetricCard icon="💰" title="质押总量" value="45.2M" description="ADA" />
          <MetricCard icon="🎯" title="饱和度" value="78.5%" progressValue={78.5} />
          <MetricCard icon="👥" title="委托者" value="247" description="活跃" />
          <MetricCard icon="📈" title="年化收益" value="4.2%" description="ROI" />
          <MetricCard icon="🔄" title="Relays 状态" value={
            <div className="py-2">
              <RelayStatusIndicator onlineCount={3} totalCount={3} />
            </div>
          } description="3/3 在线" />
        </section>

        <section className="text-center">
          <button className="stake-button px-8 py-4 text-white rounded-2xl shadow-xl font-bold text-lg">
            🎯 立即质押到 Bubble Pool
          </button>
          <p className="text-sm text-gray-500 mt-2">连接钱包开始获得稳定收益</p>
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

      <footer className="relative z-10 py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 candy-gradient rounded-full shadow-lg"></div>
                <span className="text-lg font-black text-gray-800">Bubble Pool</span>
              </div>
              <div className="text-center">
                <p className="text-gray-600 mb-1 text-sm">💝 感谢每一位委托者的信任！</p>
                <p className="text-xs text-gray-500">让我们一起在Cardano的海洋里畅游！</p>
              </div>
              <div className="flex items-center space-x-3">
                <a href="#" className="text-gray-500 hover:text-blue-500 transition-colors">
                  <i data-lucide="twitter" className="w-5 h-5"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-purple-500 transition-colors">
                  <i data-lucide="telegram" className="w-5 h-5"></i>
                </a>
                <a href="#" className="text-gray-500 hover:text-green-500 transition-colors">
                  <i data-lucide="mail" className="w-5 h-5"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
