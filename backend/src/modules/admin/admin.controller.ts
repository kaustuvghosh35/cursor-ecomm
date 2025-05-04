import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CreateDiscountDto } from './dto/create-discount.dto';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('discounts')
  createDiscount(@Body() createDiscountDto: CreateDiscountDto) {
    return this.adminService.createDiscount(createDiscountDto);
  }

  @Get('discounts')
  findAllDiscounts() {
    return this.adminService.findAllDiscounts();
  }

  @Get('discounts/:id')
  findOneDiscount(@Param('id') id: string) {
    return this.adminService.findOneDiscount(id);
  }

  @Delete('discounts/:id')
  removeDiscount(@Param('id') id: string) {
    return this.adminService.removeDiscount(id);
  }

  @Get('analytics')
  getAnalytics() {
    return this.adminService.getAnalytics();
  }
} 