export interface CartItem {
  id: number;
  name: string;
  price: string;
  slug: string;
  extras?: string;
  image: string;
  quantity: number;
}
