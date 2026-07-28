import type { Product } from "../types/Product";

export const products: Product[] = [
    {
        id: 1,
        name: "X-Bacon",
        description: "Hambúrguer artesanal com bacon e cheddar.",
        price: 32.9,
        image: "https://placehold.co/600x400",
        category: "Hambúrgueres",
    },
    {
        id: 2,
        name: "X-Salada",
        description: "Hambúrguer artesanal com alface e tomate.",
        price: 29.9,
        image: "https://placehold.co/600x400",
        category: "Hambúrgueres",
    },
    {
        id: 3,
        name: "Batata Frita",
        description: "Porção de batatas crocantes.",
        price: 18.9,
        image: "https://placehold.co/600x400",
        category: "Porções",
    },
];