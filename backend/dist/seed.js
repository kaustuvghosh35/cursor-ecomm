"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const mongoose_1 = require("@nestjs/mongoose");
const axios_1 = require("axios");
const bcrypt = require("bcrypt");
const user_schema_1 = require("./modules/auth/schemas/user.schema");
const product_schema_1 = require("./modules/products/schemas/product.schema");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    try {
        console.log('Seeding database...');
        const userModel = app.get((0, mongoose_1.getModelToken)(user_schema_1.User.name));
        const productModel = app.get((0, mongoose_1.getModelToken)(product_schema_1.Product.name));
        await userModel.deleteMany({}).exec();
        await productModel.deleteMany({}).exec();
        const hashedPassword = await bcrypt.hash('admin123', 10);
        const admin = new userModel({
            name: 'Admin',
            email: 'admin@example.com',
            password: hashedPassword,
            role: 'admin',
        });
        await admin.save();
        console.log('Admin user created:', admin.email);
        const testUserPassword = await bcrypt.hash('password123', 10);
        const testUser = new userModel({
            name: 'Test User',
            email: 'user@example.com',
            password: testUserPassword,
            role: 'user',
        });
        await testUser.save();
        console.log('Test user created:', testUser.email);
        const response = await axios_1.default.get('https://fakestoreapi.com/products');
        const fakeProducts = response.data;
        const products = fakeProducts.map((item) => ({
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
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=seed.js.map