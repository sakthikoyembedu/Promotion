import React from 'react';

export const NationalDayPromotionDetails: React.FC = () => {
  const rows = [
    { sNo: 1, case: 'Case 1', category: 'New Customer - First Order', name: 'Ali H', phone: '573977674', city: 'Bqaiq', zone: 'AlAndalus Zone3', orderId: 'AB-RO-67687', date: '22-09-2026', status: 'Completed', weight: '13.1 kg', points: 96 },
    { sNo: 2, case: 'Case 1', category: 'New Customer - First Order', name: 'Suhail', phone: '502334812', city: 'Al-Qatif', zone: 'Zone 4 - B', orderId: 'AQ-RO-67527', date: '21-09-2026', status: 'Completed', weight: '22.37 kg', points: 96 },
    { sNo: 3, case: 'Case 1', category: 'New Customer - First Order', name: 'Zahra', phone: '597371589', city: 'Al-Qatif', zone: 'Zone 4 - B', orderId: 'AQ-RO-67554', date: '21-09-2026', status: 'Completed', weight: '36.85 kg', points: 96 },
    { sNo: 4, case: 'Case 1', category: 'New Customer - First Order', name: 'Ammar A', phone: '570914856', city: 'Al-Qatif', zone: 'Zone 4 - A', orderId: 'AQ-RO-67568', date: '21-09-2026', status: 'Completed', weight: '14.95 kg', points: 96 },
    { sNo: 5, case: 'Case 1', category: 'New Customer - First Order', name: 'Hussain Al-Bahrani', phone: '566937666', city: 'Al-Qatif', zone: 'Zone 4 - A', orderId: 'AQ-RO-67597', date: '21-09-2026', status: 'Completed', weight: '54.56 kg', points: 96 },
    { sNo: 6, case: 'Case 1', category: 'New Customer - First Order', name: 'Bushraa', phone: '533381167', city: 'Al-Qatif', zone: 'Zone 6 - B', orderId: 'AQ-RO-67618', date: '21-09-2026', status: 'Completed', weight: '27.97 kg', points: 96 },
    { sNo: 7, case: 'Case 1', category: 'New Customer - First Order', name: 'Abdullah', phone: '506814569', city: 'Al-Qatif', zone: 'Zone 2 - A', orderId: 'AQ-RO-67636', date: '22-09-2026', status: 'Completed', weight: '21.4 kg', points: 96 },
    { sNo: 8, case: 'Case 3', category: 'Existing Customer - Repeat Order', name: 'Ahmed Al-Qadi', phone: '593388585', city: 'Bqaiq', zone: 'AlMatar Zone3', orderId: 'AB-RO-67482', date: '20-09-2026', status: 'Completed', weight: '523.29 kg', points: 96 },
    { sNo: 9, case: 'Case 3', category: 'Existing Customer - Repeat Order', name: 'Wateen Commercial Center', phone: '571575609', city: 'Bqaiq', zone: 'Almadinah Zone1', orderId: 'AB-RO-67389', date: '20-09-2026', status: 'Completed', weight: '225.09 kg', points: 96 },
    { sNo: 10, case: 'Case 3', category: 'Existing Customer - Repeat Order', name: 'Amani Mohammed', phone: '556178230', city: 'Bqaiq', zone: 'Almadinah Zone2', orderId: 'AB-RO-67634', date: '22-09-2026', status: 'Completed', weight: '188.09 kg', points: 96 },
  ];

  return (
    <div className="w-full space-y-4">
      {/* KPI Overview Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white p-3.5 rounded-lg border border-[#dfe7ef] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Total Eligible Orders</span>
          <span className="text-xl font-bold font-mono text-gray-900 mt-0.5 block">{rows.length}</span>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-[#dfe7ef] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Total Bonus Points</span>
          <span className="text-xl font-bold font-mono text-emerald-800 mt-0.5 block">
            {rows.reduce((acc, row) => acc + row.points, 0).toLocaleString()}
          </span>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-[#dfe7ef] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Total Recycled Materials (Kg)</span>
          <span className="text-xl font-bold font-mono text-gray-900 mt-0.5 block">
            {rows.reduce((acc, row) => acc + parseFloat(row.weight), 0).toFixed(2)}
          </span>
        </div>
        <div className="bg-white p-3.5 rounded-lg border border-[#dfe7ef] shadow-xs">
          <span className="text-xs text-gray-500 font-medium block">Status</span>
          <span className="text-xl font-bold text-red-700 mt-0.5 block">Expired</span>
        </div>
      </div>

      <div className="w-full bg-white border border-[#eae8e8] rounded shadow-xs overflow-hidden">
        <div className="p-4 border-b border-[#eae8e8] bg-white">
          <h2 className="text-base font-bold text-[#111827]">National Day Promotion Details</h2>
          <p className="text-xs text-gray-500 mt-0.5">Full customer conversion and dispatch breakdown</p>
        </div>
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-full border-collapse text-sm table-auto">
            <thead className="sticky top-0 z-10">
              <tr>
                <th className="table-header-cell w-[50px] !text-center px-2 py-3">S.No</th>
                <th className="table-header-cell !text-left px-3 py-3">Case</th>
                <th className="table-header-cell !text-left px-3.5 py-3">Category</th>
                <th className="table-header-cell !text-left px-3.5 py-3">Customer Name</th>
                <th className="table-header-cell !text-left px-3 py-3">Phone</th>
                <th className="table-header-cell !text-left px-3 py-3">City</th>
                <th className="table-header-cell !text-left px-3 py-3">Zone</th>
                <th className="table-header-cell !text-left px-3 py-3">Order ID</th>
                <th className="table-header-cell !text-left px-3 py-3">Date</th>
                <th className="table-header-cell !text-center px-3 py-3">Status</th>
                <th className="table-header-cell !text-left px-3 py-3">Weight</th>
                <th className="table-header-cell !text-left px-3 py-3">Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eae8e8] bg-white">
              {rows.map((row) => (
                <tr key={row.sNo} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="table-body-cell text-center text-gray-600 font-mono text-[13px] px-2 py-2.5">{row.sNo}</td>
                  <td className="table-body-cell text-left text-gray-800 text-[13px] px-3 py-2.5">{row.case}</td>
                  <td className="table-body-cell text-left text-gray-600 text-[13px] px-3.5 py-2.5">{row.category}</td>
                  <td className="table-body-cell text-left text-gray-800 text-[13px] px-3.5 py-2.5">{row.name}</td>
                  <td className="table-body-cell text-left font-mono text-gray-600 text-[13px] px-3 py-2.5">{row.phone}</td>
                  <td className="table-body-cell text-left text-gray-600 text-[13px] px-3 py-2.5">{row.city}</td>
                  <td className="table-body-cell text-left text-gray-600 text-[13px] px-3 py-2.5">{row.zone}</td>
                  <td className="table-body-cell text-left font-mono text-gray-600 text-[13px] px-3 py-2.5">{row.orderId}</td>
                  <td className="table-body-cell text-left font-mono text-gray-600 text-[13px] px-3 py-2.5">{row.date}</td>
                  <td className="table-body-cell text-center text-gray-600 text-[13px] px-3 py-2.5">
                    <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {row.status}
                    </span>
                  </td>
                  <td className="table-body-cell text-left font-mono text-gray-600 text-[13px] px-3 py-2.5">{row.weight}</td>
                  <td className="table-body-cell text-left font-mono text-gray-900 font-medium text-[13px] px-3 py-2.5">{row.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
