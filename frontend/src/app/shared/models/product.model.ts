export interface Review {
  userId: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  stock: number;
  ratings: number;
  reviews: Review[];
  featured?: boolean;
  isNew?: boolean;
  onSale?: boolean;
  discount?: number;
} 