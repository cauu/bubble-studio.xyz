interface StepGuidProps {
  title: string;
  steps: {
    title: string;
    description: string;
  }[];
  theme?: 'cardano' | 'starknet';
}

export const StepGuid = (props: StepGuidProps) => {
  const { title, steps, theme = 'cardano' } = props;

  return (
    <section className="relative z-10" id="cardano-guide" style={{ display: 'block' }}>
      <div className="mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl md:rounded-3xl p-4 md:p-6 shadow-xl">
          <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6 text-center">{title}</h3>

          {/* 移动端：垂直布局 */}
          <div className="md:hidden space-y-4">
            {steps.map((step, index) => (
              <div className="flex items-start gap-4" key={step.title}>
                <div
                  className={`w-10 h-10 flex-shrink-0 ${theme === 'cardano' ? 'bg-blue-500' : 'starknet-gradient'} text-white rounded-full flex items-center justify-center text-base font-bold`}
                >
                  {index + 1}
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-bold text-gray-800 mb-1 text-sm">{step.title}</h4>
                  <p className="text-xs text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 桌面端：水平布局 */}
          <div className="hidden md:grid gap-4" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {steps.map((step, index) => (
              <div className="text-center" key={step.title}>
                <div
                  className={`w-12 h-12 ${theme === 'cardano' ? 'bg-blue-500' : 'starknet-gradient'} text-white rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-3`}
                >
                  {index + 1}
                </div>
                <h4 className="font-bold text-gray-800 mb-2 text-sm">{step.title}</h4>
                <p className="text-xs text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
