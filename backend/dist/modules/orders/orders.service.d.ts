import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersService {
    private orderModel;
    private cartService;
    private productsService;
    constructor(orderModel: Model<OrderDocument>, cartService: CartService, productsService: ProductsService);
    create(userId: string, createOrderDto: CreateOrderDto): Promise<Order>;
    findAll(userId: string): Promise<Order[]>;
    findOne(id: string, userId: string): Promise<Order>;
    findAllAdmin(): Promise<Order[]>;
    updateStatus(id: string, status: string): Promise<Order>;
    getOrderDetails(orderId: string): Promise<any>;
}
