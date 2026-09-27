export interface MaintenancePromotionItem {
  id: number;
  sNo: number;
  campaignTitle: string;
  category: 'Sign Up' | 'Referral' | 'Order';
  startDateTime: string;
  endDateTime: string;
  status: 'Active' | 'Expired' | 'Scheduled';
}

export const MAINTENANCE_PROMOTIONS_DATA: MaintenancePromotionItem[] = [
  {
    id: 1,
    sNo: 1,
    campaignTitle: 'National Day 2024',
    category: 'Order',
    startDateTime: '20-Sep-2024 08:00:00',
    endDateTime: '25-Sep-2024 23:59:59',
    status: 'Expired',
  },
  {
    id: 2,
    sNo: 2,
    campaignTitle: 'Oct–Nov Promotion: 1st Order',
    category: 'Order',
    startDateTime: '01-Oct-2024 00:00:00',
    endDateTime: '30-Nov-2024 23:59:59',
    status: 'Expired',
  },
  {
    id: 3,
    sNo: 3,
    campaignTitle: 'Oct–Nov Promotion: 2nd Order',
    category: 'Order',
    startDateTime: '01-Oct-2024 00:00:00',
    endDateTime: '30-Nov-2024 23:59:59',
    status: 'Expired',
  },
  {
    id: 4,
    sNo: 4,
    campaignTitle: 'Oct–Nov Promotion: 3rd Order',
    category: 'Order',
    startDateTime: '01-Oct-2024 00:00:00',
    endDateTime: '30-Nov-2024 23:59:59',
    status: 'Expired',
  },
  {
    id: 5,
    sNo: 5,
    campaignTitle: 'Oct–Nov Promotion: 4th Order',
    category: 'Order',
    startDateTime: '01-Oct-2024 00:00:00',
    endDateTime: '30-Nov-2024 23:59:59',
    status: 'Expired',
  },
  {
    id: 6,
    sNo: 6,
    campaignTitle: 'Referral Reward Point',
    category: 'Referral',
    startDateTime: '01-Jan-2026 00:00:00',
    endDateTime: '31-Dec-2026 23:59:59',
    status: 'Active',
  },
  {
    id: 7,
    sNo: 7,
    campaignTitle: 'Referral Reward Point',
    category: 'Referral',
    startDateTime: '01-Jul-2026 00:00:00',
    endDateTime: '31-Dec-2026 23:59:59',
    status: 'Active',
  },
  {
    id: 8,
    sNo: 8,
    campaignTitle: 'Sign Up Bonus',
    category: 'Sign Up',
    startDateTime: '01-Jan-2027 00:00:00',
    endDateTime: '31-Dec-2027 23:59:59',
    status: 'Scheduled',
  },
];
