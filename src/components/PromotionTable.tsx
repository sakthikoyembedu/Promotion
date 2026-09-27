import React from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { PromotionItem, SortField, SortOrder } from '../types';

interface PromotionTableProps {
  items: PromotionItem[];
  startIndex: number;
  sortField: SortField;
  sortOrder: SortOrder;
  onSort: (field: SortField) => void;
  onPromotionClick?: (promotionName: string) => void;
  zoomLevel?: number;
}

export const PromotionTable: React.FC<PromotionTableProps> = ({
  items,
  startIndex,
  sortField,
  sortOrder,
  onSort,
  onPromotionClick,
  zoomLevel = 100,
}) => {
  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 opacity-60 inline-block ml-1" />;
    }
    return sortOrder === 'asc' ? (
      <ArrowUp className="w-3.5 h-3.5 text-[#389472] inline-block ml-1" />
    ) : (
      <ArrowDown className="w-3.5 h-3.5 text-[#389472] inline-block ml-1" />
    );
  };

  return (
    <div
      className="w-full bg-white border border-[#eae8e8] rounded shadow-xs overflow-hidden transition-all duration-150"
      style={{
        zoom: zoomLevel !== 100 ? `${zoomLevel}%` : undefined,
      }}
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-full border-collapse text-sm table-auto">
          <thead className="sticky top-0 z-10">
            <tr>
              <th className="table-header-cell w-[50px] !text-center px-2 py-3">
                S.No
              </th>
              <th
                onClick={() => onSort('city')}
                className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3 py-3"
              >
                <div className="flex items-center justify-start gap-1">
                  <span>City</span>
                  {renderSortIcon('city')}
                </div>
              </th>
              <th
                onClick={() => onSort('title')}
                className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3.5 py-3"
              >
                <div className="flex items-center justify-start gap-1">
                  <span>Title</span>
                  {renderSortIcon('title')}
                </div>
              </th>
              <th
                onClick={() => onSort('promotionName')}
                className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3.5 py-3"
              >
                <div className="flex items-center justify-start gap-1">
                  <span>Promotion</span>
                  {renderSortIcon('promotionName')}
                </div>
              </th>
              <th
                onClick={() => onSort('key')}
                className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3 py-3"
              >
                <div className="flex items-center justify-start gap-1">
                  <span>Key</span>
                  {renderSortIcon('key')}
                </div>
              </th>
              <th
                onClick={() => onSort('valueAmt')}
                className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3 py-3"
              >
                <div className="flex items-center justify-start gap-1">
                  <span>Value (SAR)</span>
                  {renderSortIcon('valueAmt')}
                </div>
              </th>
              <th
                onClick={() => onSort('startDateTime')}
                className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3 py-3"
              >
                <div className="flex items-center justify-start gap-1">
                  <span>Start Date &amp; Time</span>
                  {renderSortIcon('startDateTime')}
                </div>
              </th>
              <th
                onClick={() => onSort('endDateTime')}
                className="table-header-cell cursor-pointer hover:bg-[#38947230] transition-colors select-none !text-left px-3 py-3"
              >
                <div className="flex items-center justify-start gap-1">
                  <span>End Date &amp; Time</span>
                  {renderSortIcon('endDateTime')}
                </div>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#eae8e8] bg-white">
            {items.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-16 text-center text-gray-500 font-medium">
                  No promotion records match the selected filters or search query.
                </td>
              </tr>
            ) : (
              items.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-[#f8fafc] transition-colors"
                >
                  <td className="table-body-cell text-center text-gray-600 font-mono text-[13px] px-2 py-2.5">
                    {startIndex + index + 1}
                  </td>
                  <td className="table-body-cell text-left text-gray-800 text-[13px] px-3 py-2.5">
                    {item.city}
                  </td>
                  <td className="table-body-cell text-left text-gray-600 text-[13px] px-3.5 py-2.5">
                    {item.title}
                  </td>
                  <td className="table-body-cell text-left text-[#1e425e] text-[13px] px-3.5 py-2.5">
                    <span
                      className="text-[#374151] hover:text-[#389472] transition-colors cursor-pointer font-medium"
                      onClick={() => onPromotionClick?.(item.promotionName)}
                    >
                      {item.promotionName}
                    </span>
                  </td>
                  <td className="table-body-cell text-left text-gray-700 text-[13px] px-3 py-2.5 font-mono">
                    {item.key}
                  </td>
                  <td className="table-body-cell text-left font-mono text-gray-900 font-medium text-[13px] px-3 py-2.5">
                    {item.valueAmt}
                  </td>
                  <td className="table-body-cell text-left text-gray-600 font-mono text-[13px] px-3 py-2.5">
                    {item.startDateTime}
                  </td>
                  <td className="table-body-cell text-left text-gray-600 font-mono text-[13px] px-3 py-2.5">
                    {item.endDateTime}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
