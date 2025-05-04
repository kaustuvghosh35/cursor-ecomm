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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schemas/order.schema");
const cart_service_1 = require("../cart/cart.service");
const products_service_1 = require("../products/products.service");
let OrdersService = class OrdersService {
    constructor(orderModel, cartService, productsService) {
        this.orderModel = orderModel;
        this.cartService = cartService;
        this.productsService = productsService;
    }
    async create(userId, createOrderDto) {
        const cart = await this.cartService.getCart(userId);
        if (!cart || !cart.items || cart.items.length === 0) {
            throw new common_1.NotFoundException('Cart is empty');
        }
        const orderItems = cart.items.map(item => ({
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price,
        }));
        const total = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const newOrder = new this.orderModel({
            userId,
            items: orderItems,
            total,
            shippingAddress: createOrderDto.shippingAddress,
            paymentId: createOrderDto.paymentId,
            status: 'processing',
        });
        const savedOrder = await newOrder.save();
        await this.cartService.clearCart(userId);
        return savedOrder;
    }
    async findAll(userId) {
        return this.orderModel.find({ userId }).sort({ createdAt: -1 }).exec();
    }
    async findOne(id, userId) {
        const order = await this.orderModel.findOne({ _id: id, userId }).exec();
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }
    async findAllAdmin() {
        return this.orderModel.find().sort({ createdAt: -1 }).exec();
    }
    async updateStatus(id, status) {
        const validStatuses = ['processing', 'shipped', 'delivered', 'cancelled'];
        if (!validStatuses.includes(status)) {
            throw new common_1.NotFoundException(`Invalid status: ${status}`);
        }
        const order = await this.orderModel.findById(id).exec();
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${id} not found`);
        }
        order.status = status;
        return order.save();
    }
    async getOrderDetails(orderId) {
        const order = await this.orderModel.findById(orderId).exec();
        if (!order) {
            throw new common_1.NotFoundException(`Order with ID ${orderId} not found`);
        }
        const productIds = order.items.map(item => item.productId);
        const products = await this.productsService.getProductsByIds(productIds);
        const orderWithProducts = Object.assign(Object.assign({}, order.toObject()), { items: order.items.map(item => {
                const productDetails = products.find(p => p._id.toString() === item.productId.toString());
                return Object.assign(Object.assign({}, item), { product: productDetails });
            }) });
        return orderWithProducts;
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cart_service_1.CartService,
        products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map