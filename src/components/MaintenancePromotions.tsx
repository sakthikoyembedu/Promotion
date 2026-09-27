import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  Download,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  ChevronDown,
  Filter,
  Inbox,
  Calendar,
  Layers,
  Award,
  TrendingUp,
  ArrowLeft,
} from 'lucide-react';
import {
  MAINTENANCE_PROMOTIONS_DATA,
  MaintenancePromotionItem,
} from '../data/maintenancePromotionsData';
import { MaintenanceFilters } from './MaintenanceFilters';
import { NationalDayPromotionDetails } from './NationalDayPromotionDetails';

interface MaintenancePromotionsProps {
  onShowToast: (summary: string, detail: string, severity?: 'success' | 'info' | 'warn' | 'error') => void;
}

type MaintenanceSortField = keyof MaintenancePromotionItem;

export const MaintenancePromotions: React.FC<MaintenancePromotionsProps> = ({ onShowToast }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<MaintenanceSortField>('sNo');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedPromotion, setSelectedPromotion] = useState<string | null>(null);

  const handleSort = (field: MaintenanceSortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const renderSortIcon = (field: MaintenanceSortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3 h-3 text-gray-400 inline-block ml-1" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3 h-3 text-[#1b5e43] inline-block ml-1" />
    ) : (
      <ArrowDown className="w-3 h-3 text-[#1b5e43] inline-block ml-1" />
    );
  };

  // Filtered and sorted data
  const filteredData = useMemo(() => {
    return MAINTENANCE_PROMOTIONS_DATA.filter((row) => {
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        row.campaignTitle.toLowerCase().includes(q) ||
        row.category.toLowerCase().includes(q) ||
        row.status.toLowerCase().includes(q) ||
        row.startDateTime.toLowerCase().includes(q) ||
        row.endDateTime.toLowerCase().includes(q)
      );
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
  }, [searchTerm, sortField, sortOrder]);

  const totalRecords = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
  const firstRecord = totalRecords === 0 ? 0 : startIndex + 1;
  const lastRecord = Math.min(startIndex + rowsPerPage, totalRecords);

  const handleExportExcel = () => {
    const headers = [
      'S.No',
      'Campaign ID',
      'Campaign Title',
      'Category',
      'Start Date & Time',
      'End Date & Time',
      'Status',
    ];

    const rows = filteredData.map((d) => [
      d.sNo,
      d.id + 1000,
      `"${d.campaignTitle}"`,
      `"${d.category}"`,
      `"${d.startDateTime}"`,
      `"${d.endDateTime}"`,
      `"${d.status}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Maintenance_Promotions_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast('Export Excel', `Successfully exported ${filteredData.length} maintenance promotion records.`, 'success');
  };

  const handleDownloadPdf = () => {
    onShowToast('Download PDF', 'Generating PDF preview for Maintenance Promotions...', 'info');
  };

  if (selectedPromotion) {
    return (
      <div className="w-full space-y-4">
        <button 
          onClick={() => setSelectedPromotion(null)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Maintenance Promotions
        </button>
        <NationalDayPromotionDetails />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      {/* Page Title & Action Buttons Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h5 className="text-[1.4rem] font-medium text-[#111827] tracking-tight">
            Maintenance Promotions
          </h5>
          <p className="text-xs text-gray-500 mt-0.5">
            Monitor and evaluate maintenance promotion campaign performance and recycling metrics.
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

      <MaintenanceFilters />

      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div 
          onClick={() => setSearchTerm('')}
          className={`bg-white p-3.5 rounded-lg border shadow-xs flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all ${searchTerm === '' ? 'border-[#389472] ring-2 ring-[#389472]/20' : 'border-[#dfe7ef]'}`}
        >
          <div>
            <span className="text-xs text-gray-500 font-medium block">Total Campaigns</span>
            <span className="text-xl font-bold font-mono text-gray-900 mt-0.5 block">
              {filteredData.length}
            </span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
        </div>

        <div 
          onClick={() => setSearchTerm('Active')}
          className={`bg-white p-3.5 rounded-lg border shadow-xs flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all ${searchTerm === 'Active' ? 'border-[#389472] ring-2 ring-[#389472]/20' : 'border-[#dfe7ef]'}`}
        >
          <div>
            <span className="text-xs text-gray-500 font-medium block">Active</span>
            <span className="text-xl font-bold font-mono text-emerald-700 mt-0.5 block">
              {MAINTENANCE_PROMOTIONS_DATA.filter(d => d.status === 'Active').length}
            </span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div 
          onClick={() => setSearchTerm('Scheduled')}
          className={`bg-white p-3.5 rounded-lg border shadow-xs flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all ${searchTerm === 'Scheduled' ? 'border-[#389472] ring-2 ring-[#389472]/20' : 'border-[#dfe7ef]'}`}
        >
          <div>
            <span className="text-xs text-gray-500 font-medium block">Scheduled</span>
            <span className="text-xl font-bold font-mono text-amber-700 mt-0.5 block">
              {MAINTENANCE_PROMOTIONS_DATA.filter(d => d.status === 'Scheduled').length}
            </span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
        </div>

        <div 
          onClick={() => setSearchTerm('Expired')}
          className={`bg-white p-3.5 rounded-lg border shadow-xs flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-all ${searchTerm === 'Expired' ? 'border-[#389472] ring-2 ring-[#389472]/20' : 'border-[#dfe7ef]'}`}
        >
          <div>
            <span className="text-xs text-gray-500 font-medium block">Expired</span>
            <span className="text-xl font-bold font-mono text-red-700 mt-0.5 block">
              {MAINTENANCE_PROMOTIONS_DATA.filter(d => d.status === 'Expired').length}
            </span>
          </div>
          <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center">
            <Inbox className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="bgcolor p-3.5 border border-[#dfe7ef] rounded-lg bg-white shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 font-medium flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              Campaigns ({filteredData.length} records)
            </span>
          </div>

          <div className="relative w-full max-w-[280px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search campaign title, dates..."
              className="w-full h-[34px] pl-9 pr-3 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#C7D2FE] transition-colors placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Maintenance Promotion Data Table */}
      <div className="w-full bg-white border border-[#eae8e8] rounded shadow-xs overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-full border-collapse text-sm table-auto">
            <thead className="sticky top-0 z-10">
              <tr>
                <th
                  onClick={() => handleSort('sNo')}
                  className="table-header-cell w-[50px] !text-center px-2 py-3 select-none cursor-pointer hover:bg-[#38947230] transition-colors"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>S.No</span>
                    {renderSortIcon('sNo')}
                  </div>
                </th>

                <th
                  onClick={() => handleSort('id')}
                  className="table-header-cell !text-left px-3 py-3 select-none cursor-pointer hover:bg-[#38947230] transition-colors"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Campaign ID</span>
                    {renderSortIcon('id')}
                  </div>
                </th>

                <th
                  onClick={() => handleSort('campaignTitle')}
                  className="table-header-cell !text-left px-3.5 py-3 select-none min-w-[240px] cursor-pointer hover:bg-[#38947230] transition-colors"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Campaign Title</span>
                    {renderSortIcon('campaignTitle')}
                  </div>
                </th>

                <th
                  onClick={() => handleSort('category')}
                  className="table-header-cell !text-left px-3 py-3 select-none cursor-pointer hover:bg-[#38947230] transition-colors"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Category</span>
                    {renderSortIcon('category')}
                  </div>
                </th>

                <th
                  onClick={() => handleSort('startDateTime')}
                  className="table-header-cell !text-left px-3 py-3 select-none whitespace-nowrap cursor-pointer hover:bg-[#38947230] transition-colors"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Start Date &amp; Time</span>
                    {renderSortIcon('startDateTime')}
                  </div>
                </th>

                <th
                  onClick={() => handleSort('endDateTime')}
                  className="table-header-cell !text-left px-3 py-3 select-none whitespace-nowrap cursor-pointer hover:bg-[#38947230] transition-colors"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>End Date &amp; Time</span>
                    {renderSortIcon('endDateTime')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('status')}
                  className="table-header-cell !text-left px-3 py-3 select-none whitespace-nowrap cursor-pointer hover:bg-[#38947230] transition-colors"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Status</span>
                    {renderSortIcon('status')}
                  </div>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eae8e8] bg-white">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center mb-2.5 text-gray-300 border border-gray-200">
                        <Inbox className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-medium text-gray-600">
                        No maintenance promotion records found
                      </p>
                      <p className="text-xs text-gray-400 mt-1 max-w-sm">
                        No records match the current search query.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedData.map((row) => (
                  <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors">
                    {/* S.No */}
                    <td className="table-body-cell text-center text-gray-600 font-mono text-[13px] px-2 py-2.5">
                      {row.sNo}
                    </td>

                    {/* Campaign ID */}
                    <td className="table-body-cell text-left text-gray-700 font-mono text-[13px] px-3 py-2.5">
                      {row.id + 1000}
                    </td>

                    {/* Campaign Title */}
                    <td 
                      className="table-body-cell text-left text-[#1e425e] font-normal text-[13.5px] px-3.5 py-2.5 cursor-pointer hover:text-[#389472]"
                      onClick={() => setSelectedPromotion(row.campaignTitle)}
                    >
                      {row.campaignTitle}
                    </td>

                    {/* Category */}
                    <td className="table-body-cell text-left text-gray-700 text-[13px] px-3 py-2.5 font-medium">
                      {row.category.toUpperCase()}
                    </td>

                    {/* Start Date & Time */}
                    <td className="table-body-cell text-left font-mono text-gray-800 whitespace-nowrap text-[13px] px-3 py-2.5">
                      {row.startDateTime}
                    </td>

                    {/* End Date & Time */}
                    <td className="table-body-cell text-left font-mono text-gray-800 whitespace-nowrap text-[13px] px-3 py-2.5">
                      {row.endDateTime}
                    </td>
                    
                    {/* Status */}
                    <td className="table-body-cell text-left text-gray-700 text-[13px] px-3 py-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wider border ${
                        row.status === 'Active' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                        row.status === 'Expired' ? 'bg-red-50 text-red-700 border-red-200' :
                        'bg-amber-50 text-amber-700 border-amber-200'
                      }`}>
                        {row.status.toUpperCase()}
                      </span>
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
              onChange={(e) => {
                setRowsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
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
