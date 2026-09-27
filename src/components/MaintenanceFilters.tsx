
export const MaintenanceFilters: React.FC = () => {
  return (
    <div className="bgcolor p-4 mb-4 border border-[#dfe7ef] rounded-lg bg-white shadow-xs">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div>
          <label className="block text-xs text-gray-500 font-medium mb-1">Country</label>
          <select className="w-full h-9 bg-white border border-gray-300 rounded text-sm text-gray-700 p-1.5 focus:outline-none focus:border-[#6366F1]">
            <option>All</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 font-medium mb-1">Region</label>
          <select className="w-full h-9 bg-white border border-gray-300 rounded text-sm text-gray-700 p-1.5 focus:outline-none focus:border-[#6366F1]">
            <option>Select Region</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 font-medium mb-1">Project</label>
          <select className="w-full h-9 bg-white border border-gray-300 rounded text-sm text-gray-700 p-1.5 focus:outline-none focus:border-[#6366F1]">
            <option>Select Project</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 font-medium mb-1">City</label>
          <select className="w-full h-9 bg-white border border-gray-300 rounded text-sm text-gray-700 p-1.5 focus:outline-none focus:border-[#6366F1]">
            <option>Select City</option>
          </select>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div>
          <label className="block text-xs text-gray-500 font-medium mb-1">Select Date</label>
          <input type="date" className="h-9 w-32 bg-white border border-gray-300 rounded text-sm text-gray-700 p-1.5 focus:outline-none focus:border-[#6366F1]" defaultValue="2026-09-22" />
        </div>
        <div>
          <label className="block text-xs text-gray-500 font-medium mb-1">End Date</label>
          <input type="date" className="h-9 w-32 bg-white border border-gray-300 rounded text-sm text-gray-700 p-1.5 focus:outline-none focus:border-[#6366F1]" defaultValue="2026-09-22" />
        </div>
        <button className="h-9 px-6 mt-4 text-sm font-medium text-white bg-[#1b5e43] rounded hover:bg-[#154a35]">Apply</button>
        <button className="h-9 px-6 mt-4 text-sm font-medium text-emerald-700 border border-emerald-700 rounded hover:bg-emerald-50">Reset</button>
      </div>
    </div>
  );
};
