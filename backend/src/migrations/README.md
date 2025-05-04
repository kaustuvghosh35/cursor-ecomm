# ShopNest Database Migration

This directory contains database migration scripts for initializing the MongoDB database for the ShopNest e-commerce application.

## Setup

1. Ensure you have Node.js installed
2. Install dependencies:
```
npm install
```

## Running Migrations

To initialize the database with collections, indexes, and seed data:

```
npm run migrate
```

## MongoDB Connection

The migration script uses the MongoDB Atlas connection string:
```
mongodb+srv://kaustavghosh35:0LQGdkv61A4M50WT@canvaskgcluster.ofpezjg.mongodb.net/shopnest
```

This will create a new database called 'shopnest' in your MongoDB Atlas cluster.

## What the Migration Does

1. Creates the following collections:
   - users
   - products
   - carts
   - orders
   - wishlists
   - discounts

2. Sets up appropriate indexes on each collection

3. Seeds the database with:
   - An admin user (email: admin@shopnest.com, password: admin123)
   - Sample products

## Manual Updates

After running the migration, the MongoDB Atlas connection string should be updated in your application's environment variables.

In your production environment, update the backend/.env file with:
```
MONGODB_URI=mongodb+srv://kaustavghosh35:0LQGdkv61A4M50WT@canvaskgcluster.ofpezjg.mongodb.net/shopnest
``` 