import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [
  { 
    path: '', 
    loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent) 
  },
  { 
    path: 'products', 
    loadComponent: () => import('./products/products.component').then(m => m.ProductsComponent) 
  },
  { 
    path: 'orders', 
    loadComponent: () => import('./orders/orders.component').then(m => m.OrdersComponent) 
  },
  { 
    path: 'users', 
    loadComponent: () => import('./users/users.component').then(m => m.UsersComponent) 
  }
]; 