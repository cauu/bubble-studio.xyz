import classNames from 'classnames';
import { useRouter } from 'next/router';
import { NavBarItem } from './Item';
import { useEffect, useState } from 'react';

const navItems = [
  {
    text: 'Home',
    anchor: 'home'
  },
  {
    text: 'Staking',
    anchor: 'staking'
  },
  {
    text: 'Events',
    anchor: 'events'
  },
  {
    text: 'Projects',
    anchor: 'projects'
  }
];

export const NavBar = () => {
  const router = useRouter();
  const [hash, setHash] = useState('');

  useEffect(() => {
    // 初始化 hash
    setHash(window.location.hash.replace('#', '') || '');

    // 添加 hashchange 事件监听器
    const handleHashChange = () => {
      setHash(window.location.hash.replace('#', '') || '');
    };

    window.addEventListener('hashchange', handleHashChange);

    // 清理事件监听器
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [router.asPath]);

  const activePosition =
    navItems.findIndex((item) => item.anchor === hash) >= 0 ? navItems.findIndex((item) => item.anchor === hash) : 0;

  return (
    <div className="flex relative items-center justify-center px-1 py-1 rounded-3xl bg-white z-50 border gap-4">
      {navItems.map((item) => {
        return <NavBarItem key={item.text} text={item.text} active={item.anchor === hash} href={`#${item.anchor}`} />;
      })}
      <div
        style={{
          left: `${96 * activePosition + 5}px`
        }}
        className={classNames(
          'absolute m-0 top-[50%] h-8 w-20 bg-[#000000] transition-all duration-300 rounded-3xl z-0 translate-y-[-50%]'
        )}
      ></div>
    </div>
  );

  // 80 * i
};
