import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll(
    @Query('page') pageStr?: string,
    @Query('limit') limitStr?: string,
    @Query('category') category?: string,
    @Query('minPrice') minPriceStr?: string,
    @Query('maxPrice') maxPriceStr?: string,
    @Query('sort') sort?: string,
    @Query('featured') featuredStr?: string,
    @Query('onSale') onSaleStr?: string,
    @Query('isNew') isNewStr?: string,
    @Query('minRating') minRatingStr?: string,
  ) {
    // Parse numeric parameters safely
    const page = pageStr ? parseInt(pageStr, 10) : undefined;
    const limit = limitStr ? parseInt(limitStr, 10) : undefined;
    const minPrice = minPriceStr ? parseFloat(minPriceStr) : undefined;
    const maxPrice = maxPriceStr ? parseFloat(maxPriceStr) : undefined;
    const minRating = minRatingStr ? parseFloat(minRatingStr) : undefined;
    
    // Parse boolean parameters
    const featured = featuredStr ? featuredStr === 'true' : undefined;
    const onSale = onSaleStr ? onSaleStr === 'true' : undefined;
    const isNew = isNewStr ? isNewStr === 'true' : undefined;
    
    return this.productsService.findAll(
      isNaN(page) ? 1 : page, 
      isNaN(limit) ? 10 : limit, 
      category, 
      isNaN(minPrice) ? undefined : minPrice, 
      isNaN(maxPrice) ? undefined : maxPrice, 
      sort,
      featured,
      onSale,
      isNew,
      isNaN(minRating) ? undefined : minRating
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }

  @Post(':id/reviews')
  @UseGuards(JwtAuthGuard)
  addReview(
    @Param('id') id: string,
    @Body() reviewData: { rating: number; comment: string },
    @Req() req,
  ) {
    const userId = req.user.id;
    return this.productsService.addReview(id, userId, reviewData.rating, reviewData.comment);
  }

  @Get(':id/reviews')
  getReviews(@Param('id') id: string) {
    return this.productsService.findOne(id).then(product => product.reviews);
  }
} 