import React from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface LawyerCardProps {
  id: string;
  first_name: string;
  last_name: string;
  experience: string;
  avg_rating: number;
  review_count: number;
  languages: string[];
  specialities: string[];
  court_eligibility: [boolean, boolean, boolean];
  profile_picture: string;
  router: AppRouterInstance;
}

const LawyerCard: React.FC<LawyerCardProps> = ({
  id,
  first_name,
  last_name,
  experience,
  avg_rating,
  review_count,
  languages,
  specialities,
  court_eligibility,
  profile_picture,
  router
}) => {

  return (
    <div
      className="group relative flex flex-col p-5 bg-white dark:bg-[#1c1c1e] rounded-[22px] transition-all duration-300 hover:-translate-y-1"
      style={{
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.01), 0 2px 4px -1px rgba(0, 0, 0, 0.01), 0 10px 30px rgba(0, 0, 0, 0.04)',
        border: '1px solid rgba(0, 0, 0, 0.04)'
      }}
    >
      {/* Top Section: Avatar & Info */}
      <div className="flex items-start gap-5 mb-5">
        <div
          className="w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 bg-cover bg-center shadow-inner"
          style={{ backgroundImage: `url(${profile_picture})` }}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-[19px] font-semibold text-[#1d1d1f] dark:text-[#f5f5f7] truncate">
              {first_name} {last_name}
            </h3>
            <div className="flex items-center gap-1 bg-[#f5f5f7] dark:bg-[#2c2c2e] px-2 py-1 rounded-lg">
              <span className="material-symbols-rounded text-[14px] text-[#ffb300]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              <span className="text-xs font-medium text-[#1d1d1f] dark:text-white">{avg_rating}</span>
              <span className="text-[10px] text-[#86868b]">({review_count})</span>
            </div>
          </div>

          <p className="text-[14px] text-[#86868b] mb-2">{experience} Experience</p>

          <div className="flex flex-wrap gap-1.5">
            {specialities.slice(0, 3).map((spec, i) => (
              <span key={i} className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-[#0071e3]/10 text-[#0071e3] dark:text-[#409cff] dark:bg-[#409cff]/15">
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Middle: Details */}
      <div className="flex flex-col gap-3 mb-5 pl-1">

        {/* Languages */}
        <div className="flex items-center gap-2 text-[13px] text-[#86868b] dark:text-[#98989d]">
          <span className="material-symbols-outlined text-[18px]">translate</span>
          <span className="truncate">{languages.join(", ")}</span>
        </div>

        {/* Courts */}
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-medium text-[#1d1d1f] dark:text-[#ebebf5]">Courts:</span>
          <div className="flex gap-2">
            {court_eligibility[0] && <CourtBadge label="Supreme" icon="gavel" />}
            {court_eligibility[1] && <CourtBadge label="High" icon="balance" />}
            {court_eligibility[2] && <CourtBadge label="District" icon="account_balance" />}
          </div>
        </div>

      </div>

      {/* Action Button */}
      <button
        onClick={() => router.push(`/Lawyer-Profile/${id}`)}
        className="mt-auto w-full py-2.5 rounded-full bg-[#0071e3] dark:bg-[#0077ed] text-white text-[14px] font-medium hover:opacity-90 active:scale-[0.98] transition-all"
        style={{ boxShadow: '0 4px 12px rgba(0,113,227,0.2)' }}
      >
        View Profile
      </button>

    </div>
  );
};

const CourtBadge = ({ label, icon }: { label: string, icon: string }) => (
  <div className="flex items-center gap-1 text-[11px] text-[#86868b] dark:text-[#98989d] bg-[#f5f5f7] dark:bg-[#2c2c2e] px-2 py-0.5 rounded border border-black/5 dark:border-white/5">
    <span className="material-symbols-outlined text-[12px] opacity-70">{icon}</span>
    {label}
  </div>
);

export default LawyerCard;