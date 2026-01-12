import React from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface ExploreHeaderProps {
  onOpenFilters: () => void;
  router: AppRouterInstance;
}

const ExploreHeader: React.FC<ExploreHeaderProps> = ({ onOpenFilters, router }) => {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        backdropFilter: 'saturate(180%) blur(20px)',
        WebkitBackdropFilter: 'saturate(180%) blur(20px)',
        backgroundColor: 'rgba(245, 245, 247, 0.72)', // Light mode glass
        borderBottom: '1px solid rgba(0,0,0,0.05)',
        transition: 'background-color 0.3s'
      }}
      className="dark:!bg-[#000000cc] dark:!border-white/10"
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-[1440px] mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-[20px] text-[#1d1d1f] dark:text-[#f5f5f7]">
              arrow_back_ios_new
            </span>
          </button>

          <h1 className="text-[22px] font-bold text-[#1d1d1f] dark:text-[#f5f5f7] tracking-tight">
            Explore
          </h1>
        </div>

        <button
          onClick={onOpenFilters}
          className="flex items-center justify-center p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-[#0071e3]"
        >
          <span className="material-symbols-outlined text-[24px]">filter_list</span>
        </button>
      </div>
    </header>
  );
};

export default ExploreHeader;