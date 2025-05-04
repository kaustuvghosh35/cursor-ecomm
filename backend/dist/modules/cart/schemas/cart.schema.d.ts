import { Document, Schema as MongooseSchema } from 'mongoose';
export type CartDocument = Cart & Document;
declare class CartItem {
    productId: string;
    quantity: number;
}
export declare class Cart {
    userId: string;
    items: CartItem[];
}
export declare const CartSchema: MongooseSchema<Cart, import("mongoose").Model<Cart, any, any, any, Document<unknown, any, Cart> & Cart & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cart, Document<unknown, {}, import("mongoose").FlatRecord<Cart>> & import("mongoose").FlatRecord<Cart> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export {};
