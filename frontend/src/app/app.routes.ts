import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'products', 
    loadChildren: () => import('./pages/product-list/product-list.routes').then(m => m.PRODUCT_ROUTES) 
  },
  { 
    path: 'auth', 
    loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES) 
  },
  { 
    path: 'cart', 
    loadChildren: () => import('./pages/cart/cart.routes').then(m => m.CART_ROUTES) 
  },
  { 
    path: 'checkout', 
    loadChildren: () => import('./pages/checkout/checkout.routes').then(m => m.CHECKOUT_ROUTES) 
  },
  { 
    path: 'profile', 
    loadChildren: () => import('./pages/profile/profile.routes').then(m => m.PROFILE_ROUTES) 
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./pages/admin/admin.routes').then(m => m.ADMIN_ROUTES) 
  },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];
