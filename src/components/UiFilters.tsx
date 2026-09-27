import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FilterState } from '../types';
import { COUNTRIES, REGIONS, PROJECTS, CITIES, CURRENCIES } from '../data/promotions';

interface UiFiltersProps {
  filters: FilterState;
  onChange: (key: keyof FilterState, value: string) => void;
  onReset: () => void;
}

export const UiFilters: React.FC<UiFiltersProps> = ({ filters, onChange, onReset }) => {
  return (
    <div className="flex flex-wrap items-end bgcolor px-4 py-3 mb-3 gap-3">
      {/* 1. Country */}
      <div className="flex flex-col">
        <label className="droplabel text-[13px] text-gray-700 font-normal mb-1">
          Country
        </label>
        <div className="relative w-[190px]">
          <select
            value={filters.country}
            onChange={(e) => onChange('country', e.target.value)}
            className="w-full h-[34px] px-2.5 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#C7D2FE] appearance-none cursor-pointer"
          >
            {COUNTRIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 2. Region */}
      <div className="flex flex-col">
        <label className="droplabel text-[13px] text-gray-700 font-normal mb-1">
          Region
        </label>
        <div className="relative w-[190px]">
          <select
            value={filters.region}
            onChange={(e) => onChange('region', e.target.value)}
            className="w-full h-[34px] px-2.5 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#C7D2FE] appearance-none cursor-pointer"
          >
            {REGIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 3. Project */}
      <div className="flex flex-col">
        <label className="droplabel text-[13px] text-gray-700 font-normal mb-1">
          Project
        </label>
        <div className="relative w-[190px]">
          <select
            value={filters.project}
            onChange={(e) => onChange('project', e.target.value)}
            className="w-full h-[34px] px-2.5 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#C7D2FE] appearance-none cursor-pointer"
          >
            {PROJECTS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 4. City */}
      <div className="flex flex-col">
        <label className="droplabel text-[13px] text-gray-700 font-normal mb-1">
          City
        </label>
        <div className="relative w-[190px]">
          <select
            value={filters.city}
            onChange={(e) => onChange('city', e.target.value)}
            className="w-full h-[34px] px-2.5 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#C7D2FE] appearance-none cursor-pointer"
          >
            {CITIES.map((city) => (
              <option key={city.id} value={city.id}>
                {city.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 5. Currency */}
      <div className="flex flex-col">
        <label className="droplabel text-[13px] text-gray-700 font-normal mb-1">
          Currency
        </label>
        <div className="relative w-[120px]">
          <select
            value={filters.currency}
            onChange={(e) => onChange('currency', e.target.value)}
            className="w-full h-[34px] px-2.5 pr-8 bg-white border border-gray-300 rounded text-sm text-gray-700 focus:outline-none focus:border-[#6366F1] focus:ring-1 focus:ring-[#C7D2FE] appearance-none cursor-pointer"
          >
            {CURRENCIES.map((cur) => (
              <option key={cur.id} value={cur.id}>
                {cur.name}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <ChevronDown className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>

      {/* 6. Reset button */}
      <div className="pb-0.5">
        <button
          type="button"
          onClick={onReset}
          className="clearbtnuifilter flex items-center justify-center transition-colors cursor-pointer select-none"
        >
          Reset
        </button>
      </div>
    </div>
  );
};
