import clsx from 'clsx';
import { Chip, ChipColor } from '@/components/ui/Chip';

export type ProjectCardProps = {
  tile: string;
  tileColor: 'sky' | 'mint' | 'lavender' | 'grass';
  name: string;
  body: string;
  status: string;
  statusColor: ChipColor;
  /** Renders a pulsing dot in the status chip */
  live?: boolean;
  linkLabel: string;
  linkHref: string;
  external?: boolean;
};

const tileClass = {
  sky: 'bg-brand-sky',
  mint: 'bg-brand-mint',
  lavender: 'bg-brand-lavender',
  grass: 'bg-brand-grass'
} as const;

export const ProjectCard = ({
  tile,
  tileColor,
  name,
  body,
  status,
  statusColor,
  live = false,
  linkLabel,
  linkHref,
  external = false
}: ProjectCardProps) => (
  <article className="bg-white rounded-lg p-7 flex flex-col gap-3.5 shadow-card transition-all duration-300 ease-brand hover:-translate-y-1 hover:scale-[1.01] hover:shadow-card-hover">
    <div
      className={clsx(
        'w-12 h-12 rounded-md flex-none grid place-items-center text-[15px] font-bold text-ink',
        tileClass[tileColor]
      )}
      aria-hidden="true"
    >
      {tile}
    </div>
    <h3 className="text-[19px] leading-[1.3]">{name}</h3>
    <p className="text-[14.5px] text-body flex-1">{body}</p>
    <div className="flex items-center justify-between gap-3 flex-wrap">
      <Chip color={statusColor} dotColor={live ? 'var(--orange)' : undefined} live={live}>
        {status}
      </Chip>
      <a
        href={linkHref}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="text-sm font-semibold text-ink underline underline-offset-[3px] transition-colors hover:text-brand-incana"
      >
        {linkLabel}
      </a>
    </div>
  </article>
);
