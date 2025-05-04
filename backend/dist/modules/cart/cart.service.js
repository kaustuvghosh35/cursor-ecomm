"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const cart_schema_1 = require("./schemas/cart.schema");
const products_service_1 = require("../products/products.service");
let CartService = class CartService {
    constructor(cartModel, productsService) {
        this.cartModel = cartModel;
        this.productsService = productsService;
    }
    async getCart(userId) {
        const cart = await this.cartModel.findOne({ userId }).exec();
        if (!cart) {
            return this.cartModel.create({ userId, items: [] });
        }
        const productIds = cart.items.map(item => item.productId);
        const products = await this.productsService.getProductsByIds(productIds);
        const cartWithProducts = {
            _id: cart._id,
            userId: cart.userId,
            items: cart.items.map(item => {
                const productDetails = products.find(p => p._id.toString() === item.productId.toString());
                return {
                    productId: item.productId,
                    quantity: item.quantity,
                    product: productDetails,
                };
            }),
            totalPrice: cart.items.reduce((total, item) => {
                const product = products.find(p => p._id.toString() === item.productId.toString());
                return total + (product ? product.price : 0) * item.quantity;
            }, 0),
        };
        return cartWithProducts;
    }
    async addToCart(userId, addToCartDto) {
        const { productId, quantity } = addToCartDto;
        await this.productsService.findOne(productId);
        let cart = await this.cartModel.findOne({ userId }).exec();
        if (!cart) {
            cart = new this.cartModel({ userId, items: [] });
        }
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        }
        else {
            cart.items.push({ productId, quantity });
        }
        return cart.save();
    }
    async updateCartItem(userId, productId, quantity) {
        const cart = await this.cartModel.findOne({ userId }).exec();
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) {
            throw new common_1.NotFoundException('Item not found in cart');
        }
        if (quantity <= 0) {
            cart.items.splice(itemIndex, 1);
        }
        else {
            cart.items[itemIndex].quantity = quantity;
        }
        return cart.save();
    }
    async removeFromCart(userId, productId) {
        const cart = await this.cartModel.findOne({ userId }).exec();
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
        if (itemIndex === -1) {
            throw new common_1.NotFoundException('Item not found in cart');
        }
        cart.items.splice(itemIndex, 1);
        return cart.save();
    }
    async clearCart(userId) {
        const cart = await this.cartModel.findOne({ userId }).exec();
        if (!cart) {
            throw new common_1.NotFoundException('Cart not found');
        }
        cart.items = [];
        return cart.save();
    }
};
exports.CartService = CartService;
exports.CartService = CartService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cart_schema_1.Cart.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        products_service_1.ProductsService])
], CartService);
//# sourceMappingURL=cart.service.js.map