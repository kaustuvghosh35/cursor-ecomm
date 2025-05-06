import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product.service';
import { Product } from '../../shared/models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, ProductCardComponent],
  template: `
    <div class="container mx-auto px-4 py-8">
      <div class="flex flex-col md:flex-row">
        <!-- Filters Sidebar -->
        <div class="w-full md:w-64 md:mr-8 mb-6 md:mb-0 sticky top-4 self-start">
          <div class="bg-white rounded-xl shadow-md p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-800">Filters</h2>
            
            <!-- Category Filter -->
            <div class="mb-6">
              <h3 class="font-medium mb-2 text-gray-700">Category</h3>
              <div class="space-y-2">
                <div *ngFor="let cat of availableCategories" class="flex items-center">
                  <input 
                    type="checkbox" 
                    [id]="'cat-' + cat" 
                    [checked]="isFilterSelected('category', cat)"
                    (change)="toggleCategoryFilter(cat)"
                    class="h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500">
                  <label [for]="'cat-' + cat" class="ml-2 text-sm text-gray-700 capitalize">{{ cat }}</label>
                </div>
              </div>
            </div>
            
            <!-- Price Range -->
            <div class="mb-6">
              <h3 class="font-medium mb-2 text-gray-700">Price Range</h3>
              <div class="flex flex-col space-y-2">
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <label for="min-price" class="block text-xs text-gray-500">Min ($)</label>
                    <input 
                      type="number" 
                      id="min-price" 
                      [(ngModel)]="filters.minPrice" 
                      (change)="applyFilters()"
                      class="w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500">
                  </div>
                  <div>
                    <label for="max-price" class="block text-xs text-gray-500">Max ($)</label>
                    <input 
                      type="number" 
                      id="max-price" 
                      [(ngModel)]="filters.maxPrice" 
                      (change)="applyFilters()"
                      class="w-full p-2 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-emerald-500">
                  </div>
                </div>
              </div>
            </div>
            
            <!-- Rating Filter -->
            <div class="mb-6">
              <h3 class="font-medium mb-2 text-gray-700">Rating</h3>
              <div class="space-y-2">
                <div *ngFor="let rating of [4, 3, 2, 1]" class="flex items-center">
                  <input 
                    type="radio" 
                    [id]="'rating-' + rating" 
                    name="rating" 
                    [checked]="filters.minRating === rating"
                    (change)="setRatingFilter(rating)"
                    class="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-500">
                  <label [for]="'rating-' + rating" class="ml-2 text-sm text-gray-700 flex items-center">
                    <span>{{ rating }}+ </span>
                    <svg *ngFor="let i of [].constructor(rating)" class="h-4 w-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="radio" 
                    id="rating-all" 
                    name="rating" 
                    [checked]="filters.minRating === 0"
                    (change)="setRatingFilter(0)"
                    class="h-4 w-4 text-emerald-600 border-gray-300 focus:ring-emerald-500">
                  <label for="rating-all" class="ml-2 text-sm text-gray-700">All Ratings</label>
                </div>
              </div>
            </div>
            
            <!-- Availability Filter -->
            <div class="mb-6">
              <h3 class="font-medium mb-2 text-gray-700">Availability</h3>
              <div class="flex items-center">
                <input 
                  type="checkbox" 
                  id="in-stock" 
                  [checked]="filters.inStock"
                  (change)="toggleStockFilter()"
                  class="h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500">
                <label for="in-stock" class="ml-2 text-sm text-gray-700">In Stock Only</label>
              </div>
            </div>
            
            <!-- Special Offers -->
            <div class="mb-6">
              <h3 class="font-medium mb-2 text-gray-700">Special Offers</h3>
              <div class="space-y-2">
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="on-sale" 
                    [checked]="filters.onSale"
                    (change)="toggleSaleFilter()"
                    class="h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500">
                  <label for="on-sale" class="ml-2 text-sm text-gray-700">On Sale</label>
                </div>
                <div class="flex items-center">
                  <input 
                    type="checkbox" 
                    id="featured"
                    [checked]="filters.featured"
                    (change)="toggleFeaturedFilter()"
                    class="h-4 w-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500">
                  <label for="featured" class="ml-2 text-sm text-gray-700">Featured Items</label>
                </div>
              </div>
            </div>
            
            <!-- Clear Filters Button -->
            <button 
              (click)="clearFilters()" 
              class="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-lg transition">
              Clear All Filters
            </button>
          </div>
        </div>
        
        <!-- Product List -->
        <div class="flex-1">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-gray-800">{{ categoryTitle }}</h1>
            
            <!-- Sort Options -->
            <div class="flex items-center space-x-2">
              <label for="sort" class="text-sm font-medium text-gray-700">Sort by:</label>
              <select 
                id="sort" 
                [(ngModel)]="sortOption" 
                (change)="applySort()"
                class="text-sm border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-emerald-500 p-2">
                <option value="price:asc">Price: Low to High</option>
                <option value="price:desc">Price: High to Low</option>
                <option value="ratings:desc">Highest Rated</option>
                <option value="newest">Newest First</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>
          </div>
          
          <!-- Loading & Error States -->
          <div *ngIf="loading" class="flex justify-center my-8">
            <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-600"></div>
          </div>
          
          <div *ngIf="error" class="bg-red-100 text-red-700 p-4 rounded-lg mb-8">
            <p>Sorry, we couldn't load the products. Please try again later.</p>
          </div>
          
          <!-- Active Filters -->
          <div *ngIf="!loading && hasActiveFilters()" class="mb-6 flex flex-wrap gap-2">
            <span class="text-sm text-gray-600 py-1">Active filters:</span>
            
            <div *ngFor="let cat of filters.categories" class="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full flex items-center">
              <span class="capitalize">{{ cat }}</span>
              <button (click)="removeCategoryFilter(cat)" class="ml-1 focus:outline-none">
                <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div *ngIf="filters.minPrice !== null || filters.maxPrice !== null" class="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full flex items-center">
              <span>Price: {{ filters.minPrice !== null ? '$' + filters.minPrice : '$0' }} - {{ filters.maxPrice !== null ? '$' + filters.maxPrice : '+' }}</span>
              <button (click)="clearPriceFilter()" class="ml-1 focus:outline-none">
                <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div *ngIf="filters.minRating > 0" class="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full flex items-center">
              <span>{{ filters.minRating }}+ Stars</span>
              <button (click)="setRatingFilter(0)" class="ml-1 focus:outline-none">
                <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div *ngIf="filters.inStock" class="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full flex items-center">
              <span>In Stock</span>
              <button (click)="toggleStockFilter()" class="ml-1 focus:outline-none">
                <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div *ngIf="filters.onSale" class="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full flex items-center">
              <span>On Sale</span>
              <button (click)="toggleSaleFilter()" class="ml-1 focus:outline-none">
                <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
            
            <div *ngIf="filters.featured" class="bg-emerald-100 text-emerald-800 text-xs px-3 py-1 rounded-full flex items-center">
              <span>Featured</span>
              <button (click)="toggleFeaturedFilter()" class="ml-1 focus:outline-none">
                <svg class="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
          
          <!-- Product Grid -->
          <div *ngIf="!loading && !error">
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div *ngFor="let product of filteredProducts">
                <app-product-card [product]="product"></app-product-card>
              </div>
            </div>
            
            <div *ngIf="filteredProducts.length === 0" class="text-center py-12 bg-white rounded-xl shadow-md mt-6">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p class="text-lg text-gray-600 mb-2">No products found</p>
              <p class="text-gray-500">Try adjusting your filters or check back later for new items.</p>
              <button (click)="clearFilters()" class="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition">
                Clear Filters
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  availableCategories: string[] = [];
  categoryTitle: string = 'All Products';
  loading = true;
  error = false;
  
  // Sorting
  sortOption: string = 'popularity';
  
  // Filters
  filters = {
    categories: [] as string[],
    minPrice: null as number | null,
    maxPrice: null as number | null,
    minRating: 0,
    inStock: false,
    onSale: false,
    featured: false
  };
  
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.initializeFiltersFromParams(params);
      this.loadProducts();
    });
  }
  
  initializeFiltersFromParams(params: any): void {
    // Reset filters
    this.filters = {
      categories: [],
      minPrice: null,
      maxPrice: null,
      minRating: 0,
      inStock: false,
      onSale: false,
      featured: false
    };
    
    // Set category filter from URL params
    if (params['category']) {
      const category = params['category'];
      this.filters.categories = [category];
      this.categoryTitle = category.charAt(0).toUpperCase() + category.slice(1);
    } else {
      this.categoryTitle = 'All Products';
    }
    
    // Set other filters from URL params
    if (params['minPrice']) this.filters.minPrice = Number(params['minPrice']);
    if (params['maxPrice']) this.filters.maxPrice = Number(params['maxPrice']);
    if (params['minRating']) this.filters.minRating = Number(params['minRating']);
    if (params['inStock']) this.filters.inStock = params['inStock'] === 'true';
    if (params['onSale']) this.filters.onSale = params['onSale'] === 'true';
    if (params['featured']) this.filters.featured = params['featured'] === 'true';
    if (params['sort']) this.sortOption = params['sort'];
  }
  
  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts()
      .subscribe({
        next: (response) => {
          this.products = response.products;
          
          // Extract unique categories
          const categorySet = new Set<string>();
          this.products.forEach(product => {
            if (product.category) {
              categorySet.add(product.category);
            }
          });
          this.availableCategories = Array.from(categorySet);
          
          // Apply filters
          this.applyFilters();
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading products', error);
          this.error = true;
          this.loading = false;
        }
      });
  }
  
  // Filter methods
  applyFilters(): void {
    let filtered = [...this.products];
    
    // Filter by category
    if (this.filters.categories.length > 0) {
      filtered = filtered.filter(product => 
        this.filters.categories.includes(product.category)
      );
    }
    
    // Filter by price
    if (this.filters.minPrice !== null) {
      filtered = filtered.filter(product => product.price >= (this.filters.minPrice || 0));
    }
    
    if (this.filters.maxPrice !== null) {
      filtered = filtered.filter(product => product.price <= (this.filters.maxPrice || Infinity));
    }
    
    // Filter by rating
    if (this.filters.minRating > 0) {
      filtered = filtered.filter(product => product.ratings >= this.filters.minRating);
    }
    
    // Filter by stock
    if (this.filters.inStock) {
      filtered = filtered.filter(product => product.stock > 0);
    }
    
    // Filter by sale
    if (this.filters.onSale) {
      filtered = filtered.filter(product => product.onSale);
    }
    
    // Filter by featured
    if (this.filters.featured) {
      filtered = filtered.filter(product => product.featured);
    }
    
    // Apply sorting
    this.applySorting(filtered);
    
    this.filteredProducts = filtered;
    this.updateQueryParams();
  }
  
  applySorting(products: Product[]): void {
    switch (this.sortOption) {
      case 'price:asc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'price:desc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'ratings:desc':
        products.sort((a, b) => b.ratings - a.ratings);
        break;
      case 'newest':
        // Assuming there's a createdAt field or similar
        // products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popularity':
      default:
        // Keep default sorting (could be based on number of reviews or views)
        break;
    }
  }
  
  applySort(): void {
    this.applyFilters();
  }
  
  // Helper methods for UI interaction
  toggleCategoryFilter(category: string): void {
    const index = this.filters.categories.indexOf(category);
    if (index === -1) {
      this.filters.categories.push(category);
    } else {
      this.filters.categories.splice(index, 1);
    }
    this.applyFilters();
  }
  
  removeCategoryFilter(category: string): void {
    const index = this.filters.categories.indexOf(category);
    if (index !== -1) {
      this.filters.categories.splice(index, 1);
      this.applyFilters();
    }
  }
  
  setRatingFilter(rating: number): void {
    this.filters.minRating = rating;
    this.applyFilters();
  }
  
  toggleStockFilter(): void {
    this.filters.inStock = !this.filters.inStock;
    this.applyFilters();
  }
  
  toggleSaleFilter(): void {
    this.filters.onSale = !this.filters.onSale;
    this.applyFilters();
  }
  
  toggleFeaturedFilter(): void {
    this.filters.featured = !this.filters.featured;
    this.applyFilters();
  }
  
  clearPriceFilter(): void {
    this.filters.minPrice = null;
    this.filters.maxPrice = null;
    this.applyFilters();
  }
  
  clearFilters(): void {
    this.filters = {
      categories: [],
      minPrice: null,
      maxPrice: null,
      minRating: 0,
      inStock: false,
      onSale: false,
      featured: false
    };
    this.sortOption = 'popularity';
    this.applyFilters();
  }
  
  isFilterSelected(type: string, value: any): boolean {
    switch (type) {
      case 'category':
        return this.filters.categories.includes(value);
      case 'rating':
        return this.filters.minRating === value;
      default:
        return false;
    }
  }
  
  hasActiveFilters(): boolean {
    return this.filters.categories.length > 0 || 
           this.filters.minPrice !== null || 
           this.filters.maxPrice !== null || 
           this.filters.minRating > 0 || 
           this.filters.inStock || 
           this.filters.onSale ||
           this.filters.featured;
  }
  
  // Update URL with filter params
  private updateQueryParams(): void {
    const queryParams: any = {};
    
    if (this.filters.categories.length === 1) {
      queryParams.category = this.filters.categories[0];
    }
    
    if (this.filters.minPrice !== null) queryParams.minPrice = this.filters.minPrice;
    if (this.filters.maxPrice !== null) queryParams.maxPrice = this.filters.maxPrice;
    if (this.filters.minRating > 0) queryParams.minRating = this.filters.minRating;
    if (this.filters.inStock) queryParams.inStock = true;
    if (this.filters.onSale) queryParams.onSale = true;
    if (this.filters.featured) queryParams.featured = true;
    if (this.sortOption !== 'popularity') queryParams.sort = this.sortOption;
    
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge'
    });
  }
} 