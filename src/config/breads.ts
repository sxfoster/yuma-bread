import type { BreadFlavor } from '@/types';

export const BREAD_FLAVORS: BreadFlavor[] = [
  {
    id: 'traditional',
    name: 'Traditional Sourdough',
    description: 'A classic, tangy loaf with a satisfyingly chewy crust and open crumb. Perfect for any occasion.',
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'sourdough bread artisan',
    price: 10,
  },
  {
    id: 'jalapeno-cheddar',
    name: 'Jalapeño Cheddar',
    description: 'A fiery kick of jalapeños perfectly balanced with pockets of sharp, melted cheddar cheese.',
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'jalapeno cheese bread',
    price: 10,
  },
  {
    id: 'rosemary-garlic',
    name: 'Rosemary Garlic Confit',
    description: 'Aromatic rosemary and sweet, mellow garlic confit infused into a rustic, flavorful loaf.',
    imageSrc: 'https://placehold.co/600x400.png',
    imageHint: 'rosemary garlic bread',
    price: 10,
  },
];
