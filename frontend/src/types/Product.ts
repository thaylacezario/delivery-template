export interface Additional {
    id: string;
    name: string;
    price: number;
    maxQuantity?: number;
    active?: boolean;
}

export interface SelectedAdditional {
    additional: Additional;
    quantity: number;
}

export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    categoryId: number;
    order?: number;
    active?: boolean;
    ingredients?: string[];
    additionals?: Additional[];
}