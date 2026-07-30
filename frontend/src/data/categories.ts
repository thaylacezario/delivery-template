import type { Category } from "../types/Category";

export const categories: Category[] = [
    { id: 1, name: "Combos", slug: "combos", order: 1, active: true, image: "https://placehold.co/64x64?text=Combos" },
    { id: 2, name: "Hambúrgueres", slug: "hamburgueres", order: 2, active: true, icon: "🍔" },
    { id: 3, name: "Pizzas", slug: "pizzas", order: 3, active: true, icon: "🍕" },
    { id: 4, name: "Hot Dogs", slug: "hot-dogs", order: 4, active: false, icon: "🌭" },
    { id: 5, name: "Porções", slug: "porcoes", order: 5, active: true, icon: "🍟" },
    { id: 6, name: "Bebidas", slug: "bebidas", order: 6, active: true, icon: "🥤" },
    { id: 7, name: "Sobremesas", slug: "sobremesas", order: 7, active: false, icon: "🍰" },
    { id: 8, name: "Açaí", slug: "acai", order: 8, active: false, icon: "🥣" },
];
