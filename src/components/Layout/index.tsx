import { NavBar } from '../NavBar';
// import BubbleBackground from '../BubbleBackground';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex justify-center comic-bg h-full w-full relative">
      {/* <BubbleBackground count={15} minSize={20} maxSize={60} glassEffect={true} zIndex={10} /> */}

      <div className="h-full w-full max-w-[1536px] p-6 relative">
        <NavBar />

        {children}
      </div>
    </div>
  );
};
