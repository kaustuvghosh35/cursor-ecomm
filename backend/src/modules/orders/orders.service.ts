import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private cartService: CartService,
    private productsService: ProductsService,
  ) {}

  async create(userId: string, createOrderDto: CreateOrderDto): Promise<Order> {
    // Get user's cart
    const cart = await this.cartService.getCart(userId);
    if (!cart || !cart.items || cart.items.length === 0) {
      throw new NotFoundException('Cart is empty');
    }

    // Create order items from cart items
    const orderItems = cart.items.map(item => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
    }));

    // Calculate total
    const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Create new order
    const newOrder = new this.orderModel({
      userId,
      items: orderItems,
      total,
      shippingAddress: createOrderDto.shippingAddress,
      paymentId: createOrderDto.paymentId,
      status: 'processing',
    });

    // Save order
    const savedOrder = await newOrder.save();

    // Clear cart after order is placed
    await this.cartService.clearCart(userId);

    return savedOrder;
  }

  async findAll(userId: string): Promise<Order[]> {
    return this.orderModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string, userId: string): Promise<Order> {
    const order = await this.orderModel.findOne({ _id: id, userId }).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async findAllAdmin(): Promise<Order[]> {
    return this.orderModel.find().sort({ createdAt: -1 }).exec();
  }

  async updateStatus(id: string, status: string): Promise<Order> {
    const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      throw new NotFoundException(`Invalid status: ${status}`);
    }

    const order = await this.orderModel.findById(id).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }

    order.status = status;
    return order.save();
  }

  async getOrderDetails(orderId: string): Promise<any> {
    const order = await this.orderModel.findById(orderId).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    // Get product details for order items
    const productIds = order.items.map(item => item.productId);
    const products = await this.productsService.getProductsByIds(productIds);

    // Map products to order items
    const orderWithProducts = {
      ...order.toObject(),
      items: order.items.map(item => {
        const productDetails = products.find(p => p._id.toString() === item.productId.toString());
        return {
          ...item,
          product: productDetails,
        };
      }),
    };

    return orderWithProducts;
  }
} 