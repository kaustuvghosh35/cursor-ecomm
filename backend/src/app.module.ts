import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

// Import modules directly - fix for module resolution
import { AuthModule } from './modules/auth/auth.module';
import { ProductsModule } from './modules/products/products.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { WishlistModule } from './modules/wishlist/wishlist.module';
import { AdminModule } from './modules/admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb+srv://kaustavghosh35:0LQGdkv61A4M50WT@canvaskgcluster.ofpezjg.mongodb.net/shopnest'),
    AuthModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    WishlistModule,
    AdminModule,
  ],
})
export class AppModule {} 