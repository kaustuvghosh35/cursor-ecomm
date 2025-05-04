import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DiscountDocument = Discount & Document;

@Schema({ timestamps: true })
export class Discount {
  @Prop({ required: true, unique: true })
  code: string;

  @Prop({ required: true, min: 1, max: 100 })
  percentage: number;

  @Prop({ required: true })
  expiresAt: Date;
}

export const DiscountSchema = SchemaFactory.createForClass(Discount); 