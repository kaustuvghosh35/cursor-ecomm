const mongoose = require('mongoose');
const { MongoClient } = require('mongodb');

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://kaustavghosh35:0LQGdkv61A4M50WT@canvaskgcluster.ofpezjg.mongodb.net/shopnest';

async function initializeDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    const client = new MongoClient(mongoURI);
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    // Reference to the database
    const db = client.db('shopnest');

    // Create collections
    console.log('Creating collections...');
    
    // Users collection
    await db.createCollection('users');
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    console.log('Users collection created with indexes');
    
    // Products collection
    await db.createCollection('products');
    await db.collection('products').createIndex({ category: 1 });
    await db.collection('products').createIndex({ price: 1 });
    console.log('Products collection created with indexes');
    
    // Carts collection
    await db.createCollection('carts');
    await db.collection('carts').createIndex({ userId: 1 }, { unique: true });
    console.log('Carts collection created with indexes');
    
    // Orders collection
    await db.createCollection('orders');
    await db.collection('orders').createIndex({ userId: 1 });
    await db.collection('orders').createIndex({ status: 1 });
    await db.collection('orders').createIndex({ createdAt: 1 });
    console.log('Orders collection created with indexes');
    
    // Wishlists collection
    await db.createCollection('wishlists');
    await db.collection('wishlists').createIndex({ userId: 1 }, { unique: true });
    console.log('Wishlists collection created with indexes');
    
    // Discounts collection
    await db.createCollection('discounts');
    await db.collection('discounts').createIndex({ code: 1 }, { unique: true });
    await db.collection('discounts').createIndex({ expiresAt: 1 });
    console.log('Discounts collection created with indexes');

    // Create admin user
    const adminUser = {
      name: 'Admin User',
      email: 'admin@shopnest.com',
      password: '$2b$10$uHRBtW6Y2C0K4zlxFhaQkuBZ3KkPUlFBfUFd.NpTiVGCJVfkxI2FK', // hashed password for "admin123"
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    await db.collection('users').insertOne(adminUser);
    console.log('Admin user created');

    // Seed some products
    const products = [
      {
        title: 'Smartphone X',
        description: 'A powerful smartphone with the latest features',
        price: 899.99,
        category: 'Electronics',
        image: 'assets/products/smartphone.jpg',
        stock: 25,
        ratings: 4.8,
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Laptop Pro',
        description: 'Professional laptop for all your needs',
        price: 1299.99,
        category: 'Electronics',
        image: 'assets/products/laptop.jpg',
        stock: 10,
        ratings: 4.9,
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Wireless Headphones',
        description: 'Premium sound quality with noise cancellation',
        price: 149.99,
        category: 'Electronics',
        image: 'assets/products/headphones.jpg',
        stock: 30,
        ratings: 4.5,
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Smart Watch',
        description: 'Track your fitness and stay connected',
        price: 199.99,
        category: 'Wearables',
        image: 'assets/products/smartwatch.jpg',
        stock: 15,
        ratings: 4.6,
        reviews: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];
    
    await db.collection('products').insertMany(products);
    console.log('Products seeded');

    console.log('Database initialization completed');
    await client.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Run the initialization
initializeDatabase(); 