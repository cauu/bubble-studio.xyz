import { NavBar } from '../NavBar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="comic-bg h-full w-full">
      {/* <div className="fixed top-6 left-1/2 -translate-x-1/2 w-fit border-red-50"> */}
      <NavBar />
      {/* </div> */}
      {children}
    </div>
  );
};
