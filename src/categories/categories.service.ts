import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Category } from './models/category.model';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private readonly categoryModel: typeof Category,
  ) {}

  // create categories
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

  // find all categories
  async findAll() {
    return this.categoryModel.findAll({ order: [['id', 'ASC']] });
  }

  // find category by id
  async findOne(id: number) {
    const category = await this.categoryModel.findByPk(id);

    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  // update category by id
  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(id);

    await category.update(updateCategoryDto);

    return { category, message: 'Category updated successfully' };
  }

  // delete category by id
  async delete(id: number) {
    const category = await this.findOne(id);

    await category.destroy();

    return { message: 'Category deleted successfully' };
  }
}
