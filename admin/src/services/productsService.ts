import type { AdminProduct } from "../types/products";

const mockProducts: AdminProduct[] = [
  {
    id: "p1",
    name: "X-Bacon Artesanal",
    description: "Pao brioche, blend 180g, bacon crocante, queijo e molho especial.",
    category: "Hamburgueres",
    price: 34.9,
    active: true,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=480&q=80",
  },
  {
    id: "p2",
    name: "Pizza Margherita",
    description: "Massa de fermentacao lenta, molho de tomate, mussarela e manjericao.",
    category: "Pizzas",
    price: 52.0,
    active: true,
    imageUrl: "https://images.unsplash.com/photo-1548365328-9f547fb0953b?auto=format&fit=crop&w=480&q=80",
  },
  {
    id: "p3",
    name: "Batata Cheddar e Bacon",
    description: "Batata frita crocante coberta com cheddar cremoso e bacon em cubos.",
    category: "Porcoes",
    price: 24.5,
    active: false,
    imageUrl: "https://images.unsplash.com/photo-1630384060421-cb20d0e0649d?auto=format&fit=crop&w=480&q=80",
  },
  {
    id: "p4",
    name: "Acai 500ml",
    description: "Acai cremoso com leite condensado e granola.",
    category: "Acai",
    price: 21.9,
    active: true,
    imageUrl: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=480&q=80",
  },
  {
    id: "p5",
    name: "Refrigerante Lata",
    description: "Bebida gelada para acompanhar o pedido.",
    category: "Bebidas",
    price: 8.0,
    active: true,
    imageUrl: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=480&q=80",
  },
];

export function getMockProducts(): AdminProduct[] {
  return mockProducts;
}

export default getMockProducts;
