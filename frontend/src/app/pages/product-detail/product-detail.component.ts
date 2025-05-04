import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../shared/models/product.model';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styles: []
})
export class ProductDetailComponent implements OnInit {
  product: Product = {
    _id: '',
    title: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0,
    ratings: 0,
    reviews: []
  };
  loading = true;
  error = false;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadProduct(id);
      }
    });
  }
  
  loadProduct(id: string): void {
    this.loading = true;
    this.productService.getProduct(id)
      .subscribe({
        next: (product) => {
          this.product = product;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading product', error);
          this.error = true;
          this.loading = false;
        }
      });
  }
  
  addToCart(): void {
    if (this.product && this.product.stock > 0) {
      this.cartService.addToCart(this.product._id)
        .subscribe({
          next: (response) => {
            console.log('Product added to cart', response);
            // You could show a success message here
          },
          error: (error) => {
            console.error('Error adding product to cart', error);
            // You could show an error message here
          }
        });
    }
  }
} 