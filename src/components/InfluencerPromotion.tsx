import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  Download,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Users,
  CheckCircle,
  Coins,
  Share2,
} from 'lucide-react';
import { INFLUENCER_PROMOTION_DATA, InfluencerPromotionItem } from '../data/influencerPromotionData';
import { InfluencerFilters } from './InfluencerFilters';
import { InfluencerDetailsRightScreen } from './InfluencerDetailsRightScreen';

interface InfluencerPromotionProps {
  onShowToast: (summary: string, detail: string, severity?: 'success' | 'info' | 'warn' | 'error') => void;
}

type SortField = keyof InfluencerPromotionItem;

export const InfluencerPromotion: React.FC<InfluencerPromotionProps> = ({ onShowToast }) => {
  const [selectedReferralCode, setSelectedReferralCode] = useState<string | null>(null);
  const [cityFilter, setCityFilter] = useState('All');
  const [orderFilter, setOrderFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Sorting
  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-white/60 inline-block ml-1" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3 h-3 text-white inline-block ml-1" />
    ) : (
      <ArrowDown className="w-3 h-3 text-white inline-block ml-1" />
    );
  };

  const handleResetFilters = () => {
    setCityFilter('All');
    setOrderFilter('All');
    setSearchTerm('');
    setSortField('id');
    setSortOrder('asc');
    setCurrentPage(1);
    onShowToast('Filters Reset', 'Influencer Promotion filters have been reset.', 'info');
  };

  // Filtered and Sorted Data
  const filteredData = useMemo(() => {
    return INFLUENCER_PROMOTION_DATA.filter((item) => {
      if (cityFilter !== 'All' && item.registerCity !== cityFilter) return false;
      if (orderFilter !== 'All' && item.hasCompletedOrder !== orderFilter) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchCode = item.referralCode.toLowerCase().includes(q);
        const matchName = item.fullName.toLowerCase().includes(q);
        const matchPhone = item.phone.toLowerCase().includes(q);
        const matchCity = item.registerCity.toLowerCase().includes(q);
        if (!matchCode && !matchName && !matchPhone && !matchCity) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
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
  }, [cityFilter, orderFilter, searchTerm, sortField, sortOrder]);

  // Overall Stats
  const totalUsersCount = filteredData.reduce((acc, curr) => acc + curr.totalUsers, 0);
  const completedUsersCount = filteredData.reduce((acc, curr) => acc + curr.completedUsers, 0);
  const totalAmountSum = filteredData.reduce((acc, curr) => acc + curr.totalAmountSar, 0);

  // If a referral code is selected, slide in the detail screen from the right to fill the selected content area
  if (selectedReferralCode) {
    return (
      <InfluencerDetailsRightScreen
        referralCode={selectedReferralCode}
        onClose={() => setSelectedReferralCode(null)}
        onShowToast={onShowToast}
      />
    );
  }

  // Pagination calculation
  const totalRecords = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
  const firstRecord = totalRecords === 0 ? 0 : startIndex + 1;
  const lastRecord = Math.min(startIndex + rowsPerPage, totalRecords);

  // Export to Excel / CSV
  const handleExportExcel = () => {
    const headers = [
      'Referral Code',
      'Full Name',
      'Phone',
      'Influencer - Register City',
      'Influencer - Has Completed Order',
      'Total Users',
      'Completed Users',
      'Total Amount Referral Finalised (SAR)',
    ];

    const rows = filteredData.map((d) => [
      `"${d.referralCode}"`,
      `"${d.fullName}"`,
      `"${d.phone}"`,
      `"${d.registerCity}"`,
      `"${d.hasCompletedOrder}"`,
      d.totalUsers,
      d.completedUsers,
      d.totalAmountSar,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Influencer_Promotion_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast('Export Excel', `Successfully exported ${filteredData.length} influencer records.`, 'success');
  };

  const handleDownloadPdf = () => {
    onShowToast('PDF Generation', 'Generating print-friendly PDF of Influencer Promotions...', 'info');
    setTimeout(() => {
      window.print();
    }, 300);
  };

  return (
    <div className="w-full space-y-4">
      {/* Page Title & Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h5 className="text-[1.4rem] font-medium text-[#111827] tracking-tight">
            Influencer Promotion
          </h5>
          <p className="text-xs text-gray-500 mt-0.5">
            Overview of influencer referral codes, registration status, user conversions, and finalised SAR payouts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportExcel}
            className="excelbtn flex items-center gap-2 px-3.5 py-2 text-white font-medium text-sm rounded shadow-xs cursor-pointer select-none transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Excel</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            className="excelbtn flex items-center gap-2 px-3.5 py-2 text-white font-medium text-sm rounded shadow-xs cursor-pointer select-none transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download Pdf</span>
          </button>
        </div>
      </div>

      <InfluencerFilters />

      <div className="flex justify-end mb-3">
        <div className="relative w-full max-w-[260px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search code, name, phone..."
            className="w-full h-[34px] pl-9 pr-3 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#C7D2FE] transition-colors placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Main Table Matching the Attached Image */}
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
                  onClick={() => handleSort('fullName')}
                  className="table-header-cell !text-left px-3.5 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Full Name</span>
                    {renderSortIcon('fullName')}
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
                  onClick={() => handleSort('registerCity')}
                  className="table-header-cell !text-left px-3.5 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Influencer - Register City</span>
                    {renderSortIcon('registerCity')}
                  </div>
                </th>

                <th
                  onClick={() => handleSort('hasCompletedOrder')}
                  className="table-header-cell !text-center px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Influencer - Has Completed Order</span>
                    {renderSortIcon('hasCompletedOrder')}
                  </div>
                </th>

                <th
                  onClick={() => handleSort('totalUsers')}
                  className="table-header-cell !text-left px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Total Users</span>
                    {renderSortIcon('totalUsers')}
                  </div>
                </th>

                <th
                  onClick={() => handleSort('completedUsers')}
                  className="table-header-cell !text-left px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Order Completed Users</span>
                    {renderSortIcon('completedUsers')}
                  </div>
                </th>

                <th
                  onClick={() => handleSort('totalAmountSar')}
                  className="table-header-cell !text-left px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Total Amount Referral Finalised (SAR)</span>
                    {renderSortIcon('totalAmountSar')}
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eae8e8] bg-white">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-16 text-center text-gray-500 font-medium">
                    No influencer records found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedData.map((row) => (
                  <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors">
                    {/* Referral Code */}
                    <td className="table-body-cell text-center px-3 py-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedReferralCode(row.referralCode);
                          onShowToast('Influencer Referral Details', `Navigated to right screen for ${row.referralCode} (${row.fullName}).`, 'info');
                        }}
                        className={`font-bold hover:underline cursor-pointer inline-flex items-center justify-center gap-1 px-2.5 py-1 rounded transition-all group ${
                          selectedReferralCode === row.referralCode
                            ? 'bg-[#0e4b31] text-white shadow-xs'
                            : 'text-[#0e4b31] hover:bg-[#0e4b3118]'
                        }`}
                        title={`Click to navigate to right screen for ${row.referralCode}`}
                      >
                        <span>{row.referralCode}</span>
                        <span className="text-[11px] opacity-70 group-hover:translate-x-0.5 transition-transform">
                          →
                        </span>
                      </button>
                    </td>

                    {/* Full Name */}
                    <td className="table-body-cell text-left text-gray-900 font-medium text-[13px] px-3.5 py-2.5">
                      {row.fullName}
                    </td>

                    {/* Phone */}
                    <td className="table-body-cell text-left text-gray-900 font-mono text-[13px] px-3 py-2.5">
                      {row.phone}
                    </td>

                    {/* Influencer - Register City */}
                    <td className="table-body-cell text-left text-gray-900 text-[13px] px-3.5 py-2.5">
                      {row.registerCity}
                    </td>

                    {/* Influencer - Has Completed Order */}
                    <td className="table-body-cell text-center text-gray-900 text-[13px] px-3 py-2.5">
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-semibold ${row.hasCompletedOrder === 'Yes' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-gray-100 text-gray-600'}`}>
                        {row.hasCompletedOrder}
                      </span>
                    </td>

                    {/* Total Users */}
                    <td className="table-body-cell text-left text-gray-900 font-mono text-[13px] px-3 py-2.5">
                      {row.totalUsers}
                    </td>

                    {/* Completed Users */}
                    <td className="table-body-cell text-left text-gray-900 font-mono text-[13px] px-3 py-2.5">
                      {row.completedUsers}
                    </td>

                    {/* Total Amount Referral Finalised (SAR) */}
                    <td className="table-body-cell text-left text-gray-900 font-mono text-[13px] px-3 py-2.5">
                      {row.totalAmountSar}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginator */}
      <div className="flex flex-wrap items-center justify-between py-2 px-3 bg-white border border-[#eae8e8] rounded text-sm text-[#6b7280]">
        <span className="text-[13px] text-gray-500 font-normal">
          Showing {firstRecord} to {lastRecord} of {totalRecords} records
        </span>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              currentPage === 1
                ? 'text-gray-300 cursor-not-allowed opacity-50'
                : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
            }`}
          >
            <ChevronsLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              currentPage === 1
                ? 'text-gray-300 cursor-not-allowed opacity-50'
                : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            type="button"
            className="w-8 h-8 rounded-full text-[13px] font-medium bg-[#010915a3] text-white shadow-xs"
          >
            1
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalRecords === 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              currentPage === totalPages || totalRecords === 0
                ? 'text-gray-300 cursor-not-allowed opacity-50'
                : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages || totalRecords === 0}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
              currentPage === totalPages || totalRecords === 0
                ? 'text-gray-300 cursor-not-allowed opacity-50'
                : 'text-gray-600 hover:bg-gray-100 cursor-pointer'
            }`}
          >
            <ChevronsRight className="w-4 h-4" />
          </button>

          <div className="relative ml-2">
            <select
              value={rowsPerPage}
              onChange={(e) => setRowsPerPage(Number(e.target.value))}
              className="h-8 pl-2 pr-6 bg-white border border-gray-300 rounded text-xs text-gray-700 focus:outline-none focus:border-[#6366F1] appearance-none cursor-pointer"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-gray-400">
              <ChevronDown className="w-3 h-3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
