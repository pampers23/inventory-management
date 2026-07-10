import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './models/product.model';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from '../categories/models/category.model';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,

    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const category = await this.categoryModel.findByPk(
      createProductDto.categoryId,
    );

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return this.productModel.create(createProductDto);
  }

  async findAll() {
    return this.productModel.findAll({
      include: [
        {
          model: Category,
          attributes: ['id', 'name'],
        },
      ],
      order: [['id', 'ASC']],
    });
  }
}
