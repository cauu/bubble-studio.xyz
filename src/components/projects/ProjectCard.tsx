import Image from 'next/image';
import { ArrowUpRight, Github } from 'lucide-react';

export type ProjectCardProps = {
  type: string;
  title: string;
  description: string;
  projectHref: string;
  githubHref?: string;
  screenshot: string;
  visitLabel: string;
};

export const ProjectCard = ({
  type,
  title,
  description,
  projectHref,
  githubHref,
  screenshot,
  visitLabel
}: ProjectCardProps) => (
  <article className="group relative h-full overflow-hidden rounded-lg bg-white shadow-card transition-all duration-300 ease-brand hover:-translate-y-1 hover:shadow-card-hover focus-within:-translate-y-1 focus-within:shadow-card-hover">
    <div className="relative aspect-video overflow-hidden bg-surface-card">
      <Image
        src={screenshot}
        alt=""
        fill
        sizes="(max-width: 600px) 100vw, 50vw"
        className="object-cover transition-transform duration-500 ease-brand group-hover:scale-[1.025]"
      />
      <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1.5 text-xs font-semibold text-ink shadow-sm backdrop-blur">
        {type}
      </span>
    </div>

    <div className="flex min-h-[190px] flex-col p-6">
      <div className="mb-3 flex items-start justify-between gap-4">
        <h3 className="text-[21px] leading-[1.25]">{title}</h3>
        <ArrowUpRight
          className="mt-0.5 h-5 w-5 flex-none text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
          aria-hidden="true"
        />
      </div>
      <p className="flex-1 text-[14.5px] leading-relaxed text-body">{description}</p>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-hairline-soft pt-4">
        <span className="text-sm font-semibold text-ink">{visitLabel}</span>
        {githubHref && (
          <a
            href={githubHref}
            target="_blank"
            rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-ink focus-visible:text-ink"
            aria-label={`${title} GitHub`}
          >
            <Github className="h-4 w-4" aria-hidden="true" />
            GitHub
          </a>
        )}
      </div>
    </div>

    <a
      href={projectHref}
      target="_blank"
      rel="noopener noreferrer"
      className="absolute inset-0 rounded-lg focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-brand-sea"
      aria-label={`${visitLabel}: ${title}`}
    />
  </article>
);
