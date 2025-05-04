import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list.component';

export const PRODUCT_ROUTES: Routes = [
  { path: '', component: ProductListComponent },
  { path: ':id', loadComponent: () => import('../product-detail/product-detail.component').then(m => m.ProductDetailComponent) }
]; 