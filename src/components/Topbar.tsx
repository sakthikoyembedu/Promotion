import React, { useState } from 'react';
import { Menu, User, ChevronDown, CheckCircle, ShieldCheck, LogOut, Bell } from 'lucide-react';

interface TopbarProps {
  onToggleSidebar: () => void;
  onShowToast: (summary: string, detail: string, severity?: 'success' | 'info' | 'warn' | 'error') => void;
}

export const Topbar: React.FC<TopbarProps> = ({ onToggleSidebar, onShowToast }) => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 h-[50px] bg-[#010915] text-white flex items-center justify-between px-4 z-50 border-b border-white/10 shadow-md">
      {/* Left: Sidebar toggle button and logo */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="text-white/80 hover:text-white hover:bg-white/10 p-1.5 rounded-md transition-colors flex items-center justify-center cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {/* Logo Brand Icon */}
          <div className="w-7 h-7 rounded bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center shadow-inner">
            <svg viewBox="0 0 24 24" className="w-4 h-4 text-white fill-current">
              <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91V5l-8-3zm1 14.5h-2v-2h2v2zm0-4h-2V7h2v5.5z"/>
            </svg>
          </div>
          <span className="professional-title text-base font-semibold tracking-wide select-none">
            BACK OFFICE - Super Executive
          </span>
        </div>
      </div>

      {/* Right: User info badge & profile button */}
      <div className="flex items-center gap-3 relative">
        <div className="hidden sm:flex items-center gap-1.5 bg-white/10 hover:bg-white/15 px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer transition-colors border border-white/5">
          <User className="w-3.5 h-3.5 text-amber-400" />
          <strong className="text-white font-semibold">Super Executive</strong>
        </div>

        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white/90 hover:text-white transition-all cursor-pointer"
            title="Profile details"
          >
            <User className="w-4 h-4" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-1.5 z-50 text-gray-800 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3.5 py-2.5 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-900">Super Executive</p>
                <p className="text-[11px] text-gray-500 truncate">executive@smartsortsupport.com</p>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Authorized Administrator</span>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onShowToast('Session Active', 'You are logged in with Super Executive privileges.', 'info');
                  }}
                  className="w-full text-left px-3.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                >
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Account Status: Active</span>
                </button>
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onShowToast('Notifications', 'No pending promotion anomaly approvals.', 'info');
                  }}
                  className="w-full text-left px-3.5 py-1.5 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                >
                  <Bell className="w-3.5 h-3.5 text-gray-400" />
                  <span>Alerts & Notifications</span>
                </button>
              </div>

              <div className="border-t border-gray-100 pt-1">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onShowToast('Demo Mode', 'Logout is disabled in demonstration view.', 'warn');
                  }}
                  className="w-full text-left px-3.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2 cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
