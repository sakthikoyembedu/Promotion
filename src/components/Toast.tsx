import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-[60px] right-5 z-[9999] flex flex-col gap-2 pointer-events-none w-[340px]">
      {toasts.map((toast) => {
        let borderClass = 'border-emerald-500 bg-white text-emerald-900';
        let IconComponent = CheckCircle2;
        let iconColor = 'text-emerald-500';

        if (toast.severity === 'error') {
          borderClass = 'border-rose-500 bg-white text-rose-900';
          IconComponent = AlertCircle;
          iconColor = 'text-rose-500';
        } else if (toast.severity === 'warn') {
          borderClass = 'border-amber-500 bg-white text-amber-900';
          IconComponent = AlertCircle;
          iconColor = 'text-amber-500';
        } else if (toast.severity === 'info') {
          borderClass = 'border-blue-500 bg-white text-blue-900';
          IconComponent = Info;
          iconColor = 'text-blue-500';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-lg border-l-4 shadow-lg text-sm transition-all duration-200 animate-in fade-in slide-in-from-top-3 ${borderClass}`}
            role="alert"
          >
            <IconComponent className={`w-5 h-5 shrink-0 ${iconColor} mt-0.5`} />
            <div className="flex-1">
              <h6 className="font-semibold text-gray-900 text-xs">{toast.summary}</h6>
              <p className="text-gray-600 text-xs mt-0.5 leading-relaxed">{toast.detail}</p>
            </div>
            <button
              onClick={() => onDismiss(toast.id)}
              className="text-gray-400 hover:text-gray-600 p-0.5 rounded cursor-pointer transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
