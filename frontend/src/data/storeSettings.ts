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
};
