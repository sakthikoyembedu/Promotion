import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  X,
  FileSpreadsheet,
  Download,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Gift,
  Coins,
  Calendar,
  CheckCircle2,
} from 'lucide-react';
import { INFLUENCER_DETAILS_DATA, ReferredUserDetail } from '../data/influencerDetailsData';
import { INFLUENCER_PROMOTION_DATA } from '../data/influencerPromotionData';

interface InfluencerDetailsRightScreenProps {
  referralCode: string;
  onClose: () => void;
  onShowToast: (summary: string, detail: string, severity?: 'success' | 'info' | 'warn' | 'error') => void;
}

type DetailsSortField = keyof ReferredUserDetail;

export const InfluencerDetailsRightScreen: React.FC<InfluencerDetailsRightScreenProps> = ({
  referralCode,
  onClose,
  onShowToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<DetailsSortField>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Metadata for the selected influencer
  const influencer = useMemo(() => {
    return INFLUENCER_PROMOTION_DATA.find((item) => item.referralCode === referralCode);
  }, [referralCode]);

  // Raw details records for this code
  const rawData = useMemo(() => {
    return INFLUENCER_DETAILS_DATA[referralCode] || [];
  }, [referralCode]);

  const handleSort = (field: DetailsSortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const renderSortIcon = (field: DetailsSortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-white/60 inline-block ml-1" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3 h-3 text-white inline-block ml-1" />
    ) : (
      <ArrowDown className="w-3 h-3 text-white inline-block ml-1" />
    );
  };

  // Filtered and sorted details
  const filteredData = useMemo(() => {
    return rawData
      .filter((row) => {
        if (!searchTerm.trim()) return true;
        const q = searchTerm.toLowerCase();
        return (
          row.referralCode.toLowerCase().includes(q) ||
          row.influencerName.toLowerCase().includes(q) ||
          row.referredUserId.toLowerCase().includes(q) ||
          row.referredUserName.toLowerCase().includes(q) ||
          row.phone.toLowerCase().includes(q) ||
          row.firstOrderNumber.toLowerCase().includes(q) ||
          row.firstOrderScheduleDate.toLowerCase().includes(q)
        );
      })
      .sort((a, b) => {
        const aVal = a[sortField];
        const bVal = b[sortField];
        if (typeof aVal === 'string' && typeof bVal === 'string') {
          const cmp = aVal.localeCompare(bVal);
          return sortOrder === 'asc' ? cmp : -cmp;
        }
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
        }
        return 0;
      });
  }, [rawData, searchTerm, sortField, sortOrder]);

  // Totals
  const totalPoints = filteredData.reduce((acc, curr) => acc + curr.firstOrderRewardPoints, 0);
  const totalBonusSar = filteredData.reduce((acc, curr) => acc + curr.bonusAmountSar, 0);

  // Export to Excel / CSV
  const handleExportCsv = () => {
    const headers = [
      'Referral Code',
      'Influencer Name',
      'Referred UserId',
      'Referred User Name',
      'Phone',
      'First Order Number',
      'First Order Schedule Date',
      'First Order Reward Points',
      'Bonus Amount (SAR)',
    ];

    const rows = filteredData.map((d) => [
      `"${d.referralCode}"`,
      `"${d.influencerName}"`,
      `"${d.referredUserId}"`,
      `"${d.referredUserName}"`,
      `"${d.phone}"`,
      `"${d.firstOrderNumber}"`,
      `"${d.firstOrderScheduleDate}"`,
      d.firstOrderRewardPoints,
      d.bonusAmountSar,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Referral_${referralCode}_Details_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast('Export Excel', `Exported ${filteredData.length} referred order records for ${referralCode}.`, 'success');
  };

  return (
    <div className="w-full bg-white rounded-lg border border-[#dfe7ef] shadow-xs flex flex-col slide-in-from-right overflow-hidden">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-b border-gray-200 bg-gray-50/80">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:text-[#0e4b31] hover:border-[#0e4b31] rounded-md text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Influencers</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#0e4b31] text-white font-mono font-bold text-xs rounded">
                {referralCode}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#111827]">
                Referral Details: {influencer ? influencer.fullName : referralCode}
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Completed referral orders and earned bonus amounts breakdown.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCsv}
            className="excelbtn flex items-center gap-2 px-3.5 py-1.5 text-white font-medium text-xs rounded shadow-xs cursor-pointer select-none transition-colors"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Influencer Summary Cards */}
      <div className="p-4 sm:px-6 py-3 bg-white border-b border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200">
          <span className="text-gray-500 font-medium block">Register City</span>
          <span className="text-sm font-bold text-gray-900 mt-0.5 block">
            {influencer ? influencer.registerCity : 'Sakaka'}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200">
          <span className="text-gray-500 font-medium block">Influencer Phone</span>
          <span className="text-sm font-bold font-mono text-gray-900 mt-0.5 block">
            {influencer ? influencer.phone : '-'}
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
          <span className="text-emerald-700 font-medium block">Total Reward Points</span>
          <span className="text-sm font-bold font-mono text-emerald-900 mt-0.5 block">
            {totalPoints.toLocaleString()} Pts
          </span>
        </div>

        <div className="p-2.5 rounded-lg bg-[#0e4b3112] border border-[#0e4b3130]">
          <span className="text-[#0e4b31] font-medium block">Total Bonus Finalised</span>
          <span className="text-sm font-bold font-mono text-[#0e4b31] mt-0.5 block">
            {totalBonusSar} SAR
          </span>
        </div>
      </div>

      {/* Main Content Area (Table matching the uploaded screenshot) */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        {/* Search bar */}
        <div className="flex justify-between items-center gap-3">
          <div className="text-xs text-gray-600 font-medium">
            Showing <span className="font-bold text-gray-900">{filteredData.length}</span> completed referral orders
          </div>

          <div className="relative w-full max-w-[280px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search user, order number, date..."
              className="w-full h-[34px] pl-9 pr-3 text-xs bg-white border border-gray-300 rounded-md focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#C7D2FE] transition-colors placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* The Exact Table from the Screenshot */}
        <div className="w-full bg-white border border-[#eae8e8] rounded shadow-xs overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-full border-collapse text-sm table-auto">
              <thead className="sticky top-0 z-10">
                <tr>
                  <th
                    onClick={() => handleSort('referralCode')}
                    className="table-header-cell !text-center px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>Referral Code</span>
                      {renderSortIcon('referralCode')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('influencerName')}
                    className="table-header-cell !text-left px-3.5 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>Influencer Name</span>
                      {renderSortIcon('influencerName')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('referredUserId')}
                    className="table-header-cell !text-left px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>Referred UserId</span>
                      {renderSortIcon('referredUserId')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('referredUserName')}
                    className="table-header-cell !text-left px-3.5 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>Referred User Name</span>
                      {renderSortIcon('referredUserName')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('phone')}
                    className="table-header-cell !text-left px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>Phone</span>
                      {renderSortIcon('phone')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('firstOrderNumber')}
                    className="table-header-cell !text-left px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>First Order Number</span>
                      {renderSortIcon('firstOrderNumber')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('firstOrderScheduleDate')}
                    className="table-header-cell !text-left px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>First Order Schedule Date</span>
                      {renderSortIcon('firstOrderScheduleDate')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('firstOrderRewardPoints')}
                    className="table-header-cell !text-left px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>First Order Reward Points</span>
                      {renderSortIcon('firstOrderRewardPoints')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('bonusAmountSar')}
                    className="table-header-cell !text-left px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>Bonus Amount (SAR)</span>
                      {renderSortIcon('bonusAmountSar')}
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#eae8e8] bg-white">
                {filteredData.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-16 text-center text-gray-500 font-medium">
                      No referral records found for {referralCode}.
                    </td>
                  </tr>
                ) : (
                  filteredData.map((row) => (
                    <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors">
                      {/* Referral Code */}
                      <td className="table-body-cell text-center px-3 py-2.5 font-mono">
                        {row.referralCode}
                      </td>

                      {/* Influencer Name */}
                      <td className="table-body-cell text-left text-gray-900 font-medium text-[13px] px-3.5 py-2.5">
                        {row.influencerName}
                      </td>

                      {/* Referred UserId */}
                      <td className="table-body-cell text-left text-gray-900 font-mono text-[13px] px-3 py-2.5">
                        {row.referredUserId}
                      </td>

                      {/* Referred User Name */}
                      <td className="table-body-cell text-left text-gray-900 font-medium text-[13px] px-3.5 py-2.5">
                        {row.referredUserName}
                      </td>

                      {/* Phone */}
                      <td className="table-body-cell text-left text-gray-900 font-mono text-[13px] px-3 py-2.5">
                        {row.phone}
                      </td>

                      {/* First Order Number */}
                      <td className="table-body-cell text-left text-gray-900 font-mono text-[13px] px-3 py-2.5">
                        {row.firstOrderNumber}
                      </td>

                      {/* First Order Schedule Date */}
                      <td className="table-body-cell text-left text-gray-900 text-[13px] px-3.5 py-2.5">
                        {row.firstOrderScheduleDate}
                      </td>

                      {/* First Order Reward Points */}
                      <td className="table-body-cell text-left text-gray-900 font-mono text-[13px] px-3 py-2.5">
                        {row.firstOrderRewardPoints}
                      </td>

                      {/* Bonus Amount (SAR) */}
                      <td className="table-body-cell text-left text-gray-900 font-mono text-[13px] px-3 py-2.5">
                        {row.bonusAmountSar}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table summary note */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
          <span>Displaying all 5 completed referral user transactions for code {referralCode}.</span>
          <span className="font-semibold text-gray-700">Calculated Bonus Total: {totalBonusSar} SAR</span>
        </div>
      </div>
    </div>
  );
};
