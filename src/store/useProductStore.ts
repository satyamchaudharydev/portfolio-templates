import { create } from 'zustand';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface ProductState {
  products: Product[];
}

export const useProductStore = create<ProductState>(() => ({
  products: [
    {
      id: 1,
      name: 'Professional Summary',
      description: 'A powerful opening statement that captures your professional essence in 3-5 sentences',
      price: 9.99,
      image: '/images/summary.jpg',
    },
    {
      id: 2,
      name: 'Skills Matrix',
      description: 'Interactive skills section with proficiency levels and categorization',
      price: 7.99,
      image: '/images/skills.jpg',
    },
  ],
}));