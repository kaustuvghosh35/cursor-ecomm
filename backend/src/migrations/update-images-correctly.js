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
    
    // Correct image mappings based on your assets folder
    // Using exact names from your file system
    const imageMap = {
      'Smartphone X': 'assets/images/brand-new-realistic-mobile-phone-black-smartphone-apple-iphone-vector-eps-100341904.png',
      'Laptop Pro': 'assets/images/laptop.png',
      'Wireless Headphones': 'assets/images/headphone.png',
      'Smart Watch': 'assets/images/smartwatch1.png'
    };

    // Get all products
    const products = await productsCollection.find({}).toArray();
    console.log(`Found ${products.length} products to update`);

    // Update each product with the correct image path
    for (const product of products) {
      // Only update if we have a mapping for this product
      if (imageMap[product.title]) {
        // Update the image path
        await productsCollection.updateOne(
          { _id: product._id },
          { $set: { image: imageMap[product.title] } }
        );
        
        console.log(`Updated image for product: ${product.title} -> ${imageMap[product.title]}`);
      } else {
        console.log(`No image mapping found for product: ${product.title}`);
      }
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