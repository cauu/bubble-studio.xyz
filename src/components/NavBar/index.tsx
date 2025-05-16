import clsx from 'clsx';
import { useRouter } from 'next/router';
// import { Layers } from 'lucide-react';

import Link from 'next/link';

const navItems = [
  {
    text: '治理',
    path: '/governance'
  },
  {
    text: '质押',
    path: '/staking'
  },
  {
    text: '关于我们',
    path: '/about'
  }
];

export const NavBar = () => {
  const router = useRouter();

  const path = router.asPath;

  return (
    // <div className="w-full h-full">
    <nav className="card bg-white p-4 flex items-center justify-between mb-6">
      <div className="flex items-center">
        <div className="text-3xl title-font mr-10 flex items-center text-[#0a2463]">
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
        </div>
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
      <div className="flex items-center">
        {/* <button className="btn px-4 py-2 bg-[#3f8efc] text-white mr-4">连接钱包</button> */}
        {/* <div className="flex items-center">
            <Globe size={20} className="mr-1" />
            <select className="border-2 border-[#0a2463] rounded-md p-1">
              <option>中文</option>
              <option>English</option>
            </select>
          </div> */}
      </div>
    </nav>
    // </div>
  );
};
