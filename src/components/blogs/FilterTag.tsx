import clsx from 'clsx';

export const FilterTag = (props: { tag: string; isSelected: boolean; onClick?: (tag: string) => void }) => {
  const { tag, isSelected, onClick } = props;

  return (
    <button
      className={clsx(
        'px-2.5 md:px-4 py-1.5 md:py-2 bg-white/80 text-gray-700 rounded-full font-medium md:font-bold text-xs md:text-sm hover-grow transition-all',
        {
          'border-2 border-[#3f8efc] bg-blue-50': isSelected,
          'border border-transparent': !isSelected
        }
      )}
      onClick={() => onClick?.(tag)}
    >
      {tag}
    </button>
  );
};
