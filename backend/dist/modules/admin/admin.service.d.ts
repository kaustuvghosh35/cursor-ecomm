import { Model } from 'mongoose';
import { Discount, DiscountDocument } from './schemas/discount.schema';
import { CreateDiscountDto } from './dto/create-discount.dto';
import { ProductsService } from '../products/products.service';
import { OrdersService } from '../orders/orders.service';
import { Connection } from 'mongoose';
export declare class AdminService {
    private discountModel;
    private productsService;
    private ordersService;
    private connection;
    constructor(discountModel: Model<DiscountDocument>, productsService: ProductsService, ordersService: OrdersService, connection: Connection);
    createDiscount(createDiscountDto: CreateDiscountDto): Promise<Discount>;
    findAllDiscounts(): Promise<Discount[]>;
    findOneDiscount(id: string): Promise<Discount>;
    removeDiscount(id: string): Promise<void>;
    validateDiscount(code: string): Promise<Discount>;
    getAnalytics(): Promise<any>;
}
