import { Model } from 'mongoose';
import { Wishlist, WishlistDocument } from './schemas/wishlist.schema';
import { ProductsService } from '../products/products.service';
export declare class WishlistService {
    private wishlistModel;
    private productsService;
    constructor(wishlistModel: Model<WishlistDocument>, productsService: ProductsService);
    getWishlist(userId: string): Promise<any>;
    addToWishlist(userId: string, productId: string): Promise<Wishlist>;
    removeFromWishlist(userId: string, productId: string): Promise<Wishlist>;
    clearWishlist(userId: string): Promise<Wishlist>;
}
