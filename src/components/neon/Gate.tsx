import { ReactNode } from 'react';
import type { WorkColor } from '@/lib/works';

type Props = {
  num: string;
  en: string;
  title: ReactNode;
  color: WorkColor;
  titleId?: string;
  /** Right-hand slot: a short aside or a link button */
  aside?: ReactNode;
};

/** Chapter gate: neon rule that wipes in, outlined number, small English label and title */
export const Gate = ({ num, en, title, color, titleId, aside }: Props) => (
  <div className="gate reveal" style={{ ['--c' as string]: `var(--${color})` }}>
    <span className="num" aria-hidden="true">
      {num}
    </span>
    <div>
      <span className="en">{en}</span>
      <h2 id={titleId}>{title}</h2>
    </div>
    {aside}
  </div>
);
