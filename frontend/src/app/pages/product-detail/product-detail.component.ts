import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../shared/models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './product-detail.component.html',
  styles: []
})
export class ProductDetailComponent implements OnInit {
  product: Product = {
    _id: '',
    title: '',
    description: '',
    price: 0,
    category: '',
    image: '',
    stock: 0,
    ratings: 0,
    reviews: []
  };
  loading = true;
  error = false;
  
  // New properties for related products and bundles
  relatedProducts: Product[] = [];
  recommendedBundles: Product[] = [];
  loadingRelated = true;
  
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.loadProduct(id);
      }
    });
  }
  
  loadProduct(id: string): void {
    this.loading = true;
    this.productService.getProduct(id)
      .subscribe({
        next: (product) => {
          this.product = product;
          this.loading = false;
          
          // Load related products once we have the main product
          this.loadRelatedProducts(product.category, product._id);
          this.loadRecommendedBundles(product);
        },
        error: (error) => {
          console.error('Error loading product', error);
          this.error = true;
          this.loading = false;
        }
      });
  }
  
  /**
   * Load products in the same category as the current product
   */
  loadRelatedProducts(category: string, currentProductId: string): void {
    this.loadingRelated = true;
    
    this.productService.getProducts(1, 8, category)
      .subscribe({
        next: (response) => {
          // Filter out the current product and get up to 4 related products
          this.relatedProducts = response.products
            .filter(product => product._id !== currentProductId)
            .slice(0, 4);
          this.loadingRelated = false;
        },
        error: (error) => {
          console.error('Error loading related products', error);
          this.loadingRelated = false;
        }
      });
  }
  
  /**
   * Get recommended product bundles based on current product
   * In a real app, this would be based on sales data, user behavior, etc.
   * For this demo, we'll just get random products that complement the current one
   */
  loadRecommendedBundles(currentProduct: Product): void {
    // For demo, exclude products in the same category to simulate complementary products
    this.productService.getProducts(1, 4, undefined, undefined, undefined, undefined, true)
      .subscribe({
        next: (response) => {
          // Get products from different categories
          this.recommendedBundles = response.products
            .filter(product => product.category !== currentProduct.category && product._id !== currentProduct._id)
            .slice(0, 3);
        },
        error: (error) => {
          console.error('Error loading recommended bundles', error);
        }
      });
  }
  
  addToCart(): void {
    if (this.product && this.product.stock > 0) {
      this.cartService.addToCart(this.product._id)
        .subscribe({
          next: (response) => {
            console.log('Product added to cart', response);
            // You could show a success message here
          },
          error: (error) => {
            console.error('Error adding product to cart', error);
            // You could show an error message here
          }
        });
    }
  }
  
  /**
   * Add a bundle of products to the cart
   */
  addBundleToCart(mainProduct: Product, bundledProduct: Product): void {
    if (mainProduct && bundledProduct && mainProduct.stock > 0 && bundledProduct.stock > 0) {
      // Add main product
      this.cartService.addToCart(mainProduct._id)
        .subscribe({
          next: () => {
            // Then add bundled product
            this.cartService.addToCart(bundledProduct._id)
              .subscribe({
                next: () => {
                  console.log('Bundle added to cart');
                  // You could show a success message here
                },
                error: (error) => {
                  console.error('Error adding bundle to cart', error);
                }
              });
          },
          error: (error) => {
            console.error('Error adding bundle to cart', error);
          }
        });
    }
  }
} 