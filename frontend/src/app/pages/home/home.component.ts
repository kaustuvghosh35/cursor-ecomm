import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../shared/models/product.model';
import { ProductCardComponent } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  featuredProducts: Product[] = [];
  categories: string[] = [];
  loading = true;
  error = false;
  
  // Carousel properties
  carouselItems = [
    {
      title: 'Summer Collection',
      subtitle: 'New arrivals for the season',
      description: 'Discover our latest summer styles, designed for comfort and style in the heat.',
      image: 'assets/carousel/summer.jpg',
      link: '/products',
      buttonText: 'Shop Now'
    },
    {
      title: 'Special Offers',
      subtitle: 'Limited time deals',
      description: 'Up to 40% off on selected items. Don\'t miss out on these amazing deals!',
      image: 'assets/carousel/sale.jpg',
      link: '/products',
      buttonText: 'View Offers'
    },
    {
      title: 'Premium Quality',
      subtitle: 'Exclusive collection',
      description: 'Handcrafted with premium materials. Experience luxury with our exclusive range.',
      image: 'assets/carousel/premium.jpg',
      link: '/products',
      buttonText: 'Explore'
    }
  ];
  currentCarouselIndex = 0;
  
  constructor(private productService: ProductService) {}
  
  ngOnInit(): void {
    this.loadProducts();
    this.loadFeaturedProducts();
    // Start carousel auto rotation
    this.startCarouselInterval();
  }
  
  loadProducts(): void {
    this.loading = true;
    this.productService.getProducts(1, 8)
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
          this.categories = Array.from(categorySet);
          
          this.loading = false;
        },
        error: (error) => {
          console.error('Error loading products', error);
          this.error = true;
          this.loading = false;
        }
      });
  }
  
  loadFeaturedProducts(): void {
    this.productService.getFeaturedProducts(4)
      .subscribe({
        next: (products) => {
          this.featuredProducts = products;
        },
        error: (error) => {
          console.error('Error loading featured products', error);
          // Use default filtering as fallback if the dedicated method fails
          this.featuredProducts = this.products.filter(product => product.featured).slice(0, 4);
        }
      });
  }
  
  // Carousel methods
  nextSlide(): void {
    this.currentCarouselIndex = (this.currentCarouselIndex + 1) % this.carouselItems.length;
  }
  
  prevSlide(): void {
    this.currentCarouselIndex = (this.currentCarouselIndex - 1 + this.carouselItems.length) % this.carouselItems.length;
  }
  
  setCurrentSlide(index: number): void {
    this.currentCarouselIndex = index;
  }
  
  private startCarouselInterval(): void {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }
} 