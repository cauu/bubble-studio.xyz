import clsx from 'clsx';
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type Variant = 'primary' | 'ghost' | 'oncolor';
type Size = 'md' | 'lg';

const baseClass =
  'inline-flex items-center justify-center gap-2 font-semibold leading-none whitespace-nowrap rounded-md cursor-pointer transition-all duration-200 ease-brand active:scale-[.97]';

const variantClass: Record<Variant, string> = {
  primary:
    'bg-primary text-on-dark shadow-[0_2px_10px_rgba(23,32,38,.18)] hover:bg-primary-active hover:-translate-y-px hover:shadow-[0_5px_18px_rgba(23,32,38,.24)]',
  ghost:
    'bg-white text-ink shadow-[0_1px_2px_rgba(23,32,38,.05),0_4px_14px_rgba(23,32,38,.07)] hover:-translate-y-px hover:shadow-[0_3px_6px_rgba(23,32,38,.05),0_8px_22px_rgba(23,32,38,.10)]',
  oncolor:
    'bg-white text-ink shadow-[0_2px_8px_rgba(4,42,46,.24)] hover:-translate-y-px hover:shadow-[0_5px_16px_rgba(4,42,46,.30)]'
};

const sizeClass: Record<Size, string> = {
  md: 'text-[15px] px-[22px] py-[14px]',
  lg: 'text-base px-7 py-4'
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type ButtonAsAnchor = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...rest
}: ButtonAsAnchor | ButtonAsButton) => {
  const classes = clsx(baseClass, variantClass[variant], sizeClass[size], className);

  if (rest.href !== undefined) {
    return (
      <a className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
};
