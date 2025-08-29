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
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{title}</h3>
          <div className={`grid gap-4`} style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
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
