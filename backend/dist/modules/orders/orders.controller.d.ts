import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(req: any, createOrderDto: CreateOrderDto): Promise<import("./schemas/order.schema").Order>;
    findAll(req: any): Promise<import("./schemas/order.schema").Order[]>;
    findOne(id: string, req: any): Promise<import("./schemas/order.schema").Order>;
    getOrderDetails(id: string, req: any): Promise<any>;
    findAllAdmin(): Promise<import("./schemas/order.schema").Order[]>;
    updateStatus(id: string, status: string): Promise<import("./schemas/order.schema").Order>;
}
