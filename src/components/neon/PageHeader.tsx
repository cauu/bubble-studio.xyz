import { ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import type { WorkColor } from '@/lib/works';

type Props = {
  /** Terminal path after `~/`, e.g. "works" */
  path: string;
  title: ReactNode;
  sub?: ReactNode;
  color: WorkColor;
  /** Extra content below the sub line (CTAs, notes) */
  children?: ReactNode;
};

/** Page header: terminal path + short title (keyword highlight) + one line; logo geometry bleeds off the right */
export const PageHeader = ({ path, title, sub, color, children }: Props) => (
  <header className="ph" style={{ ['--c' as string]: `var(--${color})` }}>
    <div className="art" aria-hidden="true">
      <span className="g-p" data-py=".06" />
      <span className="g-a" data-py="-.04" />
      <span className="g-o" data-py=".08" />
    </div>
    <div className="crumb reveal">
      &gt; <Link href="/">~</Link>/{path}
    </div>
    <h1 className="reveal" style={{ ['--d' as string]: '.08s' }}>
      {title}
    </h1>
    {sub && (
      <p className="sub reveal" style={{ ['--d' as string]: '.16s' }}>
        {sub}
      </p>
    )}
    {children}
  </header>
);
