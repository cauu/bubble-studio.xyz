import { GlobalConfig } from '@/constants';

/** Intrinsic SVG size: 607×85 */
const ASPECT = 607 / 85;

type PaoLogoProps = {
  /** Display height in px */
  height?: number;
  alt: string;
  className?: string;
  /** Above-the-fold usage (e.g. NavBar) — skip lazy loading */
  priority?: boolean;
};

export function PaoLogo({ height = 28, alt, className = 'h-7 w-auto', priority = false }: PaoLogoProps) {
  const width = Math.round(height * ASPECT);

  return (
    <img
      src={GlobalConfig.assetsUrl.bubbleLogo}
      alt={alt}
      width={width}
      height={height}
      decoding="async"
      {...(priority ? { fetchPriority: 'high' as const } : { loading: 'lazy' as const })}
      className={className}
    />
  );
}
