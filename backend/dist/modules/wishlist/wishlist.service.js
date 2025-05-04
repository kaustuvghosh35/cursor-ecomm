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
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const wishlist_schema_1 = require("./schemas/wishlist.schema");
const products_service_1 = require("../products/products.service");
let WishlistService = class WishlistService {
    constructor(wishlistModel, productsService) {
        this.wishlistModel = wishlistModel;
        this.productsService = productsService;
    }
    async getWishlist(userId) {
        let wishlist = await this.wishlistModel.findOne({ userId }).exec();
        if (!wishlist) {
            wishlist = await this.wishlistModel.create({ userId, products: [] });
        }
        if (wishlist.products.length === 0) {
            return { userId, products: [] };
        }
        const productDetails = await this.productsService.getProductsByIds(wishlist.products);
        return {
            userId: wishlist.userId,
            products: productDetails,
        };
    }
    async addToWishlist(userId, productId) {
        await this.productsService.findOne(productId);
        let wishlist = await this.wishlistModel.findOne({ userId }).exec();
        if (!wishlist) {
            wishlist = new this.wishlistModel({ userId, products: [] });
        }
        if (!wishlist.products.includes(productId)) {
            wishlist.products.push(productId);
            await wishlist.save();
        }
        return wishlist;
    }
    async removeFromWishlist(userId, productId) {
        const wishlist = await this.wishlistModel.findOne({ userId }).exec();
        if (!wishlist) {
            throw new common_1.NotFoundException('Wishlist not found');
        }
        wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
        return wishlist.save();
    }
    async clearWishlist(userId) {
        const wishlist = await this.wishlistModel.findOne({ userId }).exec();
        if (!wishlist) {
            throw new common_1.NotFoundException('Wishlist not found');
        }
        wishlist.products = [];
        return wishlist.save();
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(wishlist_schema_1.Wishlist.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        products_service_1.ProductsService])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map