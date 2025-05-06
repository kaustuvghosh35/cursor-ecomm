import { IsNotEmpty, IsNumber, IsString, IsUrl, Min, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsNotEmpty()
  @IsUrl()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;
  
  @IsOptional()
  @IsBoolean()
  featured?: boolean;
  
  @IsOptional()
  @IsBoolean()
  isNew?: boolean;
  
  @IsOptional()
  @IsBoolean()
  onSale?: boolean;
  
  @IsOptional()
  @IsNumber()
  @Min(0)
  discount?: number;
} 