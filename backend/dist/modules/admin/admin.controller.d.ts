import { AdminService } from './admin.service';
import { CreateDiscountDto } from './dto/create-discount.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    createDiscount(createDiscountDto: CreateDiscountDto): Promise<import("./schemas/discount.schema").Discount>;
    findAllDiscounts(): Promise<import("./schemas/discount.schema").Discount[]>;
    findOneDiscount(id: string): Promise<import("./schemas/discount.schema").Discount>;
    removeDiscount(id: string): Promise<void>;
    getAnalytics(): Promise<any>;
}
