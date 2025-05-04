import { IsDateString, IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class CreateDiscountDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(100)
  percentage: number;

  @IsNotEmpty()
  @IsDateString()
  expiresAt: string;
} 