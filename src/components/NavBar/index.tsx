import { NavBarItem } from './Item';

export const NavBar = () => {
  return (
    <div className="flex items-center justify-center px-1 py-1 rounded-3xl bg-white z-50 border">
      <NavBarItem active />
      <NavBarItem />
      <NavBarItem />
    </div>
  );
};
