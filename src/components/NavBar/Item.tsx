import classNames from 'classnames';

interface IProps {
  active?: boolean;
  text: string;
  href?: string;
}

export const NavBarItem = ({ active, text, href }: IProps) => {
  const className = classNames(
    'leading-8 w-20 flex items-center justify-center cursor-pointer z-10 transition-all duration-300 hover:-translate-y-0.5 font-[600]',
    active ? 'text-white' : '',
    !active ? 'text-black' : ''
  );

  return (
    <a href={href} className={className}>
      {text}
    </a>
  );
};
