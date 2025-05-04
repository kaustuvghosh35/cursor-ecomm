import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

interface CartItem {
  productId: string;
  quantity: number;
  product: {
    _id: string;
    title: string;
    image: string;
    price: number;
  };
}

interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.component.html',
  styles: []
})
export class CartComponent implements OnInit {
  cart: Cart | null = null;
  loading = true;
  
  constructor(private cartService: CartService) {}
  
  ngOnInit(): void {
    this.loadCart();
  }
  
  loadCart(): void {
    this.loading = true;
    this.cartService.getCart().subscribe({
      next: (cart) => {
        this.cart = cart;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading cart', error);
        this.loading = false;
      }
    });
  }
  
  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) return;
    
    this.cartService.updateCartItem(productId, quantity).subscribe({
      next: (cart) => {
        this.cart = cart;
      },
      error: (error) => {
        console.error('Error updating quantity', error);
      }
    });
  }
  
  removeItem(productId: string): void {
    this.cartService.removeFromCart(productId).subscribe({
      next: (cart) => {
        this.cart = cart;
      },
      error: (error) => {
        console.error('Error removing item', error);
      }
    });
  }
} 