import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  async findAll(
    page = 1,
    limit = 10,
    category?: string,
    minPrice?: number,
    maxPrice?: number,
    sort?: string,
    featured?: boolean,
    onSale?: boolean,
    isNew?: boolean,
    minRating?: number,
  ): Promise<{ products: Product[]; total: number; page: number; limit: number }> {
    const query: any = {};

    // Apply filters
    if (category) {
      query.category = category;
    }

    // Safely handle price filters to prevent NaN errors
    if (minPrice !== undefined || maxPrice !== undefined) {
      query.price = {};
      
      // Convert to number and validate
      const minPriceNum = minPrice !== undefined ? Number(minPrice) : undefined;
      const maxPriceNum = maxPrice !== undefined ? Number(maxPrice) : undefined;
      
      if (minPriceNum !== undefined && !isNaN(minPriceNum)) {
        query.price.$gte = minPriceNum;
      }
      
      if (maxPriceNum !== undefined && !isNaN(maxPriceNum)) {
        query.price.$lte = maxPriceNum;
      }
      
      // If price object is empty, remove it from query
      if (Object.keys(query.price).length === 0) {
        delete query.price;
      }
    }
    
    // Apply filtering for new product properties
    if (featured !== undefined) {
      query.featured = featured;
    }
    
    if (onSale !== undefined) {
      query.onSale = onSale;
    }
    
    if (isNew !== undefined) {
      query.isNew = isNew;
    }
    
    if (minRating !== undefined && !isNaN(minRating)) {
      query.ratings = { $gte: minRating };
    }

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Apply sorting
    const sortOptions: any = {};
    if (sort) {
      const [field, order] = sort.split(':');
      sortOptions[field] = order === 'desc' ? -1 : 1;
    } else {
      sortOptions.createdAt = -1; // Default sort by newest
    }

    const products = await this.productModel
      .find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit)
      .exec();

    const total = await this.productModel.countDocuments(query);

    return {
      products,
      total,
      page,
      limit,
    };
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();

    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return updatedProduct;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  async addReview(productId: string, userId: string, rating: number, comment: string): Promise<Product> {
    const product = await this.productModel.findById(productId);
    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    // Add review
    product.reviews.push({ userId, rating, comment, createdAt: new Date() });

    // Recalculate average rating
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    product.ratings = totalRating / product.reviews.length;

    return product.save();
  }

  async getProductsByIds(productIds: string[]): Promise<Product[]> {
    return this.productModel.find({ _id: { $in: productIds } }).exec();
  }
} 