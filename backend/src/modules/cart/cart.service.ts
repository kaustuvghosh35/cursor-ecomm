import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { ProductsService } from '../products/products.service';
import { AddToCartDto } from './dto/add-to-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name) private cartModel: Model<CartDocument>,
    private productsService: ProductsService,
  ) {}

  async getCart(userId: string): Promise<any> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      // Create a new cart if none exists
      return this.cartModel.create({ userId, items: [] });
    }

    // Get product details for items in cart
    const productIds = cart.items.map(item => item.productId);
    const products = await this.productsService.getProductsByIds(productIds);

    // Map products to cart items
    const cartWithProducts = {
      _id: cart._id,
      userId: cart.userId,
      items: cart.items.map(item => {
        const productDetails = products.find(p => p._id.toString() === item.productId.toString());
        return {
          productId: item.productId,
          quantity: item.quantity,
          product: productDetails,
        };
      }),
      totalPrice: cart.items.reduce((total, item) => {
        const product = products.find(p => p._id.toString() === item.productId.toString());
        return total + (product ? product.price : 0) * item.quantity;
      }, 0),
    };

    return cartWithProducts;
  }

  async addToCart(userId: string, addToCartDto: AddToCartDto): Promise<Cart> {
    const { productId, quantity } = addToCartDto;

    // Validate product exists
    await this.productsService.findOne(productId);

    // Find or create cart
    let cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      cart = new this.cartModel({ userId, items: [] });
    }

    // Check if product already in cart
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex > -1) {
      // Update quantity if product already in cart
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({ productId, quantity });
    }

    return cart.save();
  }

  async updateCartItem(userId: string, productId: string, quantity: number): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in cart');
    }

    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      cart.items.splice(itemIndex, 1);
    } else {
      // Update quantity
      cart.items[itemIndex].quantity = quantity;
    }

    return cart.save();
  }

  async removeFromCart(userId: string, productId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
    if (itemIndex === -1) {
      throw new NotFoundException('Item not found in cart');
    }

    cart.items.splice(itemIndex, 1);
    return cart.save();
  }

  async clearCart(userId: string): Promise<Cart> {
    const cart = await this.cartModel.findOne({ userId }).exec();
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    cart.items = [];
    return cart.save();
  }
} 