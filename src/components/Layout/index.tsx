import { NavBar } from '../NavBar';

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen overflow-auto bg-gradient-to-br from-blue-50 via-sky-100 to-blue-100 justify-center items-center">
      {/* <BubbleBackground count={15} minSize={20} maxSize={60} glassEffect={true} zIndex={10} /> */}

      {/* Floating Bubbles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-20 h-20 bg-blue-300/30 rounded-full top-20 left-20 animate-bounce"
          style={{ animationDelay: '0s', animationDuration: '4s' }}
        ></div>
        <div
          className="absolute w-16 h-16 bg-sky-300/30 rounded-full top-40 right-32 animate-bounce"
          style={{ animationDelay: '1s', animationDuration: '3.5s' }}
        ></div>
        <div
          className="absolute w-12 h-12 bg-cyan-300/30 rounded-full bottom-32 left-40 animate-bounce"
          style={{ animationDelay: '2s', animationDuration: '4.5s' }}
        ></div>
        <div
          className="absolute w-24 h-24 bg-blue-200/30 rounded-full top-60 left-1/2 animate-bounce"
          style={{ animationDelay: '0.5s', animationDuration: '5s' }}
        ></div>
      </div>

      <div className="h-full w-full flex-1 max-w-[1536px] md:p-6 p-0 relative">
        <NavBar />

        <div>{children}</div>
      </div>
    </div>
  );
};
