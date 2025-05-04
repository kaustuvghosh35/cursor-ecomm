import { Routes } from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./profile.component').then(m => m.ProfileComponent) 
  },
  { 
    path: 'orders', 
    loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent) 
  },
  { 
    path: 'wishlist', 
    loadComponent: () => import('./wishlist/wishlist.component').then(m => m.WishlistComponent) 
  }
]; 