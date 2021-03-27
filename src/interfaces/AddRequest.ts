export interface AddToCartRequest {
  quantity: number;
  extras?: string;

  price: string;
  slug: string;
}
