import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Product } from '../shared/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:3000/api/products';
  
  // FakeStore API image URLs for fallback
  private fakeStoreImages = [
    'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
    'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
    'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
    'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
    'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
    'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
    'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg'
  ];
  
  // Keep mock data as fallback
  private mockProducts: Product[] = [
    // Original products
    {
      _id: '1',
      title: 'Smartphone X',
      description: 'A powerful smartphone with the latest features',
      price: 899.99,
      category: 'Electronics',
      image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
      stock: 25,
      ratings: 4.8,
      reviews: [],
      featured: true,
      isNew: false,
      onSale: false
    },
    {
      _id: '2',
      title: 'Laptop Pro',
      description: 'Professional laptop for all your needs',
      price: 1299.99,
      category: 'Electronics',
      image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
      stock: 10,
      ratings: 4.9,
      reviews: [],
      featured: true,
      isNew: true,
      onSale: false
    },
    {
      _id: '3',
      title: 'Wireless Headphones',
      description: 'Premium sound quality with noise cancellation',
      price: 149.99,
      category: 'Electronics',
      image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
      stock: 30,
      ratings: 4.5,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: true,
      discount: 15
    },
    {
      _id: '4',
      title: 'Smart Watch',
      description: 'Track your fitness and stay connected',
      price: 199.99,
      category: 'Wearables',
      image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
      stock: 15,
      ratings: 4.6,
      reviews: [],
      featured: false,
      isNew: true,
      onSale: false
    },
    {
      _id: '5',
      title: 'Fitness Tracker Band',
      description: 'Track steps, heart rate and sleep quality',
      price: 79.99,
      category: 'Wearables',
      image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
      stock: 40,
      ratings: 4.3,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: true,
      discount: 20
    },
    {
      _id: '6',
      title: 'Bluetooth Speaker',
      description: 'Portable speaker with amazing sound quality',
      price: 129.99,
      category: 'Audio',
      image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
      stock: 22,
      ratings: 4.7,
      reviews: [],
      featured: true,
      isNew: false,
      onSale: false
    },
    {
      _id: '7',
      title: 'Digital Camera',
      description: 'Capture your memories in stunning detail',
      price: 449.99,
      category: 'Photography',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      stock: 8,
      ratings: 4.8,
      reviews: [],
      featured: true,
      isNew: false,
      onSale: false
    },
    {
      _id: '8',
      title: 'Wireless Earbuds',
      description: 'Crystal clear audio in a compact design',
      price: 89.99,
      category: 'Audio',
      image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
      stock: 35,
      ratings: 4.4,
      reviews: [],
      featured: false,
      isNew: true,
      onSale: true,
      discount: 10
    },
    {
      _id: '9',
      title: 'Smart Home Hub',
      description: 'Control your entire home with voice commands',
      price: 149.99,
      category: 'Smart Home',
      image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
      stock: 18,
      ratings: 4.5,
      reviews: [],
      featured: true,
      isNew: false,
      onSale: false
    },
    {
      _id: '10',
      title: 'Gaming Console',
      description: 'Next-generation gaming experience',
      price: 499.99,
      category: 'Gaming',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      stock: 5,
      ratings: 4.9,
      reviews: [],
      featured: true,
      isNew: true,
      onSale: false
    },
    {
      _id: '11',
      title: 'Virtual Reality Headset',
      description: 'Immerse yourself in virtual worlds',
      price: 349.99,
      category: 'Gaming',
      image: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
      stock: 12,
      ratings: 4.7,
      reviews: [],
      featured: false,
      isNew: true,
      onSale: false
    },
    {
      _id: '12',
      title: 'Smart Thermostat',
      description: 'Save energy with intelligent temperature control',
      price: 129.99,
      category: 'Smart Home',
      image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      stock: 25,
      ratings: 4.6,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: true,
      discount: 15
    },
    
    // Additional products
    {
      _id: '13',
      title: 'Men\'s Casual T-Shirt',
      description: 'Comfortable cotton t-shirt for everyday wear',
      price: 24.99,
      category: 'Clothing',
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      stock: 150,
      ratings: 4.2,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: false
    },
    {
      _id: '14',
      title: 'Women\'s Summer Dress',
      description: 'Stylish and light summer dress with floral pattern',
      price: 49.99,
      category: 'Clothing',
      image: 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg',
      stock: 75,
      ratings: 4.6,
      reviews: [],
      featured: true,
      isNew: true,
      onSale: false
    },
    {
      _id: '15',
      title: 'Men\'s Leather Jacket',
      description: 'Classic leather jacket for a timeless look',
      price: 199.99,
      category: 'Clothing',
      image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      stock: 25,
      ratings: 4.8,
      reviews: [],
      featured: true,
      isNew: false,
      onSale: true,
      discount: 10
    },
    {
      _id: '16',
      title: 'Women\'s Handbag',
      description: 'Elegant leather handbag with multiple compartments',
      price: 89.99,
      category: 'Accessories',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      stock: 40,
      ratings: 4.7,
      reviews: [],
      featured: true,
      isNew: false,
      onSale: false
    },
    {
      _id: '17',
      title: 'Men\'s Watch',
      description: 'Stylish stainless steel watch with automatic movement',
      price: 299.99,
      category: 'Accessories',
      image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
      stock: 15,
      ratings: 4.9,
      reviews: [],
      featured: true,
      isNew: false,
      onSale: false
    },
    {
      _id: '18',
      title: 'Women\'s Sunglasses',
      description: 'Designer sunglasses with UV protection',
      price: 129.99,
      category: 'Accessories',
      image: 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg',
      stock: 30,
      ratings: 4.5,
      reviews: [],
      featured: false,
      isNew: true,
      onSale: false
    },
    {
      _id: '19',
      title: 'Kitchen Blender',
      description: 'Powerful blender for smoothies and food preparation',
      price: 79.99,
      category: 'Home & Kitchen',
      image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
      stock: 20,
      ratings: 4.3,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: true,
      discount: 15
    },
    {
      _id: '20',
      title: 'Coffee Maker',
      description: 'Programmable coffee maker with thermal carafe',
      price: 129.99,
      category: 'Home & Kitchen',
      image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
      stock: 25,
      ratings: 4.6,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: false
    },
    {
      _id: '21',
      title: 'Air Fryer',
      description: 'Cook healthier meals with less oil',
      price: 99.99,
      category: 'Home & Kitchen',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      stock: 40,
      ratings: 4.7,
      reviews: [],
      featured: true,
      isNew: true,
      onSale: false
    },
    {
      _id: '22',
      title: 'Yoga Mat',
      description: 'Non-slip yoga mat for comfortable exercise',
      price: 29.99,
      category: 'Sports & Fitness',
      image: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
      stock: 100,
      ratings: 4.4,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: false
    },
    {
      _id: '23',
      title: 'Dumbbell Set',
      description: 'Adjustable dumbbell set for home workouts',
      price: 149.99,
      category: 'Sports & Fitness',
      image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
      stock: 15,
      ratings: 4.8,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: true,
      discount: 10
    },
    {
      _id: '24',
      title: 'Running Shoes',
      description: 'Lightweight running shoes with superior cushioning',
      price: 119.99,
      category: 'Sports & Fitness',
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
      stock: 50,
      ratings: 4.6,
      reviews: [],
      featured: true,
      isNew: true,
      onSale: false
    },
    {
      _id: '25',
      title: 'Novel - Thriller',
      description: 'Bestselling thriller novel that keeps you on the edge of your seat',
      price: 12.99,
      category: 'Books',
      image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
      stock: 200,
      ratings: 4.5,
      reviews: [],
      featured: false,
      isNew: true,
      onSale: false
    },
    {
      _id: '26',
      title: 'Cookbook',
      description: 'Comprehensive cookbook with recipes from around the world',
      price: 24.99,
      category: 'Books',
      image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
      stock: 75,
      ratings: 4.7,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: true,
      discount: 20
    },
    {
      _id: '27',
      title: 'Self-Help Book',
      description: 'Guide to personal development and productivity',
      price: 16.99,
      category: 'Books',
      image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
      stock: 100,
      ratings: 4.4,
      reviews: [],
      featured: true,
      isNew: false,
      onSale: false
    },
    {
      _id: '28',
      title: 'LED TV - 55 inch',
      description: '4K Ultra HD Smart TV with HDR',
      price: 699.99,
      category: 'Electronics',
      image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
      stock: 10,
      ratings: 4.9,
      reviews: [],
      featured: true,
      isNew: true,
      onSale: false
    },
    {
      _id: '29',
      title: 'Tablet Pro',
      description: 'Powerful tablet for productivity and entertainment',
      price: 499.99,
      category: 'Electronics',
      image: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
      stock: 20,
      ratings: 4.8,
      reviews: [],
      featured: true,
      isNew: false,
      onSale: true,
      discount: 10
    },
    {
      _id: '30',
      title: 'Wireless Keyboard and Mouse Combo',
      description: 'Ergonomic wireless keyboard and mouse for comfortable work',
      price: 49.99,
      category: 'Electronics',
      image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
      stock: 35,
      ratings: 4.5,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: false
    },
    {
      _id: '31',
      title: 'External Hard Drive - 2TB',
      description: 'Portable external hard drive for data backup',
      price: 79.99,
      category: 'Electronics',
      image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
      stock: 30,
      ratings: 4.6,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: true,
      discount: 15
    },
    {
      _id: '32',
      title: 'WiFi Router',
      description: 'High-speed WiFi router for seamless internet connection',
      price: 89.99,
      category: 'Electronics',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      stock: 25,
      ratings: 4.4,
      reviews: [],
      featured: false,
      isNew: true,
      onSale: false
    },
    {
      _id: '33',
      title: 'Smart Light Bulbs (Pack of 4)',
      description: 'Color-changing smart bulbs controllable via app',
      price: 59.99,
      category: 'Smart Home',
      image: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
      stock: 40,
      ratings: 4.3,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: false
    },
    {
      _id: '34',
      title: 'Smart Door Lock',
      description: 'Keyless entry with fingerprint and PIN code options',
      price: 199.99,
      category: 'Smart Home',
      image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
      stock: 15,
      ratings: 4.7,
      reviews: [],
      featured: true,
      isNew: true,
      onSale: false
    },
    {
      _id: '35',
      title: 'Robot Vacuum Cleaner',
      description: 'Automated vacuum with smart mapping and scheduling',
      price: 299.99,
      category: 'Smart Home',
      image: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
      stock: 12,
      ratings: 4.8,
      reviews: [],
      featured: true,
      isNew: false,
      onSale: true,
      discount: 10
    },
    {
      _id: '36',
      title: 'Security Camera System',
      description: 'Wireless security cameras with motion detection',
      price: 249.99,
      category: 'Smart Home',
      image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
      stock: 20,
      ratings: 4.5,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: false
    },
    {
      _id: '37',
      title: 'Unisex Backpack',
      description: 'Water-resistant backpack with laptop compartment',
      price: 49.99,
      category: 'Bags',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      stock: 60,
      ratings: 4.4,
      reviews: [],
      featured: false,
      isNew: true,
      onSale: false
    },
    {
      _id: '38',
      title: 'Travel Suitcase',
      description: 'Durable hardshell suitcase with spinner wheels',
      price: 129.99,
      category: 'Bags',
      image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
      stock: 25,
      ratings: 4.6,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: true,
      discount: 15
    },
    {
      _id: '39',
      title: 'Messenger Bag',
      description: 'Stylish messenger bag for work or school',
      price: 59.99,
      category: 'Bags',
      image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
      stock: 35,
      ratings: 4.3,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: false
    },
    {
      _id: '40',
      title: 'Laptop Sleeve',
      description: 'Protective sleeve for laptops up to 15 inches',
      price: 24.99,
      category: 'Bags',
      image: 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
      stock: 75,
      ratings: 4.2,
      reviews: [],
      featured: false,
      isNew: true,
      onSale: false
    },
    {
      _id: '41',
      title: 'Wireless Gaming Mouse',
      description: 'High-precision gaming mouse with programmable buttons',
      price: 79.99,
      category: 'Gaming',
      image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
      stock: 30,
      ratings: 4.7,
      reviews: [],
      featured: true,
      isNew: false,
      onSale: false
    },
    {
      _id: '42',
      title: 'Mechanical Gaming Keyboard',
      description: 'RGB mechanical keyboard with tactile feedback',
      price: 129.99,
      category: 'Gaming',
      image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
      stock: 25,
      ratings: 4.8,
      reviews: [],
      featured: true,
      isNew: true,
      onSale: true,
      discount: 10
    },
    {
      _id: '43',
      title: 'Gaming Headset',
      description: 'Surround sound gaming headset with noise-cancelling microphone',
      price: 99.99,
      category: 'Gaming',
      image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
      stock: 20,
      ratings: 4.6,
      reviews: [],
      featured: false,
      isNew: false,
      onSale: false
    },
    {
      _id: '44',
      title: 'Gaming Chair',
      description: 'Ergonomic gaming chair with adjustable features',
      price: 199.99,
      category: 'Gaming',
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
      stock: 10,
      ratings: 4.5,
      reviews: [],
      featured: false,
      isNew: true,
      onSale: false
    },
    {
      _id: '45',
      title: 'Portable Bluetooth Speaker',
      description: 'Waterproof portable speaker with 20-hour battery life',
      price: 69.99,
      category: 'Audio',
      image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
      stock: 45,
      ratings: 4.4,
      reviews: [],
      featured: true,
      isNew: false,
      onSale: true,
      discount: 15
    }
  ];

  constructor(private http: HttpClient) { }
  
  /**
   * Returns a random image URL from the FakeStore API
   */
  getRandomFakeStoreImage(): string {
    const randomIndex = Math.floor(Math.random() * this.fakeStoreImages.length);
    return this.fakeStoreImages[randomIndex];
  }
  
  /**
   * Returns featured products for display on the home page
   */
  getFeaturedProducts(limit: number = 4): Observable<Product[]> {
    // Try to get from API first
    return new Observable<Product[]>(observer => {
      this.getProducts(1, 12, undefined, undefined, undefined, undefined, true)
        .subscribe({
          next: (response) => {
            // If we got featured products from API, use them
            if (response.products.length > 0) {
              observer.next(response.products.slice(0, limit));
              observer.complete();
            } else {
              // Otherwise use mock data
              const featured = this.mockProducts.filter(p => p.featured).slice(0, limit);
              observer.next(featured);
              observer.complete();
            }
          },
          error: () => {
            // On error, fall back to mock data
            const featured = this.mockProducts.filter(p => p.featured).slice(0, limit);
            observer.next(featured);
            observer.complete();
          }
        });
    });
  }

  getProducts(
    page = 1, 
    limit = 20, 
    category?: string, 
    minPrice?: number, 
    maxPrice?: number, 
    sort?: string,
    featured?: boolean,
    onSale?: boolean,
    isNew?: boolean,
    minRating?: number
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
    
    if (featured !== undefined) {
      params = params.set('featured', featured.toString());
    }
    
    if (onSale !== undefined) {
      params = params.set('onSale', onSale.toString());
    }
    
    if (isNew !== undefined) {
      params = params.set('isNew', isNew.toString());
    }
    
    if (minRating !== undefined) {
      params = params.set('minRating', minRating.toString());
    }
    
    // Make API call with error handling
    return this.http.get<{ products: Product[], total: number, page: number, limit: number }>(
      this.apiUrl, { params }
    ).pipe(
      catchError(error => {
        console.error('Error fetching products from API:', error);
        console.log('Falling back to mock data');
        
        // Return mock data as fallback
        const filteredProducts = this.filterMockProducts(category, minPrice, maxPrice, featured, onSale, isNew, minRating);
        return of({
          products: filteredProducts.slice((page - 1) * limit, page * limit),
          total: filteredProducts.length,
          page: page,
          limit: limit
        });
      })
    );
  }

  private filterMockProducts(
    category?: string, 
    minPrice?: number, 
    maxPrice?: number, 
    featured?: boolean, 
    onSale?: boolean, 
    isNew?: boolean, 
    minRating?: number
  ): Product[] {
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
    
    if (featured !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.featured === featured);
    }
    
    if (onSale !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.onSale === onSale);
    }
    
    if (isNew !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.isNew === isNew);
    }
    
    if (minRating !== undefined) {
      filteredProducts = filteredProducts.filter(p => p.ratings >= minRating);
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