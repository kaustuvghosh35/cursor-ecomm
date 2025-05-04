import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    create(createProductDto: CreateProductDto): Promise<Product>;
    findAll(page?: number, limit?: number, category?: string, minPrice?: number, maxPrice?: number, sort?: string): Promise<{
        products: Product[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<Product>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<Product>;
    remove(id: string): Promise<void>;
    addReview(productId: string, userId: string, rating: number, comment: string): Promise<Product>;
    getProductsByIds(productIds: string[]): Promise<Product[]>;
}
