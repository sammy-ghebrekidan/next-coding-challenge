export interface CartItem {
  name: string;
  quantity: number;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export interface ApiProduct {
  id: number;
  name: { us: string; uk: string };
  price: { usd: number; gbp: number };
  stock: number;
}

export interface ApiProductsResponse {
  success: boolean;
  products: ApiProduct[];
}
