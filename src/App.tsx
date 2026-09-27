import React, { useState, useMemo } from 'react';
import { FileSpreadsheet, Download, Search } from 'lucide-react';
import { Topbar } from './components/Topbar';
import { Sidebar } from './components/Sidebar';
import { UiFilters } from './components/UiFilters';
import { PromotionTable } from './components/PromotionTable';
import { Paginator } from './components/Paginator';
import { SmartBotModal } from './components/SmartBotModal';
import { BlankSubmenuPage } from './components/BlankSubmenuPage';
import { PromotionDashboard } from './components/PromotionDashboard';
import { UserRetentionSummary } from './components/UserRetentionSummary';
import { InfluencerPromotion } from './components/InfluencerPromotion';
import { MaintenancePromotions } from './components/MaintenancePromotions';
import { Toast } from './components/Toast';
import { PROMOTIONS_DATA } from './data/promotions';
import { FilterState, SortField, SortOrder, ToastMessage, PromotionSubmenuId } from './types';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSubmenu, setActiveSubmenu] = useState<PromotionSubmenuId>('promotion-types');
  const [filters, setFilters] = useState<FilterState>({
    country: 'All',
    region: 'All',
    project: 'All',
    city: 'All',
    currency: 'SAR',
    search: '',
  });

  const [sortField, setSortField] = useState<SortField>('id');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (
    summary: string,
    detail: string,
    severity: 'success' | 'info' | 'warn' | 'error' = 'success'
  ) => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, summary, detail, severity }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSubmenuSelect = (id: PromotionSubmenuId) => {
    setActiveSubmenu(id);
    const labelMap: Record<PromotionSubmenuId, string> = {
      'promotion-dashboard': 'Promotion Dashboard',
      'maintenance-promotions': 'Maintenance Promotions',
      'user-retention-summary': 'User Retention Summary',
      'influencer-promotion': 'Influencer Promotion',
      'appsflyer': 'Appsflyer',
      'promotion-types': 'Promotion Types',
    };
    if (id === 'promotion-dashboard') {
      showToast('Promotion Dashboard', 'Loaded interactive donut chart & breakdown view.', 'success');
    } else if (id === 'user-retention-summary') {
      showToast('User Retention Summary', 'Loaded retention campaigns & cohort conversion table.', 'success');
    } else if (id === 'influencer-promotion') {
      showToast('Influencer Promotion', 'Loaded influencer referral performance and payouts table.', 'success');
    } else if (id === 'maintenance-promotions') {
      showToast('Maintenance Promotions', 'Loaded maintenance promotions table.', 'success');
    } else if (id !== 'promotion-types') {
      showToast(labelMap[id], 'Navigated to blank page template. Ready for content.', 'info');
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      country: 'All',
      region: 'All',
      project: 'All',
      city: 'All',
      currency: 'SAR',
      search: '',
    });
    setSortField('id');
    setSortOrder('asc');
    setCurrentPage(1);
    showToast('Filters Reset', 'All search criteria and city filters have been reset to default.', 'info');
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  // Filtered and Sorted Data
  const filteredPromotions = useMemo(() => {
    return PROMOTIONS_DATA.filter((item) => {
      // Country filter
      if (filters.country !== 'All' && item.country !== filters.country) {
        return false;
      }
      // Region filter
      if (filters.region !== 'All' && item.region !== filters.region) {
        return false;
      }
      // Project filter
      if (filters.project !== 'All' && item.project !== filters.project) {
        return false;
      }
      // City filter
      if (filters.city !== 'All' && item.city !== filters.city) {
        return false;
      }
      // Currency filter
      if (filters.currency && item.currency !== filters.currency) {
        return false;
      }
      // Search term filter
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase();
        const matchTitle = item.title.toLowerCase().includes(query);
        const matchPromo = item.promotionName.toLowerCase().includes(query);
        const matchCity = item.city.toLowerCase().includes(query);
        const matchKey = item.key.toLowerCase().includes(query);
        if (!matchTitle && !matchPromo && !matchCity && !matchKey) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];

      if (typeof aVal === 'string') {
        const cmp = (aVal as string).localeCompare(bVal as string);
        return sortOrder === 'asc' ? cmp : -cmp;
      }
      if (typeof aVal === 'number') {
        return sortOrder === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
      }
      return 0;
    });
  }, [filters, sortField, sortOrder]);

  // Paginated Rows
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredPromotions.slice(start, start + rowsPerPage);
  }, [filteredPromotions, currentPage, rowsPerPage]);

  const startIndex = (currentPage - 1) * rowsPerPage;

  // Export to Excel / CSV
  const handleExportExcel = () => {
    const headers = ['S.No', 'City', 'Title', 'Promotion', 'Key', 'Value (SAR)', 'Start Date & Time', 'End Date & Time'];
    const rows = filteredPromotions.map((p, idx) => [
      idx + 1,
      `"${p.city}"`,
      `"${p.title}"`,
      `"${p.promotionName}"`,
      `"${p.key}"`,
      p.valueAmt,
      `"${p.startDateTime}"`,
      `"${p.endDateTime}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Promotion_Types_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('Export Excel', `Successfully exported ${filteredPromotions.length} records.`, 'success');
  };

  // Download PDF / Print
  const handleDownloadPdf = () => {
    showToast('Download PDF', 'Preparing promotion report for document printing...', 'info');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#4b5563] flex flex-col font-sans">
      {/* Toast notifications */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />

      {/* Top Navigation Bar */}
      <Topbar
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        onShowToast={showToast}
      />

      {/* Left Sidebar Menu */}
      <Sidebar
        isOpen={sidebarOpen}
        activeSubmenu={activeSubmenu}
        onSelectSubmenu={handleSubmenuSelect}
      />

      {/* Main Content Area */}
      <main
        className={`flex-1 pt-[50px] transition-all duration-300 ${
          sidebarOpen ? 'md:ml-[325px]' : 'ml-0'
        }`}
      >
        <div className="p-4 sm:p-6 w-full max-w-[1920px] 2xl:max-w-none mx-auto">
          {activeSubmenu === 'promotion-dashboard' ? (
            <PromotionDashboard />
          ) : activeSubmenu === 'user-retention-summary' ? (
            <UserRetentionSummary onShowToast={showToast} />
          ) : activeSubmenu === 'influencer-promotion' ? (
            <InfluencerPromotion onShowToast={showToast} />
          ) : activeSubmenu === 'maintenance-promotions' ? (
            <MaintenancePromotions onShowToast={showToast} />
          ) : activeSubmenu === 'promotion-types' ? (
            <>
              {/* Page Title & Action Buttons Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                <h5 className="text-[1.4rem] font-normal text-[#111827] tracking-tight">
                  Promotion Types
                </h5>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleExportExcel}
                    className="excelbtn flex items-center gap-2 px-3.5 py-2 text-white font-medium text-sm rounded shadow-xs cursor-pointer select-none"
                  >
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Export Excel</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    className="excelbtn flex items-center gap-2 px-3.5 py-2 text-white font-medium text-sm rounded shadow-xs cursor-pointer select-none"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Pdf</span>
                  </button>
                </div>
              </div>

              {/* Multi-city Filter Dropdowns Card */}
              <UiFilters
                filters={filters}
                onChange={handleFilterChange}
                onReset={handleResetFilters}
              />

              {/* Search Box on right */}
              <div className="flex justify-end mb-3">
                <div className="relative w-full max-w-[260px]">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    placeholder="Search promotion..."
                    className="w-full h-[36px] pl-9 pr-3 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#C7D2FE] transition-colors placeholder:text-gray-400"
                  />
                </div>
              </div>

              {/* Promotion Types Data Table */}
              <div className="table-wrapper">
                <PromotionTable
                  items={paginatedData}
                  startIndex={startIndex}
                  sortField={sortField}
                  sortOrder={sortOrder}
                  onSort={handleSort}
                />
                {/* Paginator */}
                <Paginator
                  currentPage={currentPage}
                  rowsPerPage={rowsPerPage}
                  totalRecords={filteredPromotions.length}
                  onPageChange={(page) => setCurrentPage(page)}
                  onRowsPerPageChange={(rows) => {
                    setRowsPerPage(rows);
                    setCurrentPage(1);
                  }}
                />
              </div>
            </>
          ) : (
            /* Blank page for other submenus */
            <BlankSubmenuPage submenuId={activeSubmenu} />
          )}
        </div>
      </main>

      {/* Floating SmartBot Assistant */}
      <SmartBotModal onShowToast={showToast} />
    </div>
  );
}
