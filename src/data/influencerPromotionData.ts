export interface InfluencerPromotionItem {
  id: number;
  referralCode: string;
  fullName: string;
  phone: string;
  registerCity: string;
  hasCompletedOrder: 'Yes' | 'No';
  totalUsers: number;
  completedUsers: number;
  totalAmountSar: number;
}

export const INFLUENCER_PROMOTION_DATA: InfluencerPromotionItem[] = [
  {
    id: 1,
    referralCode: 'SS1',
    fullName: 'احمد',
    phone: '552209877',
    registerCity: 'Sakaka',
    hasCompletedOrder: 'Yes',
    totalUsers: 53,
    completedUsers: 5,
    totalAmountSar: 35,
  },
  {
    id: 2,
    referralCode: 'SS2',
    fullName: 'zaid',
    phone: '536098980',
    registerCity: 'Sakaka',
    hasCompletedOrder: 'Yes',
    totalUsers: 17,
    completedUsers: 9,
    totalAmountSar: 45,
  },
  {
    id: 3,
    referralCode: 'SS3',
    fullName: 'على',
    phone: '541217787',
    registerCity: 'Al-Qatif',
    hasCompletedOrder: 'No',
    totalUsers: 10,
    completedUsers: 3,
    totalAmountSar: 15,
  },
  {
    id: 4,
    referralCode: 'SS4',
    fullName: 'زهراء',
    phone: '503726801',
    registerCity: 'Al-Qatif',
    hasCompletedOrder: 'No',
    totalUsers: 24,
    completedUsers: 5,
    totalAmountSar: 35,
  },
  {
    id: 5,
    referralCode: 'SS5',
    fullName: 'حامد',
    phone: '502990022',
    registerCity: 'Sakaka',
    hasCompletedOrder: 'Yes',
    totalUsers: 6,
    completedUsers: 2,
    totalAmountSar: 20,
  },
  {
    id: 6,
    referralCode: 'SS6',
    fullName: 'مراد',
    phone: '530076061',
    registerCity: 'Bqaiq',
    hasCompletedOrder: 'Yes',
    totalUsers: 25,
    completedUsers: 3,
    totalAmountSar: 30,
  },
  {
    id: 7,
    referralCode: 'SS7',
    fullName: 'دينا',
    phone: '530145983',
    registerCity: 'Sakaka',
    hasCompletedOrder: 'Yes',
    totalUsers: 57,
    completedUsers: 23,
    totalAmountSar: 230,
  },
  {
    id: 8,
    referralCode: 'SS8',
    fullName: 'معالى',
    phone: '534525032',
    registerCity: 'Al-Qatif',
    hasCompletedOrder: 'Yes',
    totalUsers: 780,
    completedUsers: 292,
    totalAmountSar: 2920,
  },
  {
    id: 9,
    referralCode: 'SS9',
    fullName: 'مهند',
    phone: '549600777',
    registerCity: 'Sakaka',
    hasCompletedOrder: 'Yes',
    totalUsers: 3,
    completedUsers: 1,
    totalAmountSar: 10,
  },
];
