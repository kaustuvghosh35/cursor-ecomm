import { Document, Schema as MongooseSchema } from 'mongoose';
export type WishlistDocument = Wishlist & Document;
export declare class Wishlist {
    userId: string;
    products: string[];
}
export declare const WishlistSchema: MongooseSchema<Wishlist, import("mongoose").Model<Wishlist, any, any, any, Document<unknown, any, Wishlist> & Wishlist & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Wishlist, Document<unknown, {}, import("mongoose").FlatRecord<Wishlist>> & import("mongoose").FlatRecord<Wishlist> & {
    _id: import("mongoose").Types.ObjectId;
}>;
