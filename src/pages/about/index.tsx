export default function About() {
  return (
    <div className="card bg-white px-16 pt-14 pb-10 flex flex-col items-center relative z-10">
      <div className="flex items-center mb-6">
        <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-3">
          <circle cx="20" cy="20" r="18" fill="#d6e4ff" stroke="#0a2463" stroke-width="4" />
          <circle cx="20" cy="20" r="8" fill="#3f8efc" stroke="#0a2463" stroke-width="4" />
        </svg>
        <span className="text-4xl title-font text-[#0a2463]">Bubble Studio Staking</span>
      </div>
      {/* <h1 className="text-5xl title-font text-[#3f8efc] mb-4 tracking-wider" style={{ letterSpacing: '2px' }}>
            即将上线
          </h1> */}
      <p className="text-xl text-[#0a2463] font-bold mb-8 text-center" style={{ maxWidth: '420px' }}>
        {/* 我们正在努力开发新功能，敬请期待！<br> */}
        <span className="text-[#3f8efc]">Coming Soon...</span>
      </p>
      {/* <Link href="/" className="btn bg-[#3f8efc] text-white px-8 py-3 text-lg font-bold flex items-center">
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回首页
          </Link> */}
    </div>
  );
}
