const { MongoClient } = require('mongodb');

// MongoDB Atlas connection string
const mongoURI = 'mongodb+srv://kaustavghosh35:0LQGdkv61A4M50WT@canvaskgcluster.ofpezjg.mongodb.net/shopnest';

async function updateProductImages() {
  try {
    console.log('Connecting to MongoDB Atlas...');
    const client = new MongoClient(mongoURI);
    await client.connect();
    console.log('Connected to MongoDB Atlas');

    // Reference to the database
    const db = client.db('shopnest');

    // Get products collection
    const productsCollection = db.collection('products');
    
    // Image mappings based on your assets folder
    const imageMap = {
      'Smartphone X': 'assets/images/brand-new-realistic-mobile-phone-black-smartphone-apple-iphone-vector-eps-100341904.png',
      'Laptop Pro': 'assets/images/laptop.png',
      'Wireless Headphones': 'assets/images/headphone.png',
      'Smart Watch': 'assets/images/smartwatch1.png',
      'default': 'assets/hero.png' // Default image for other products
    };

    // Get all products
    const products = await productsCollection.find({}).toArray();
    console.log(`Found ${products.length} products to update`);

    // Update each product with local image path
    for (const product of products) {
      const localImagePath = imageMap[product.title] || imageMap.default;
      
      // Update the image path
      await productsCollection.updateOne(
        { _id: product._id },
        { $set: { image: localImagePath } }
      );
      
      console.log(`Updated image for product: ${product.title}`);
    }

    console.log('All product images updated successfully');
    await client.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error updating product images:', error);
  }
}

// Run the script
updateProductImages(); 