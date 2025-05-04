import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Product } from '../shared/models/product.model';

interface CartItem {
  productId: string;
  quantity: number;
  product: Product;
}

interface Cart {
  _id: string;
  userId: string;
  items: CartItem[];
  totalPrice: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:3000/api/cart';
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  public cart$ = this.cartSubject.asObservable();
  
  constructor(private http: HttpClient) { }
  
  getCart(): Observable<Cart> {
    return this.http.get<Cart>(this.apiUrl)
      .pipe(
        tap(cart => this.cartSubject.next(cart))
      );
  }
  
  addToCart(productId: string, quantity: number = 1): Observable<Cart> {
    return this.http.post<Cart>(this.apiUrl, { productId, quantity })
      .pipe(
        tap(cart => this.cartSubject.next(cart))
      );
  }
  
  updateCartItem(productId: string, quantity: number): Observable<Cart> {
    return this.http.patch<Cart>(`${this.apiUrl}/${productId}`, { quantity })
      .pipe(
        tap(cart => this.cartSubject.next(cart))
      );
  }
  
  removeFromCart(productId: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/${productId}`)
      .pipe(
        tap(cart => this.cartSubject.next(cart))
      );
  }
  
  clearCart(): Observable<Cart> {
    return this.http.delete<Cart>(this.apiUrl)
      .pipe(
        tap(cart => this.cartSubject.next(cart))
      );
  }
  
  get cartItemsCount(): number {
    const cart = this.cartSubject.value;
    if (!cart) return 0;
    
    return cart.items.reduce((count, item) => count + item.quantity, 0);
  }
} 