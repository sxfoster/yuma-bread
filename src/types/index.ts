import type { LucideIcon } from 'lucide-react';

export interface BreadFlavor {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  imageHint: string;
  Icon?: LucideIcon | React.ElementType; // Allow LucideIcon or custom SVG component
  price: number;
}

export interface CartItem {
  bread: BreadFlavor;
  quantity: number;
}
