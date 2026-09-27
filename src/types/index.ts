export interface PromotionItem {
  id: number;
  city: string;
  country: string;
  region: string;
  project: string;
  title: string;
  promotionName: string;
  key: string;
  valueAmt: number;
  currency: string;
  startDateTime: string;
  endDateTime: string;
}

export interface FilterState {
  country: string;
  region: string;
  project: string;
  city: string;
  currency: string;
  search: string;
}

export type SortField = 'id' | 'city' | 'title' | 'promotionName' | 'key' | 'valueAmt' | 'startDateTime' | 'endDateTime';
export type SortOrder = 'asc' | 'desc';

export interface ToastMessage {
  id: string;
  severity: 'success' | 'info' | 'warn' | 'error';
  summary: string;
  detail: string;
}

export type PromotionSubmenuId =
  | 'promotion-dashboard'
  | 'maintenance-promotions'
  | 'user-retention-summary'
  | 'influencer-promotion'
  | 'appsflyer'
  | 'promotion-types';
