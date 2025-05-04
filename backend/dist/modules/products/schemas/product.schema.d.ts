import { Document, Schema as MongooseSchema } from 'mongoose';
export type ProductDocument = Product & Document;
declare class Review {
    userId: string;
    rating: number;
    comment: string;
    createdAt: Date;
}
export declare class Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    image: string;
    stock: number;
    ratings: number;
    reviews: Review[];
}
export declare const ProductSchema: MongooseSchema<Product, import("mongoose").Model<Product, any, any, any, Document<unknown, any, Product> & Product & Required<{
    _id: string;
}>, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Product, Document<unknown, {}, import("mongoose").FlatRecord<Product>> & import("mongoose").FlatRecord<Product> & Required<{
    _id: string;
}>>;
export {};
