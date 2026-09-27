import React from 'react';
import { LayoutGrid, Sparkles, Share2, Smartphone, Wrench, Clock } from 'lucide-react';
import { PromotionSubmenuId } from '../types';

interface BlankSubmenuPageProps {
  submenuId: PromotionSubmenuId;
}

export const BlankSubmenuPage: React.FC<BlankSubmenuPageProps> = ({ submenuId }) => {
  const getSubmenuMeta = () => {
    switch (submenuId) {
      case 'promotion-dashboard':
        return {
          title: 'Promotion Dashboard',
          description: 'Analytics, overview metrics, and campaign performance dashboard.',
          icon: LayoutGrid,
        };
      case 'user-retention-summary':
        return {
          title: 'User Retention Summary',
          description: 'User churn metrics, retention reward cohorts, and reactivation campaigns.',
          icon: Sparkles,
        };
      case 'influencer-promotion':
        return {
          title: 'Influencer Promotion',
          description: 'Social influencer tracking, affiliate promo codes, and commission tiers.',
          icon: Share2,
        };
      case 'appsflyer':
        return {
          title: 'Appsflyer',
          description: 'Appsflyer attribution tracking, deep-link campaigns, and install reward events.',
          icon: Smartphone,
        };
      default:
        return {
          title: 'Maintenance Promotions',
          description: 'Configure and manage maintenance promotion rules and reward types.',
          icon: Wrench,
        };
    }
  };

  const meta = getSubmenuMeta();
  const IconComp = meta.icon;

  return (
    <div className="w-full">
      {/* Header bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span>Promotion Types</span>
            <span>/</span>
            <span className="text-[#389472] font-medium">{meta.title}</span>
          </div>
          <h5 className="text-[1.4rem] font-normal text-[#111827] tracking-tight">
            {meta.title}
          </h5>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-800">
          <Clock className="w-3.5 h-3.5 text-emerald-600" />
          <span>Awaiting Page Content</span>
        </div>
      </div>

      {/* Blank canvas container */}
      <div className="w-full min-h-[380px] bg-white rounded-lg border border-[#dfe7ef] shadow-xs flex flex-col items-center justify-center p-8 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#38947215] flex items-center justify-center text-[#389472] mb-4 shadow-inner">
          <IconComp className="w-8 h-8" />
        </div>

        <h3 className="text-base font-semibold text-gray-800 mb-1.5">
          {meta.title}
        </h3>

        <p className="text-sm text-gray-500 max-w-md mb-6 leading-relaxed">
          {meta.description}
        </p>

        <div className="p-3.5 rounded-lg bg-gray-50 border border-gray-200 max-w-sm text-xs text-gray-600">
          <p className="font-medium text-gray-700 mb-1">Ready for Content</p>
          <p className="text-[11px] text-gray-500">
            This module is reserved and ready. The detailed table, forms, or analytics for this page can be added whenever you provide the specifications.
          </p>
        </div>
      </div>
    </div>
  );
};
