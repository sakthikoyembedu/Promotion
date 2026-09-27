import React, { useState, useMemo } from 'react';
import {
  FileSpreadsheet,
  Search,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  ChevronDown,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from 'lucide-react';
import { USER_RETENTION_DATA, RetentionCampaignItem } from '../data/userRetentionData';
import { CampaignNotificationsScreen } from './CampaignNotificationsScreen';

interface UserRetentionSummaryProps {
  onShowToast: (summary: string, detail: string, severity?: 'success' | 'info' | 'warn' | 'error') => void;
}

type RetentionSortField =
  | 'id'
  | 'code'
  | 'title'
  | 'type'
  | 'sentCount'
  | 'openRate'
  | 'ctr'
  | 'conversionRate'
  | 'bonusPoints'
  | 'recycledMaterialKg'
  | 'costPerConversion';

export const UserRetentionSummary: React.FC<UserRetentionSummaryProps> = ({ onShowToast }) => {
  const [selectedCampaign, setSelectedCampaign] = useState<RetentionCampaignItem | null>(null);

  // Filters
  const [country, setCountry] = useState('All');
  const [region, setRegion] = useState('Select Region');
  const [project, setProject] = useState('Select Project');
  const [city, setCity] = useState('Select City');
  const [language, setLanguage] = useState('All Languages');
  const [startDate, setStartDate] = useState('22/09/2026');
  const [endDate, setEndDate] = useState('22/09/2026');
  const [searchTerm, setSearchTerm] = useState('');

  // Sorting
  const [sortField, setSortField] = useState<RetentionSortField>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleResetFilters = () => {
    setCountry('All');
    setRegion('Select Region');
    setProject('Select Project');
    setCity('Select City');
    setLanguage('All Languages');
    setStartDate('22/09/2026');
    setEndDate('22/09/2026');
    setSearchTerm('');
    setSortField('id');
    setSortOrder('asc');
    setCurrentPage(1);
    onShowToast('Filters Reset', 'User Retention Summary filters have been reset to default.', 'info');
  };

  const handleApplyDate = () => {
    setCurrentPage(1);
    onShowToast('Date Filter Applied', `Showing records from ${startDate} to ${endDate}.`, 'success');
  };

  const handleSort = (field: RetentionSortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const renderSortIcon = (field: RetentionSortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 opacity-60 inline-block ml-1" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-[#389472] inline-block ml-1" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-[#389472] inline-block ml-1" />
    );
  };

  // Filtered & Sorted items
  const filteredData = useMemo(() => {
    return USER_RETENTION_DATA.filter((item) => {
      if (country !== 'All' && item.country !== country) return false;
      if (region !== 'Select Region' && item.region !== region) return false;
      if (project !== 'Select Project' && item.project !== project) return false;
      if (city !== 'Select City' && item.city !== city) return false;
      if (language !== 'All Languages' && item.language !== language) return false;

      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(q);
        const matchDesc = item.description.toLowerCase().includes(q);
        const matchType = item.type.toLowerCase().includes(q);
        const matchStep = `${item.code} ${item.timeline}`.toLowerCase().includes(q);
        if (!matchTitle && !matchDesc && !matchType && !matchStep) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];

      if (aVal === null && bVal === null) return 0;
      if (aVal === null) return 1;
      if (bVal === null) return -1;

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        const cmp = aVal.localeCompare(bVal);
        return sortOrder === 'asc' ? cmp : -cmp;
      }

      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }, [country, region, project, city, language, searchTerm, sortField, sortOrder]);

  const totalRecords = filteredData.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / rowsPerPage));
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + rowsPerPage);
  const firstRecord = totalRecords === 0 ? 0 : startIndex + 1;
  const lastRecord = Math.min(startIndex + rowsPerPage, totalRecords);

  // If a campaign step is selected, slide in the notification details screen from the right
  if (selectedCampaign) {
    return (
      <CampaignNotificationsScreen
        campaign={selectedCampaign}
        onClose={() => setSelectedCampaign(null)}
        onShowToast={onShowToast}
      />
    );
  }

  // Export to Excel / CSV
  const handleExportExcel = () => {
    const headers = [
      'S.No',
      'Campaign Step Code',
      'Campaign Step Timeline',
      'Campaign Title',
      'Description',
      'Type',
      'Sent Count',
      'Open Rate (%)',
      'Opens',
      'CTR (%)',
      'Clicks',
      'Conversion Rate (%)',
      'Orders',
      'Bonus Points',
      'Recycled Material (KG)',
      'Cost per Conversion (Pts/KG)',
    ];

    const rows = filteredData.map((d, index) => [
      index + 1,
      `"${d.code}"`,
      `"${d.timeline}"`,
      `"${d.title}"`,
      `"${d.description}"`,
      `"${d.type}"`,
      d.sentCount,
      d.openRate,
      d.openCount,
      d.ctr,
      d.clickCount,
      d.conversionRate,
      d.orderCount,
      d.bonusPoints !== null ? d.bonusPoints : '',
      d.recycledMaterialKg,
      d.costPerConversion.toFixed(2),
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `User_Retention_Summary_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    onShowToast('Export Excel', `Successfully exported ${filteredData.length} retention campaign records.`, 'success');
  };

  // Badge styling matching the image
  const renderTypeBadge = (type: RetentionCampaignItem['type']) => {
    switch (type) {
      case 'IMPACT':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider bg-[#d1fae5] border border-[#a7f3d0] text-[#065f46]">
            IMPACT
          </span>
        );
      case 'INCENTIVE':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider bg-[#fef3c7] border border-[#fcd34d] text-[#92400e]">
            INCENTIVE
          </span>
        );
      case 'REACTIVATION':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider bg-[#ffe4e6] border border-[#fecdd3] text-[#9f1239]">
            REACTIVATION
          </span>
        );
      case 'NUDGE':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider bg-[#f1f5f9] border border-[#cbd5e1] text-[#334155]">
            NUDGE
          </span>
        );
      case 'REMINDER':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider bg-[#dbeafe] border border-[#bfdbfe] text-[#1e40af]">
            REMINDER
          </span>
        );
      case 'FEEDBACK':
        return (
          <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-bold tracking-wider bg-[#f3e8ff] border border-[#e9d5ff] text-[#6b21a8]">
            FEEDBACK
          </span>
        );
      default:
        return <span>{type}</span>;
    }
  };

  return (
    <div className="w-full">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <h5 className="text-[1.4rem] font-medium text-[#111827] tracking-tight">
          User Retention Summary
        </h5>

        <div>
          <button
            type="button"
            onClick={handleExportExcel}
            className="flex items-center gap-2 px-3.5 py-2 text-white font-medium text-sm rounded bg-[#165a3e] hover:bg-[#114932] shadow-xs cursor-pointer select-none transition-colors"
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Export Excel</span>
          </button>
        </div>
      </div>

      {/* Two-Row Filter Container (Matching Reference Image) */}
      <div className="bgcolor p-4 mb-3 border border-[#dfe7ef] rounded-lg bg-white shadow-xs">
        {/* Row 1: Dropdown filters */}
        <div className="flex flex-wrap items-end gap-3 mb-3">
          {/* Country */}
          <div className="flex-1 min-w-[150px]">
            <label className="block text-[13px] text-gray-700 font-normal mb-1">
              Country
            </label>
            <div className="relative">
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full h-[34px] px-2.5 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-[#6366F1] appearance-none cursor-pointer"
              >
                <option value="All">All</option>
                <option value="SA">Saudi Arabia</option>
                <option value="AE">United Arab Emirates</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Region */}
          <div className="flex-1 min-w-[150px]">
            <label className="block text-[13px] text-gray-700 font-normal mb-1">
              Region
            </label>
            <div className="relative">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full h-[34px] px-2.5 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-[#6366F1] appearance-none cursor-pointer"
              >
                <option value="Select Region">Select Region</option>
                <option value="Eastern">Eastern Region</option>
                <option value="Central">Central Region</option>
                <option value="Western">Western Region</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Project */}
          <div className="flex-1 min-w-[150px]">
            <label className="block text-[13px] text-gray-700 font-normal mb-1">
              Project
            </label>
            <div className="relative">
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="w-full h-[34px] px-2.5 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-[#6366F1] appearance-none cursor-pointer"
              >
                <option value="Select Project">Select Project</option>
                <option value="SmartSort">SmartSort Project</option>
                <option value="EcoCollect">EcoCollect</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* City */}
          <div className="flex-1 min-w-[150px]">
            <label className="block text-[13px] text-gray-700 font-normal mb-1">
              City
            </label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-[34px] px-2.5 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-[#6366F1] appearance-none cursor-pointer"
              >
                <option value="Select City">Select City</option>
                <option value="Riyadh">Riyadh</option>
                <option value="Jeddah">Jeddah</option>
                <option value="Bqaiq">Bqaiq</option>
                <option value="Dammam">Dammam</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Language */}
          <div className="flex-1 min-w-[150px]">
            <label className="block text-[13px] text-gray-700 font-normal mb-1">
              Language
            </label>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full h-[34px] px-2.5 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-[#6366F1] appearance-none cursor-pointer"
              >
                <option value="All Languages">All Languages</option>
                <option value="English">English</option>
                <option value="Arabic">Arabic</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <ChevronDown className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>

          {/* Reset button Row 1 */}
          <button
            type="button"
            onClick={handleResetFilters}
            className="h-[34px] px-4 border border-[#389472] text-[#389472] font-semibold text-xs rounded hover:bg-[#38947210] transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>

        {/* Row 2: Date filters + Apply & Reset */}
        <div className="flex flex-wrap items-end gap-3 pt-2 border-t border-gray-100">
          {/* Select Date */}
          <div className="w-[140px]">
            <label className="block text-[13px] text-gray-700 font-normal mb-1">
              Select Date
            </label>
            <input
              type="text"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full h-[34px] px-2.5 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-[#6366F1]"
            />
          </div>

          {/* End Date */}
          <div className="w-[140px]">
            <label className="block text-[13px] text-gray-700 font-normal mb-1">
              End Date
            </label>
            <input
              type="text"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full h-[34px] px-2.5 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-[#6366F1]"
            />
          </div>

          {/* Apply button */}
          <button
            type="button"
            onClick={handleApplyDate}
            className="h-[34px] px-5 bg-[#1b5e43] hover:bg-[#134934] text-white font-medium text-xs rounded transition-colors cursor-pointer"
          >
            Apply
          </button>

          {/* Reset button */}
          <button
            type="button"
            onClick={handleResetFilters}
            className="h-[34px] px-4 border border-[#389472] text-[#389472] font-semibold text-xs rounded hover:bg-[#38947210] transition-colors cursor-pointer"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Search Input Bar (Top Right) */}
      <div className="flex justify-end mb-3">
        <div className="relative w-full max-w-[260px]">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search promotion..."
            className="w-full h-[36px] pl-9 pr-3 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#C7D2FE] transition-colors placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Main Table Matching Reference Screenshot */}
      <div className="w-full bg-white border border-[#eae8e8] rounded shadow-xs overflow-hidden">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-full border-collapse text-sm table-auto">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="table-header-cell w-[50px] !text-center px-2 py-3">
                  S.No
                </th>
                <th
                  onClick={() => handleSort('code')}
                  className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3 py-3"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Campaign Step</span>
                    {renderSortIcon('code')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('title')}
                  className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3.5 py-3"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Campaign Title &amp; Description</span>
                    {renderSortIcon('title')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('type')}
                  className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-center px-2 py-3"
                >
                  <div className="flex items-center justify-center gap-1">
                    <span>Type</span>
                    {renderSortIcon('type')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('sentCount')}
                  className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3 py-3"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Sent Count</span>
                    {renderSortIcon('sentCount')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('openRate')}
                  className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3 py-3"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Open Rate</span>
                    {renderSortIcon('openRate')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('ctr')}
                  className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3 py-3"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Click-Through Rate</span>
                    {renderSortIcon('ctr')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('conversionRate')}
                  className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3 py-3"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Order Conversion Rate</span>
                    {renderSortIcon('conversionRate')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('bonusPoints')}
                  className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3 py-3"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Bonus Points</span>
                    {renderSortIcon('bonusPoints')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('recycledMaterialKg')}
                  className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3 py-3"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Recycled Material (KG)</span>
                    {renderSortIcon('recycledMaterialKg')}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('costPerConversion')}
                  className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3 py-3"
                >
                  <div className="flex items-center justify-start gap-1">
                    <span>Cost per Conversion (Pts/KG)</span>
                    {renderSortIcon('costPerConversion')}
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eae8e8] bg-white">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={11} className="py-8 text-center text-gray-500 font-medium">
                    No retention campaign records found matching your filters.
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => (
                  <tr key={row.id} className="hover:bg-[#f8fafc] transition-colors">
                    {/* S.No */}
                    <td className="table-body-cell text-center text-gray-600 font-mono text-[13px] px-2 py-2.5">
                      {startIndex + idx + 1}
                    </td>

                    {/* Campaign Step */}
                    <td className="table-body-cell text-left px-3 py-2.5 whitespace-nowrap">
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedCampaign(row);
                          onShowToast('Campaign Notifications', `Navigated to notification dispatches for ${row.code} ${row.timeline}.`, 'info');
                        }}
                        className="inline-flex items-center gap-1.5 px-2 py-1 rounded hover:bg-emerald-50 text-gray-900 group transition-all cursor-pointer font-medium"
                        title={`Click to view notification dispatch records for ${row.code} ${row.timeline}`}
                      >
                        <span className="px-1.5 py-0.5 rounded text-[11px] font-mono font-semibold bg-gray-100 border border-gray-300 text-gray-700 group-hover:border-[#1b5e43] group-hover:text-[#1b5e43] transition-colors">
                          {row.code}
                        </span>
                        <span className="text-[13px] text-gray-800 font-medium group-hover:text-[#1b5e43] group-hover:underline transition-colors">
                          {row.timeline}
                        </span>
                        <span className="text-[10px] text-gray-400 group-hover:text-[#1b5e43] transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </button>
                    </td>

                    {/* Campaign Title & Description */}
                    <td className="table-body-cell text-left px-3.5 py-2.5 min-w-[240px] max-w-[340px]">
                      <p className="text-[13px] font-semibold text-gray-900 leading-tight">
                        {row.title}
                      </p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        {row.description}
                      </p>
                    </td>

                    {/* Type */}
                    <td className="table-body-cell text-center px-2 py-2.5 whitespace-nowrap">
                      {renderTypeBadge(row.type)}
                    </td>

                    {/* Sent Count */}
                    <td className="table-body-cell text-left px-3 py-2.5 font-mono text-gray-800 font-medium whitespace-nowrap">
                      {row.sentCount.toLocaleString()}
                    </td>

                    {/* Open Rate */}
                    <td className="table-body-cell text-left px-3 py-2.5 whitespace-nowrap">
                      <span className="font-bold text-gray-900 font-mono text-[13px]">
                        {row.openRate.toFixed(1)}%
                      </span>
                      <p className="text-[10px] text-gray-500 font-mono">
                        {row.openCount.toLocaleString()} opens
                      </p>
                    </td>

                    {/* Click-Through Rate */}
                    <td className="table-body-cell text-left px-3 py-2.5 whitespace-nowrap">
                      <span className="font-bold text-gray-900 font-mono text-[13px]">
                        {row.ctr.toFixed(1)}%
                      </span>
                      <p className="text-[10px] text-gray-500 font-mono">
                        {row.clickCount.toLocaleString()} clicks
                      </p>
                    </td>

                    {/* Order Conversion Rate */}
                    <td className="table-body-cell text-left px-3 py-2.5 whitespace-nowrap">
                      <span className="font-bold text-gray-900 font-mono text-[13px]">
                        {row.conversionRate.toFixed(1)}%
                      </span>
                      <p className="text-[10px] text-gray-500 font-mono">
                        {row.orderCount.toLocaleString()} orders
                      </p>
                    </td>

                    {/* Bonus Points */}
                    <td className="table-body-cell text-left px-3 py-2.5 font-mono font-bold text-[#b45309] whitespace-nowrap">
                      {row.bonusPoints !== null ? row.bonusPoints.toLocaleString() : ''}
                    </td>

                    {/* Recycled Material (KG) */}
                    <td className="table-body-cell text-left px-3 py-2.5 font-mono font-semibold text-gray-900 whitespace-nowrap">
                      {row.recycledMaterialKg.toLocaleString()}
                    </td>

                    {/* Cost per Conversion */}
                    <td className="table-body-cell text-left px-3 py-2.5 font-mono text-gray-800 whitespace-nowrap">
                      {row.costPerConversion.toFixed(2)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginator Matching Screenshot */}
      <div className="flex flex-wrap items-center justify-between py-2.5 px-3 bg-white border border-[#eae8e8] border-t-0 rounded-b text-sm text-[#6b7280]">
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
