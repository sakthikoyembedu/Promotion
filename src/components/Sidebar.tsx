import React from 'react';
import {
  Home,
  Network,
  AlignLeft,
  User,
  RefreshCw,
  UserCheck,
  ShoppingCart,
  Award,
  Wallet,
  LayoutGrid,
  Tag,
  ArrowUpCircle,
  MapPin,
  Users,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
  Wrench,
  Sparkles,
  Share2,
  Smartphone,
} from 'lucide-react';
import { PromotionSubmenuId } from '../types';

interface SidebarProps {
  isOpen: boolean;
  activeSubmenu: PromotionSubmenuId;
  onSelectSubmenu: (id: PromotionSubmenuId) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  activeSubmenu,
  onSelectSubmenu,
}) => {
  const [isPromotionMenuOpen, setIsPromotionMenuOpen] = React.useState(true);

  const submenus: Array<{
    id: PromotionSubmenuId;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
  }> = [
    {
      id: 'promotion-dashboard',
      label: 'Promotion Dashboard',
      icon: LayoutGrid,
    },
    {
      id: 'maintenance-promotions',
      label: 'Maintenance Promotions',
      icon: Wrench,
    },
    {
      id: 'user-retention-summary',
      label: 'User Retention Summary',
      icon: Sparkles,
    },
    {
      id: 'influencer-promotion',
      label: 'Influencer Promotion',
      icon: Share2,
    },
    {
      id: 'appsflyer',
      label: 'Appsflyer',
      icon: Smartphone,
    },
    {
      id: 'promotion-types',
      label: 'Promotion Types',
      icon: Tag,
    },
  ];

  return (
    <aside
      className={`fixed top-[50px] left-0 bottom-0 bg-white border-r border-[#dfe7ef] transition-all duration-300 z-40 overflow-y-auto select-none ${
        isOpen ? 'w-[325px] translate-x-0' : 'w-[325px] -translate-x-full md:translate-x-0'
      }`}
      style={{
        boxShadow:
          '0 3px 5px rgba(0,0,0,0.02), 0 0 2px rgba(0,0,0,0.05), 0 1px 4px rgba(0,0,0,0.08)',
      }}
    >
      <div className="py-2.5 px-2">
        <ul className="space-y-0.5">
          {/* 1. DashBoards (Plain text menu) */}
          <li className="flex items-center justify-between px-3 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50/70 transition-colors">
            <div className="flex items-center gap-2.5">
              <Home className="w-4 h-4 text-[#389472]" />
              <span className="text-[13px] text-gray-700 font-medium">DashBoards</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>

          {/* 2. Dynamic Menu (Plain text menu) */}
          <li className="flex items-center justify-between px-3 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50/70 transition-colors">
            <div className="flex items-center gap-2.5">
              <Network className="w-4 h-4 text-[#389472]" />
              <span className="text-[13px] text-gray-700 font-medium">Dynamic Menu</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>

          {/* 3. Request Management (Plain text menu) */}
          <li className="flex items-center justify-between px-3 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50/70 transition-colors">
            <div className="flex items-center gap-2.5">
              <AlignLeft className="w-4 h-4 text-[#389472]" />
              <span className="text-[13px] text-gray-700 font-medium">Request Management</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>

          {/* 4. User Management (Plain text menu) */}
          <li className="flex items-center justify-between px-3 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50/70 transition-colors">
            <div className="flex items-center gap-2.5">
              <User className="w-4 h-4 text-[#389472]" />
              <span className="text-[13px] text-gray-700 font-medium">User Management</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>

          {/* 5. Collector (Plain text menu) */}
          <li className="flex items-center justify-between px-3 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50/70 transition-colors">
            <div className="flex items-center gap-2.5">
              <RefreshCw className="w-4 h-4 text-[#389472]" />
              <span className="text-[13px] text-gray-700 font-medium">Collector</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>

          {/* 6. Supervisor (Plain text menu) */}
          <li className="flex items-center justify-between px-3 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50/70 transition-colors">
            <div className="flex items-center gap-2.5">
              <UserCheck className="w-4 h-4 text-[#389472]" />
              <span className="text-[13px] text-gray-700 font-medium">Supervisor</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>

          {/* 7. Collection Center (Plain text menu) */}
          <li className="flex items-center justify-between px-3 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50/70 transition-colors">
            <div className="flex items-center gap-2.5">
              <ShoppingCart className="w-4 h-4 text-[#389472]" />
              <span className="text-[13px] text-gray-700 font-medium">Collection Center</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>

          {/* 8. Rewards & Redemptions (Plain text menu) */}
          <li className="flex items-center justify-between px-3 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50/70 transition-colors">
            <div className="flex items-center gap-2.5">
              <Award className="w-4 h-4 text-[#389472]" />
              <span className="text-[13px] text-gray-700 font-medium">Rewards &amp; Redemptions</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>

          {/* 9. Payments & Invoicing (Plain text menu) */}
          <li className="flex items-center justify-between px-3 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50/70 transition-colors">
            <div className="flex items-center gap-2.5">
              <Wallet className="w-4 h-4 text-[#389472]" />
              <span className="text-[13px] text-gray-700 font-medium">Payments &amp; Invoicing</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>

          {/* 10. Promotion Types - ACTIVE EXPANDED MENU WITH SUBMENUS */}
          <li className="pt-0.5">
            <div
              role="button"
              tabIndex={0}
              aria-expanded={isPromotionMenuOpen}
              onClick={() => setIsPromotionMenuOpen(!isPromotionMenuOpen)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsPromotionMenuOpen(!isPromotionMenuOpen);
                }
              }}
              className="flex items-center justify-between px-3 py-2 text-[#1b5e43] font-semibold text-sm rounded-md transition-colors bg-[#38947215] hover:bg-[#38947225] cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <LayoutGrid className="w-4 h-4 text-[#389472]" />
                <span className="text-[13px] text-[#1b5e43] font-semibold">Promotions</span>
              </div>
              <ChevronDown
                className={`w-3.5 h-3.5 text-[#389472] transition-transform duration-200 cursor-pointer hover:scale-125 ${
                  isPromotionMenuOpen ? 'rotate-0' : '-rotate-90'
                }`}
              />
            </div>

            {/* Submenus under Promotion Types */}
            {isPromotionMenuOpen && (
              <ul className="pl-3 pr-1 mt-1 ml-3 border-l-2 border-[#389472] space-y-1 animate-in fade-in slide-in-from-top-1 duration-150">
                {submenus.map((item) => {
                  const IconComponent = item.icon;
                  const isSelected = activeSubmenu === item.id;

                  return (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => onSelectSubmenu(item.id)}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-[13px] text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#c0e3d5] text-[#0a3826] font-semibold shadow-xs'
                            : 'text-[#1c3830] hover:bg-gray-100/80 font-medium'
                        }`}
                      >
                        <IconComponent
                          className={`w-4 h-4 shrink-0 ${
                            isSelected ? 'text-[#0a3826]' : 'text-[#389472]'
                          }`}
                        />
                        <span className="truncate">{item.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>

          {/* 11. Appsflyer (Plain text menu) */}
          <li className="flex items-center justify-between px-3 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50/70 transition-colors">
            <div className="flex items-center gap-2.5">
              <ArrowUpCircle className="w-4 h-4 text-[#389472]" />
              <span className="text-[13px] text-gray-700 font-medium">Appsflyer</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>

          {/* 12. Maps and Order Location (Plain text menu) */}
          <li className="flex items-center justify-between px-3 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50/70 transition-colors">
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#389472]" />
              <span className="text-[13px] text-gray-700 font-medium">Maps and Order Location</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>

          {/* 13. SOE Reviews & Approvals (Plain text menu) */}
          <li className="flex items-center justify-between px-3 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50/70 transition-colors">
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#389472]" />
              <span className="text-[13px] text-gray-700 font-medium">SOE Reviews &amp; Approvals</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>

          {/* 14. Anomaly (Plain text menu) */}
          <li className="flex items-center justify-between px-3 py-2 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50/70 transition-colors">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-[#389472]" />
              <span className="text-[13px] text-gray-700 font-medium">Anomaly</span>
            </div>
            <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          </li>
        </ul>
      </div>
    </aside>
  );
};
