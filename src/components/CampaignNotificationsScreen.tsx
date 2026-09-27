import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  FileSpreadsheet,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Bell,
  Eye,
  MousePointerClick,
  ShoppingBag,
  ChevronDown,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react';
import { CAMPAIGN_NOTIFICATIONS_DATA, CampaignNotificationRecord } from '../data/campaignNotificationsData';
import { RetentionCampaignItem } from '../data/userRetentionData';

interface CampaignNotificationsScreenProps {
  campaign: RetentionCampaignItem;
  onClose: () => void;
  onShowToast: (summary: string, detail: string, severity?: 'success' | 'info' | 'warn' | 'error') => void;
}

type SortField = keyof CampaignNotificationRecord;

export const CampaignNotificationsScreen: React.FC<CampaignNotificationsScreenProps> = ({
  campaign,
  onClose,
  onShowToast,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Opened' | 'Unopened'>('All');
  const [sortField, setSortField] = useState<SortField>('sNo');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

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

  const filteredData = useMemo(() => {
    return CAMPAIGN_NOTIFICATIONS_DATA.filter((row) => {
      if (statusFilter === 'Opened' && row.openedFlag !== 1) return false;
      if (statusFilter === 'Unopened' && row.openedFlag !== 0) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          row.userId.toLowerCase().includes(q) ||
          row.notification.toLowerCase().includes(q) ||
          row.sentAt.toLowerCase().includes(q)
        );
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
  }, [searchTerm, statusFilter, sortField, sortOrder]);

  const totalRecords = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
  const firstRecord = totalRecords === 0 ? 0 : startIndex + 1;
  const lastRecord = Math.min(startIndex + rowsPerPage, totalRecords);

  const openedCount = CAMPAIGN_NOTIFICATIONS_DATA.filter((r) => r.openedFlag === 1).length;

  const handleExportCsv = () => {
    const headers = [
      'S.NO',
      'USERID',
      'NOTIFICATION',
      'SENT-AT',
      'CLICKED_FLAG',
      'OPENED_FLAG',
      'ORDER-ID',
      'CONVERTED_TO_ORDERS',
    ];

    const rows = filteredData.map((d) => [
      d.sNo,
      `"${d.userId}"`,
      `"${d.notification.replace(/"/g, '""')}"`,
      `"${d.sentAt}"`,
      d.clickedFlag,
      d.openedFlag,
      `"${d.orderId}"`,
      d.convertedToOrders,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Campaign_${campaign.code}_Notifications_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast('Export Excel', `Successfully exported ${filteredData.length} notification records.`, 'success');
  };

  return (
    <div className="w-full bg-white rounded-lg border border-[#dfe7ef] shadow-xs flex flex-col slide-in-from-right overflow-hidden">
      {/* Top Header Navigation Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 border-b border-gray-200 bg-gray-50/80">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 text-gray-700 hover:text-[#0e4b31] hover:border-[#0e4b31] rounded-md text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Retention Summary</span>
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-[#0e4b31] text-white font-mono font-bold text-xs rounded">
                {campaign.code} {campaign.timeline}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-[#111827]">
                {campaign.title}
              </h3>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Audience: {campaign.description} • Sent Count: {campaign.sentCount.toLocaleString()}
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

      {/* KPI Stats Bar */}
      <div className="p-4 sm:px-6 py-3 bg-white border-b border-gray-100 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-2.5 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-between">
          <div>
            <span className="text-gray-500 font-medium block">Total Sent Dispatches</span>
            <span className="text-sm font-bold font-mono text-gray-900 mt-0.5 block">
              {CAMPAIGN_NOTIFICATIONS_DATA.length}
            </span>
          </div>
          <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-between">
          <div>
            <span className="text-emerald-700 font-medium block">Opened Notifications</span>
            <span className="text-sm font-bold font-mono text-emerald-900 mt-0.5 block">
              {openedCount} ({( (openedCount / CAMPAIGN_NOTIFICATIONS_DATA.length) * 100 ).toFixed(1)}%)
            </span>
          </div>
          <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <Eye className="w-4 h-4" />
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div>
            <span className="text-amber-700 font-medium block">Clicked Actions</span>
            <span className="text-sm font-bold font-mono text-amber-900 mt-0.5 block">
              0 (0.0%)
            </span>
          </div>
          <div className="w-8 h-8 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center">
            <MousePointerClick className="w-4 h-4" />
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-[#0e4b3112] border border-[#0e4b3130] flex items-center justify-between">
          <div>
            <span className="text-[#0e4b31] font-medium block">Converted Orders</span>
            <span className="text-sm font-bold font-mono text-[#0e4b31] mt-0.5 block">
              0 Orders
            </span>
          </div>
          <div className="w-8 h-8 rounded-md bg-[#0e4b3120] text-[#0e4b31] flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Main Table Content Area */}
      <div className="p-4 sm:p-6 space-y-4">
        {/* Search & Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setStatusFilter('All')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                statusFilter === 'All'
                  ? 'bg-[#0e4b31] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All Dispatches ({CAMPAIGN_NOTIFICATIONS_DATA.length})
            </button>
            <button
              type="button"
              onClick={() => setStatusFilter('Opened')}
              className={`px-3 py-1 rounded text-xs font-semibold transition-colors cursor-pointer ${
                statusFilter === 'Opened'
                  ? 'bg-[#0e4b31] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Opened Only ({openedCount})
            </button>
          </div>

          <div className="relative w-full max-w-[280px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search user ID, notification..."
              className="w-full h-[34px] pl-9 pr-3 text-xs bg-white border border-gray-300 rounded-md focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#C7D2FE] transition-colors placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* The Exact Table from the Attached Image */}
        <div className="w-full bg-white border border-[#eae8e8] rounded shadow-xs overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-full border-collapse text-sm table-auto">
              <thead className="sticky top-0 z-10">
                <tr>
                  <th
                    onClick={() => handleSort('sNo')}
                    className="table-header-cell w-[60px] !text-center px-2 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-center gap-1">
                      <span>S.NO</span>
                      {renderSortIcon('sNo')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('userId')}
                    className="table-header-cell w-[90px] !text-left px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>USERID</span>
                      {renderSortIcon('userId')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('notification')}
                    className="table-header-cell min-w-[340px] !text-left px-3.5 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>NOTIFICATION</span>
                      {renderSortIcon('notification')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('sentAt')}
                    className="table-header-cell w-[110px] !text-left px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>SENT-AT</span>
                      {renderSortIcon('sentAt')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('clickedFlag')}
                    className="table-header-cell w-[120px] !text-left px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>CLICKED_FLAG</span>
                      {renderSortIcon('clickedFlag')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('openedFlag')}
                    className="table-header-cell w-[120px] !text-left px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>OPENED_FLAG</span>
                      {renderSortIcon('openedFlag')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('orderId')}
                    className="table-header-cell w-[100px] !text-left px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>ORDER-ID</span>
                      {renderSortIcon('orderId')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('convertedToOrders')}
                    className="table-header-cell w-[180px] !text-left px-3 py-3 cursor-pointer hover:bg-[#38947230] transition-colors select-none"
                  >
                    <div className="flex items-center justify-start gap-1">
                      <span>CONVERTED_TO_ORDERS</span>
                      {renderSortIcon('convertedToOrders')}
                    </div>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#eae8e8] bg-white">
                {paginatedData.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-gray-500 font-medium">
                      No notification dispatch records match your search.
                    </td>
                  </tr>
                ) : (
                  paginatedData.map((row) => (
                    <tr
                      key={row.sNo}
                      className="hover:bg-[#f8fafc] transition-colors"
                    >
                      {/* S.NO */}
                      <td className="table-body-cell text-center font-mono text-[13px] text-gray-600 px-2 py-2.5">
                        {row.sNo}
                      </td>

                      {/* USERID */}
                      <td className="table-body-cell text-left font-mono font-medium text-[13px] text-gray-900 px-3 py-2.5">
                        {row.userId}
                      </td>

                      {/* NOTIFICATION */}
                      <td className="table-body-cell text-left text-[13px] text-gray-800 px-3.5 py-2.5" dir="auto">
                        {row.notification}
                      </td>

                      {/* SENT-AT */}
                      <td className="table-body-cell text-left font-mono text-[13px] text-gray-800 px-3 py-2.5">
                        {row.sentAt}
                      </td>

                      {/* CLICKED_FLAG */}
                      <td className="table-body-cell text-left font-mono text-[13px] text-gray-700 px-3 py-2.5">
                        {row.clickedFlag}
                      </td>

                      {/* OPENED_FLAG */}
                      <td className="table-body-cell text-left font-mono text-[13px] px-3 py-2.5">
                        {row.openedFlag === 1 ? (
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            1
                          </span>
                        ) : (
                          <span className="text-gray-700">0</span>
                        )}
                      </td>

                      {/* ORDER-ID */}
                      <td className="table-body-cell text-left font-mono text-[13px] text-gray-500 px-3 py-2.5">
                        {row.orderId || '-'}
                      </td>

                      {/* CONVERTED_TO_ORDERS */}
                      <td className="table-body-cell text-left font-mono text-[13px] text-gray-700 px-3 py-2.5">
                        {row.convertedToOrders}
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
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-1.5 text-gray-400">
                <ChevronDown className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
