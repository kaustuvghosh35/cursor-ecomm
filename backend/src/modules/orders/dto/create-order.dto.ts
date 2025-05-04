import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';

class ShippingAddressDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;

  @IsNotEmpty()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @IsObject()
  shippingAddress: ShippingAddressDto;

  @IsOptional()
  @IsString()
  paymentId?: string;
} 