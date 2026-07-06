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
  const tileColor = theme === 'cardano' ? 'bg-brand-sea text-on-dark' : 'bg-brand-lavender text-ink';

  return (
    <section className="relative z-10" id={`${theme}-guide`}>
      <div className="mx-auto">
        <div className="bg-white rounded-lg p-6 md:p-8 shadow-card">
          <h3 className="text-lg md:text-xl mb-4 md:mb-6 text-center">{title}</h3>

          {/* 移动端：垂直布局 */}
          <div className="md:hidden space-y-4">
            {steps.map((step, index) => (
              <div className="flex items-start gap-4" key={step.title}>
                <div
                  className={`w-10 h-10 flex-shrink-0 ${tileColor} rounded-md grid place-items-center text-base font-bold tnum`}
                >
                  {index + 1}
                </div>
                <div className="flex-1 pt-1">
                  <h4 className="font-semibold text-ink mb-1 text-sm">{step.title}</h4>
                  <p className="text-xs text-muted">{step.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 桌面端：水平布局 */}
          <div className="hidden md:grid gap-4" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {steps.map((step, index) => (
              <div className="text-center" key={step.title}>
                <div
                  className={`w-12 h-12 ${tileColor} rounded-md grid place-items-center text-lg font-bold mx-auto mb-3 tnum`}
                >
                  {index + 1}
                </div>
                <h4 className="font-semibold text-ink mb-2 text-sm">{step.title}</h4>
                <p className="text-xs text-muted">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
