import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useMemo } from 'react';
import { Globe } from 'lucide-react';
// import { Layers } from 'lucide-react';

export const NavBar = () => {
  const router = useRouter();
  const { t } = useTranslation('common');

  const navItems = useMemo(
    () => [
      {
        text: t('header.governance'),
        path: '/governance'
      },
      {
        text: t('header.staking'),
        path: '/staking'
      },
      {
        text: t('header.about'),
        path: '/about'
      }
    ],
    [t]
  );

  const path = router.asPath;

  return (
    // <div className="w-full h-full">
    <nav className="card bg-white p-4 flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Link href="/" className="text-3xl title-font mr-10 flex items-center text-[#0a2463]">
          {/* <Layers size={32} className="mr-2" /> */}
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-2"
          >
            <circle cx="20" cy="20" r="18" fill="#d6e4ff" stroke="#0a2463" strokeWidth="4" />
            <circle cx="20" cy="20" r="8" fill="#3f8efc" stroke="#0a2463" strokeWidth="4" />
          </svg>
          Bubble Studio
        </Link>
        <div className="flex space-x-6">
          {navItems.map((item) => {
            return (
              <Link
                key={item.path}
                href={item.path}
                className={clsx('font-bold text-[#0a2463]', {
                  'text-[#3f8efc]': item.path === path
                })}
              >
                {item.text}
              </Link>
            );
          })}
        </div>
      </div>
      <div className="flex items-center mr-4">
        {/* <button className="btn px-4 py-2 bg-[#3f8efc] text-white mr-4">连接钱包</button> */}
        {/* <div className="flex items-center">
            <Globe size={20} className="mr-1" />
            <select className="border-2 border-[#0a2463] rounded-md p-1">
              <option>中文</option>
              <option>English</option>
            </select>
          </div> */}
        <div className="flex items-center gap-2">
          <Globe size={24} className="text-[#0a2463]" />

          <select
            className="border-2 border-[#0a2463] rounded-md p-1 text-[#0a2463] font-bold bg-white cursor-pointer"
            value={router.locale}
            onChange={(e) => {
              const locale = e.target.value;
              router.push(router.asPath, router.asPath, { locale });
            }}
          >
            <option value="zh">简体中文</option>
            <option value="tw">繁體中文</option>
            <option value="en">English</option>
          </select>
        </div>
      </div>
    </nav>
    // </div>
  );
};
