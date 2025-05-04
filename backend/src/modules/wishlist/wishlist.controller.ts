import { Controller, Get, Post, Delete, Param, UseGuards, Req } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('wishlist')
@UseGuards(JwtAuthGuard)
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  getWishlist(@Req() req) {
    return this.wishlistService.getWishlist(req.user.id);
  }

  @Post(':productId')
  addToWishlist(@Req() req, @Param('productId') productId: string) {
    return this.wishlistService.addToWishlist(req.user.id, productId);
  }

  @Delete(':productId')
  removeFromWishlist(@Req() req, @Param('productId') productId: string) {
    return this.wishlistService.removeFromWishlist(req.user.id, productId);
  }

  @Delete()
  clearWishlist(@Req() req) {
    return this.wishlistService.clearWishlist(req.user.id);
  }
} 