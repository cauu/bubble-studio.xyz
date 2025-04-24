import { NavBar } from '../NavBar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center comic-bg h-full w-full">
      <div className="h-full w-full max-w-[1536px] p-6">
        <NavBar />
        {children}
      </div>
    </div>
  );
};
