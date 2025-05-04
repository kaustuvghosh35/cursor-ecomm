import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wishlist, WishlistDocument } from './schemas/wishlist.schema';
import { ProductsService } from '../products/products.service';

@Injectable()
export class WishlistService {
  constructor(
    @InjectModel(Wishlist.name) private wishlistModel: Model<WishlistDocument>,
    private productsService: ProductsService,
  ) {}

  async getWishlist(userId: string): Promise<any> {
    let wishlist = await this.wishlistModel.findOne({ userId }).exec();
    if (!wishlist) {
      // Create a new wishlist if none exists
      wishlist = await this.wishlistModel.create({ userId, products: [] });
    }

    if (wishlist.products.length === 0) {
      return { userId, products: [] };
    }

    // Get product details
    const productDetails = await this.productsService.getProductsByIds(wishlist.products);

    return {
      userId: wishlist.userId,
      products: productDetails,
    };
  }

  async addToWishlist(userId: string, productId: string): Promise<Wishlist> {
    // Validate product exists
    await this.productsService.findOne(productId);

    // Find or create wishlist
    let wishlist = await this.wishlistModel.findOne({ userId }).exec();
    if (!wishlist) {
      wishlist = new this.wishlistModel({ userId, products: [] });
    }

    // Only add product if not already in wishlist
    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    return wishlist;
  }

  async removeFromWishlist(userId: string, productId: string): Promise<Wishlist> {
    // Find wishlist
    const wishlist = await this.wishlistModel.findOne({ userId }).exec();
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }

    // Remove product from wishlist
    wishlist.products = wishlist.products.filter(
      p => p.toString() !== productId,
    );

    return wishlist.save();
  }

  async clearWishlist(userId: string): Promise<Wishlist> {
    // Find wishlist
    const wishlist = await this.wishlistModel.findOne({ userId }).exec();
    if (!wishlist) {
      throw new NotFoundException('Wishlist not found');
    }

    // Clear products
    wishlist.products = [];
    return wishlist.save();
  }
} 