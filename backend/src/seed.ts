import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import axios from 'axios';
import * as bcrypt from 'bcrypt';
import { User } from './modules/auth/schemas/user.schema';
import { Product } from './modules/products/schemas/product.schema';

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

    // Fetch products from Fake Store API
    const response = await axios.get('https://fakestoreapi.com/products');
    const fakeProducts = response.data;

    // Transform and save products
    const products = fakeProducts.map((item: any) => ({
      title: item.title,
      description: item.description,
      price: item.price,
      category: item.category,
      image: item.image,
      stock: Math.floor(Math.random() * 100) + 10,
      ratings: parseFloat((Math.random() * 5).toFixed(1)),
      reviews: [],
    }));

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