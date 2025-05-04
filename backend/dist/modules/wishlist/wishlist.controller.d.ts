import { WishlistService } from './wishlist.service';
export declare class WishlistController {
    private readonly wishlistService;
    constructor(wishlistService: WishlistService);
    getWishlist(req: any): Promise<any>;
    addToWishlist(req: any, productId: string): Promise<import("./schemas/wishlist.schema").Wishlist>;
    removeFromWishlist(req: any, productId: string): Promise<import("./schemas/wishlist.schema").Wishlist>;
    clearWishlist(req: any): Promise<import("./schemas/wishlist.schema").Wishlist>;
}
