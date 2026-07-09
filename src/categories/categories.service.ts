import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const existingCategory = await this.categoryModel.findOne({
      where: {
        name: createCategoryDto.name,
      },
    });

    if (existingCategory) {
      throw new ConflictException('Category already exists');
    }

    return this.categoryModel.create({ ...createCategoryDto });
  }
}
