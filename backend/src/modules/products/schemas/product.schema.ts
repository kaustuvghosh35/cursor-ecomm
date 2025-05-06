import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type ProductDocument = Product & Document;

class Review {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  userId: string;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ required: true })
  comment: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

const ReviewSchema = SchemaFactory.createForClass(Review);

@Schema({ timestamps: true })
export class Product {
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true, min: 0, default: 0 })
  stock: number;

  @Prop({ default: 0 })
  ratings: number;

  @Prop({ type: [ReviewSchema], default: [] })
  reviews: Review[];
  
  @Prop({ default: false })
  featured: boolean;
  
  @Prop({ default: false })
  isNew: boolean;
  
  @Prop({ default: false })
  onSale: boolean;
  
  @Prop({ type: Number, required: false })
  discount: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product); 