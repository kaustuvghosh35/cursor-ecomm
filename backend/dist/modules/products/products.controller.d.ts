import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: CreateProductDto): Promise<import("./schemas/product.schema").Product>;
    findAll(page?: number, limit?: number, category?: string, minPrice?: number, maxPrice?: number, sort?: string): Promise<{
        products: import("./schemas/product.schema").Product[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<import("./schemas/product.schema").Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<import("./schemas/product.schema").Product>;
    remove(id: string): Promise<void>;
    addReview(id: string, reviewData: {
        rating: number;
        comment: string;
    }, req: any): Promise<import("./schemas/product.schema").Product>;
    getReviews(id: string): Promise<{
        userId: string;
        rating: number;
        comment: string;
        createdAt: Date;
    }[]>;
}
