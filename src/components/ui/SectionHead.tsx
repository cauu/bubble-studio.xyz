import { ReactNode } from 'react';
import clsx from 'clsx';
import { Chip, ChipColor } from './Chip';

type Props = {
  chip: ReactNode;
  chipColor?: ChipColor;
  title: ReactNode;
  titleId?: string;
  sub?: ReactNode;
  className?: string;
};

export const SectionHead = ({ chip, chipColor = 'card', title, titleId, sub, className }: Props) => (
  <div className={clsx('max-w-[46rem] mb-12', className)}>
    <Chip color={chipColor} className="mb-4">
      {chip}
    </Chip>
    <h2 id={titleId} className="text-[clamp(30px,4vw,46px)] leading-[1.15] mb-3.5 text-balance">
      {title}
    </h2>
    {sub && <p className="text-[16.5px] text-body">{sub}</p>}
  </div>
);
