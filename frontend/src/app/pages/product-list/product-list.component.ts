import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../shared/models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-6">{{ categoryTitle }}</h1>
      
      <!-- Loading & Error States -->
      <div *ngIf="loading" class="flex justify-center my-8">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
      
      <div *ngIf="error" class="bg-red-100 text-red-700 p-4 rounded-lg mb-8">
        <p>Sorry, we couldn't load the products. Please try again later.</p>
      </div>
      
      <!-- Product Grid -->
      <div *ngIf="!loading && !error">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <div *ngFor="let product of products">
            <app-product-card [product]="product"></app-product-card>
          </div>
        </div>
        
        <div *ngIf="products.length === 0" class="text-center py-12">
          <p class="text-lg text-gray-600">No products found.</p>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  categoryTitle: string = 'All Products';
  loading = true;
  error = false;
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const category = params['category'];
      if (category) {
        this.categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
        this.loadProducts(category);
      } else {
        this.categoryTitle = 'All Products';
        this.loadProducts();
      }
    });
  }
  
  loadProducts(category?: string): void {
    this.loading = true;
    this.productService.getProducts(1, 20, category)
      .subscribe({
        next: (response) => {
          this.products = response.products;
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading products', error);
          this.error = true;
          this.loading = false;
        }
      });
  }
} 