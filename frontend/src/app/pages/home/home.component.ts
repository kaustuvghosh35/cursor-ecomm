import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../shared/models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredProducts: Product[] = [];
  categories: string[] = [];
  loading = true;
  error = false;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getProducts(1, 8, undefined, undefined, undefined, 'popularity:desc')
      .subscribe({
        next: (response) => {
          this.featuredProducts = response.products;
          this.extractCategories();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading products', error);
          this.error = true;
          this.loading = false;
        }
      });
  }

  private extractCategories(): void {
    const categoriesSet = new Set<string>();
    this.featuredProducts.forEach(product => {
      if (product.category) {
        categoriesSet.add(product.category);
      }
    });
    this.categories = Array.from(categoriesSet);
  }
} 