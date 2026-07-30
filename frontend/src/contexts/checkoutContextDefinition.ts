import { createContext } from "react";
import type { FulfillmentType } from "../types/checkout";

export interface CheckoutDraft {
    fulfillmentType: FulfillmentType;
    name: string;
    phone: string;
    zipCode: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    reference: string;
    selectedPaymentId: string;
    needsChange: boolean | null;
    changeFor: string;
}

export interface CheckoutContextValue {
    draft: CheckoutDraft;
    updateDraft: (updates: Partial<CheckoutDraft>) => void;
    clearDraft: () => void;
}

export const initialDraft: CheckoutDraft = {
    fulfillmentType: "delivery",
    name: "",
    phone: "",
    zipCode: "",
    street: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",
    reference: "",
    selectedPaymentId: "",
    needsChange: null,
    changeFor: "",
};

export const CheckoutContext = createContext<CheckoutContextValue | undefined>(undefined);