import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { User } from './modules/auth/schemas/user.schema';
import { Product } from './modules/products/schemas/product.schema';

// Product categories for custom products
const categories = [
  'Electronics',
  'Clothing',
  'Accessories',
  'Home & Kitchen',
  'Sports & Fitness',
  'Books',
  'Gaming',
  'Smart Home',
  'Audio',
  'Wearables',
  'Photography',
  'Bags'
];

// Create a pool of images from FakeStore API for fallback/placeholder
const fakeStoreImages = [
  'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
  'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
  'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg',
  'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg',
  'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
  'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
  'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
  'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
  'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg',
  'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg',
  'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
  'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
  'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg',
  'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg',
  'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg'
];

// Custom product data with more details
const customProducts = [
  {
    title: 'Smartphone X Pro',
    description: 'A powerful smartphone with the latest features, 5G connectivity, and an amazing camera system.',
    price: 899.99,
    category: 'Electronics',
    stock: 25,
    featured: true,
    isNew: true,
    onSale: false
  },
  {
    title: 'Laptop Ultra',
    description: 'Professional laptop with 16GB RAM, 1TB SSD, and dedicated graphics for all your computing needs.',
    price: 1299.99,
    category: 'Electronics',
    stock: 10,
    featured: true,
    isNew: false,
    onSale: false
  },
  {
    title: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium sound quality with active noise cancellation and 30-hour battery life.',
    price: 149.99,
    category: 'Audio',
    stock: 30,
    featured: false,
    isNew: false,
    onSale: true,
    discount: 15
  },
  {
    title: 'Smart Watch Series 5',
    description: 'Track your fitness, monitor health metrics, and stay connected with this advanced smartwatch.',
    price: 199.99,
    category: 'Wearables',
    stock: 15,
    featured: false,
    isNew: true,
    onSale: false
  },
  {
    title: 'Fitness Tracker Band Pro',
    description: 'Track steps, heart rate, sleep quality, and more with this comfortable fitness band.',
    price: 79.99,
    category: 'Wearables',
    stock: 40,
    featured: false,
    isNew: false,
    onSale: true,
    discount: 20
  },
  {
    title: 'Portable Bluetooth Speaker',
    description: 'Waterproof portable speaker with amazing sound quality and 20-hour battery life.',
    price: 129.99,
    category: 'Audio',
    stock: 22,
    featured: true,
    isNew: false,
    onSale: false
  },
  {
    title: 'Professional DSLR Camera',
    description: 'Capture stunning photos and videos with this professional-grade camera with interchangeable lenses.',
    price: 849.99,
    category: 'Photography',
    stock: 8,
    featured: true,
    isNew: false,
    onSale: false
  },
  {
    title: 'Wireless Earbuds',
    description: 'Crystal clear audio in a compact design with touch controls and wireless charging case.',
    price: 89.99,
    category: 'Audio',
    stock: 35,
    featured: false,
    isNew: true,
    onSale: true,
    discount: 10
  },
  {
    title: 'Smart Home Hub',
    description: 'Control your entire home with voice commands and automate your daily routines.',
    price: 149.99,
    category: 'Smart Home',
    stock: 18,
    featured: true,
    isNew: false,
    onSale: false
  },
  {
    title: 'Gaming Console Pro',
    description: 'Next-generation gaming experience with 4K graphics, fast loading times, and exclusive games.',
    price: 499.99,
    category: 'Gaming',
    stock: 5,
    featured: true,
    isNew: true,
    onSale: false
  },
  {
    title: 'Virtual Reality Headset',
    description: 'Immerse yourself in virtual worlds with this comfortable and high-resolution VR headset.',
    price: 349.99,
    category: 'Gaming',
    stock: 12,
    featured: false,
    isNew: true,
    onSale: false
  },
  {
    title: 'Smart Thermostat',
    description: 'Save energy with intelligent temperature control that learns your preferences.',
    price: 129.99,
    category: 'Smart Home',
    stock: 25,
    featured: false,
    isNew: false,
    onSale: true,
    discount: 15
  },
  {
    title: 'Men\'s Casual T-Shirt',
    description: 'Comfortable cotton t-shirt for everyday wear in multiple colors.',
    price: 24.99,
    category: 'Clothing',
    stock: 150,
    featured: false,
    isNew: false,
    onSale: false
  },
  {
    title: 'Women\'s Summer Dress',
    description: 'Stylish and light summer dress with floral pattern, perfect for warm weather.',
    price: 49.99,
    category: 'Clothing',
    stock: 75,
    featured: true,
    isNew: true,
    onSale: false
  },
  {
    title: 'Men\'s Leather Jacket',
    description: 'Classic leather jacket for a timeless look that never goes out of style.',
    price: 199.99,
    category: 'Clothing',
    stock: 25,
    featured: true,
    isNew: false,
    onSale: true,
    discount: 10
  },
  {
    title: 'Women\'s Designer Handbag',
    description: 'Elegant leather handbag with multiple compartments and premium finish.',
    price: 129.99,
    category: 'Accessories',
    stock: 40,
    featured: true,
    isNew: false,
    onSale: false
  },
  {
    title: 'Men\'s Stainless Steel Watch',
    description: 'Stylish stainless steel watch with automatic movement and sapphire crystal.',
    price: 299.99,
    category: 'Accessories',
    stock: 15,
    featured: true,
    isNew: false,
    onSale: false
  },
  {
    title: 'Women\'s Polarized Sunglasses',
    description: 'Designer sunglasses with UV protection and polarized lenses.',
    price: 129.99,
    category: 'Accessories',
    stock: 30,
    featured: false,
    isNew: true,
    onSale: false
  },
  {
    title: 'High-Performance Blender',
    description: 'Powerful blender for smoothies and food preparation with multiple speed settings.',
    price: 79.99,
    category: 'Home & Kitchen',
    stock: 20,
    featured: false,
    isNew: false,
    onSale: true,
    discount: 15
  },
  {
    title: 'Programmable Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe and customizable brewing options.',
    price: 129.99,
    category: 'Home & Kitchen',
    stock: 25,
    featured: false,
    isNew: false,
    onSale: false
  },
  {
    title: 'Digital Air Fryer',
    description: 'Cook healthier meals with less oil using this digital air fryer with preset cooking modes.',
    price: 99.99,
    category: 'Home & Kitchen',
    stock: 40,
    featured: true,
    isNew: true,
    onSale: false
  },
  {
    title: 'Premium Yoga Mat',
    description: 'Non-slip yoga mat made from eco-friendly materials for comfortable exercise.',
    price: 29.99,
    category: 'Sports & Fitness',
    stock: 100,
    featured: false,
    isNew: false,
    onSale: false
  },
  {
    title: 'Adjustable Dumbbell Set',
    description: 'Space-saving adjustable dumbbell set for home workouts with multiple weight options.',
    price: 149.99,
    category: 'Sports & Fitness',
    stock: 15,
    featured: false,
    isNew: false,
    onSale: true,
    discount: 10
  },
  {
    title: 'Performance Running Shoes',
    description: 'Lightweight running shoes with superior cushioning and breathable mesh upper.',
    price: 119.99,
    category: 'Sports & Fitness',
    stock: 50,
    featured: true,
    isNew: true,
    onSale: false
  },
  {
    title: 'Bestselling Thriller Novel',
    description: 'The latest thriller from a bestselling author that keeps you on the edge of your seat.',
    price: 12.99,
    category: 'Books',
    stock: 200,
    featured: false,
    isNew: true,
    onSale: false
  },
  {
    title: 'International Cookbook',
    description: 'Comprehensive cookbook with recipes from around the world for every skill level.',
    price: 24.99,
    category: 'Books',
    stock: 75,
    featured: false,
    isNew: false,
    onSale: true,
    discount: 20
  },
  {
    title: 'Self-Improvement Book',
    description: 'Guide to personal development, productivity, and achieving your goals.',
    price: 16.99,
    category: 'Books',
    stock: 100,
    featured: true,
    isNew: false,
    onSale: false
  },
  {
    title: '4K Smart TV - 55 inch',
    description: '4K Ultra HD Smart TV with HDR, voice control, and streaming apps built-in.',
    price: 699.99,
    category: 'Electronics',
    stock: 10,
    featured: true,
    isNew: true,
    onSale: false
  },
  {
    title: 'High-Performance Tablet',
    description: 'Powerful tablet for productivity and entertainment with all-day battery life.',
    price: 499.99,
    category: 'Electronics',
    stock: 20,
    featured: true,
    isNew: false,
    onSale: true,
    discount: 10
  },
  {
    title: 'Ergonomic Wireless Keyboard and Mouse',
    description: 'Ergonomic wireless keyboard and mouse combo for comfortable work with long battery life.',
    price: 49.99,
    category: 'Electronics',
    stock: 35,
    featured: false,
    isNew: false,
    onSale: false
  },
  {
    title: 'Portable External SSD - 1TB',
    description: 'Fast, portable external SSD for data backup and transfer with USB-C connection.',
    price: 149.99,
    category: 'Electronics',
    stock: 30,
    featured: false,
    isNew: false,
    onSale: true,
    discount: 15
  },
  {
    title: 'Mesh WiFi System',
    description: 'Whole-home mesh WiFi system for seamless internet coverage with no dead zones.',
    price: 199.99,
    category: 'Electronics',
    stock: 25,
    featured: false,
    isNew: true,
    onSale: false
  },
  {
    title: 'Smart Light Bulb Kit',
    description: 'Color-changing smart bulbs controllable via app or voice commands.',
    price: 59.99,
    category: 'Smart Home',
    stock: 40,
    featured: false,
    isNew: false,
    onSale: false
  },
  {
    title: 'Smart Door Lock',
    description: 'Keyless entry with fingerprint, PIN code, and smartphone app control options.',
    price: 199.99,
    category: 'Smart Home',
    stock: 15,
    featured: true,
    isNew: true,
    onSale: false
  },
  {
    title: 'Robot Vacuum Cleaner',
    description: 'Automated vacuum with smart mapping, scheduling, and app control.',
    price: 299.99,
    category: 'Smart Home',
    stock: 12,
    featured: true,
    isNew: false,
    onSale: true,
    discount: 10
  },
  {
    title: 'Wireless Security Camera System',
    description: 'Wireless security cameras with motion detection, night vision, and cloud storage.',
    price: 249.99,
    category: 'Smart Home',
    stock: 20,
    featured: false,
    isNew: false,
    onSale: false
  },
  {
    title: 'Water-Resistant Backpack',
    description: 'Water-resistant backpack with laptop compartment and ergonomic design.',
    price: 49.99,
    category: 'Bags',
    stock: 60,
    featured: false,
    isNew: true,
    onSale: false
  },
  {
    title: 'Hardshell Suitcase',
    description: 'Durable hardshell suitcase with spinner wheels and TSA-approved lock.',
    price: 129.99,
    category: 'Bags',
    stock: 25,
    featured: false,
    isNew: false,
    onSale: true,
    discount: 15
  },
  {
    title: 'Messenger Bag',
    description: 'Stylish messenger bag for work or school with multiple compartments.',
    price: 59.99,
    category: 'Bags',
    stock: 35,
    featured: false,
    isNew: false,
    onSale: false
  },
  {
    title: 'Gaming Mouse',
    description: 'High-precision gaming mouse with programmable buttons and RGB lighting.',
    price: 79.99,
    category: 'Gaming',
    stock: 30,
    featured: true,
    isNew: false,
    onSale: false
  },
  {
    title: 'Mechanical Gaming Keyboard',
    description: 'RGB mechanical keyboard with tactile feedback and customizable lighting.',
    price: 129.99,
    category: 'Gaming',
    stock: 25,
    featured: true,
    isNew: true,
    onSale: true,
    discount: 10
  },
  {
    title: 'Gaming Headset',
    description: 'Surround sound gaming headset with noise-cancelling microphone.',
    price: 99.99,
    category: 'Gaming',
    stock: 20,
    featured: false,
    isNew: false,
    onSale: false
  }
];

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  try {
    console.log('Seeding database...');

    // Get model references
    const userModel = app.get<Model<User>>(getModelToken(User.name));
    const productModel = app.get<Model<Product>>(getModelToken(Product.name));

    // Clear existing data
    await userModel.deleteMany({}).exec();
    await productModel.deleteMany({}).exec();

    // Create admin user
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new userModel({
      name: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
    });
    await admin.save();
    console.log('Admin user created:', admin.email);

    // Create test user
    const testUserPassword = await bcrypt.hash('password123', 10);
    const testUser = new userModel({
      name: 'Test User',
      email: 'user@example.com',
      password: testUserPassword,
      role: 'user',
    });
    await testUser.save();
    console.log('Test user created:', testUser.email);

    // Prepare products array to be inserted
    const products = [];

    // First, add custom products with detailed metadata
    for (let i = 0; i < customProducts.length; i++) {
      const product = customProducts[i];
      // Get a random image from the FakeStore API images
      const randomImageIndex = Math.floor(Math.random() * fakeStoreImages.length);
      
      products.push({
        ...product,
        image: fakeStoreImages[randomImageIndex],
        ratings: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)), // Ratings between 3.5 and 5.0
        reviews: [],
      });
    }

    // Next, fetch products from Fake Store API for additional variety
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      const fakeProducts = response.data;

      // Transform and add FakeStore products
      for (const item of fakeProducts) {
        const isFeatured = Math.random() > 0.7; // 30% chance to be featured
        const isNew = Math.random() > 0.8; // 20% chance to be new
        const isOnSale = Math.random() > 0.75; // 25% chance to be on sale
        const discount = isOnSale ? Math.floor(Math.random() * 20) + 5 : null; // 5-25% discount

        products.push({
          title: item.title,
          description: item.description,
          price: item.price,
          category: item.category,
          image: item.image,
          stock: Math.floor(Math.random() * 100) + 10,
          ratings: parseFloat((Math.random() * 2 + 3).toFixed(1)), // Ratings between 3 and 5
          reviews: [],
          featured: isFeatured,
          isNew: isNew,
          onSale: isOnSale,
          discount: discount
        });
      }
    } catch (error) {
      console.warn('Could not fetch products from FakeStore API:', error.message);
      console.log('Proceeding with custom products only...');
    }

    // Insert all products into the database
    await productModel.insertMany(products);
    console.log(`${products.length} products seeded successfully`);

    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await app.close();
  }
}

bootstrap(); 