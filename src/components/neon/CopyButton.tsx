'use client';

import { useState } from 'react';

type Props = {
  value: string;
  label?: string;
  copiedLabel?: string;
  ariaLabel?: string;
  className?: string;
};

export const CopyButton = ({ value, label = 'COPY', copiedLabel = 'COPIED', ariaLabel, className = 'copy' }: Props) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button type="button" className={className} onClick={copy} aria-label={ariaLabel}>
      {copied ? copiedLabel : label}
    </button>
  );
};
