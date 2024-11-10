import classNames from 'classnames';

interface IProps {
  active?: boolean;
}

export const NavBarItem = ({ active }: IProps) => {
  const className = classNames(
    'leading-8 w-20 flex items-center justify-center cursor-pointer z-10 transition-all duration-300 text-white hover:-translate-y-0.5',
    active ? 'text-blue-500' : '',
    !active ? 'text-black' : ''
  );

  return <a className={className}>NavBarItem</a>;
};
