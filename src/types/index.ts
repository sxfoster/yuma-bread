export interface BreadFlavor {
  id: string;
  name: string;
  description: string;
  imageSrc: string;
  imageHint: string;
  price: number;
}

export interface CartItem {
  bread: BreadFlavor;
  quantity: number;
}
