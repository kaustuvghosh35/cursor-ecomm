import { Model } from 'mongoose';
import { Cart, CartDocument } from './schemas/cart.schema';
import { ProductsService } from '../products/products.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
export declare class CartService {
    private cartModel;
    private productsService;
    constructor(cartModel: Model<CartDocument>, productsService: ProductsService);
    getCart(userId: string): Promise<any>;
    addToCart(userId: string, addToCartDto: AddToCartDto): Promise<Cart>;
    updateCartItem(userId: string, productId: string, quantity: number): Promise<Cart>;
    removeFromCart(userId: string, productId: string): Promise<Cart>;
    clearCart(userId: string): Promise<Cart>;
}
