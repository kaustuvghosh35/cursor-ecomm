import { Document, Schema as MongooseSchema } from 'mongoose';
export type OrderDocument = Order & Document;
declare class OrderItem {
    productId: string;
    quantity: number;
    price: number;
}
declare class ShippingAddress {
    fullName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    phoneNumber: string;
}
export declare class Order {
    _id: string;
    userId: string;
    items: OrderItem[];
    total: number;
    shippingAddress: ShippingAddress;
    status: string;
    paymentId: string;
    createdAt: Date;
}
export declare const OrderSchema: MongooseSchema<Order, import("mongoose").Model<Order, any, any, any, Document<unknown, any, Order> & Order & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, import("mongoose").FlatRecord<Order>> & import("mongoose").FlatRecord<Order> & Required<{
    _id: string;
}>>;
export {};
