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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const discount_schema_1 = require("./schemas/discount.schema");
const products_service_1 = require("../products/products.service");
const orders_service_1 = require("../orders/orders.service");
const mongoose_3 = require("@nestjs/mongoose");
const mongoose_4 = require("mongoose");
let AdminService = class AdminService {
    constructor(discountModel, productsService, ordersService, connection) {
        this.discountModel = discountModel;
        this.productsService = productsService;
        this.ordersService = ordersService;
        this.connection = connection;
    }
    async createDiscount(createDiscountDto) {
        const newDiscount = new this.discountModel(createDiscountDto);
        return newDiscount.save();
    }
    async findAllDiscounts() {
        return this.discountModel.find().exec();
    }
    async findOneDiscount(id) {
        const discount = await this.discountModel.findById(id).exec();
        if (!discount) {
            throw new common_1.NotFoundException(`Discount with ID ${id} not found`);
        }
        return discount;
    }
    async removeDiscount(id) {
        const result = await this.discountModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Discount with ID ${id} not found`);
        }
    }
    async validateDiscount(code) {
        const discount = await this.discountModel.findOne({ code }).exec();
        if (!discount) {
            throw new common_1.NotFoundException(`Discount with code ${code} not found`);
        }
        if (new Date(discount.expiresAt) < new Date()) {
            throw new common_1.NotFoundException('Discount code has expired');
        }
        return discount;
    }
    async getAnalytics() {
        const totalSales = await this.ordersService.findAllAdmin();
        const products = await this.productsService.findAll();
        const totalRevenue = totalSales.reduce((sum, order) => sum + order.total, 0);
        const totalOrders = totalSales.length;
        const totalProducts = products.total;
        const ordersByStatus = {
            processing: totalSales.filter(order => order.status === 'processing').length,
            shipped: totalSales.filter(order => order.status === 'shipped').length,
            delivered: totalSales.filter(order => order.status === 'delivered').length,
            cancelled: totalSales.filter(order => order.status === 'cancelled').length,
        };
        const last7Days = new Array(7).fill(0).map((_, i) => {
            const date = new Date();
            date.setDate(date.getDate() - i);
            return date.toISOString().split('T')[0];
        }).reverse();
        const salesByDay = last7Days.map(day => {
            const dayStart = new Date(`${day}T00:00:00.000Z`);
            const dayEnd = new Date(`${day}T23:59:59.999Z`);
            const dayOrders = totalSales.filter(order => {
                const orderDate = new Date(order.createdAt);
                return orderDate >= dayStart && orderDate <= dayEnd;
            });
            return {
                date: day,
                orders: dayOrders.length,
                revenue: dayOrders.reduce((sum, order) => sum + order.total, 0),
            };
        });
        return {
            summary: {
                totalRevenue,
                totalOrders,
                totalProducts,
                ordersByStatus,
            },
            salesByDay,
        };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(discount_schema_1.Discount.name)),
    __param(3, (0, mongoose_3.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        products_service_1.ProductsService,
        orders_service_1.OrdersService,
        mongoose_4.Connection])
], AdminService);
//# sourceMappingURL=admin.service.js.map