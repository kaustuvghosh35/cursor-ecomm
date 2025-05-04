const { MongoClient } = require('mongodb');

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://kaustavghosh35:0LQGdkv61A4M50WT@canvaskgcluster.ofpezjg.mongodb.net/shopnest';

async function checkDatabase() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    const client = new MongoClient(mongoURI);
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    // Reference to the database
    const db = client.db('shopnest');

    // Check products collection
    console.log('Checking products collection...');
    const productsCount = await db.collection('products').countDocuments();
    console.log(`Found ${productsCount} products in the database`);

    if (productsCount > 0) {
      const products = await db.collection('products').find().limit(2).toArray();
      console.log('Sample products:');
      console.log(JSON.stringify(products, null, 2));
    }

    await client.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error checking database:', error);
  }
}

// Run the script
checkDatabase(); 