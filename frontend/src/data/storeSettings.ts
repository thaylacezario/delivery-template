import type { PaymentMethod } from "../types/checkout";

export type DaySchedule = {
    day: string;
    enabled: boolean;
    openTime: string;
    closeTime: string;
};

export type StoreSettings = {
    name: string;
    address: {
        street: string;
        number: string;
        complement?: string;
        neighborhood: string;
        city: string;
        state: string;
        zipCode: string;
    };
    schedules: DaySchedule[];
    acceptsDelivery: boolean;
    acceptsPickup: boolean;
    deliveryFee: number;
    paymentMethods: PaymentMethod[];
};

export const storeSettings: StoreSettings = {
    name: "Delivery Template",
    address: {
        street: "Rua das Flores",
        number: "120",
        complement: "Sala 1",
        neighborhood: "Centro",
        city: "São Paulo",
        state: "SP",
        zipCode: "01000-000",
    },
    schedules: [
        { day: "Segunda", enabled: true, openTime: "18:00", closeTime: "23:00" },
        { day: "Terça", enabled: true, openTime: "18:00", closeTime: "23:00" },
        { day: "Quarta", enabled: false, openTime: "00:00", closeTime: "00:00" },
        { day: "Quinta", enabled: true, openTime: "18:00", closeTime: "23:00" },
        { day: "Sexta", enabled: true, openTime: "18:00", closeTime: "00:00" },
        { day: "Sábado", enabled: true, openTime: "18:00", closeTime: "00:00" },
        { day: "Domingo", enabled: true, openTime: "18:00", closeTime: "23:00" },
    ],
    acceptsDelivery: true,
    acceptsPickup: true,
    deliveryFee: 5.0,
    paymentMethods: [
        { id: "pix", name: "PIX", enabled: true, type: "pix" },
        { id: "cash", name: "Dinheiro", enabled: true, type: "cash" },
        { id: "card", name: "Cartão de crédito/débito", enabled: true, type: "card" },
    ],
};
