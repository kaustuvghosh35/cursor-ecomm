import { Document } from 'mongoose';
export type DiscountDocument = Discount & Document;
export declare class Discount {
    code: string;
    percentage: number;
    expiresAt: Date;
}
export declare const DiscountSchema: import("mongoose").Schema<Discount, import("mongoose").Model<Discount, any, any, any, Document<unknown, any, Discount> & Discount & {
    _id: import("mongoose").Types.ObjectId;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Discount, Document<unknown, {}, import("mongoose").FlatRecord<Discount>> & import("mongoose").FlatRecord<Discount> & {
    _id: import("mongoose").Types.ObjectId;
}>;
