import React, { useState } from 'react';
import {
  Megaphone,
  TrendingUp,
  Handshake,
  Sprout,
  Download,
} from 'lucide-react';

export const PromotionDashboardAnalytics: React.FC = () => {
  const [downloadTooltip, setDownloadTooltip] = useState(false);

  // Card 3: Influencer Promotions
  const influencerList = [
    { name: 'Ahmed', total: 53, completed: 5 },
    { name: 'Zaid', total: 17, completed: 9 },
    { name: 'Ali', total: 10, completed: 3 },
    { name: 'Zahraa', total: 24, completed: 6 },
    { name: 'Harned', total: 6, completed: 2 },
    { name: 'Murad', total: 25, completed: 3 },
    { name: 'Dina', total: 57, completed: 23 },
    { name: 'Maali', total: 780, completed: 292 },
    { name: 'Muhannad', total: 3, completed: 1 },
  ];

  const handleExportLeaderboard = () => {
    const headers = ['Influencer', 'Total Users', 'Order Completed Users'];
    const rows = influencerList.map((item) => [item.name, item.total, item.completed]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Influencer_Leaderboard_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-1">
      {/* ============================================================ */}
      {/* 1. MAINTENANCE PROMOTIONS CARD */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl border border-[#dfe7ef] shadow-xs p-6 flex flex-col justify-between min-h-[420px]">
        <div>
          {/* Header */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#142944] flex items-center justify-center text-white shadow-xs">
              <Megaphone className="w-4 h-4" />
            </div>
            <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">
              Maintenance Promotions
            </h3>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 text-xs text-gray-700 mb-3 font-medium">
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-xs bg-[#2ea2a7] inline-block"></span>
              <span>Orders</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-xs bg-[#1c3150] inline-block"></span>
              <span>Referrals</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3.5 h-3.5 rounded-xs bg-[#e68838] inline-block"></span>
              <span>Sign-ups</span>
            </div>
          </div>
        </div>

        {/* SVG Clustered Column Chart */}
        <div className="relative w-full flex-1 flex items-center justify-center">
          <svg
            viewBox="0 0 540 260"
            className="w-full h-auto overflow-visible select-none"
          >
            {/* Horizontal Gridlines & Y-Axis Labels (0, 200, 400, 600, 800) */}
            {[
              { val: 800, y: 35 },
              { val: 600, y: 80 },
              { val: 400, y: 125 },
              { val: 200, y: 170 },
              { val: 0, y: 215 },
            ].map(({ val, y }) => (
              <g key={val}>
                <text
                  x="28"
                  y={y}
                  textAnchor="end"
                  dominantBaseline="central"
                  fill="#6b7280"
                  fontSize="11"
                  fontWeight="500"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  {val}
                </text>
                <line
                  x1="36"
                  y1={y}
                  x2="520"
                  y2={y}
                  stroke={val === 0 ? '#9ca3af' : '#edf2f7'}
                  strokeWidth={val === 0 ? '1.5' : '1'}
                />
              </g>
            ))}

            {/* Left Y-Axis Baseline */}
            <line
              x1="36"
              y1="35"
              x2="36"
              y2="215"
              stroke="#9ca3af"
              strokeWidth="1.5"
            />

            {/* ================= CLUSTER 1: National Day ================= */}
            {/* Orders Bar (5,412) - Teal */}
            <g className="cursor-pointer group">
              <title>National Day — Orders: 5,412</title>
              <text
                x="125"
                y="38"
                textAnchor="middle"
                dominantBaseline="auto"
                fill="#1f2937"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="Inter, system-ui, sans-serif"
              >
                5,412
              </text>
              <rect
                x="107"
                y="48"
                width="36"
                height="167"
                rx="2"
                fill="#2ea2a7"
                className="transition-all duration-200 group-hover:brightness-105"
              />
            </g>

            {/* Referrals Bar (890) - Navy */}
            <g className="cursor-pointer group">
              <title>National Day — Referrals: 890</title>
              <text
                x="167"
                y="105"
                textAnchor="middle"
                dominantBaseline="auto"
                fill="#1f2937"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="Inter, system-ui, sans-serif"
              >
                890
              </text>
              <rect
                x="149"
                y="115"
                width="36"
                height="100"
                rx="2"
                fill="#1c3150"
                className="transition-all duration-200 group-hover:brightness-105"
              />
            </g>

            {/* Sign-ups Bar (305) - Orange */}
            <g className="cursor-pointer group">
              <title>National Day — Sign-ups: 305</title>
              <text
                x="209"
                y="150"
                textAnchor="middle"
                dominantBaseline="auto"
                fill="#1f2937"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="Inter, system-ui, sans-serif"
              >
                305
              </text>
              <rect
                x="191"
                y="160"
                width="36"
                height="55"
                rx="2"
                fill="#e68838"
                className="transition-all duration-200 group-hover:brightness-105"
              />
            </g>

            {/* Category 1 Label */}
            <text
              x="167"
              y="240"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#374151"
              fontSize="12.5"
              fontWeight="600"
              fontFamily="Inter, system-ui, sans-serif"
            >
              National Day
            </text>

            {/* ================= CLUSTER 2: Referral Reward ================= */}
            {/* Orders Bar (1,155) - Teal */}
            <g className="cursor-pointer group">
              <title>Referral Reward — Orders: 1,155</title>
              <text
                x="345"
                y="75"
                textAnchor="middle"
                dominantBaseline="auto"
                fill="#1f2937"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="Inter, system-ui, sans-serif"
              >
                1,155
              </text>
              <rect
                x="327"
                y="85"
                width="36"
                height="130"
                rx="2"
                fill="#2ea2a7"
                className="transition-all duration-200 group-hover:brightness-105"
              />
            </g>

            {/* Referrals Bar (890) - Navy */}
            <g className="cursor-pointer group">
              <title>Referral Reward — Referrals: 890</title>
              <text
                x="387"
                y="105"
                textAnchor="middle"
                dominantBaseline="auto"
                fill="#1f2937"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="Inter, system-ui, sans-serif"
              >
                890
              </text>
              <rect
                x="369"
                y="115"
                width="36"
                height="100"
                rx="2"
                fill="#1c3150"
                className="transition-all duration-200 group-hover:brightness-105"
              />
            </g>

            {/* Sign-ups Bar (305) - Orange */}
            <g className="cursor-pointer group">
              <title>Referral Reward — Sign-ups: 305</title>
              <text
                x="429"
                y="150"
                textAnchor="middle"
                dominantBaseline="auto"
                fill="#1f2937"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="Inter, system-ui, sans-serif"
              >
                305
              </text>
              <rect
                x="411"
                y="160"
                width="36"
                height="55"
                rx="2"
                fill="#e68838"
                className="transition-all duration-200 group-hover:brightness-105"
              />
            </g>

            {/* Category 2 Label */}
            <text
              x="387"
              y="240"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#374151"
              fontSize="12.5"
              fontWeight="600"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Referral Reward
            </text>
          </svg>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. USER RETENTION SUMMARY CARD */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl border border-[#dfe7ef] shadow-xs p-6 flex flex-col justify-between min-h-[420px]">
        {/* Header matching reference */}
        <div className="flex items-center gap-3 mb-1">
          <div className="w-8 h-8 rounded-md bg-[#13253f] flex items-center justify-center text-white shadow-xs">
            <svg
              viewBox="0 0 24 24"
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 11 8 6 13 9 21 2" />
              <polyline points="17 2 21 2 21 6" />
              <rect x="3" y="14" width="7" height="6" rx="1.5" />
              <rect x="14" y="14" width="7" height="6" rx="1.5" />
            </svg>
          </div>
          <h3 className="text-[17px] font-bold text-gray-900 tracking-tight">
            User Retention Summary
          </h3>
        </div>

        {/* Legend centered above chart */}
        <div className="flex items-center justify-center gap-2 text-xs text-gray-800 font-medium mb-1">
          <div className="flex items-center gap-1.5">
            <span className="w-6 h-0.5 bg-[#182d4f] inline-flex items-center justify-center relative">
              <span className="w-2.5 h-2.5 rounded-full bg-[#182d4f]"></span>
            </span>
            <span className="text-[12.5px] font-medium text-gray-800">
              Order Conversion Rate
            </span>
          </div>
        </div>

        {/* Integrated SVG Chart & Exact 4-Compartment X-Axis Table */}
        <div className="relative w-full flex-1 flex items-center justify-center py-1">
          <svg
            viewBox="0 0 600 220"
            className="w-full h-auto overflow-visible select-none"
          >
            <defs>
              <linearGradient id="userRetentionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#182d4f" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#182d4f" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Horizontal Gridlines & Y-Axis Labels (50%, 40%, 30%, 20%, 10%) */}
            {[
              { pct: '50%', y: 20 },
              { pct: '40%', y: 48 },
              { pct: '30%', y: 76 },
              { pct: '20%', y: 104 },
              { pct: '10%', y: 132 },
              { pct: '0%', y: 160 },
            ].map(({ pct, y }) => (
              <g key={pct}>
                <text
                  x="32"
                  y={y}
                  textAnchor="end"
                  dominantBaseline="central"
                  fill="#111827"
                  fontSize="11.5"
                  fontWeight="500"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  {pct}
                </text>
                {/* Horizontal gridline for levels above 0% */}
                {pct !== '0%' && (
                  <line
                    x1="38"
                    y1={y}
                    x2="590"
                    y2={y}
                    stroke="#edf2f7"
                    strokeWidth="1"
                  />
                )}
              </g>
            ))}

            {/* Left Y-Axis Vertical Baseline */}
            <line
              x1="38"
              y1="20"
              x2="38"
              y2="160"
              stroke="#374151"
              strokeWidth="1.5"
            />

            {/* ================= AREA GRADIENT FILL ================= */}
            {/* Starts directly under P1 (x=68) and drops vertically at P8 (x=541) */}
            <polygon
              points="
                68,132 
                127,104 
                186,101 
                246,88 
                305,83 
                364,74 
                443,40 
                541,93 
                541,160 
                68,160
              "
              fill="url(#userRetentionGradient)"
            />

            {/* ================= TRENDLINE ================= */}
            <polyline
              points="
                68,132 
                127,104 
                186,101 
                246,88 
                305,83 
                364,74 
                443,40 
                541,93
              "
              fill="none"
              stroke="#182d4f"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
            />

            {/* ================= VERTEX DOTS & VALUE LABELS ================= */}
            {[
              { x: 68, y: 132, val: '1.6%', label: 'Day 3' },
              { x: 127, y: 104, val: '3.7%', label: 'Day 5 Case 1' },
              { x: 186, y: 101, val: '4.4%', label: 'Day 7' },
              { x: 246, y: 88, val: '5.3%', label: 'Day 5' },
              { x: 305, y: 83, val: '5.5%', label: 'Day 8 Case 2' },
              { x: 364, y: 74, val: '3.8%', label: 'Day 14' },
              { x: 443, y: 40, val: '5.0%', label: 'Case 3 Monthly Impact' },
              { x: 541, y: 93, val: '6.1%', label: 'Case 4 Reactivation' },
            ].map((pt, i) => (
              <g key={i} className="cursor-pointer group">
                <title>{`${pt.label}: ${pt.val}`}</title>
                {/* Dot */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r="3.5"
                  fill="#182d4f"
                  className="transition-transform duration-200 group-hover:scale-125"
                />
                {/* Value Label above dot */}
                <text
                  x={pt.x}
                  y={pt.y - 8}
                  textAnchor="middle"
                  dominantBaseline="auto"
                  fill="#111827"
                  fontSize="12"
                  fontWeight="500"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  {pt.val}
                </text>
              </g>
            ))}

            {/* ================= X-AXIS TABLE BORDERS ================= */}
            {/* Top Border (0% baseline) */}
            <line
              x1="38"
              y1="160"
              x2="590"
              y2="160"
              stroke="#374151"
              strokeWidth="1.5"
            />
            {/* Bottom Border */}
            <line
              x1="38"
              y1="206"
              x2="590"
              y2="206"
              stroke="#374151"
              strokeWidth="1.5"
            />
            {/* Left Border */}
            <line
              x1="38"
              y1="160"
              x2="38"
              y2="206"
              stroke="#374151"
              strokeWidth="1.5"
            />
            {/* Right Border */}
            <line
              x1="590"
              y1="160"
              x2="590"
              y2="206"
              stroke="#374151"
              strokeWidth="1.5"
            />

            {/* Vertical Divider 1 (after Day 7, between Compartment 1 & 2) */}
            <line
              x1="216"
              y1="160"
              x2="216"
              y2="206"
              stroke="#374151"
              strokeWidth="1.5"
            />

            {/* Vertical Divider 2 (after Day 14, between Compartment 2 & 3) */}
            <line
              x1="394"
              y1="160"
              x2="394"
              y2="206"
              stroke="#374151"
              strokeWidth="1.5"
            />

            {/* Vertical Divider 3 (after Case 3, between Compartment 3 & 4) */}
            <line
              x1="492"
              y1="160"
              x2="492"
              y2="206"
              stroke="#374151"
              strokeWidth="1.5"
            />

            {/* ================= X-AXIS LABELS INSIDE COMPARTMENTS ================= */}
            {/* --- COMPARTMENT 1: Day 3 | Day 5 (Case 1) | Day 7 --- */}
            <text
              x="68"
              y="175"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#111827"
              fontSize="11.5"
              fontWeight="500"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Day 3
            </text>

            <text
              x="127"
              y="175"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#111827"
              fontSize="11.5"
              fontWeight="500"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Day 5
            </text>
            <text
              x="127"
              y="193"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#111827"
              fontSize="11"
              fontWeight="500"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Case 1
            </text>

            <text
              x="186"
              y="175"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#111827"
              fontSize="11.5"
              fontWeight="500"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Day 7
            </text>

            {/* --- COMPARTMENT 2: Day 5 | Day 8 (Case 2) | Day 14 --- */}
            <text
              x="246"
              y="175"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#111827"
              fontSize="11.5"
              fontWeight="500"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Day 5
            </text>

            <text
              x="305"
              y="175"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#111827"
              fontSize="11.5"
              fontWeight="500"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Day 8
            </text>
            <text
              x="305"
              y="193"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#111827"
              fontSize="11"
              fontWeight="500"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Case 2
            </text>

            <text
              x="364"
              y="175"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#111827"
              fontSize="11.5"
              fontWeight="500"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Day 14
            </text>

            {/* --- COMPARTMENT 3: Case 3 | Monthly Impact --- */}
            <text
              x="443"
              y="175"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#111827"
              fontSize="11.5"
              fontWeight="500"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Case 3
            </text>
            <text
              x="443"
              y="193"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#111827"
              fontSize="11"
              fontWeight="500"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Monthly Impact
            </text>

            {/* --- COMPARTMENT 4: Case 4 | Reactivation --- */}
            <text
              x="541"
              y="175"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#111827"
              fontSize="11.5"
              fontWeight="500"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Case 4
            </text>
            <text
              x="541"
              y="193"
              textAnchor="middle"
              dominantBaseline="central"
              fill="#111827"
              fontSize="11"
              fontWeight="500"
              fontFamily="Inter, system-ui, sans-serif"
            >
              Reactivation
            </text>
          </svg>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. INFLUENCER PROMOTIONS (LEADERBOARD) */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl border border-[#dfe7ef] shadow-xs p-6 flex flex-col justify-between min-h-[440px]">
        <div>
          {/* Header with Dark Navy Badge and Export Button */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#142944] flex items-center justify-center text-white shadow-xs">
                <Handshake className="w-4 h-4" />
              </div>
              <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">
                Influencer Promotions (Leaderboard)
              </h3>
            </div>

            <div className="relative">
              <button
                onClick={handleExportLeaderboard}
                onMouseEnter={() => setDownloadTooltip(true)}
                onMouseLeave={() => setDownloadTooltip(false)}
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 hover:bg-gray-100 transition-colors shadow-xs"
                title="Download Leaderboard"
              >
                <Download className="w-4 h-4" />
              </button>
              {downloadTooltip && (
                <div className="absolute right-0 -top-8 bg-gray-900 text-white text-[10px] py-1 px-2.5 rounded shadow-md whitespace-nowrap z-20">
                  Export Data
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Spacious, Uncongested Horizontal Bar Chart */}
        <div className="relative w-full flex-1 flex flex-col justify-center my-1">
          <svg
            viewBox="0 0 620 325"
            className="w-full h-auto overflow-visible select-none"
          >
            {/* Vertical Gridlines (0, 100, 200, 300, 400, 500, 600, 700, 800) */}
            {[0, 100, 200, 300, 400, 500, 600, 700, 800].map((val) => {
              const x = 88 + (val / 800) * 480;
              return (
                <g key={val}>
                  <line
                    x1={x}
                    y1="6"
                    x2={x}
                    y2="280"
                    stroke={val === 0 ? '#9ca3af' : '#edf2f7'}
                    strokeWidth={val === 0 ? '1.5' : '1'}
                  />
                  {/* Tick mark at bottom */}
                  <line
                    x1={x}
                    y1="280"
                    x2={x}
                    y2="285"
                    stroke="#9ca3af"
                    strokeWidth="1.2"
                  />
                  {/* Tick label */}
                  <text
                    x={x}
                    y="300"
                    textAnchor="middle"
                    fill="#6b7280"
                    fontSize="11"
                    fontWeight="500"
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {val}
                  </text>
                </g>
              );
            })}

            {/* Bottom X-Axis Baseline */}
            <line
              x1="88"
              y1="280"
              x2="568"
              y2="280"
              stroke="#9ca3af"
              strokeWidth="1.5"
            />

            {/* Influencer Rows (9 spacious rows, 30px per row) */}
            {influencerList.map((inf, idx) => {
              const rY = 8 + idx * 30;
              const barW1 = Math.max((inf.total / 800) * 480, 3);
              const barW2 = Math.max((inf.completed / 800) * 480, 2.5);

              return (
                <g key={inf.name} className="group cursor-pointer">
                  {/* Subtle row hover highlight */}
                  <rect
                    x="2"
                    y={rY - 1}
                    width="616"
                    height="29"
                    rx="4"
                    className="fill-transparent group-hover:fill-gray-50/90 transition-colors"
                  />
                  <title>{`${inf.name} — Total Users: ${inf.total}, Order Completed: ${inf.completed}`}</title>

                  {/* Influencer Name (Right-aligned to baseline) */}
                  <text
                    x="80"
                    y={rY + 14}
                    textAnchor="end"
                    dominantBaseline="central"
                    fill="#374151"
                    fontSize="12"
                    fontWeight="500"
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {inf.name}
                  </text>

                  {/* Teal Bar: Total Users */}
                  <rect
                    x="88"
                    y={rY + 4}
                    width={barW1}
                    height="7.5"
                    rx="2"
                    fill="#2ea2a7"
                    className="transition-all duration-200 group-hover:brightness-105"
                  />
                  {/* Total Count Label */}
                  <text
                    x={88 + barW1 + 5}
                    y={rY + 7.75}
                    dominantBaseline="central"
                    fill="#1f2937"
                    fontSize="10.5"
                    fontWeight="600"
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {inf.total}
                  </text>

                  {/* Orange Bar: Order Completed Users */}
                  <rect
                    x="88"
                    y={rY + 14.5}
                    width={barW2}
                    height="7.5"
                    rx="2"
                    fill="#e68838"
                    className="transition-all duration-200 group-hover:brightness-105"
                  />
                  {/* Completed Count Label */}
                  <text
                    x={88 + barW2 + 5}
                    y={rY + 18.25}
                    dominantBaseline="central"
                    fill="#4b5563"
                    fontSize="10"
                    fontWeight="500"
                    fontFamily="Inter, system-ui, sans-serif"
                  >
                    {inf.completed}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-xs text-gray-600 mt-2 font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-2.5 rounded-xs bg-[#2ea2a7] inline-block"></span>
            <span>Total Users</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3.5 h-2.5 rounded-xs bg-[#e68838] inline-block"></span>
            <span>Order Completed Users</span>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. APPSFLYER (PERFORMANCE FUNNEL) */}
      {/* ============================================================ */}
      <div className="bg-white rounded-2xl border border-[#dfe7ef] shadow-xs p-6 flex flex-col justify-between min-h-[440px]">
        <div>
          {/* Header with Dark Navy Badge */}
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 rounded-lg bg-[#142944] flex items-center justify-center text-white shadow-xs">
              <Sprout className="w-4 h-4" />
            </div>
            <h3 className="text-[15px] font-bold text-gray-900 tracking-tight">
              Appsflyer (Performance Funnel)
            </h3>
          </div>
        </div>

        {/* Funnel Layout */}
        <div className="w-full flex items-center justify-center py-2 flex-1">
          {/* Exact Funnel Diagram matching attached reference */}
          <div className="w-full flex justify-center">
            <svg
              viewBox="0 0 540 230"
              className="w-full max-w-[520px] h-auto overflow-visible select-none"
            >
              {/* STAGE 0: App Open */}
              <text
                x="5"
                y="16"
                fill="#1e293b"
                fontSize="13"
                fontWeight="500"
                dominantBaseline="central"
                fontFamily="Inter, system-ui, sans-serif"
              >
                App Open
              </text>
              <polygon
                points="180,2 540,2 518.87,30 201.13,30"
                fill="#30a7a0"
                className="transition-opacity duration-150 hover:opacity-90 cursor-pointer"
              >
                <title>App Open: 6,539</title>
              </polygon>
              <text
                x="360"
                y="16"
                fill="#ffffff"
                fontSize="13.5"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Inter, system-ui, sans-serif"
                pointerEvents="none"
              >
                6,539
              </text>

              {/* STAGE 1: Order Started */}
              <text
                x="5"
                y="47.5"
                fill="#1e293b"
                fontSize="13"
                fontWeight="500"
                dominantBaseline="central"
                fontFamily="Inter, system-ui, sans-serif"
              >
                Order Started
              </text>
              <polygon
                points="203.77,33.5 516.23,33.5 495.09,61.5 224.91,61.5"
                fill="#19325a"
                className="transition-opacity duration-150 hover:opacity-90 cursor-pointer"
              >
                <title>Order Started: 2,373</title>
              </polygon>
              <text
                x="360"
                y="47.5"
                fill="#ffffff"
                fontSize="13.5"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Inter, system-ui, sans-serif"
                pointerEvents="none"
              >
                2,373
              </text>

              {/* STAGE 2: Login Opened */}
              <text
                x="5"
                y="79"
                fill="#1e293b"
                fontSize="13"
                fontWeight="500"
                dominantBaseline="central"
                fontFamily="Inter, system-ui, sans-serif"
              >
                Login Opened
              </text>
              <polygon
                points="227.55,65 492.45,65 471.32,93 248.68,93"
                fill="#2b4974"
                className="transition-opacity duration-150 hover:opacity-90 cursor-pointer"
              >
                <title>Login Opened: 2,343</title>
              </polygon>
              <text
                x="360"
                y="79"
                fill="#ffffff"
                fontSize="13.5"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Inter, system-ui, sans-serif"
                pointerEvents="none"
              >
                2,343
              </text>

              {/* STAGE 3: Scheduling Viewed */}
              <text
                x="5"
                y="110.5"
                fill="#1e293b"
                fontSize="13"
                fontWeight="500"
                dominantBaseline="central"
                fontFamily="Inter, system-ui, sans-serif"
              >
                Scheduling Viewed
              </text>
              <polygon
                points="251.32,96.5 468.68,96.5 447.55,124.5 272.45,124.5"
                fill="#30a7a0"
                className="transition-opacity duration-150 hover:opacity-90 cursor-pointer"
              >
                <title>Scheduling Viewed: 991</title>
              </polygon>
              <text
                x="360"
                y="110.5"
                fill="#ffffff"
                fontSize="13.5"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Inter, system-ui, sans-serif"
                pointerEvents="none"
              >
                991
              </text>

              {/* STAGE 4: Registration Completed */}
              <text
                x="5"
                y="142"
                fill="#1e293b"
                fontSize="13"
                fontWeight="500"
                dominantBaseline="central"
                fontFamily="Inter, system-ui, sans-serif"
              >
                Registration Completed
              </text>
              <polygon
                points="275.09,128 444.91,128 423.77,156 296.23,156"
                fill="#19325a"
                className="transition-opacity duration-150 hover:opacity-90 cursor-pointer"
              >
                <title>Registration Completed: 720</title>
              </polygon>
              <text
                x="360"
                y="142"
                fill="#ffffff"
                fontSize="13.5"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Inter, system-ui, sans-serif"
                pointerEvents="none"
              >
                720
              </text>

              {/* STAGE 5: App Install */}
              <text
                x="5"
                y="173.5"
                fill="#1e293b"
                fontSize="13"
                fontWeight="500"
                dominantBaseline="central"
                fontFamily="Inter, system-ui, sans-serif"
              >
                App Install
              </text>
              <polygon
                points="298.87,159.5 421.13,159.5 400,187.5 320,187.5"
                fill="#2b4974"
                className="transition-opacity duration-150 hover:opacity-90 cursor-pointer"
              >
                <title>App Install: 350</title>
              </polygon>
              <text
                x="360"
                y="173.5"
                fill="#ffffff"
                fontSize="13.5"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Inter, system-ui, sans-serif"
                pointerEvents="none"
              >
                350
              </text>

              {/* STAGE 6: Order Confirmed (Vertical Orange Rectangle) */}
              <text
                x="5"
                y="205"
                fill="#1e293b"
                fontSize="13"
                fontWeight="500"
                dominantBaseline="central"
                fontFamily="Inter, system-ui, sans-serif"
              >
                Order Confirmed
              </text>
              <polygon
                points="320,191 400,191 400,219 320,219"
                fill="#ea8e38"
                className="transition-opacity duration-150 hover:opacity-90 cursor-pointer"
              >
                <title>Order Confirmed: 1,107</title>
              </polygon>
              <text
                x="360"
                y="205"
                fill="#ffffff"
                fontSize="13.5"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="Inter, system-ui, sans-serif"
                pointerEvents="none"
              >
                1,107
              </text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
