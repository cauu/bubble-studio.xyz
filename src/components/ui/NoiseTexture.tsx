'use client';

import clsx from 'clsx';
import { useId, type ComponentProps } from 'react';

export interface NoiseTextureProps extends ComponentProps<'svg'> {
  frequency?: number;
  octaves?: number;
  slope?: number;
  noiseOpacity?: number;
}

// Local port of Magic UI's Noise Texture component.
export const NoiseTexture = ({
  className,
  frequency = 0.4,
  octaves = 6,
  slope = 0.15,
  noiseOpacity = 0.6,
  ...props
}: NoiseTextureProps) => {
  const filterId = useId();

  return (
    <svg
      className={clsx('pointer-events-none absolute inset-0 size-full select-none', className)}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
    >
      <filter id={filterId}>
        <feTurbulence type="fractalNoise" baseFrequency={frequency} numOctaves={octaves} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="linear" slope={slope} />
          <feFuncG type="linear" slope={slope} />
          <feFuncB type="linear" slope={slope} />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter={`url(#${filterId})`} opacity={noiseOpacity} />
    </svg>
  );
};
