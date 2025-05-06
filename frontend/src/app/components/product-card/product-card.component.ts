import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Product } from '../../shared/models/product.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product?: Product;
  @Output() quickView = new EventEmitter<Product>();
  
  constructor(
    private cartService: CartService,
    private router: Router
  ) {}
  
  getOriginalPrice(): string {
    if (this.product && this.product.price && this.product.discount) {
      const originalPrice = this.product.price + (this.product.price * this.product.discount / 100);
      return originalPrice.toFixed(2);
    }
    return '0.00';
  }
  
  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.product && this.product.stock > 0) {
      this.cartService.addToCart(this.product._id).subscribe({
        next: (response) => {
          alert('Product added to cart successfully!');
        },
        error: (error) => {
          if (error.status === 401) {
            alert('Please log in to add items to cart');
            this.router.navigate(['/login']);
          } else {
            alert('Failed to add product to cart. Please try again.');
          }
          console.error('Error adding to cart:', error);
        }
      });
    }
  }
  
  onQuickView(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    if (this.product) {
      this.quickView.emit(this.product);
      this.router.navigate(['/products', this.product._id]);
    }
  }
} 