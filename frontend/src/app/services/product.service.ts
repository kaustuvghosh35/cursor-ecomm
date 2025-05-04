import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';
  
  // Keep mock data as fallback
  private mockProducts: Product[] = [
    {
      _id: '1',
      title: 'Smartphone X',
      description: 'A powerful smartphone with the latest features',
      price: 899.99,
      category: 'Electronics',
      image: 'assets/products/smartphone.jpg',
      stock: 25,
      ratings: 4.8,
      reviews: []
    },
    {
      _id: '2',
      title: 'Laptop Pro',
      description: 'Professional laptop for all your needs',
      price: 1299.99,
      category: 'Electronics',
      image: 'assets/products/laptop.jpg',
      stock: 10,
      ratings: 4.9,
      reviews: []
    },
    {
      _id: '3',
      title: 'Wireless Headphones',
      description: 'Premium sound quality with noise cancellation',
      price: 149.99,
      category: 'Electronics',
      image: 'assets/products/headphones.jpg',
      stock: 30,
      ratings: 4.5,
      reviews: []
    },
    {
      _id: '4',
      title: 'Smart Watch',
      description: 'Track your fitness and stay connected',
      price: 199.99,
      category: 'Wearables',
      image: 'assets/products/smartwatch.jpg',
      stock: 15,
      ratings: 4.6,
      reviews: []
    }
  ];

  constructor(private http: HttpClient) { }

  getProducts(
    page = 1, 
    limit = 10, 
    category?: string, 
    minPrice?: number, 
    maxPrice?: number, 
    sort?: string
  ): Observable<{ products: Product[], total: number, page: number, limit: number }> {
    // Build query parameters
    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());
    
    if (category) {
      params = params.set('category', category);
    }
    
    if (minPrice !== undefined) {
      params = params.set('minPrice', minPrice.toString());
    }
    
    if (maxPrice !== undefined) {
      params = params.set('maxPrice', maxPrice.toString());
    }
    
    if (sort) {
      params = params.set('sort', sort);
    }
    
    // Make API call with error handling
    return this.http.get<{ products: Product[], total: number, page: number, limit: number }>(
      this.apiUrl, { params }
    ).pipe(
      catchError(error => {
        console.error('Error fetching products from API:', error);
        console.log('Falling back to mock data');
        
        // Return mock data as fallback
        const filteredProducts = this.filterMockProducts(category, minPrice, maxPrice);
        return of({
          products: filteredProducts.slice(0, limit),
          total: filteredProducts.length,
          page: page,
          limit: limit
        });
      })
    );
  }

  private filterMockProducts(category?: string, minPrice?: number, maxPrice?: number): Product[] {
    let filteredProducts = [...this.mockProducts];
    
    if (category) {
      filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    if (minPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price >= minPrice);
    }
    
    if (maxPrice !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);
    }
    
    return filteredProducts;
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error fetching product ${id}:`, error);
        // Return mock product as fallback
        const product = this.mockProducts.find(p => p._id === id);
        return of(product || this.mockProducts[0]);
      })
    );
  }

  getProductReviews(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}/reviews`).pipe(
      catchError(error => {
        console.error(`Error fetching reviews for product ${id}:`, error);
        return of({ reviews: [] });
      })
    );
  }

  addProductReview(id: string, reviewData: { rating: number, comment: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/reviews`, reviewData).pipe(
      catchError(error => {
        console.error(`Error adding review for product ${id}:`, error);
        return of({ success: false, error: 'Failed to add review' });
      })
    );
  }

  // Admin only methods
  createProduct(productData: any): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, productData).pipe(
      catchError(error => {
        console.error('Error creating product:', error);
        return of({ ...productData, _id: 'new-product-id' } as Product);
      })
    );
  }

  updateProduct(id: string, productData: any): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, productData).pipe(
      catchError(error => {
        console.error(`Error updating product ${id}:`, error);
        return of({ ...productData, _id: id } as Product);
      })
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(error => {
        console.error(`Error deleting product ${id}:`, error);
        return of({ success: false, error: 'Failed to delete product' });
      })
    );
  }
} 