export type SidebarMenuItem = {
  id: string;
  label: string;
};

export type DashboardStat = {
  id: string;
  label: string;
  value: string;
};

export type RecentOrder = {
  orderNumber: string;
  customer: string;
  amount: string;
  status: string;
  time: string;
};
