export interface Product {
  category: string;
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  discountPrice?: number;
  sale?: boolean
}

