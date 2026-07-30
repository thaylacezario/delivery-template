export type FulfillmentType = "delivery" | "pickup";

export type PaymentMethodType = "pix" | "cash" | "card";

export interface PaymentMethod {
    id: string;
    name: string;
    enabled: boolean;
    type: PaymentMethodType;
}

export interface Customer {
    name: string;
    phone: string;
}

export interface Address {
    zipCode: string;
    street: string;
    number: string;
    complement?: string;
    neighborhood: string;
    city: string;
    state: string;
    reference?: string;
}

export interface OrderDraftItem {
    productName: string;
    quantity: number;
    additionals: string;
    observation: string;
    unitPrice: number;
    totalPrice: number;
}

export interface OrderDraft {
    customer: Customer;
    fulfillmentType: FulfillmentType;
    deliveryAddress?: Address;
    paymentMethod: PaymentMethod;
    changeFor?: number;
    items: OrderDraftItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    notes?: string;
}