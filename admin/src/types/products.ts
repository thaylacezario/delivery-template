export type ProductFilterStatus = "all" | "active" | "inactive";

export interface AdminProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  active: boolean;
  imageUrl: string;
}
