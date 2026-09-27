import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Wrench,
  Sparkles,
  Share2,
  Smartphone,
  ChevronRight,
  Info,
  Calendar,
  Layers,
  ArrowRight,
  CheckCircle2,
  PieChart,
} from 'lucide-react';

import { PromotionDashboardAnalytics } from './PromotionDashboardAnalytics';

interface SubPart {
  name: string;
  count: number;
  percentage: number;
  color: string;
}

interface CategoryData {
  id: number;
  key: string;
  name: string;
  shortName: string;
  count: number;
  totalCost: number; // Added totalCost
  sharePercent: number;
  color: string;
  lightColor: string;
  icon: React.ComponentType<{ className?: string }>;
  subParts: SubPart[];
}

export const PromotionDashboard: React.FC = () => {
  const categories: CategoryData[] = [
    {
      id: 1,
      key: 'maintenance-promotion',
      name: 'Maintenance Promotions',
      shortName: 'MAINTENANCE PR...',
      count: 7650,
      totalCost: 76500, // Added cost
      sharePercent: 16.8,
      color: '#1b5e43',
      lightColor: '#c0e3d5',
      icon: Wrench,
      subParts: [
        {
          name: 'National Day',
          count: 4450,
          percentage: 58.2,
          color: '#1b5e43',
        },
        {
          name: 'Referral Reward',
          count: 3200,
          percentage: 41.8,
          color: '#2a7c5c',
        },
      ],
    },
    {
      id: 2,
      key: 'user-retention-summary',
      name: 'User Retention Summary',
      shortName: 'USER RETENTION...',
      count: 14350,
      totalCost: 143500, // Added cost
      sharePercent: 31.5,
      color: '#9fd3c7',
      lightColor: '#e6f4f1',
      icon: Sparkles,
      subParts: [
        {
          name: 'Case 1 Day 3 Gentle Nudge',
          count: 3000,
          percentage: 20.9,
          color: '#499a89',
        },
        {
          name: 'Case 1 Day 5 Incentive Push',
          count: 2500,
          percentage: 17.4,
          color: '#70bba9',
        },
        {
          name: 'Case 1 Day 7 Final Reminder',
          count: 2000,
          percentage: 13.9,
          color: '#9fd3c7',
        },
        {
          name: 'Case 2 Day 5 Impact Message',
          count: 2000,
          percentage: 13.9,
          color: '#557568',
        },
        {
          name: 'Case 2 Day 8 Limited Offer',
          count: 1500,
          percentage: 10.5,
          color: '#8ea89d',
        },
        {
          name: 'Case 2 Day 14 Feedback Trigger',
          count: 1500,
          percentage: 10.5,
          color: '#a3beaf',
        },
        {
          name: 'Case 3 Monthly Impact Push',
          count: 1000,
          percentage: 7.0,
          color: '#3d6c59',
        },
        {
          name: 'Case 4 Reactivation Push',
          count: 850,
          percentage: 5.9,
          color: '#719c89',
        },
      ],
    },
    {
      id: 3,
      key: 'influencer-promotion',
      name: 'Influencer Promotion',
      shortName: 'INFLUENCER PRO...',
      count: 12450,
      totalCost: 124500, // Added cost
      sharePercent: 27.4,
      color: '#8ea89d',
      lightColor: '#e5ece9',
      icon: Share2,
      subParts: [
        { name: 'احمد', count: 2000, percentage: 16.1, color: '#557568' },
        { name: 'zaid', count: 2000, percentage: 16.1, color: '#8ea89d' },
        { name: 'على', count: 2000, percentage: 16.1, color: '#3d6c59' },
        { name: 'زهراء', count: 2000, percentage: 16.1, color: '#719c89' },
        { name: 'مراد', count: 2225, percentage: 17.9, color: '#557568' },
        { name: 'دينا', count: 2225, percentage: 17.9, color: '#8ea89d' },
      ],
    },
    {
      id: 4,
      key: 'appsflyer',
      name: 'Appsflyer',
      shortName: 'APPSFLYER CAM...',
      count: 11050,
      totalCost: 110500, // Added cost
      sharePercent: 24.3,
      color: '#a3beaf',
      lightColor: '#eef3f0',
      icon: Smartphone,
      subParts: [
        { name: 'App Open', count: 6539, percentage: 59.2, color: '#3d6c59' },
        { name: 'Order Started', count: 2373, percentage: 21.5, color: '#719c89' },
        { name: 'Login Opened', count: 2343, percentage: 21.2, color: '#557568' },
        { name: 'Scheduling Viewed', count: 991, percentage: 9.0, color: '#8ea89d' },
        { name: 'Registration Completed', count: 720, percentage: 6.5, color: '#3d6c59' },
        { name: 'Order Confirmed', count: 1107, percentage: 10.0, color: '#719c89' },
        { name: 'App Install', count: 250, percentage: 2.3, color: '#557568' },
      ],
    },
  ];

  // Currently selected category index (default 0 = Maintenance promotion, matching sample image)
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const selectedCategory = categories[selectedIndex];

  // Total promotions count
  const totalCount = categories.reduce((acc, curr) => acc + curr.count, 0);
  const totalCost = categories.reduce((acc, curr) => acc + curr.totalCost, 0);

  // Helper to generate SVG Donut Slice Path
  const getDonutSlicePath = (
    cx: number,
    cy: number,
    rInner: number,
    rOuter: number,
    startAngleDeg: number,
    endAngleDeg: number,
    isExploded: boolean,
    explodeDistance: number = 10
  ) => {
    // Gap between slices (2 degrees)
    const gap = 1.5;
    const start = (startAngleDeg + gap) * (Math.PI / 180);
    const end = (endAngleDeg - gap) * (Math.PI / 180);

    let offsetX = 0;
    let offsetY = 0;

    if (isExploded) {
      const midAngle = ((startAngleDeg + endAngleDeg) / 2) * (Math.PI / 180);
      offsetX = Math.cos(midAngle) * explodeDistance;
      offsetY = Math.sin(midAngle) * explodeDistance;
    }

    const cX = cx + offsetX;
    const cY = cy + offsetY;

    const x1 = cX + rOuter * Math.cos(start);
    const y1 = cY + rOuter * Math.sin(start);
    const x2 = cX + rOuter * Math.cos(end);
    const y2 = cY + rOuter * Math.sin(end);

    const x3 = cX + rInner * Math.cos(end);
    const y3 = cY + rInner * Math.sin(end);
    const x4 = cX + rInner * Math.cos(start);
    const y4 = cY + rInner * Math.sin(start);

    const largeArc = endAngleDeg - startAngleDeg > 180 ? 1 : 0;

    return `M ${x1} ${y1} A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2} L ${x3} ${y3} A ${rInner} ${rInner} 0 ${largeArc} 0 ${x4} ${y4} Z`;
  };

  // Compute angles for the Main Donut Chart
  let accumulatedAngle = -90; // Start at 12 o'clock
  const mainSlices = categories.map((cat, idx) => {
    const angleSpan = (cat.sharePercent / 100) * 360;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + angleSpan;
    accumulatedAngle += angleSpan;

    return {
      cat,
      index: idx,
      startAngle,
      endAngle,
      midAngle: (startAngle + endAngle) / 2,
    };
  });

  // Compute angles for Sub-parts Donut Chart
  let subAccumulatedAngle = -90;
  const subSlices = selectedCategory.subParts.map((sub, sIdx) => {
    const angleSpan = (sub.percentage / 100) * 360;
    const startAngle = subAccumulatedAngle;
    const endAngle = subAccumulatedAngle + angleSpan;
    subAccumulatedAngle += angleSpan;

    return {
      sub,
      index: sIdx,
      startAngle,
      endAngle,
    };
  });

  return (
    <div className="w-full space-y-6 pb-14">
      <h2 className="text-[1.5rem] font-semibold text-[#111827] tracking-tight">
        Promotion Dashboard
      </h2>

      {/* Total Cost Component */}
      <div className="bg-[#1b5e43] rounded-xl p-4 text-white flex justify-between items-center shadow-md">
        <div>
          <p className="text-emerald-100 text-xs font-medium">Total Promotions Cost</p>
          <h3 className="text-2xl font-bold mt-0.5">SAR {totalCost.toLocaleString()}</h3>
        </div>
        <div className="bg-white/20 p-2 rounded-lg">
          <Calendar className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Metric Cards Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {categories.map((cat, idx) => {
          const isSelected = selectedIndex === idx;
          const Icon = cat.icon;

          return (
            <div
              key={cat.id}
              onClick={() => setSelectedIndex(idx)}
              className={`p-3.5 rounded-xl border transition-all duration-200 cursor-pointer select-none relative ${
                isSelected
                  ? 'bg-white border-[#1b5e43] shadow-md ring-2 ring-[#1b5e43]/20'
                  : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white"
                  style={{ backgroundColor: cat.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span
                  className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: isSelected ? '#1b5e4318' : '#f3f4f6',
                    color: isSelected ? '#1b5e43' : '#4b5563',
                  }}
                >
                  {cat.sharePercent}%
                </span>
              </div>

              <div className="text-xl font-bold text-gray-900 tracking-tight font-mono">
                SAR {cat.totalCost.toLocaleString()}
              </div>

              <div className="text-xs font-medium text-gray-600 mt-0.5 flex items-center justify-between">
                <span>{cat.name}</span>
                {isSelected && (
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#1b5e43] shrink-0" />
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Donut Section (Matching the Reference Image) */}
      <div className="bg-white rounded-2xl border border-[#dfe7ef] p-6 shadow-sm">
        {/* Component Header / Title */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#142944] flex items-center justify-center text-white shadow-xs">
              <PieChart className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-[16px] font-bold text-gray-900 tracking-tight">
                Promotion Breakdown & Distribution
              </h3>
              <p className="text-xs text-gray-500 font-medium">
                Interactive distribution and sub-component breakdown by promotion category
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
              Active: {selectedCategory.name} ({selectedCategory.sharePercent}%)
            </span>
          </div>
        </div>

        {/* Visual Dual-Donut Area */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center py-4 gap-8">
          {/* ============================================================ */}
          {/* 1. MAIN DONUT CHART (Left) */}
          {/* ============================================================ */}
          <div className="flex flex-col items-center">
            <div className="relative w-[300px] h-[300px]">
              <svg
                viewBox="0 0 340 340"
                className="w-full h-full drop-shadow-sm select-none"
              >
                {/* SVG Filter for selected popped slice shadow */}
                <defs>
                  <filter id="sliceShadow" x="-20%" y="-20%" width="150%" height="150%">
                    <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.25" />
                  </filter>
                </defs>

                {/* Slices of Main Donut */}
                {mainSlices.map((item) => {
                  const isSelected = selectedIndex === item.index;
                  const pathData = getDonutSlicePath(
                    170,
                    170,
                    92,
                    145,
                    item.startAngle,
                    item.endAngle,
                    isSelected,
                    14
                  );

                  return (
                    <path
                      key={item.cat.id}
                      d={pathData}
                      fill={item.cat.color}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? '3' : '2'}
                      filter={isSelected ? 'url(#sliceShadow)' : undefined}
                      className="cursor-pointer transition-all duration-300 hover:opacity-90"
                      onClick={() => setSelectedIndex(item.index)}
                    />
                  );
                })}
              </svg>

              {/* Center Content of Main Donut */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-4"
                style={{
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '150px',
                  height: '150px',
                }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-[1.5rem] font-extrabold text-[#0a3826] tracking-tight font-mono leading-none">
                    SAR {totalCost.toLocaleString()}
                  </span>
                  <span className="text-[10px] font-bold text-[#0a3826] tracking-wider uppercase mt-1">
                    TOTAL COST
                  </span>
                </div>
              </div>
            </div>

            <span className="mt-2 text-xs font-semibold text-gray-700">
              Main Chart
            </span>
          </div>

          {/* ============================================================ */}
          {/* 3. ZOOM-OUT DONUT CHART + SUB-PARTS (Right) */}
          {/* ============================================================ */}
          <motion.div
            key={selectedCategory.id}
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-row items-center gap-6 bg-gray-50/50 p-4 rounded-2xl border border-gray-100"
          >
            {/* Child Donut */}
            <div className="flex flex-col items-center">
              <div className="relative w-[200px] h-[200px]">
                <svg
                  viewBox="0 0 300 300"
                  className="w-full h-full drop-shadow-sm select-none"
                >
                  {/* Slices of Sub-parts Donut */}
                  {subSlices.map((item) => {
                    const pathData = getDonutSlicePath(
                      150,
                      150,
                      80,
                      130,
                      item.startAngle,
                      item.endAngle,
                      false,
                      0
                    );

                    return (
                      <path
                        key={item.index}
                        d={pathData}
                        fill={item.sub.color}
                        stroke="#ffffff"
                        strokeWidth="2.5"
                        className="cursor-pointer transition-all duration-200 hover:opacity-90"
                      />
                    );
                  })}
                </svg>

                {/* Center Content of Sub-parts Donut */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center px-3"
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100px',
                    height: '100px',
                  }}
                >
                  <span className="text-[1.2rem] font-extrabold text-[#0a3826] tracking-tight font-mono leading-none">
                    SAR {selectedCategory.totalCost.toLocaleString()}
                  </span>
                  <span className="text-[9px] font-bold text-[#0a3826] mt-1 leading-snug">
                    {selectedCategory.name}
                  </span>
                </div>
              </div>
            </div>

            {/* Compact Sub-parts List */}
            <div className="flex flex-col gap-2 w-[240px] max-h-[240px] overflow-y-auto pr-2">
              <h4 className="text-xs font-bold text-gray-900 mb-1">Weight Collected (KG)</h4>
              {selectedCategory.subParts.map((sub, sIdx) => (
                <div
                  key={sIdx}
                  className="p-2 rounded-lg border border-gray-200 bg-white shadow-sm flex items-center justify-between text-[10px]"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: sub.color }}
                    ></div>
                    <span className="font-semibold text-gray-700 truncate max-w-[120px]">{sub.name}</span>
                  </div>
                  <span className="font-bold text-[#1b5e43]">
                    {Math.floor(sub.count * 2.3).toLocaleString()} KG
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Analytics Dashboard Grid (Maintenance, User Retention, Influencers, Appsflyer) */}
      <PromotionDashboardAnalytics />
    </div>
  );
};
