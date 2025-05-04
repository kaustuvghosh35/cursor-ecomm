import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Discount, DiscountDocument } from './schemas/discount.schema';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { ProductsService } from '../products/products.service';
import { OrdersService } from '../orders/orders.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Discount.name) private discountModel: Model<DiscountDocument>,
    private productsService: ProductsService,
    private ordersService: OrdersService,
    @InjectConnection() private connection: Connection,
  ) {}

  async createDiscount(createDiscountDto: CreateDiscountDto): Promise<Discount> {
    const newDiscount = new this.discountModel(createDiscountDto);
    return newDiscount.save();
  }

  async findAllDiscounts(): Promise<Discount[]> {
    return this.discountModel.find().exec();
  }

  async findOneDiscount(id: string): Promise<Discount> {
    const discount = await this.discountModel.findById(id).exec();
    if (!discount) {
      throw new NotFoundException(`Discount with ID ${id} not found`);
    }
    return discount;
  }

  async removeDiscount(id: string): Promise<void> {
    const result = await this.discountModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Discount with ID ${id} not found`);
    }
  }

  async validateDiscount(code: string): Promise<Discount> {
    const discount = await this.discountModel.findOne({ code }).exec();
    if (!discount) {
      throw new NotFoundException(`Discount with code ${code} not found`);
    }

    // Check if discount is expired
    if (new Date(discount.expiresAt) < new Date()) {
      throw new NotFoundException('Discount code has expired');
    }

    return discount;
  }

  async getAnalytics(): Promise<any> {
    const totalSales = await this.ordersService.findAllAdmin();
    const products = await this.productsService.findAll();

    // Calculate sales data
    const totalRevenue = totalSales.reduce((sum, order) => sum + order.total, 0);
    const totalOrders = totalSales.length;
    const totalProducts = products.total;

    // Group orders by status
    const ordersByStatus = {
      processing: totalSales.filter(order => order.status === 'processing').length,
      shipped: totalSales.filter(order => order.status === 'shipped').length,
      delivered: totalSales.filter(order => order.status === 'delivered').length,
      cancelled: totalSales.filter(order => order.status === 'cancelled').length,
    };

    // Get data for last 7 days for chart
    const last7Days = new Array(7).fill(0).map((_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    const salesByDay = last7Days.map(day => {
      const dayStart = new Date(`${day}T00:00:00.000Z`);
      const dayEnd = new Date(`${day}T23:59:59.999Z`);
      
      const dayOrders = totalSales.filter(order => {
        const orderDate = new Date(order.createdAt);
        return orderDate >= dayStart && orderDate <= dayEnd;
      });
      
      return {
        date: day,
        orders: dayOrders.length,
        revenue: dayOrders.reduce((sum, order) => sum + order.total, 0),
      };
    });

    return {
      summary: {
        totalRevenue,
        totalOrders,
        totalProducts,
        ordersByStatus,
      },
      salesByDay,
    };
  }
} 