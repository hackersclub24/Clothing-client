import type { Product } from "@/types";

export const newArrivals: Product[] = [
  {
    id: "1",
    name: "Atelier Hoodie",
    category: "Knitwear",
    colors: ["Ivory", "Sand", "Stone"],
    price: 340,
    currency: "€",
    slug: "atelier-hoodie",
    image: "/images/product-1-VG3XiYID.jpg.jpeg",
  },
  {
    id: "2",
    name: "Monolith Overcoat",
    category: "Outerwear",
    colors: ["Stone", "Charcoal"],
    price: 1290,
    currency: "€",
    slug: "monolith-overcoat",
    image: "/images/product-4-ZkEInojV.jpg.jpeg",
  },
  {
    id: "3",
    name: "Column Trouser",
    category: "Trousers",
    colors: ["Cream", "Bone"],
    price: 420,
    currency: "€",
    slug: "column-trouser",
    image: "/images/product-3-DaCVC8ez.jpg.jpeg",
  },
  {
    id: "4",
    name: "Brume Cashmere Knit",
    category: "Knitwear",
    colors: ["Sand", "Ivory", "Stone"],
    price: 560,
    currency: "€",
    slug: "brume-cashmere-knit",
    image: "/images/product-2-CKImWcVp.jpg.jpeg",
  },
];

export const trending: Product[] = [
  {
    id: "3",
    name: "Column Trouser",
    category: "Trousers",
    colors: ["Cream", "Bone"],
    price: 420,
    currency: "€",
    slug: "column-trouser",
    image: "/images/product-3-DaCVC8ez.jpg.jpeg",
  },
  {
    id: "4",
    name: "Brume Cashmere Knit",
    category: "Knitwear",
    colors: ["Sand", "Ivory", "Stone"],
    price: 560,
    currency: "€",
    slug: "brume-cashmere-knit",
    image: "/images/product-2-CKImWcVp.jpg.jpeg",
  },
  {
    id: "5",
    name: "Monolith Overcoat II",
    category: "Outerwear",
    colors: ["Bone"],
    price: 1450,
    currency: "€",
    slug: "monolith-overcoat-ii",
    image: "/images/product-4-ZkEInojV.jpg.jpeg",
  },
];

export const bestSellers: Product[] = [...newArrivals];
