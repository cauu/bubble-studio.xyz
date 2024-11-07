import { NavBar } from '../NavBar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const a = 123;

  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};
